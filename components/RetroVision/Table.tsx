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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
    <TableHeader className="">
      <TableRow className=" w-full">
        {HeaderRowCells.map((headCell) => {
          return (
            <TableHead className="" key={headCell.id}>
              <div
                style={{
                  padding: "0.5rem",
                }}
                className="flex cursor-pointer justify-center items-center gap-2"
              >
                <div onClick={createSortHandler(headCell.id)}>
                  <h6> {headCell.label}</h6>
                </div>
                {orderBy === headCell.id ? (
                  <span>
                    {order === "desc" ? (
                      <ArrowDownIcon size={16} />
                    ) : (
                      <ArrowUpIcon size={16} />
                    )}
                  </span>
                ) : null}
              </div>
            </TableHead>
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

  return (
    <div style={{ maxWidth: "100vw", width: "100%", overflow: "auto" }}>
      <div>
        <div className="w-full">
          <Table aria-labelledby="">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={results.length}
            />
            <TableBody>
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
                    <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell id={labelId} scope="row" className="px-5">
                        {row.keywordN}
                      </TableCell>
                      <TableCell className="px-5" align="center">
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
                      </TableCell>
                      <TableCell className="px-5" align="center">
                        {numberWithCommas(row.searchVolume)}
                      </TableCell>
                      <TableCell className="px-5" align="center">
                        {numberWithCommas(row.searchResultT)}
                      </TableCell>
                      <TableCell className="px-5" align="center">
                        <p
                          className={`rounded-full mx-auto w-fit text-black px-2 py-1 text-center`}
                          style={{
                            backgroundColor: colorIndex[row.demandScore],
                            borderRadius: "50%",
                          }}
                        >
                          {row.demandScore}
                        </p>
                      </TableCell>
                      <TableCell className="px-5" align="center">
                        <p
                          className={`rounded-full mx-auto w-fit text-black px-2 py-1 text-center`}
                          style={{
                            backgroundColor: colorIndex[row.opportunityScore],
                            borderRadius: "50%",
                          }}
                        >
                          {row.opportunityScore}
                        </p>
                      </TableCell>
                    </TableRow>
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
