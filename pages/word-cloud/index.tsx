import { useState, useEffect, useRef } from "react";
import WordCloud from "react-d3-cloud";
import { EnhancedTable } from "@/components/Tools/wordCloudTable";

import { useCallback } from "react";
import * as XLSX from "xlsx";
import { UpdateUsage as UpdateToolUsage, UpdateUsage } from "@/lib/api/usage";
import MainLayout, { getProfile } from "@/components/Layout";

import { getSession } from "next-auth/react";
import { User } from "@/lib/ts/types/user";
import PageTitle from "@/components/Common/PageTitle";
import { Button } from "@/components/ui/button";
import { ListIcon, UploadIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { Columns3Icon, CloudIcon } from "lucide-react";

export interface WordCloudItem {
  text: string;
  value: number;
}

export interface WordCountData {
  [key: string]: number;
}

type DataRepOrder = "normal" | "reversed";

const symbolsToRemove = [
  "{",
  "}",
  "[",
  "]",
  ",",
  "'",
  '"',
  "(",
  ")",
  ":",
  ";",
  ".",
  "!",
  "-",
  "_",
  "—",
  "–",
  "“",
  "”",
  "‘",
  "’",
  "/",
  ">",
  "<",
  "»",
  "«",
  "=",
  "|",
  "&",
];

const preProcessText = (text: string) => {
  let regex = new RegExp("[" + symbolsToRemove.join("\\") + "]", "g");
  let processedText = text.replace(regex, "");
  return processedText;
};

export const generateWordCloudData = (text: string) => {
  const words = text.split(/\s+/); // Split the text into words

  // Generate an object to store the count of each word
  const countData: WordCountData = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as WordCountData); // Specify an empty object as the initial value

  // Convert the countData object into an array of objects with the desired format
  const data: WordCloudItem[] = Object.keys(countData).map((word) => ({
    text: word,
    // value: Math.floor(Math.random() * 1000) + 1, // Random value between 1 and 1000 (adjust as needed)
    value: countData[word] * 1000,
  }));

  return { data, countData };
};

export interface WordCloudProps {
  wordCloudData: WordCloudItem[];
  wordCountData: WordCountData;
}

export function WordCloudView({
  wordCloudData,
  wordCountData,
}: WordCloudProps) {
  const [order, setOrder] = useState<DataRepOrder>("normal");

  return (
    <div className={"w-full"}>
      <div className="flex justify-center  mt-14 w-full">
        <div className="flex gap-10 br-16">
          <div
            style={{
              padding: "6px",
              borderRadius: "20px",
            }}
            className={` bg-white border rounded-xl  rounded-full mx-0 shadowAround  overflow-y  grid md:grid-cols-2 `}
          >
            <div
              onClick={() => setOrder("normal")}
              className={`${
                order === "normal" ? "bg-[#8257fe] rounded-2xl text-white " : ""
              } text-center cursor-pointer flex items-center gap-2  py-2 px-5
                    `}
            >
              <ListIcon size={16} />
              <h6>Text Count</h6>
            </div>
            <div
              onClick={() => setOrder("reversed")}
              className={`${
                order === "reversed"
                  ? "bg-[#8257fe] rounded-2xl text-white "
                  : ""
              } text-center cursor-pointer flex items-center gap-2 py-2 px-2
                    `}
            >
              <CloudIcon size={16} />

              <h6>Word Cloud</h6>
            </div>
          </div>
        </div>
      </div>
      <ResultStep
        wordCloudData={wordCloudData}
        wordCountData={wordCountData}
        order={order}
      />
    </div>
  );
}

interface AppProps {
  info: User;
}

function App({ info }: AppProps) {
  const [processCompleted, setProcessCompleted] = useState(false);
  const [wordCloudData, setWordCloudData] = useState<WordCloudItem[]>([]);
  const [wordCountData, setWordCountData] = useState<WordCountData>({});
  const [order, setOrder] = useState<DataRepOrder>("normal");

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    let words: string[] = [];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (file.type === "text/plain") {
          const text = e.target.result;
          words = String(text).split(" ");
        } else if (file.type === "text/csv") {
          const text = e.target.result;
          const rows = String(text).split("\n");
          rows.forEach((row) => {
            const cellWords = row.split(",");
            words = words.concat(cellWords);
          });
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          // Handle .xlsx files
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          workbook.SheetNames.forEach((sheetName) => {
            const jsonData = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            );
            jsonData.forEach((row) => {
              Object.values(row).forEach((cell) => {
                const cellWords = String(cell).split(" ");
                words = words.concat(cellWords);
              });
            });
          });
        }
        inputRef.current.value = preProcessText(words.join(" "));
        event.target.value = null;
      };

      if (file.type === "text/plain" || file.type === "text/csv") {
        reader.readAsText(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        reader.readAsArrayBuffer(file);
      }
    }
  };
  const handleGenerateCloud = () => {
    // Process the uploadedText and generate word cloud data and count data
    const text = preProcessText(inputRef.current.value);
    const { data, countData } = generateWordCloudData(text);

    // Update state with the processed data and set processCompleted to true
    setWordCloudData(data);
    setWordCountData(countData);
    // UpdateToolUsage(info._id, "word-cloud-tool");

    UpdateUsage(info._id, "word-cloud-gen");

    setProcessCompleted(true);
  };

  const inputRef = useRef(null);
  const uploadButtonRef = useRef(null);

  return (
    <MainLayout
      meta={{
        title: "Word Cloud Generator",
        description: "Generate a word cloud from text data",
        keywords: "word cloud, text data, word frequency",
      }}
      info={info}
      Title={<PageTitle title="Word Cloud Generator" />}
      Body={
        <div className="comp-container ">
          <div className="flex flex-col items-center justify-center  mt-10">
            <div className="  rounded-lg  w-full">
              <div className="flex flex-row mb-2 items-center justify-between">
                <div></div>
              </div>
              <div className="flex flex-col sp-container p-6 border-2 light-border rounded-3xl">
                <textarea
                  className="border shadowAround  w-full border-gray-300 mx-5 md:mx-0 br-16 w-full  p-3 text-[16px]  rounded-md h-40  resize-none   font-sans focus:outline-none focus:border-blue-500"
                  placeholder="Type or paste your text here or upload a file to generate a word cloud"
                  maxLength={200000}
                  ref={inputRef}
                />
                <label className="flex ml-auto  mt-2 font-sans items-center  ">
                  <Button
                    variant="outline"
                    onClick={() => uploadButtonRef?.current?.click()}
                  >
                    Upload Text file <UploadIcon size={16} />
                  </Button>

                  <input
                    id="file-to-upload"
                    type="file"
                    accept=".xlsx,.csv,.txt"
                    className="hidden"
                    name="file-to-upload"
                    onChange={handleFileUpload}
                    ref={uploadButtonRef}
                  />
                </label>
                <div className="flex justify-center w-full">
                  <Button
                    size="lg"
                    className="inline-flex text-[20px] items-center justify-center mt-2.5 py-2.5 px-4  rounded-full mx-5 md:mx-0 font-medium text-center"
                    onClick={() => handleGenerateCloud()}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {
            // Display the word cloud and word count data if the processing is completed
            processCompleted && (
              <WordCloudView
                wordCloudData={wordCloudData}
                wordCountData={wordCountData}
              />
            )
          }
        </div>
      }
    />
  );
}

export default App;

function ResultStep({ wordCloudData, wordCountData, order }: any) {
  const [useDoc, setUseDoc] = useState(false);
  useEffect(() => {
    setUseDoc(true);
  }, []);
  wordCloudData.sort((a, b) => b.value - a.value);

  wordCloudData = wordCloudData.slice(0, 101);
  const words = wordCloudData;

  const fontSize = useCallback(
    (word) => {
      const minWordValue = Math.min(...words.map((w) => w.value));
      const maxWordValue = Math.max(...words.map((w) => w.value));

      const minFontSize = 10;
      const maxFontSize = 100;

      return (
        ((word.value - minWordValue) / (maxWordValue - minWordValue)) *
          (maxFontSize - minFontSize) +
        minFontSize
      );
    },
    [words]
  );
  return (
    <div
      className={`mx mx-5 md:mx-0 flex ${
        order == "normal" ? "flex-col-reverse" : "flex-col"
      } gap-10 `}
    >
      <div className="col-span-1 pb-10  flex justify-center  ">
        <div className="shadowAround w-full   ">
          <div className="sp-container p-6 mt-6 border light-border rounded-3xl">
            {useDoc && Object.keys(wordCloudData).length > 0 && (
              <WordCloud
                data={wordCloudData}
                width={500}
                height={400}
                font="Roboto"
                fontSize={fontSize}
                onWordMouseOver={(word, event) => {
                  console.log(word, word.value, event);
                }}
                // fontStyle="italic"
                fontWeight="bold"
                spiral="archimedean"
                rotate={() => 0} // Always return 0
                padding={5}
              />
            )}
          </div>
          {Object.keys(wordCloudData).length === 0 && (
            <div className="flex w-full h-[400px] justify-center items-center  ">
              <h6 className="text-gray-500">No data to display</h6>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 w-full flex justify-center">
        <div className="max-w-full w-full ">
          <EnhancedTable data={wordCountData} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);

  const { query } = context;

  if (session?.token) {
    return getProfile(context, {
      token: session.token,
    });
  }

  return getProfile(context, {
    token: null,
  });
}
