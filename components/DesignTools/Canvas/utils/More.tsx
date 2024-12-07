import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon } from "lucide-react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";

const More = () => {
  const Canvas = useContext(CanvasContext);

  const toggleGuideLines = () => {
    Canvas.setShowGuideLines(!Canvas.showGuideLines);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisIcon />
      </PopoverTrigger>
      <PopoverContent>
        <div className="">
          <div className=" gap-2 font-space flex">
            <ToggleSwitch
              isChecked={Canvas.showGuideLines}
              onToggle={toggleGuideLines}
            />{" "}
            <span>Guide Lines</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default More;

interface IToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
  isChecked,
  onToggle,
}) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider round"></span>
    </label>
  );
};
