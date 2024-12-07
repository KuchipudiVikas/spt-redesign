import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Table, TableHead, TableRow, TableCell } from "../ui/table";
import { Button } from "../ui/button";

interface IBulk {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  fileName: string;
  data: any;
  getBulkRankings: () => void;
}

const Bulk: React.FC<IBulk> = ({
  openModal,
  setOpenModal,
  fileName,
  data,
  getBulkRankings,
}) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <div>{fileName}</div>
        <div className=" max-h-60 overflow-y-auto">
          <Table className="border w-full">
            <TableHead className=" border-2">
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  className="border p-2   w-40"
                >
                  ASIN
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  className="border p-2"
                >
                  Keywords
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {data.map(
                (
                  row: {
                    asin:
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
                    keywords:
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
                  },
                  rowIndex: React.Key | null | undefined
                ) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="p-2 m-2 border-2 cursor-pointer ">
                      {row.asin}
                    </TableCell>
                    <TableCell className="p-2 m-2 border-2 cursor-pointer ">
                      {row.keywords}
                    </TableCell>
                  </TableRow>
                )
              )}
            </tbody>
          </Table>
        </div>
        <div className="flex justify-center w-full ">
          <Button
            className="py-2 px-4 ml-2 mx-1 text-xxs md:text-sm  font-bold rounded"
            onClick={() => getBulkRankings()}
          >
            Track
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Bulk;
