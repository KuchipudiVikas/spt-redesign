import { useState, useContext, useEffect } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FxItemContainer } from "./Effects";
import { EEffects } from "./Effects";

interface ShadowProps {
  setSelectedItem: (item: EEffects | null) => void;
}

const BorderCustomization = ({ setSelectedItem }: ShadowProps) => {
  const { canvas } = useContext(CanvasContext) || {};
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderStyle, setBorderStyle] = useState("solid");
  const [hasAlreadyBorder, setHasAlreadyBorder] = useState(false);

  useEffect(() => {
    const updateBorderProperties = () => {
      const activeObject = canvas?.getActiveObject();
      if (activeObject) {
        setBorderColor(activeObject.borderColor || "#000000");
        setBorderWidth(activeObject.strokeWidth || 1);
        // @ts-ignore
        setBorderStyle(activeObject.borderStyle || "solid");
      }
    };

    updateBorderProperties();

    canvas?.on("selection:created", updateBorderProperties);
    canvas?.on("selection:updated", updateBorderProperties);

    return () => {
      canvas?.off("selection:created", updateBorderProperties);
      canvas?.off("selection:updated", updateBorderProperties);
    };
  }, [canvas]);

  const applyBorder = () => {
    const activeObject = canvas?.getActiveObject();
    console.log(activeObject);
    if (activeObject) {
      activeObject.set({
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDashArray: borderStyle === "dashed" ? [5, 5] : null,
      });

      // Store custom properties on the Fabric.js object
      activeObject.borderColor = borderColor;
      //   @ts-ignore
      activeObject.borderWidth = borderWidth;
      // @ts-ignore
      activeObject.borderStyle = borderStyle;
      setHasAlreadyBorder(true);

      canvas?.renderAll();
    }
  };

  return (
    <FxItemContainer
      name="Border"
      setSelectedItem={setSelectedItem}
      body={
        <div className="border-customization w-[350px]">
          <div className="flex items-center">
            <label>Border Color:</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </div>
          <div>
            <label>Border Width:</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.25"
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
            />
            <span>{borderWidth}</span>
          </div>
          <div>
            <label>Border Style:</label>
            <select
              value={borderStyle}
              onChange={(e) => setBorderStyle(e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
            </select>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="text-white bg-blue-500 mx-auto p-2 mt-2 rounded-lg"
              onClick={applyBorder}
            >
              Change
            </button>
          </div>
        </div>
      }
    />
  );
};

export default BorderCustomization;
