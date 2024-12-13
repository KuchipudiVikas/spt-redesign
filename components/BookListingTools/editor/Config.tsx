import { Usage } from "@/lib/models/interfaces/authortools";
import HintWrapper from "@/utils/hint";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { keepaDomainMidDict } from "@/constants";
import { SearchIcon } from "lucide-react";
import CustomInput from "../CustomInput";

interface ConfigSectionProps {
  setMid: React.Dispatch<React.SetStateAction<string>>;
  setHostname: React.Dispatch<React.SetStateAction<string>>;
  hostname: string;
  setSearchedText: React.Dispatch<React.SetStateAction<string>>;
  searchedText: string;
  inputRef: React.RefObject<HTMLInputElement>;
  HandleSearch: () => void;
  trimSize: string;
  setTrimSize: React.Dispatch<React.SetStateAction<string>>;
  bookType: string;
  setBookType: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  usage: Usage;
}

const paperbackTrimSizes = [
  '8.5" x 11" (21.59 x 27.94 cm)',
  '8.27" x 11.69" (21 x 29.7 cm)',
  '8.27" x 10.12" (21.0 x 25.7 cm)',
  '8" x 10" (20.32 x 25.4 cm)',
  '7.5" x 9.25" (19.05 x 23.5 cm)',
  '7.44" x 9.69" (18.9 x 24.61 cm)',
  '7.17" x 10.12" (18.2 x 25.7 cm)',
  '7" x 10" (17.78 x 25.4 cm)',
  '6.69" x 9.61" (16.99 x 24.41 cm)',
  '6.14" x 9.21" (15.6 x 23.39 cm)',
  '6" x 9" (15.24 x 22.86 cm)',
  '5.98" x 8.94" (15.2 x 22.7 cm)',
  '5.98" x 8.58" (15.2 x 21.8 cm)',
  '5.83" x 8.27" (14.8 x 21.0 cm)',
  '5.5" x 8.5" (13.97 x 21.59 cm)',
  '5.25" x 8" (13.34 x 20.32 cm)',
  '5.06" x 7.81" (12.85 x 19.84 cm)',
  '5" x 8" (12.7 x 20.32 cm)',
  '5" x 7.4" (12.7 x 18.8 cm)',
  '5.04" x 7.17" (12.8 x 18.2 cm)',
  '4.41" x 6.85" (11.2 x 17.4 cm)',
  '4.13" x 6.81" (10.5 x 17.3 cm)',
  '4.06" x 7.17" (10.3 x 18.2 cm)',
  '8.5" x 8.5" (21.59 x 21.59 cm)',
  '8.25" x 8.25" (20.96 x 20.96 cm)',
  '8.25" x 6" (20.96 x 15.24 cm)',
  '7.17" x 8.11" (18.2 x 20.6 cm)',
];

const KDP_BOOK_TYPES = ["Paperback", "eBook", "Hardcover", "Audiobook"];

export const isPhysicalBook = (bookType: string) => {
  return bookType === "Paperback" || bookType === "Hardcover";
};

const ConfigSection: React.FC<ConfigSectionProps> = ({
  setMid,
  setHostname,
  hostname,
  setSearchedText,
  searchedText,
  inputRef,
  HandleSearch,
  trimSize,
  setTrimSize,
  bookType,
  setBookType,
  page,
  setPage,
  isLoading,
  usage,
}) => {
  return (
    <section className=" flex flex-col justify-center items-center ">
      <div className="config-container">
        <select
          className="md:w-fit w-full"
          required
          onChange={(e: any) => {
            setMid(e.target.value);
            setHostname(e.target.options[e.target.selectedIndex].text);
          }}
        >
          {Object.keys(keepaDomainMidDict).map((key) => (
            <option key={key} value={keepaDomainMidDict[key]}>
              {key.replace("www.", "")}
            </option>
          ))}
        </select>
        {/* mr */}

        <CustomInput
          value={searchedText}
          placeholder="Search Query"
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
          helperText={
            usage ? `${usage.remainingUsage}/${usage.totalUsage}` : ""
          }
          style={{
            width: "220px",
            fontSize: "14px",
          }}
        />
        {/* book type */}
        <select
          className="w-full sp-select"
          value={bookType}
          onChange={(e) => {
            setBookType(e.target.value);
          }}
        >
          {KDP_BOOK_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* trim size */}
        {isPhysicalBook(bookType) && (
          <select
            hidden={!isPhysicalBook(bookType)}
            variant="outlined"
            className="w-full sp-select md:w-40"
            value={trimSize}
            onChange={(e) => {
              setTrimSize(e.target.value);
            }}
            native
          >
            {paperbackTrimSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        )}

        {/* page count */}
        {isPhysicalBook(bookType) && (
          <Input
            label="Page Count"
            type="number"
            className="w-full md:w-24"
            value={page}
            onChange={(e) => {
              setPage(parseInt(e.target.value));
            }}
          />
        )}
        <HintWrapper hint="Get results for the search query">
          <Button
            className=" w-fit search-btn"
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
    </section>
  );
};

export default ConfigSection;
