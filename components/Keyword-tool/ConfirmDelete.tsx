import React from "react";
import { Input } from "../ui/input";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
} from "../ui/table";
import { RotateCw } from "lucide-react";
import { TrashIcon } from "lucide-react";

interface IConfirmDelete {
  showConfirmModal: boolean;
  setShowConfirmModal: (open: boolean) => void;
  selectedData: any;
  deleteRow: (index: number) => void;
  drButtonLoading: boolean;
  cnfrmIndex: number;
}

const ConfirmDelete: React.FC<IConfirmDelete> = ({
  showConfirmModal,
  setShowConfirmModal,
  selectedData,
  deleteRow,
  drButtonLoading,
  cnfrmIndex,
}) => {
  return (
    <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
      <DialogContent>
        <h6 className="text-[20px] font-bold">Confirm Delete Keywords Data</h6>
        <div className="max-h-[50vh] overflow-auto">
          <Table className="w-full kwt-table ">
            <TableHeader>
              <TableRow className="">
                <TableCell style={{ fontWeight: "700" }}>
                  ASIN: {selectedData.asin}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                //@ts-ignore
                selectedData.keywordsData &&
                  //@ts-ignore
                  selectedData.keywordsData.map((item, index) => {
                    let keyword = item?.tracked_list?.[0]?.keyword;
                    let domain = item?.tracked_list?.[0]?.domain;
                    return (
                      <TableRow className=" hover:bg-gray-200" key={index}>
                        <TableCell
                          onClick={() => {
                            window.open(
                              `https://${domain}/s?k=${keyword
                                ?.split(" ")
                                .join("+")}`,
                              "_blank"
                            );
                          }}
                          className="p-2 m-2  cursor-pointer"
                        >
                          <h6>{keyword}</h6>
                        </TableCell>
                      </TableRow>
                    );
                  })
              }
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center mt-6 5 w-full">
          <Button
            variant={"destructive"}
            className={`flex justify-center  items-center transition-all cursor-pointer rounded-md w-fit md:ml-2 px-2`}
            onClick={() => deleteRow(cnfrmIndex)}
            color="error"
          >
            <span
              className={`transition-all flex items-center gap-3 px-2 ${
                drButtonLoading ? "pr-3 " : ""
              }`}
            >
              {drButtonLoading ? "Deleting..." : "Delete"}
              <TrashIcon />
            </span>
            {drButtonLoading && (
              <div className=" transition-all">
                <RotateCw
                  aria-label="Alternate spinner button example"
                  size="sm"
                  className="animate-spin"
                />
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
