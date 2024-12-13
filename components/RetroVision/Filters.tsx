import { useState } from "react";
import { Input } from "../ui/input";
import HintWrapper from "@/utils/hint";
import { Button } from "../ui/button";
import { RotateCcwIcon } from "lucide-react";
import { FilterIcon } from "lucide-react";
import { DownloadCloudIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FiltersComponenetProps {
  setFilteredResults: any;
  results: any;
  recordsPerPage: number;
  isOwner: boolean;
  token: string;
  trackAsin: string;
  domain: string;
  setIsLoading: any;
  setLoadingStatus: any;
  getRankAndSetResults: any;
}

export default function FiltersComponenet({
  setFilteredResults,
  results,
  recordsPerPage,
  isOwner,
  token,
  trackAsin,
  domain,
  setIsLoading,
  setLoadingStatus,
  getRankAndSetResults,
}: FiltersComponenetProps) {
  function countWords(sentence: string) {
    const trimmedSentence = sentence.trim();
    const words = trimmedSentence.split(/\s+/);
    return words.length;
  }

  //filters variables
  const [minWordCount, setMinWordCount] = useState(NaN);
  const [maxWordCount, setMaxWordCount] = useState(NaN);
  const [minSearchRank, setMinSearchRank] = useState(NaN);
  const [maxSearchRank, setMaxSearchRank] = useState(NaN);
  const [minSearchVolume, setMinSearchVolume] = useState(NaN);
  const [maxSearchVolume, setMaxSearchVolume] = useState(NaN);
  const [minSearchResults, setMinSearchResults] = useState(NaN);
  const [maxSearchResults, setMaxSearchResults] = useState(NaN);
  const [minDemand, setMinDemand] = useState(NaN);
  const [maxDemand, setMaxDemand] = useState(NaN);
  const [minOpportunity, setMinOpportunity] = useState(NaN);
  const [maxOpportunity, setMaxOpportunity] = useState(NaN);

  const resetFilters = () => {
    setMinWordCount(NaN);
    setMaxWordCount(NaN);
    setMinSearchRank(NaN);
    setMaxSearchRank(NaN);
    setMinSearchVolume(NaN);
    setMaxSearchVolume(NaN);
    setMinSearchResults(NaN);
    setMaxSearchResults(NaN);
    setMinDemand(NaN);
    setMaxDemand(NaN);
    setMinOpportunity(NaN);
    setMaxOpportunity(NaN);
    // setFilteredResults([]);
    setFilteredResults(undefined);
  };

  const onClickApplyFilter = () => {
    let filteredResultsLocal;
    if (maxWordCount || minWordCount) {
      let maxwordCount = isNaN(maxWordCount) ? 50 : maxWordCount;
      let minwordCount = isNaN(minWordCount) ? 1 : minWordCount;
      // filter results
      filteredResultsLocal = results.filter((result) => {
        if (
          countWords(result.keywordN) >= minwordCount &&
          countWords(result.keywordN) <= maxwordCount
        ) {
          return true;
        }
        return false;
      });
    }

    if (maxSearchRank || minSearchRank) {
      let _maxSearchRank = isNaN(maxSearchRank) ? 9999 : maxSearchRank;
      let _minSearchRank = isNaN(minSearchRank) ? 1 : minSearchRank;

      if (filteredResultsLocal) {
        filteredResultsLocal = filteredResultsLocal.filter((result) => {
          if (result.rank >= _minSearchRank && result.rank <= _maxSearchRank) {
            return true;
          }
          return false;
        });
      } else {
        filteredResultsLocal = results.filter((result) => {
          if (result.rank >= _minSearchRank && result.rank <= _maxSearchRank) {
            return true;
          }
          return false;
        });
      }
    }

    if (maxSearchResults || minSearchResults) {
      let _maxSearchResults = isNaN(maxSearchResults)
        ? 99999
        : maxSearchResults;
      let _minSearchResults = isNaN(minSearchResults) ? 0 : minSearchResults;

      if (filteredResultsLocal) {
        filteredResultsLocal = filteredResultsLocal.filter((result) => {
          if (
            result.searchResultT >= _minSearchResults &&
            result.searchResultT <= _maxSearchResults
          ) {
            return true;
          }
          return false;
        });
      } else {
        filteredResultsLocal = results.filter((result) => {
          if (
            result.searchResultT >= _minSearchResults &&
            result.searchResultT <= _maxSearchResults
          ) {
            return true;
          }
          return false;
        });
      }
    }

    if (maxSearchVolume || minSearchVolume) {
      let _maxSearchVolume = isNaN(maxSearchVolume) ? 9999999 : maxSearchVolume;
      let _minSearchVolume = isNaN(minSearchVolume) ? 0 : minSearchVolume;

      if (filteredResultsLocal) {
        filteredResultsLocal = filteredResultsLocal.filter((result) => {
          if (
            result.searchVolume >= _minSearchVolume &&
            result.searchVolume <= _maxSearchVolume
          ) {
            return true;
          }
          return false;
        });
      } else {
        filteredResultsLocal = results.filter((result) => {
          if (
            result.searchVolume >= _minSearchVolume &&
            result.searchVolume <= _maxSearchVolume
          ) {
            return true;
          }
          return false;
        });
      }
    }

    if (minDemand || maxDemand) {
      let _maxDemand = isNaN(maxDemand) ? 999999 : maxDemand;
      let _minDemand = isNaN(minDemand) ? 0 : minDemand;

      if (filteredResultsLocal) {
        filteredResultsLocal = filteredResultsLocal.filter(
          (result: { demandScore: number }) => {
            if (
              result.demandScore >= _minDemand &&
              result.demandScore <= _maxDemand
            ) {
              return true;
            }
            return false;
          }
        );
      } else {
        filteredResultsLocal = results.filter(
          (result: { demandScore: number }) => {
            if (
              result.demandScore >= _minDemand &&
              result.demandScore <= _maxDemand
            ) {
              return true;
            }
            return false;
          }
        );
      }
    }

    if (minOpportunity || maxOpportunity) {
      let _maxOpportunity = isNaN(maxOpportunity) ? 9999999 : maxOpportunity;
      let _minOpportunity = isNaN(minOpportunity) ? 0 : minOpportunity;

      if (filteredResultsLocal) {
        filteredResultsLocal = filteredResultsLocal.filter((result) => {
          if (
            result.opportunityScore >= _minOpportunity &&
            result.opportunityScore <= _maxOpportunity
          ) {
            return true;
          }
          return false;
        });
      } else {
        filteredResultsLocal = results.filter((result) => {
          if (
            result.opportunityScore >= _minOpportunity &&
            result.opportunityScore <= _maxOpportunity
          ) {
            return true;
          }
          return false;
        });
      }
    }

    if (filteredResultsLocal == undefined) {
      setFilteredResults(undefined);
      return;
    }

    const suggestions = filteredResultsLocal
      .slice(0, recordsPerPage)
      .map((result: { keywordN: any }) => {
        return result.keywordN;
      });
    if (isOwner) {
      getRankAndSetResults({
        token,
        asin: trackAsin,
        domain: domain.replace("www.", ""),
        suggestions,
        prevResults: filteredResultsLocal,
        setResults: setFilteredResults,
        setIsLoading,
        setLoadingStatus,
      });
    } else {
      setFilteredResults(filteredResultsLocal);
    }
  };

  return (
    <Popover>
      {" "}
      {/* desktop */}
      <PopoverTrigger>
        {" "}
        <HintWrapper hint="Download the results as excel file">
          <Button className="ml-2 p-9 py-8 rounded-full" variant={"outline"}>
            Data Filter
            <FilterIcon style={{}} className="" size={20} />
          </Button>
        </HintWrapper>
      </PopoverTrigger>
      <PopoverContent>
        <section className="hidden md:block">
          <div className="flex flex-col">
            <div className="mx-4  grid grid-cols-1  md:grid-cols-1 gap-0">
              <h4 className="font-bold leading-none ">Filters</h4>
              <div>
                <div className="">
                  <h6 className="mt-5 mb-1 text-[14px]">Word Count</h6>
                  <div className="flex gap-3">
                    <MyTextField
                      type="number"
                      onChange={(e) =>
                        setMinWordCount(parseInt(e.target.value))
                      }
                      label="Min"
                      variant="standard"
                      value={minWordCount}
                    />
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMaxWordCount(parseInt(e.target.value));
                      }}
                      label="Max"
                      value={maxWordCount}
                      variant="standard"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="mt-5 mb-1 text-[14px]">Search Results</h6>
                  <div className="flex gap-2">
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMinSearchResults(parseInt(e.target.value));
                      }}
                      label="Min"
                      variant="standard"
                      value={minSearchResults}
                    />
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMaxSearchResults(parseInt(e.target.value));
                      }}
                      label="Max"
                      value={maxSearchResults}
                      variant="standard"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <h6 className="mt-5 mb-1 text-[14px]">Search Rank</h6>
                  <div className="flex gap-2">
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMinSearchRank(parseInt(e.target.value));
                      }}
                      label="Min"
                      value={minSearchRank}
                      variant="standard"
                    />
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMaxSearchRank(parseInt(e.target.value));
                      }}
                      label="Max"
                      value={maxSearchRank}
                      variant="standard"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="mt-5 mb-1 text-[14px]">Search Volume</h6>
                  <div className="flex gap-2">
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMinSearchVolume(parseInt(e.target.value));
                      }}
                      label="Min"
                      value={minSearchVolume}
                    />
                    <MyTextField
                      type="number"
                      onChange={(e) => {
                        setMaxSearchVolume(parseInt(e.target.value));
                      }}
                      label="Max"
                      value={maxSearchVolume}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h6 className="mt-5 mb-1 text-[14px]">Demand</h6>
                  <div className="flex gap-2">
                    <MyTextField
                      type="number"
                      value={minDemand}
                      onChange={(e) => {
                        setMinDemand(parseInt(e.target.value));
                      }}
                      label="Min"
                    />
                    <MyTextField
                      type="number"
                      value={maxDemand}
                      onChange={(e) => {
                        setMaxDemand(parseInt(e.target.value));
                      }}
                      label="Max"
                    />
                  </div>
                </div>

                <div>
                  <h6 className="mt-5 mb-1 text-[14px]">Opportunity</h6>
                  <div className="flex gap-3">
                    <MyTextField
                      type="number"
                      value={minOpportunity}
                      placeholder="Min"
                      onChange={(e) => {
                        setMinOpportunity(parseInt(e.target.value));
                      }}
                      label="Min"
                    />
                    <MyTextField
                      type="number"
                      placeholder="Max"
                      value={
                        Number.isNaN(maxOpportunity) ? NaN : maxOpportunity
                      }
                      onChange={(e) => {
                        setMaxOpportunity(parseInt(e.target.value));
                      }}
                      label="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  h-full items-center  md:justify-center gap-5 mt-6">
              <HintWrapper hint="Apply Filters">
                <Button color={"primary"} onClick={onClickApplyFilter}>
                  Apply <FilterIcon />
                </Button>
              </HintWrapper>
              <HintWrapper hint="Reset Filters">
                <Button
                  variant="outline"
                  color={"primary"}
                  onClick={resetFilters}
                >
                  Reset <RotateCcwIcon />
                </Button>
              </HintWrapper>
            </div>
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}

interface MyTextFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  [key: string]: any;
}

const MyTextField = ({
  value,
  onChange,
  placeholder,
  label,
  ...props
}: MyTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Input
      value={Number.isNaN(value) ? "" : value}
      onChange={onChange}
      placeholder={label}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};
