import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IHintWrapperProps {
  hint: string;
  children: React.ReactNode;
  enterDelay?: number;
  leaveDelay?: number;
  style?: React.CSSProperties;
}

const HintWrapper: React.FC<IHintWrapperProps> = ({
  hint,
  children,
  enterDelay = 700,
  leaveDelay = 200,
  style = {},
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent
          style={{
            maxWidth: "300px",
            ...style,
          }}
        >
          <p>{hint}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HintWrapper;
