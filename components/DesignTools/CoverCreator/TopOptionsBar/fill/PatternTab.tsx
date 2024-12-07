import React, { useState } from "react";
import Image from "next/image";
import CloudPattern from "@/public/assets/patterns/cloud.png";
import * as fabric from "fabric";

interface PatternTabProps {
  updateFill: (fill: fabric.Pattern) => void;
}

const PatternTab = ({ updateFill }: PatternTabProps) => {
  const [patternUrl, setPatternUrl] = useState(CloudPattern.src);
  const [patternScale, setPatternScale] = useState(1);

  const handlePatternChange = async () => {
    try {
      const img = await fabric.Image.fromURL(patternUrl, {
        crossOrigin: "anonymous"
      });

      const patternFill = new fabric.Pattern({
        source: img.getElement(),
        repeat: "repeat",
        patternTransform: [patternScale / 5, 0, 0, patternScale / 5, 0, 0]
      });

      updateFill(patternFill);
    } catch (error) {
      console.error("Error loading pattern image:", error);
    }
  };

  return (
    <div>
      <div className="flex my-2">
        <select onChange={(e) => setPatternUrl(e.target.value)} name="" id="">
          <option value="/assets/patterns/cloud.png">Cloud</option>
        </select>
        <div>
          <label>
            Scale:
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              className="mt-3"
              value={patternScale}
              onChange={(e) => setPatternScale(Number(e.target.value))}
            />
          </label>
          <span>{patternScale}</span>
        </div>
      </div>
      <Image src={patternUrl} alt="Cloud Pattern" width={100} height={100} />
      <button
        className="border p-2 px-4 rounded-lg mt-3"
        onClick={handlePatternChange}>
        Apply
      </button>
    </div>
  );
};

export default PatternTab;
