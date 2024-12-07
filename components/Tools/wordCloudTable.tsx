import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "../ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import PaginationComponent from "../RetroVision/Table/Pagination";

interface Data {
  word: string;
  count: number;
}

const isOdd = (ind: number) => {
  return ind % 2 == 0;
};

function createData(word: string, count: number): Data {
  return {
    word,
    count,
  };
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
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: {
  id: keyof Data;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}[] = [
  {
    id: "word",
    numeric: false,
    disablePadding: true,
    label: "Word",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, numColoums } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHeader>
      <TableRow>
        {Array.from({ length: numColoums }).map((_, i) =>
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id + i} // ensure unique key for each cell
              align={"center"}
              className="text-[17px] "
              width={1}
            >
              <div className="flex font-semibold items-center gap-3">
                {headCell.label}
                <div
                  onClick={createSortHandler(headCell.id)}
                  className="cursor-pointer"
                >
                  {orderBy === headCell.id ? (
                    order === "desc" ? (
                      <ArrowDown size={20} />
                    ) : (
                      <ArrowUp size={20} />
                    )
                  ) : null}
                </div>
              </div>
            </TableCell>
          ))
        )}
      </TableRow>
    </TableHeader>
  );
}

export function EnhancedTable({ data }) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("count");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [rows, SetRows] = useState([{}]);

  console.log("rows", rows);

  console.log("results", data);

  const { size, width } = useCustomDeviceSize();

  const numColoums = size == EScreenSize.Mobile ? 1 : 5;
  useEffect(() => {
    let rowsData = Object.entries(data).map(([key, value]) =>
      createData(key, value)
    );
    SetRows(rowsData);
  }, [data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage * numColoums * rowsPerPage > rows.length) return;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage * numColoums - rows.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * (rowsPerPage * numColoums),
        page * (rowsPerPage * numColoums) + rowsPerPage * numColoums
      ),
    [rows, order, orderBy, page, rowsPerPage, numColoums]
  );

  const chunkArray = useCallback(
    (array: any[], chunkSize: number, rowsPerPage) => {
      const flatArray = [].concat(...array);
      const chunks = [];
      for (let i = 0; i < flatArray.length; i += rowsPerPage) {
        chunks.push(flatArray.slice(i, i + rowsPerPage));
      }
      const transposed = chunks[0]?.map((_, i) => chunks.map((row) => row[i]));
      return transposed;
    },
    []
  );

  let chunks = useMemo(
    () => chunkArray(visibleRows, numColoums, rowsPerPage),
    [visibleRows]
  );
  let finalData = [[]];

  finalData = useMemo(() => {
    let data = [];
    if (chunks == undefined) return [];
    for (let i = 0; i < rowsPerPage; i++) {
      data.push(chunks[i] || []);
    }
    return data;
  }, [chunks]);

  return (
    <div className="shadowAround mt-5">
      <div>
        <div>
          <div className="mb-5">
            <Table className="kwt-table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                numColoums={numColoums}
              />
              <TableBody className=" overflow-scroll">
                {finalData.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  let isBgGray = isOdd(index);

                  return (
                    <TableRow
                      // @ts-ignore
                      onClick={(event) => handleClick(event, row.word)}
                      role="checkbox"
                      // className={`${isBgGray ? "bg-gray-200" : ""}`}
                      //   aria-checked={isItemSelected}
                      tabIndex={-1}
                      // @ts-ignore
                      key={row?.id}
                      //   selected={isItemSelected}
                    >
                      {row?.map((item, index) => {
                        return (
                          <>
                            <TableCell
                              id={labelId}
                              scope="row"
                              align="center"
                              width={2}
                            >
                              {item?.word || ""}
                            </TableCell>
                            <TableCell
                              size="small"
                              // className={` ${
                              //   isBgGray ? "bg-gray-200" : ""
                              // } pl-0 md:pr-3`}
                              align="center"
                              width={2}
                            >
                              {item?.count || ""}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <PaginationComponent
            totalItems={rows.length / numColoums}
            page={page + 1}
            setPage={(newPage) => setPage(newPage - 1)}
          />
        </div>
      </div>
    </div>
  );
}
