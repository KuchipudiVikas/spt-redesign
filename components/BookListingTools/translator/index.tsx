import { CopyIcon } from "lucide-react";

interface TranslatedTextCompProps {
  text: string;
  height: number;
}

export type TBookData = {
  title: string;
  description: string;
  author: string;
  keywords: string;
  apluscontent: string;
  fromLanguage: string;
  toLanguage: string;
  contributors: string;
};

export type TResponse = {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  apluscontent: string;
  contributors: string;
};

export const initialBookData: TBookData = {
  title: "",
  description: "",
  author: "",
  keywords: "",
  contributors: "",
  apluscontent: "",
  fromLanguage: "English",
  toLanguage: "German",
};

const TranslatedTextComp: React.FC<TranslatedTextCompProps> = ({
  text,
  height,
}) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div
      style={{
        background: "white",
      }}
      className="w-full mt-2 mb-2   border light-border  rounded-md"
    >
      <div
        style={{
          overflowY: "auto",
        }}
        className=" w-full h-full thin-scrollbar  p-2"
      >
        <h6 className="text-[15px]">{text}</h6>
      </div>
      <div className="flex justify-end">
        <CopyIcon
          onClick={handleCopy}
          style={{
            fontSize: "9px",
            width: "16px",
          }}
          className="cursor-pointer "
        />
      </div>
    </div>
  );
};

export default TranslatedTextComp;
