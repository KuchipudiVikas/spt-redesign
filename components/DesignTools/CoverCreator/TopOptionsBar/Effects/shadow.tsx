import { useContext } from "react";
import { EEffects } from ".";
import { CanvasContext } from "@/lib/contexts/canvas";
import { useState, useEffect } from "react";
import { FxItemContainer } from "./index";

interface ShadowProps {
  setSelectedItem: (item: EEffects | null) => void;
}

export default function ShadowComp({ setSelectedItem }: ShadowProps) {
  const { canvas } = useContext(CanvasContext) || {};

  const [offsetX, setOffsetX] = useState(10);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(10);
  const [color, setColor] = useState("rgba(0,0,0,0.6)");
  const [error, setError] = useState<string | null>(null);

  const [hasAlreadyShadow, setHasAlreadyShadow] = useState(false);

  const AddShadowToExistingObject = () => {
    try {
      const activeObject = canvas?.getActiveObject();
      if (activeObject) {
        activeObject.set({
          shadow: {
            color: color,
            blur: blur,
            offsetX: offsetX,
            offsetY: offsetY,
          },
        });
        canvas?.renderAll();
        setHasAlreadyShadow(true);
      } else {
        throw new Error("No active object selected");
      }
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  };

  const RemoveShadowFromExistingObject = () => {
    try {
      const activeObject = canvas?.getActiveObject();
      if (activeObject) {
        activeObject.set({
          shadow: null,
        });
        canvas?.renderAll();
        setHasAlreadyShadow(false);
      } else {
        throw new Error("No active object selected");
      }
    } catch (err) {
      //  @ts-ignore
      setError(err.message);
    }
  };

  useEffect(() => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      const shadow = activeObject.shadow;
      if (shadow) {
        setOffsetX(shadow.offsetX);
        setOffsetY(shadow.offsetY);
        setBlur(shadow.blur);
        setColor(shadow.color);
        setHasAlreadyShadow(true);
      }
    }
  }, [canvas]);

  return (
    <FxItemContainer
      name="Shadow"
      setSelectedItem={setSelectedItem}
      body={
        <div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="flex items-center justify-between">
            <label>Offset: </label>
            <div className="flex mt-2">
              <input
                type="number"
                className="w-[50px] border ml-1 rounded-md p-1"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
              />
              <input
                type="number"
                className="w-[50px] border ml-1 rounded-md p-1"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex mt-3 justify-between">
            <label>Blur:</label>
            <input
              type="number"
              className="border ml-1 rounded-md p-1 w-[50px]"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
            />
          </div>
          <div className="flex mt-3 justify-between">
            <label>Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="mt-4">
            {!hasAlreadyShadow ? (
              <button
                onClick={AddShadowToExistingObject}
                className="w-full border  bg-blue-500 text-white p-1 rounded-lg"
              >
                Add
              </button>
            ) : (
              <div className="flex mt-3 gap-2">
                <button
                  onClick={AddShadowToExistingObject}
                  className="w-full border p-1 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={RemoveShadowFromExistingObject}
                  className="w-full w-full border p-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
