import { KeywordsTextFieldCardProps } from "@/lib/models/interfaces/7-backend-keywords";
import { CheckCircle2Icon } from "lucide-react";

import { Fragment } from "react";
import HintWrapper from "@/utils/hint";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PlusCircle, CheckCircle2 } from "lucide-react";

const KeywordsTextFieldCard = ({
  keywords,
  title,
  subTitle,
  addOrRemove,
  optionIndex,
  selectOrRemoveAll,
}: KeywordsTextFieldCardProps) => {
  const { toast } = useToast();

  let isAllSelected = keywords.every((keyword) => keyword.isSelected);
  if (keywords.length === 0) {
    isAllSelected = false;
  }
  return (
    <Fragment>
      {/* <div className={"p-2"}>
                {subTitle}
            </div> */}
      <div
        className="flex flex-col bg-[#f7f6f8] mb-2 md:flex-row  gap-2"
        style={{
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <div
          className="flex flex-row md:flex-col justify-between items-start w-full"
          style={{
            flexBasis: "6%",
          }}
        >
          <div className="">
            <h6 className={`text-black font-extrabold`}>{title}</h6>
          </div>

          <div className="">
            <HintWrapper hint="Copy all keywords to clipboard">
              <div
                className={`cursor-pointer flex justify-between items-center gap-1 text-[#7449fb] text-xs text-start`}
                onClick={() => {
                  navigator.clipboard.writeText(
                    // remove placeholders
                    // keywords
                    //     .filter((k) => k.keyword !== "" && k.keyword !== null && k.keyword !== undefined)
                    //     .join(", ")
                    keywords
                      .filter(
                        (k) =>
                          k.keyword !== "" &&
                          k.keyword !== null &&
                          k.keyword !== undefined
                      )
                      .map((k) => k.keyword)
                      .join("	")
                  );

                  toast({
                    title: "Copied to clipboard",
                    description: "Keywords copied to clipboard",
                  });
                }}
              >
                <h6
                  className={`text-blue-500 mt-4 underline text-xs text-start`}
                >
                  Copy All
                </h6>
              </div>
            </HintWrapper>

            <HintWrapper
              hint={`${
                isAllSelected ? "Deselect All Keywords" : "Select All Keywords"
              }`}
            >
              <div
                className={`cursor-pointer mt-2 flex justify-between items-center gap-1 text-[#7449fb] text-xs text-start`}
                onClick={() => {
                  selectOrRemoveAll(optionIndex);
                }}
              >
                <h6 className={`text-blue-500 underline text-start text-xs`}>
                  {isAllSelected ? "Deselect All" : "Select All"}
                </h6>
              </div>
            </HintWrapper>
          </div>
        </div>
        <Separator orientation="vertical" className="border-gray-400" />
        <div
          className="grid grid-cols-1 md:grid-cols-4 h-full w-full gap-2"
          style={{
            flexBasis: "94%",
          }}
        >
          {keywords.map((keyword, index) => {
            return (
              // <Tooltip title={keyword.keyword.length > 45 ? keyword.keyword : ""} key={index}>
              <div
                key={index}
                className={`bg-white border-solid border-1 border-black border-opacity-50  items-center border-2 border-transparent  cursor-pointer  hover:border-gray-200  transition-all h-full w-full  flex justify-between`}
                onClick={() => {
                  addOrRemove(keyword.keyword, index, optionIndex);
                }}
                style={{
                  borderRadius: "20px",
                  padding: "14px",
                }}
              >
                <h6
                  className={`text-[13px]  `}
                  onClick={() => {
                    addOrRemove(keyword.keyword, index, optionIndex);
                  }}
                  style={{}}
                >
                  {keyword.keyword}
                </h6>
                <div
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                  className="ml-1 text-primary  p-0"
                >
                  {keyword.isSelected ? (
                    <CheckCircle2Icon className="text-primary" />
                  ) : (
                    <PlusCircle
                      style={{
                        color: "#d5c5e4",
                      }}
                    />
                  )}
                </div>
              </div>
              // </Tooltip>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default KeywordsTextFieldCard;
