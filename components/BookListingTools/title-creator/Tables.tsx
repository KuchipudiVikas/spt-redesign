import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import HintWrapper from "@/utils/hint";
import CustomTextArea from "../customTextArea";
import { Label } from "@/components/ui/label";

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
    <div className="overflow-y-auto   md:w-auto mx-auto max-h-[40vh] thin-scrollbar">
      <div>
        <Table aria-label="simple table">
          <TableBody>
            {titles.map((title: string, index: number) => (
              <TableRow className="leading-6" key={index}>
                <TableCell>{title}</TableCell>
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
      }}
      className="h-full"
    >
      <h6 className="text-left  font-bold pb-3">
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
                <TableRow className="leading-6" key={index}>
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

export function TryOutFields() {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const titleLengthLimit = 200;

  const capitalizeText = (text: string): string => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div className="flex w-full p-4 flex-col md:flex-row  border rounded-lg bg-[#f7f6f8]  gap-4 ">
      <div className="flex flex-col items-start w-full ">
        <div className="w-full">
          <Label className="font-bold pl-4 pb-1 ">Enter Title #1</Label>
          <div
            style={{
              borderColor: title2.length > titleLengthLimit ? "red" : "",
              border: "1px solid #e2e8f0",
              background: "white",
              borderRadius: "16px",
            }}
            className="flex justify-between items-center"
          >
            <CustomTextArea
              value={title1}
              rows={4}
              helperText={`${title1.length}/${titleLengthLimit} characters used`}
              onChange={(e) => setTitle1(e.target.value)}
              style={{
                border: "none",
              }}
              containerStyle={{
                border: "none",
                marginTop: "0px",
                marginBottom: "0px",
                height: "100%",
                padding: "2px",
              }}
            />
            <HintWrapper hint="Capitalized Title 1">
              <svg
                onClick={() => setTitle1(capitalizeText(title1))}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                className="cursor-pointer mr-1"
                fill="#000"
              >
                <path d="M440-200v-80h400v80H440Zm160-160v-248l-64 64-56-56 160-160 160 160-56 56-64-64v248h-80Zm-480 0 136-360h64l136 360h-62l-32-92H216l-32 92h-64Zm114-144h108l-52-150h-4l-52 150Z" />
              </svg>
            </HintWrapper>
          </div>
        </div>
      </div>
      <div className="flex w-full  items-center">
        <div className="w-full">
          <Label className="font-bold pl-4 pb-1 ">Enter Title #2</Label>
          <div
            style={{
              borderColor: title2.length > titleLengthLimit ? "red" : "",
              border: "1px solid #e2e8f0",
              background: "white",
              borderRadius: "16px",
            }}
            className="flex justify-between w-full items-center"
          >
            {/* <Textarea
              className="w-full"
              value={title2}
              style={{
                resize: "none",
                border: "none",
              }}
              onChange={(e) => setTitle2(e.target.value)}
            /> */}

            <CustomTextArea
              style={{
                width: "100%",
              }}
              value={title2}
              rows={4}
              helperText={`${title2.length}/${titleLengthLimit} characters used`}
              onChange={(e) => setTitle2(e.target.value)}
              containerStyle={{
                border: "none",
                marginTop: "0px",
                marginBottom: "0px",
                height: "100%",
                padding: "2px",
              }}
            />

            <HintWrapper hint="Capitalized Title 2">
              <svg
                onClick={() => setTitle2(capitalizeText(title2))}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                className="cursor-pointer mr-1"
                fill="#000"
              >
                <path d="M440-200v-80h400v80H440Zm160-160v-248l-64 64-56-56 160-160 160 160-56 56-64-64v248h-80Zm-480 0 136-360h64l136 360h-62l-32-92H216l-32 92h-64Zm114-144h108l-52-150h-4l-52 150Z" />
              </svg>
            </HintWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
