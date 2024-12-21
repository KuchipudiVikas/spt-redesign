import React from "react";
import { Input } from "../ui/input";
import HintWrapper from "@/utils/hint";
import { Button } from "../ui/button";
import { useRef } from "react";
import { domainMidDict } from "@/constants";
import { SearchIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { RotateCw } from "lucide-react";

interface IConfigProps {
  setHostname: (hostname: string) => void;
  hostname: string;
  searchedText: string;
  setSearchedText: (searchedText: string) => void;
  getAndSetResults: () => void;
  filters: string[];
  excludedWordsSentence: string;
  setExcludedWordsSentence: (excludedWordsSentence: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  IsDuplicate: boolean;
  setIsDuplicate: (isDuplicate: boolean) => void;
  loading: boolean;
}

const Config: React.FC<IConfigProps> = ({
  setHostname,
  hostname,
  searchedText,
  setSearchedText,
  getAndSetResults,
  filters,
  excludedWordsSentence,
  setExcludedWordsSentence,
  setFilters,
  IsDuplicate,
  setIsDuplicate,
  loading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        marginTop: "-75px",
        borderRadius: "30px",
      }}
      className=" mt-10 mx-auto  flex-col flex justify-center items-center w-fit"
    >
      {" "}
      <div className="config-container">
        <select
          value={domainMidDict[hostname]}
          className={``}
          onChange={(e) => {
            setHostname(e.target.options[e.target.selectedIndex].text);
          }}
        >
          {Object.keys(domainMidDict).map((key) => {
            return (
              <option value={domainMidDict[key]} key={key}>
                {key}
              </option>
            );
          })}
        </select>
        <Input
          className=" w-[400px]"
          placeholder="Coloring books"
          type="text"
          value={searchedText}
          required
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getAndSetResults();
            }
          }}
        />

        <div className="">
          <HintWrapper hint="Click to get the search results">
            <button
              className="rounded-full search-btn bg-primary text-white p-2"
              onClick={() => {
                if (!searchedText) {
                  alert("Please enter a search term");
                  inputRef?.current?.focus();
                  return;
                } else {
                  getAndSetResults();
                }
              }}
            >
              Search
              {loading ? (
                <RotateCw size={30} className="animate-spin" />
              ) : (
                <SearchIcon size={30} />
              )}
            </button>
          </HintWrapper>
        </div>
      </div>
      <div className="md:flex grid grid-cols-2 mt-7 gap-8">
        <div className="flex items-center flex-row">
          <Switch
            checked={filters.includes("extended")}
            onCheckedChange={(e) => {
              console.log("Extended value change");
              if (filters.includes("extended")) {
                setFilters(filters.filter((f) => f !== "extended"));
              } else {
                setFilters([...filters, "extended"]);
              }
            }}
          />

          <Label className="mx-2">Extended</Label>
        </div>
        <div className="flex items-center flex-row">
          {/* No conjunction words */}

          {/* exclude keyword search term words */}
          <Switch
            checked={filters.includes("exclude_keyword_search_term")}
            // checked={true}
            onCheckedChange={(e) => {
              console.log("filters", filters);

              if (filters.includes("exclude_keyword_search_term")) {
                setFilters(
                  filters.filter((f) => f !== "exclude_keyword_search_term")
                );
                setExcludedWordsSentence("");
                // setData(responseData);
              } else {
                setFilters([...filters, "exclude_keyword_search_term"]);
              }
            }}
          />

          <Label className="mx-2">Exclude Words</Label>

          {/* on enabled exclude_keyword_search_term show the text field */}

          {filters.includes("exclude_keyword_search_term") && (
            <div className="flex justify-center items-center ml-2">
              <Input
                className=" "
                placeholder="coloring books"
                type="text"
                value={excludedWordsSentence}
                onChange={(e) => {
                  setExcludedWordsSentence(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        {/* excluded_words filter switch */}
        <div className="flex flex-row items-center">
          <Switch
            checked={filters.includes("excluded_words")}
            onCheckedChange={(e) => {
              if (filters.includes("excluded_words")) {
                setFilters(filters.filter((f) => f !== "excluded_words"));
              } else {
                setFilters([...filters, "excluded_words"]);
              }
            }}
          />
          <Label className="mx-2">Excluded List</Label>
        </div>

        {/* remove duplicates */}
        <div className="flex items-center flex-row">
          <Switch checked={IsDuplicate} onCheckedChange={setIsDuplicate} />

          <Label className="mx-2">Remove Duplicates</Label>
        </div>
      </div>
    </div>
  );
};

export default Config;
