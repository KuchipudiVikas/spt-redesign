import React, { useContext, useState } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { nanoid } from "nanoid";
import * as fabric from "fabric";

const TextPanel = () => {
  const { canvas } = useContext(CanvasContext) || {};
  const [fontSize, setFontSize] = useState(30);
  const [text, setText] = useState("");

  const addTextToCanvas = () => {
    if (canvas && text) {
      const textObj = new fabric.Text(text, {
        left: 100,
        top: 100,
        fontSize: fontSize,
        id: nanoid(),
      });
      canvas.add(textObj);
      canvas.renderAll();
      setText(""); // Clear the input field after adding text
    }
  };

  return (
    <div className="text-panel">
      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
        placeholder="Font size"
      />
      <button onClick={addTextToCanvas}>Add Text</button> */}
    </div>
  );
};

export default TextPanel;
