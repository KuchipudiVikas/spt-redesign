import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import HintWrapper from "@/utils/hint";
import { keepaDomainMidDict } from "@/constants";
import { StartProductTrackingAPI } from "@/lib/bsr-and-asin/api";
import { CloudDownloadIcon } from "lucide-react";
import { RetroViewSampleData } from "@/data/sample/retroVision";
import { SearchIcon } from "lucide-react";
import { FilterIcon } from "lucide-react";
import FiltersComponenet from "./Filters";

interface ConfigProps {
  trackAsin: string;
  setTrackAsin: (asin: string) => void;
  getResultsHandler: (asin: string, domain: string) => void;
  downloadCSV: () => void;
  setSampleData: (data: any) => void;
  isOwner: boolean;
  token: string;
  domain: string;
  setDomain: (domain: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const Config: React.FC<ConfigProps> = ({
  trackAsin,
  setTrackAsin,
  getResultsHandler,
  downloadCSV,
  setSampleData,
  isOwner,
  token,
  domain,
  setDomain,
  isLoading,
  setIsLoading,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <section
      style={{
        marginTop: "-75px",
        borderRadius: "30px",
      }}
      className=" "
    >
      <div className=" w-fit  mx-auto mb-10 mt-10  ">
        <div className="flex flex-col">
          <div className="flex justify-center items-center">
            <div className="config-container">
              <select
                className=""
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                }}
              >
                {Object.keys(keepaDomainMidDict).map((key) => {
                  return (
                    <option value={key} key={key}>
                      {key.replace("www.", "")}
                    </option>
                  );
                })}
              </select>
              <Input
                type="text"
                value={trackAsin}
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
                onChange={(e) => setTrackAsin(e.target.value.trim())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (trackAsin.length < 4) {
                      alert("Please enter a valid ASIN");
                      return;
                    }
                    setIsLoading(true);
                    // make api call to add asin
                    if (token && trackAsin && domain) {
                      StartProductTrackingAPI({
                        token: token,
                        asins: [trackAsin],
                        domain: domain,
                      })
                        .then((res) => {
                          setIsLoading(false);
                          if (res.status === 200) {
                            setTrackAsin("");
                            location.reload();
                          }
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    } else {
                      alert("Missing required fields");
                      setIsLoading(false);
                    }
                  }
                }}
              />
              <HintWrapper hint="Click to generate the results">
                <Button
                  className="ml-2 rounded-full  p-3"
                  onClick={() => {
                    if (!trackAsin) {
                      inputRef?.current?.focus();
                      alert("Please enter ASIN");
                      return;
                    } else {
                      getResultsHandler(trackAsin, domain);
                    }
                  }}
                >
                  <SearchIcon size={30} />
                </Button>
              </HintWrapper>
            </div>
            <HintWrapper hint="Download the results as excel file">
              <Button
                className="ml-2 p-9 py-8 rounded-full"
                onClick={() => downloadCSV()}
              >
                Downoad
                <CloudDownloadIcon
                  style={{}}
                  onClick={() => downloadCSV()}
                  className=""
                  size={20}
                />
              </Button>
            </HintWrapper>
            <FiltersComponenet />
          </div>
          {true && (
            <div className="flex justify-center font-medium items-center  px-4 mt-8 ">
              <h6>
                {" "}
                {!isOwner ? "Want to test and preview our tool?" : ""} Here are
                some free ones to check out
              </h6>
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setSampleData(RetroViewSampleData.sample_data1)}
              >
                B0C91KFHH7
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setSampleData(RetroViewSampleData.sample_data2)}
              >
                B096TW9C82
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setSampleData(RetroViewSampleData.sample_data3)}
              >
                0593521900
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Config;
