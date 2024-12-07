import React from "react";
import styles from "./ToolTip.module.css";
import infoIcon from "@/public/assets/logos/info.png"
import { Tooltip } from "flowbite-react";
import Image from "next/image";

const ToolTip = ({ style = {}, type }) => {
  return (
    <Tooltip
      content={<TooltipContent style={style} type={type} />}
      style="light"
      trigger="hover"
    >
      <span className="cursor-pointer"><Image src={infoIcon.src} height={25} width={25} alt="i" className="w-4" /></span>
    </Tooltip>
  );
};

const TooltipContent = ({ style = {}, type }) => {
  const toolTipContent = {
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
  console.log({ style });
  return (
    <div style={style} className=" max-w-[250px]">
      {toolTipContent[type]}
    </div>
  );
};

export default ToolTip;
