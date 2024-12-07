import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { useRef } from "react";
import ShadowComp from "./shadow";
import BorderCustomization from "../border";

interface EffectsProps {
  onClose: () => void;
}

export enum EEffects {
  SHADOW = "Shadow",
  BORDER = "Border",
}

const EffectsPopup = ({ onClose }: EffectsProps) => {
  const popupRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<EEffects | null>(null);

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

  return (
    <div className="color-picker-popup" ref={popupRef}>
      {selectedItem === null ? (
        <div className="w-[220px] flex flex-col gap-2">
          <h3 className="font-medium">Effects</h3>
          <hr
            style={{
              width: "100%",
              border: "1px solid #ccc",
            }}
            className=""
          />
          <span
            onClick={() => setSelectedItem(EEffects.SHADOW)}
            className="flex items-center cursor-pointer justify-between"
          >
            Shadow <ChevronRightIcon className="cursor-pointer" size={13} />
          </span>
          <span
            onClick={() => setSelectedItem(EEffects.BORDER)}
            className="flex items-center cursor-pointer justify-between"
          >
            Border <ChevronLeftIcon className="cursor-pointer" size={13} />
          </span>
        </div>
      ) : selectedItem === EEffects.SHADOW ? (
        <ShadowComp setSelectedItem={setSelectedItem} />
      ) : (
        <BorderCustomization setSelectedItem={setSelectedItem} />
      )}
    </div>
  );
};

export default EffectsPopup;

interface FxItemProps {
  name: string;
  body: React.ReactNode;
  setSelectedItem: (item: EEffects | null) => void;
}

export function FxItemContainer({ name, body, setSelectedItem }: FxItemProps) {
  return (
    <div className="fx-item-container w-[220px] p-1">
      <div className="fx-item flex  items-center  justify-center relative">
        <ChevronLeftIcon
          onClick={() => setSelectedItem(null)}
          size={13}
          className="absolute cursor-pointer  left-0"
        />
        {name}
      </div>
      <hr className="my-2" />
      <div className="fx-item-body">{body}</div>
    </div>
  );
}
