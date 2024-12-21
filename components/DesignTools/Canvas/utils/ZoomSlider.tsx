import { useState, useEffect, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import React from "react";
import UndoRedoComp from "../history";
import More from "./More";

const ZoomSlider = () => {
  const Canvas = useContext(CanvasContext) || { canvas: null };
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (Canvas?.canvas) {
      const canvas = Canvas.canvas;

      const updateZoom = (zoomLevel) => {
        const centerX = canvas.getWidth() / 2;
        const centerY = canvas.getHeight() / 2;

        const clippingPath = canvas.clipPath;

        if (clippingPath) {
          const clipCenterX = clippingPath.left + clippingPath.width / 2;
          const clipCenterY = clippingPath.top + clippingPath.height / 2;

          canvas.setZoom(zoomLevel);

          canvas.setViewportTransform([
            zoomLevel,
            0,
            0,
            zoomLevel,
            centerX - clipCenterX * zoomLevel,
            centerY - clipCenterY * zoomLevel,
          ]);
        } else {
          canvas.setZoom(zoomLevel);

          canvas.setViewportTransform([
            zoomLevel,
            0,
            0,
            zoomLevel,
            centerX - centerX * zoomLevel,
            centerY - centerY * zoomLevel,
          ]);
        }

        canvas.renderAll();
        setZoomLevel(zoomLevel);
      };

      setZoomLevel(canvas.getZoom());

      const handleZoomChange = (e) => {
        const zoomLevel = parseFloat(e.target.value);
        updateZoom(zoomLevel);
      };

      const slider = document.getElementById("zoom-slider");
      slider.addEventListener("input", handleZoomChange);

      return () => {
        slider.removeEventListener("input", handleZoomChange);
      };
    }
  }, [Canvas]);

  return (
    <div className="w-full  flex justify-center">
      <div
        style={{
          position: "absolute",
          bottom: "0",
        }}
        className="p-2  flex bottom-bar px-3 items-center gap-2"
      >
        {/* @ts-ignore */}
        <button
          className=" flex gap-2 items-center"
          // @ts-ignore
          onClick={() => Canvas.RecenterCanvas()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#000000"
          >
            <path d="M440-40v-167l-44 43-56-56 140-140 140 140-56 56-44-43v167h-80ZM220-340l-56-56 43-44H40v-80h167l-43-44 56-56 140 140-140 140Zm520 0L600-480l140-140 56 56-43 44h167v80H753l43 44-56 56Zm-260-80q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0-180L340-740l56-56 44 43v-167h80v167l44-43 56 56-140 140Z" />
          </svg>
          Recenter
        </button>
        zoom:
        <input
          id="zoom-slider"
          type="range"
          min={0.1}
          max={3}
          className="w-full"
          step={0.1}
          value={Canvas?.canvas?.getZoom() || 1}
          defaultValue={Canvas?.canvas?.getZoom() || 1}
        />
        {(zoomLevel * 100).toFixed(0)}%
        <div className="ml-5">
          <UndoRedoComp />
        </div>
        <More />
      </div>
    </div>
  );
};

export default ZoomSlider;
