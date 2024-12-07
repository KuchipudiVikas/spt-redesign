import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Separator } from "@/components/ui/separator";

interface TableProps {
  titles: string[];
  handleCopy: (index: number) => void;
  copiedIndex: number;
}

export const TableComp: React.FC<TableProps> = ({
  titles,
  handleCopy,
  copiedIndex,
}) => {
  return (
    <div className="overflow-y-auto w-[90vw] md:w-auto mx-auto max-h-[40vh] thin-scrollbar">
      <div>
        <Table aria-label="simple table">
          <TableBody>
            {titles.map((title: string, index: number) => (
              <TableRow key={index}>
                <TableCell align="left">{title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const TableComp2 = ({ titles }: { titles: string[] }) => {
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid #ccc",
        padding: "16px",
        background: "#f7f6f8",
      }}
      className=""
    >
      <h6 className="text-left font-bold pb-3">
        Top 100 Competitors on Amazon
      </h6>

      <Separator />
      <div
        style={{
          borderRadius: "10px",
          padding: "15px 0",
        }}
        className="overflow-y-auto max-h-[40vh] mx-auto max-w-[90vw] thin-scrollbar"
      >
        <div>
          <Table aria-label="simple table">
            <TableBody>
              {titles.map((title, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      fontSize: "14px",
                    }}
                    align="left"
                  >
                    {title}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
