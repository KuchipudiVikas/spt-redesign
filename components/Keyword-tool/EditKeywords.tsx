import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { TrashIcon } from "lucide-react";

interface IEditKeywords {
  isOpenEditModal: boolean;
  setIsOpenEditModal: (open: boolean) => void;
  selectedData: any;
  deleteKeyword: (index: number) => void;
  domain: string;
}

const EditKeywords: React.FC<IEditKeywords> = ({
  isOpenEditModal,
  setIsOpenEditModal,
  selectedData,
  deleteKeyword,
  domain,
}) => {
  return (
    <Dialog open={isOpenEditModal} onOpenChange={setIsOpenEditModal}>
      <DialogContent>
        <h6 className="text-[20px] ml-4 font-bold">Edit Keywords</h6>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          <div>
            <Table className="w-full kwt-table">
              <TableHeader className="">
                <TableRow>
                  <TableCell style={{ fontWeight: "700" }}>Keyword</TableCell>
                  <TableCell style={{ fontWeight: "700" }}>Action</TableCell>
                </TableRow>
              </TableHeader>
              <tbody className="">
                {
                  //@ts-ignore
                  selectedData.keywordsData &&
                    //@ts-ignore
                    selectedData.keywordsData.map((item, index) => {
                      let keyword = item?.tracked_list?.[0]?.keyword;

                      return (
                        <TableRow className="" key={index}>
                          <TableCell
                            onClick={() => {
                              window.open(
                                `https://${domain}/s?k=${keyword
                                  ?.split(" ")
                                  .join("+")}`,
                                "_blank"
                              );
                            }}
                            className="p-1 m-1  cursor-pointer"
                          >
                            <h6>{keyword}</h6>
                          </TableCell>
                          <TableCell
                            className="flex  text-center hover:bg-gray-300 cursor-pointer justify-center p-3"
                            onClick={() => deleteKeyword(index)}
                          >
                            <TrashIcon />
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditKeywords;
