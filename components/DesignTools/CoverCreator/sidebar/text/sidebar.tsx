import React from "react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { addText } from "@/components/DesignTools/Canvas/extensions/text";

import { nanoid } from "nanoid";

const TextSideBar = () => {
  const Canvas = useContext(CanvasContext);

  const { canvas } = Canvas || { canvas: null };

  const HandleTextScaling = (text: any) => {
    const scaleX = text.scaleX || 1;
    const scaleY = text.scaleY || 1;

    if (scaleX != scaleY) {
      const newWidth = text.width * scaleX;
      const newHeight = text.height * scaleY;

      text.set({
        width: newWidth,
        height: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
    } else {
      const newFontSize = text.fontSize * Math.min(scaleX, scaleY);
      const newWidth = text.width * scaleX;

      text.set({
        fontSize: newFontSize,
        width: newWidth,
        scaleX: 1,
        scaleY: 1,
      });
    }

    canvas.renderAll();
  };

  async function addTextToCanvas(textType: string) {
    if (!canvas) return;
    // @ts-ignore
    const page = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");
    if (!page) return;

    const center = page.getCenterPoint();

    let textOptions = {
      left: center.x,
      top: center.y,
      width: 100,
      height: 300,
      fontSize: 30,
      fill: "red",
      fontFamily: "Arial",
      uid: nanoid(),
      name: "Text",
      object_type: "text",
    };

    switch (textType) {
      case "Heading1":
        textOptions = { ...textOptions, fontSize: 36, name: "Heading 1" };
        break;
      case "Heading2":
        textOptions = { ...textOptions, fontSize: 30, name: "Heading 2" };
        break;
      case "Heading3":
        textOptions = { ...textOptions, fontSize: 24, name: "Heading 3" };
        break;
      case "Body":
        textOptions = { ...textOptions, fontSize: 18, name: "Body" };
        break;
      default:
        break;
    }

    const text = await addText(canvas, textOptions.name, textOptions);

    // Add scaling event listener to update font size
    text.on("scaling", () => {
      HandleTextScaling(text);
    });

    // Store the text object in the state for later updates
  }

  if (!canvas) return null;

  return (
    <div className="options-pane">
      <h3 className="text-xl mb-2">Text</h3>
      <hr />
      <div className="grid mt-5 gap-2 grid-cols-1">
        <button
          style={{ fontSize: "34px" }}
          className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onClick={() => addTextToCanvas("Heading1")}
        >
          Add Heading 1
        </button>
        <button
          style={{ fontSize: "32px" }}
          className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onClick={() => addTextToCanvas("Heading2")}
        >
          Add Heading 2
        </button>
        <button
          style={{ fontSize: "26px" }}
          className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onClick={() => addTextToCanvas("Heading3")}
        >
          Add Heading 3
        </button>
        <button
          style={{ fontSize: "16px" }}
          className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onClick={() => addTextToCanvas("Body")}
        >
          Normal Text
        </button>
      </div>
    </div>
  );
};

export default TextSideBar;
