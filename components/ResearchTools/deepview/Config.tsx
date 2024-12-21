import React from "react";
import { useRef } from "react";
import { keepaDomainMidDict } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HintWrapper from "@/utils/hint";
import { CloudDownloadIcon } from "lucide-react";
import { deepViewSampleData } from "@/data/sample/deepView";
import { SearchIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCustomDeviceSize } from "@/utils/useDeviceSize";
function ConfigSection({
  mid,
  setMid,
  searchedText,
  setSearchedText,
  setHostname,
  getResultsHandler,
  downloadCSV,
  isOwner,
  setSampleData,
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section
      style={{
        marginTop: "-40px",
        marginBottom: "50px",
      }}
      className=" flex flex-col justify-center items-center "
    >
      <div className="flex items-center md:gap-2 ">
        <div className="config-container">
          <select
            className={``}
            onChange={(e) => {
              setMid(e.target.value);
              setHostname(e.target.options[e.target.selectedIndex].text);
            }}
          >
            {Object.keys(keepaDomainMidDict).map((key) => {
              return (
                <option value={keepaDomainMidDict[key]} key={key}>
                  {key.replace("www.", "")}
                </option>
              );
            })}
          </select>

          <Input
            type="text"
            className="w-[90vw]  md:flex md:w-[25vw] lg:w-[300px]"
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
          <div className="ml-auto flex gap-2">
            {!isDesktop && (
              <HintWrapper hint="Download results in an excel file">
                <Button
                  variant="outline"
                  className=" py-6 rounded-full px-5 "
                  onClick={() => downloadCSV()}
                >
                  Download <CloudDownloadIcon />
                </Button>
              </HintWrapper>
            )}
            <HintWrapper hint="Get results for the search query">
              <Button
                className="ml-2 p-4 py-6 rounded-full w-fit"
                onClick={() => {
                  if (!searchedText) {
                    inputRef?.current?.focus();
                    alert("Please enter a search query");
                    return;
                  } else {
                    getResultsHandler();
                  }
                }}
              >
                Search
                <SearchIcon
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Button>
            </HintWrapper>
          </div>
        </div>
        <div className="">
          {isDesktop && (
            <HintWrapper hint="Download results in an excel file">
              <Button
                className=" py-6 rounded-full px-5 "
                onClick={() => downloadCSV()}
              >
                Download <CloudDownloadIcon />
              </Button>
            </HintWrapper>
          )}
        </div>
      </div>
      {!isOwner && (
        <div className="flex gap-3 mt-10 text-sm gap-5 flex-col md:flex-row justify-start items-center px-4  ">
          <h6>
            {" "}
            {!isOwner ? "Want to test and preview our tool?" : ""} Here are some
            free ones to check out
          </h6>
          <div className="flex gap-4 flex-row">
            <Button
              className="bg-[#f7f6f8] text-black"
              onClick={() => setSampleData(deepViewSampleData.sample_data1)}
            >
              coloring books
            </Button>
            <Button
              className="bg-[#f7f6f8] text-black"
              onClick={() => setSampleData(deepViewSampleData.sample_data2)}
            >
              puzzle books
            </Button>
            <Button
              className="bg-[#f7f6f8] text-black"
              onClick={() => setSampleData(deepViewSampleData.sample_data3)}
            >
              self publishing simplified
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ConfigSection;
