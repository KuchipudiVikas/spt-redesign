import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import infoIcon from "@/public/assets/logos/info.png";

const ToolTip = ({
  style = {},
  type,
}: {
  style?: React.CSSProperties;
  type: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer">
          <Image
            src={infoIcon}
            height={25}
            width={25}
            alt="info-icon"
            className="w-4"
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-[250px]" style={style}>
          <TooltipContentText type={type} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TooltipContentText = ({ type }: { type: string }) => {
  const toolTipContent: Record<string, string> = {
    searchSuggestions:
      "The search suggestions are the keywords that Amazon suggests when you start typing a keyword in the Amazon search bar.",
    searchRank:
      "The search rank is the position of the keyword in the search results. The lower the number, the higher the rank. For example, a rank of 1 means that the keyword is in the first position in the search results.",
    searchVolume:
      "The search volume is the number of times the keyword is searched for in a month.",
    searchResults:
      "The number of search results is the number of product results for the keyword. The lower the number, the less competition there is for the keyword.",
    Demand:
      "The demand is the number of times the keyword is searched for in a month.",
    opportunity:
      "The opportunity is the number of times the keyword is searched for in a month.",
  };

  return <span>{toolTipContent[type]}</span>;
};

export default ToolTip;
