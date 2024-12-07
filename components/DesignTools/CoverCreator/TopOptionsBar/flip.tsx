import { useEffect, useState, useContext } from "react";
import React from "react";
import { useRef } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FlipHorizontal2Icon, FlipVertical2Icon } from "lucide-react";

interface EffectsProps {
  onClose: () => void;
}

export enum EEffects {
  SHADOW = "Shadow",
  BORDER = "Border",
}

const FlipOptions = ({ onClose }: EffectsProps) => {
  const popupRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<EEffects | null>(null);
  const Canvas = useContext(CanvasContext);
  const { canvas } = Canvas || { canvas: null };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as HTMLElement).contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const flipObjectHorizontally = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.toggle("flipX");
      canvas?.renderAll();
    }
  };

  const flipObjectVertically = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.toggle("flipY");
      canvas?.renderAll();
    }
  };

  return (
    <div className="color-picker-popup w-[200px] " ref={popupRef}>
      <h3 className="font-medium">Flip</h3>
      <div className="w-full mt-4">
        <button
          className="flex gap-4 items-center  hover:font-bold"
          onClick={flipObjectHorizontally}
        >
          <FlipVertical2Icon /> Horizontal
        </button>
        <button
          className="flex gap-4 mt-5 items-center hover:font-bold"
          onClick={flipObjectVertically}
        >
          <FlipVertical2Icon /> Vertical
        </button>
      </div>
    </div>
  );
};

export default FlipOptions;
