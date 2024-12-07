import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { useRef } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import {
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignStartHorizontalIcon,
  AlignEndHorizontalIcon,
} from "lucide-react";

interface EffectsProps {
  onClose: () => void;
}

export enum EEffects {
  SHADOW = "Shadow",
  BORDER = "Border",
}

const AlignmentPane = ({ onClose }: EffectsProps) => {
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

  const alignToCenter = () => {
    // @ts-ignore
    const page = canvas?.getObjects().find((obj) => obj.object_type === "page");
    const activeObject = canvas?.getActiveObject();
    if (page && activeObject) {
      const center = page.getCenterPoint();
      activeObject.set({
        left: center.x - activeObject.getScaledWidth() / 2,
        top: center.y - activeObject.getScaledHeight() / 2,
      });
      canvas?.renderAll();
    }
  };

  const alignToLeft = () => {
    // @ts-ignore
    const page = canvas?.getObjects().find((obj) => obj.object_type === "page");
    const activeObject = canvas?.getActiveObject();
    if (page && activeObject) {
      activeObject.set({
        left: page.left,
      });
      canvas?.renderAll();
    }
  };

  const alignToRight = () => {
    // @ts-ignore
    const page = canvas?.getObjects().find((obj) => obj.object_type === "page");
    const activeObject = canvas?.getActiveObject();
    if (page && activeObject) {
      activeObject.set({
        left:
          page.left * page.scaleX +
          page.width * page.scaleX -
          activeObject.width * activeObject.scaleX,
      });
      canvas?.renderAll();
    }
  };

  const alignToTop = () => {
    // @ts-ignore
    const page = canvas?.getObjects().find((obj) => obj.object_type === "page");
    const activeObject = canvas?.getActiveObject();
    if (page && activeObject) {
      activeObject.set({
        top: page.top,
      });
      canvas?.renderAll();
    }
  };

  const alignToBottom = () => {
    // @ts-ignore
    const page = canvas?.getObjects().find((obj) => obj.object_type === "page");
    const activeObject = canvas?.getActiveObject();
    if (page && activeObject) {
      activeObject.set({
        top:
          page.top * page.scaleY +
          page.height * page.scaleY -
          activeObject.height * activeObject.scaleY,
      });
      canvas?.renderAll();
    }
  };

  return (
    <div className="color-picker-popup w-[300px] " ref={popupRef}>
      <h3 className="font-medium text-[18px] ">Align to page</h3>
      <div className="grid p-2 grid-cols-2 mt-3">
        <div className="flex flex-col gap-3">
          <button
            style={{
              fontWeight: "normal",
            }}
            className="flex justify-start gap-2 text-[16px]"
            onClick={alignToLeft}
          >
            <AlignLeftIcon size={20} />
            Left
          </button>
          <button
            style={{
              fontWeight: "normal",
            }}
            className="flex justify-start gap-2 text-[16px]"
            onClick={alignToRight}
          >
            <AlignRightIcon size={20} />
            Right
          </button>
          <button
            style={{
              fontWeight: "normal",
            }}
            className="flex justify-start gap-1 text-[16px]"
            onClick={alignToCenter}
          >
            <AlignCenterIcon size={20} />
            Center
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            style={{
              fontWeight: "normal",
            }}
            className="flex justify-start gap-2 text-[16px]"
            onClick={alignToTop}
          >
            <AlignStartHorizontalIcon size={20} />
            Top
          </button>

          <button
            style={{
              fontWeight: "normal",
            }}
            className="flex justify-start gap-2 text-[16px]"
            onClick={alignToBottom}
          >
            <AlignEndHorizontalIcon size={20} />
            Bottom
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlignmentPane;
