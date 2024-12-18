import React from "react";
import { Separator } from "@/components/ui/separator";

interface IWordCloudProps {
  titles: string[];
}

const WordCloud: React.FC<IWordCloudProps> = ({ titles }) => {
  function countWordFrequency(strings: string[]): Record<string, number> {
    const wordFrequency: Record<string, number> = {};

    strings.forEach((str) => {
      const words = str.toLowerCase().split(/\s+/);

      words.forEach((word) => {
        const cleanWord = word.replace(/[^a-z]/g, "");
        if (cleanWord) {
          wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
        }
      });
    });

    return wordFrequency;
  }

  const wordFrequency = countWordFrequency(titles);
  const wordEntries = Object.entries(wordFrequency);

  wordEntries.sort(([, freqA], [, freqB]) => freqB - freqA);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
      className="overflow-y-auto p-3 min-w-[170px] h-full w-full max-h-[80vh] thin-scrollbar"
    >
      <h6 className="text-left font-bold pb-3">Top Keywords</h6>
      <Separator className="mb-3" />
      <div className="max-h-[400px]">
        {wordEntries.slice(0, 31).map(([word, frequency], index) => (
          <div key={index} className=" my-3 mx-2">
            <h6 className="text-sm ">
              {word} ({frequency})
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordCloud;
