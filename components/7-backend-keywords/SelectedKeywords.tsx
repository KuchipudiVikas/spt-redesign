import { useMemo } from "react";
// import {openSnackBar} from "@/slices/snackBarSlice";
import { Copy } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import HintWrapper from "@/utils/hint";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";

function KeywordLengthText(keyword: string) {
  const helperText = useMemo(() => {
    // keyword length should be less than 50 ex: 10/50
    return `${keyword?.keyword?.length ?? 0}/50`;
  }, [keyword]);

  console.log("helperText", helperText, "keyword", keyword);

  return <div className="text-[10px]">{helperText}</div>;
}

const SelectedKeywordInput = ({
  selectedKeyword,
  setSelectedKeyword,
  index,
}) => {
  const { toast } = useToast();

  console.log("selectedKeyword", selectedKeyword);

  return (
    <div className="flex w-full">
      {/* use text field */}
      <div className="flex border rounded-full w-full px-2 py-1 items-center">
        <Input
          placeholder={`Keyword Slot #${index}`}
          type="text"
          style={{
            outline: "none",
          }}
          value={selectedKeyword?.keyword ?? ""}
          className="w-full outline-none shadow-none border-none rounded-full h-[50px] "
          onChange={(e) => {
            if (e.target.value.length > 50) {
              toast({
                title: "Limit reached",
                description: "Keyword length should be less than 50 characters",
              });

              return;
            }
            if (e.target.value === "") {
              setSelectedKeyword(null);
              return;
            }
            setSelectedKeyword({
              keyword: e.target.value,
              type: selectedKeyword?.type || "manual",
            });
          }}
          // endAdornment={KeywordLengthText(selectedKeyword?.keyword)}
        />
        <KeywordLengthText keyword={selectedKeyword?.keyword} />
        {selectedKeyword !== "" && (
          <button
            onClick={() => {
              // remove keyword from selected keywords
              setSelectedKeyword("");
            }}
            className="p-0"
          >
            <XIcon size={14} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

const SelectedKeywords = ({
  selectedKeyword1,
  selectedKeyword2,
  selectedKeyword3,
  selectedKeyword4,
  selectedKeyword5,
  selectedKeyword6,
  selectedKeyword7,
  setSelectedKeyword1,
  setSelectedKeyword2,
  setSelectedKeyword3,
  setSelectedKeyword4,
  setSelectedKeyword5,
  setSelectedKeyword6,
  setSelectedKeyword7,
  reset,

  title,
  removeKeyword,
}) => {
  // const dispatch = useDispatch();

  const { toast } = useToast();

  return (
    <Card
      className="sticky   "
      style={{
        top: "63spx",
        zIndex: 10,
        borderRadius: "20px",
      }}
    >
      <CardContent
        className="flex flex-col md:flex-row justify-start gap-2 w-full h-full"
        style={{
          padding: "20px",
        }}
      >
        <div
          className="flex md:flex-col justify-between gap-4 "
          style={{
            flexBasis: "6%",
          }}
        >
          {/* </CardActions> */}

          <div className="flex h-full mr-3 flex-col justify-between">
            <div
              style={{
                fontSize: "18px",
              }}
              className="font-bold"
            >
              Selected Keywords
            </div>

            <HintWrapper hint="Copy all keywords to clipboard">
              <Button
                variant={"ghost"}
                className="p-0 h-fit"
                onClick={() => {
                  navigator.clipboard.writeText(
                    // remove placeholders
                    [
                      selectedKeyword1,
                      selectedKeyword2,
                      selectedKeyword3,
                      selectedKeyword4,
                      selectedKeyword5,
                      selectedKeyword6,
                      selectedKeyword7,
                    ]
                      .map((k) => k?.keyword)
                      .filter((k) => k !== "" && k !== null && k !== undefined)
                      .join("	")
                  );

                  toast({
                    title: "Copied to clipboard",
                    description: "Keywords copied to clipboard",
                  });
                }}
              >
                <h6 className="text-primary">Copy All</h6>
              </Button>
            </HintWrapper>
          </div>
        </div>

        <Separator orientation="vertical" className="border-gray-400" />

        <div
          className="grid grid-cols-1 md:grid-cols-4 w-full gap-2"
          style={{
            flexBasis: "94%",
          }}
        >
          <SelectedKeywordInput
            selectedKeyword={selectedKeyword1}
            setSelectedKeyword={setSelectedKeyword1}
            index={1}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword2}
            setSelectedKeyword={setSelectedKeyword2}
            index={2}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword3}
            setSelectedKeyword={setSelectedKeyword3}
            index={3}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword4}
            setSelectedKeyword={setSelectedKeyword4}
            index={4}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword5}
            setSelectedKeyword={setSelectedKeyword5}
            index={5}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword6}
            setSelectedKeyword={setSelectedKeyword6}
            index={6}
          />

          <SelectedKeywordInput
            selectedKeyword={selectedKeyword7}
            setSelectedKeyword={setSelectedKeyword7}
            index={7}
          />

          <Button
            onClick={() => {
              reset();
            }}
            className="h-full rounded-full"
          >
            Clear Keywords
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedKeywords;
