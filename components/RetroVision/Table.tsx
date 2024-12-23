import React from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "../ui/table";
import { useState, useEffect } from "react";
import numberWithCommas from "@/utils/helper";
import { colorIndex } from "@/components/utils/retroVision";
import PaginationComponent from "./Table/Pagination";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { darkenColor, lightenColor } from "@/utils/common";

interface IRetroVisionData {
  id: number;
  keywordN: string;
  rank: number;
  searchVolume: number;
  searchResultT: number;
  demandScore: number;
  opportunityScore: number;
  opportunityColor: string;
  demandColor: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: any,
  comparator: (a: T, b: T) => number,
  orderBy: string,
  rankResults,
  order
) {
  if (orderBy === "rank") {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      delete element.rank;
      if (
        rankResults[element.keywordN] &&
        rankResults[element.keywordN] !== 0
      ) {
        element.rank = rankResults[element.keywordN];
      } else {
        if (order == "asc") {
          element.rank = 9999;
        } else {
          element.rank = -9999;
        }
      }
    }
  }

  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  let retVal = stabilizedThis.map((el) => el[0]);
  return retVal;
}

const HeaderRowCells = [
  {
    id: "keywordN",
    numeric: false,
    disablePadding: true,
    label: "Amazon Search Suggestions",
  },
  {
    id: "rank",
    numeric: true,
    disablePadding: true,
    label: "Search Rank",
  },
  {
    id: "searchVolume",
    numeric: false,
    disablePadding: true,
    label: "Est Search Volume",
  },
  {
    id: "searchResultT",
    numeric: false,
    disablePadding: true,
    label: "Search Results",
  },
  {
    id: "demandScore",
    numeric: false,
    disablePadding: true,
    label: "Demand",
  },
  {
    id: "opportunityScore",
    numeric: false,
    disablePadding: true,
    label: "Opportunity",
  },
];

interface EnhancedTableProps {
  numSelected?: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IRetroVisionData
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property as keyof IRetroVisionData);
    };

  return (
    <TableHeader
      style={{
        border: "none",
      }}
      className=""
    >
      <TableRow
        style={{
          border: "none",
        }}
        className="w-full"
      >
        {HeaderRowCells.map((headCell) => {
          const isActive = orderBy === headCell.id; // Check if this column is active

          return (
            <th className="" key={headCell.id}>
              <div
                style={{
                  padding: "0.5rem",
                }}
                className="flex  twa-th cursor-pointer justify-center items-center gap-2"
              >
                <div onClick={createSortHandler(headCell.id)}>
                  <h6 className="ml-1">{headCell.label}</h6>
                </div>
                {/* Always render both arrows, highlight the active one */}
                <div className="flex items-center">
                  <ArrowUpIcon
                    size={16}
                    className={`transition-colors ${
                      isActive && order === "asc"
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                  <ArrowDownIcon
                    size={16}
                    className={`transition-colors ${
                      isActive && order === "desc"
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            </th>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}

export default function EnhancedTable({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  results,
  setResults,
  getRankAndSetResults,
  getRanks,
  token,
  domain,
  asin,
  rankResults,
  setRankResults,
  setCurrentDataStateProxy,
  isOwner,
  data,
  handleChangeRowsPerPage,
}) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof IRetroVisionData>("rank");
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IRetroVisionData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (page + 1) * rowsPerPage - results.length) : 0;

  console.log({ page, rowsPerPage });

  const visibleRows = React.useMemo(() => {
    return stableSort(
      results,
      getComparator(order, orderBy),
      orderBy,
      rankResults, // Ensure this is properly tracked in the dependency array
      order
    ).slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [order, results, orderBy, page, rowsPerPage, rankResults]);

  useEffect(() => {
    async function fetchRanksData() {
      let noRankSuggestions = [];
      let hasRanks = Object.keys(rankResults);
      for (const element of visibleRows) {
        // @ts-ignore
        if (!hasRanks.includes(element.keywordN)) {
          noRankSuggestions.push(element.keywordN);
        }
      }
      if (noRankSuggestions.length) {
        let finalRanks = { ...rankResults };
        let ranksResponse = await getRanks({
          token,
          asin,
          domain,
          suggestions: noRankSuggestions,
        });
        for (const element of ranksResponse) {
          finalRanks[element.data.keyword] = element.data.rank;
        }
        setRankResults(finalRanks);
      }
    }
    isOwner ? fetchRanksData() : () => {};
  }, [visibleRows]);

  console.log("visibleRows", visibleRows);

  return (
    <div style={{ maxWidth: "100vw", overflow: "auto" }}>
      <div>
        <div className="w-full">
          <Table
            style={{
              maxWidth: "99%",
            }}
            aria-labelledby=""
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={results.length}
            />
            <TableBody
              style={{
                border: "none",
              }}
            >
              {visibleRows.map(
                (
                  row: {
                    id: React.Key | null | undefined;
                    keywordN:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    searchVolume: any;
                    searchResultT: any;
                    demandScore:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    opportunityScore:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: any
                ) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <tr
                      role="checkbox"
                      style={{
                        border: "none",
                      }}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <td
                        id={labelId}
                        scope="row"
                        style={{
                          width: "32%",
                        }}
                        className="px-0"
                      >
                        <div className="twa-td">{row.keywordN}</div>
                      </td>
                      <td className="px-0 h-full" align="center">
                        <div className="twa-td h-full center w-full">
                          {!isOwner &&
                          (rankResults[`${row.keywordN}`] === undefined ||
                            rankResults[`${row.keywordN}`] === null) ? (
                            0
                          ) : rankResults[`${row.keywordN}`] !== undefined &&
                            rankResults[`${row.keywordN}`] !== null ? (
                            rankResults[`${row.keywordN}`]
                          ) : (
                            <div className="flex justify-center">
                              {/* <Skeleton className="" width={50} /> */}
                              <Skeleton className="w-20 h-6" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-2" align="center">
                        <div className="twa-td center w-full">
                          {numberWithCommas(row.searchVolume)}
                        </div>
                      </td>
                      <td className="px-2" align="center">
                        <div className="twa-td center w-full">
                          {numberWithCommas(row.searchResultT)}
                        </div>
                      </td>
                      <td className="px-2" align="center">
                        <div
                          style={{
                            // @ts-ignore
                            backgroundColor: lightenColor(row.demandColor, 85),
                            // @ts-ignore
                            color: darkenColor(row.demandColor, 40),
                            border: `1px solid ${darkenColor(
                              // @ts-ignore
                              row.demandColor,
                              40
                            )}`,
                          }}
                          className="twa-td center w-full "
                        >
                          <p
                            className={` mx-auto w-7 h-7 text-black px-2 py-1 text-center`}
                          >
                            {row.demandScore}
                          </p>
                        </div>
                      </td>
                      <td className="px-2" align="center">
                        <div
                          // style={{
                          //   backgroundColor: lightenColor(
                          //     colorIndex[row.opportunityScore],
                          //     85
                          //   ),
                          //   color: darkenColor(
                          //     colorIndex[row.opportunityScore],
                          //     40
                          //   ),
                          //   border: `1px solid ${darkenColor(
                          //     colorIndex[row.opportunityScore],
                          //     40
                          //   )}`,
                          // }}
                          style={{
                            backgroundColor: lightenColor(
                              // @ts-ignore
                              row.opportunityColor,
                              85
                            ),
                            // @ts-ignore
                            color: darkenColor(row.opportunityColor, 40),
                            border: `1px solid ${darkenColor(
                              // @ts-ignore
                              row.opportunityColor,
                              40
                            )}`,
                          }}
                          className="twa-td font-bold w-full what"
                        >
                          <p
                            className={`rounded-full mx-auto w-7 h-7  px-2 py-1 text-center`}
                          >
                            {row.opportunityScore}{" "}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalItems={results?.length || 0}
        />
      </div>
    </div>
  );
}
