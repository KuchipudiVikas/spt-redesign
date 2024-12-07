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
}

const HintWrapper: React.FC<IHintWrapperProps> = ({
  hint,
  children,
  enterDelay = 700,
  leaveDelay = 200,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hint}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HintWrapper;
