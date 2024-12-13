import { Usage } from "@/lib/models/interfaces/authortools";
import { Input } from "@/components/ui/input";
import HintWrapper from "@/utils/hint";
import { Button } from "@/components/ui/button";
import { keepaDomainMidDict } from "@/constants";
import { SearchIcon } from "lucide-react";

interface ConfigSectionProps {
  setMid: React.Dispatch<React.SetStateAction<string>>;
  setHostname: React.Dispatch<React.SetStateAction<string>>;
  setSearchedText: React.Dispatch<React.SetStateAction<string>>;
  searchedText: string;
  inputRef: React.RefObject<HTMLInputElement>;
  HandleSearch: () => void;
  usage: Usage;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  setMid,
  setHostname,
  setSearchedText,
  searchedText,
  inputRef,
  HandleSearch,
  usage,
}) => {
  return (
    <section
      style={{
        marginTop: "-75px",
        marginBottom: "50px",
      }}
      className=" flex flex-col justify-center items-center "
    >
      <div className="">
        <div className="config-container">
          <select
            onChange={(e) => {
              setMid(e.target.value);
              setHostname(e.target.options[e.target.selectedIndex].text);
            }}
          >
            {Object.keys(keepaDomainMidDict).map((key, index) => {
              return (
                <option value={keepaDomainMidDict[key]} key={index}>
                  {key.replace("www.", "")}
                </option>
              );
            })}
          </select>
          <Input
            type="text"
            className="w-[90vw] hidden md:flex md:w-[35vw] lg:w-[450px]"
            placeholder="Search for a product"
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
          <HintWrapper hint="Get results for the search query">
            <Button
              className=" rounded-full py-5  w-fit"
              onClick={() => {
                if (!searchedText) {
                  inputRef?.current?.focus();
                  alert("Please enter a search query");
                  return;
                } else {
                  HandleSearch();
                }
              }}
            >
              <SearchIcon size={24} />
            </Button>
          </HintWrapper>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
};

export default ConfigSection;
