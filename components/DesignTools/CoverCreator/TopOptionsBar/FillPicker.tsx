import React, { useState, useContext, useEffect, useRef } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import * as fabric from "fabric";
import CloudPattern from "@/public/assets/patterns/cloud.png";
import ColorTab from "./fill/colorTab";
import GradientTab from "./fill/GradientTab";
import { BlendIcon, WaypointsIcon, PaintBucketIcon } from "lucide-react";
import PatternTab from "./fill/PatternTab";

interface CustomColorPickerProps {
  onClose: () => void;
}

const CustomColorPicker = ({ onClose }: CustomColorPickerProps) => {
  const Canvas = useContext(CanvasContext);
  const [activeTab, setActiveTab] = useState("color");
  const [color, setColor] = useState("#000000");
  const [gradient, setGradient] = useState({
    type: "linear",
    color1: "#000000",
    color2: "#ffffff",
    center: 0,
    angle: 180,
  });

  const popupRef = useRef(null);

  const { canvas } = Canvas || {};

  const updateFill = (
    fill: fabric.Gradient<unknown, fabric.GradientType> | fabric.Pattern
  ) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.set({ fill });
      canvas?.renderAll();
    } else {
      const backgroundPage = canvas
        ?.getObjects()
        // @ts-ignore
        .find((obj) => obj.object_type === "page");

      if (backgroundPage) {
        backgroundPage.set("fill", fill);
        canvas?.renderAll();
      }
    }
  };

  const handleGradientChange = () => {
    const activeObject = canvas?.getActiveObject();

    const angleInRadians = (gradient.angle * Math.PI) / 180;
    const zoomFactor = 2; // Increase the size of the gradient
    const x1 = 0.5 + zoomFactor * 0.5 * Math.cos(angleInRadians);
    const y1 = 0.5 + zoomFactor * 0.5 * Math.sin(angleInRadians);
    const x2 = 0.5 - zoomFactor * 0.5 * Math.cos(angleInRadians);
    const y2 = 0.5 - zoomFactor * 0.5 * Math.sin(angleInRadians);

    const colorStops = [
      { offset: 0, color: gradient.color1 },
      { offset: gradient.center, color: gradient.color2 },
      { offset: 1, color: gradient.color1 },
    ];

    const gradientFill = new fabric.Gradient({
      // @ts-ignore
      type: gradient.type,
      gradientUnits: "percentage",
      coords:
        gradient.type === "linear"
          ? { x1, y1, x2, y2 }
          : {
              x1: 0.5,
              y1: 0.5,
              r1: 0,
              x2: 0.5,
              y2: 0.5,
              r2: 0.5 * zoomFactor,
            },
      colorStops,
    });

    if (activeObject) {
      activeObject.set("fill", gradientFill);
      canvas?.renderAll();
    } else {
      updateFill(gradientFill);
    }
  };

  useEffect(() => {
    if (activeTab === "gradient") {
      handleGradientChange();
    }
  }, [gradient]);

  useEffect(() => {
    const activeObject = canvas?.getActiveObject();

    if (activeObject) {
      if (activeTab === "color") {
        // @ts-ignore
        setColor(activeObject.fill);
      }

      if (activeTab === "gradient") {
        const fill = activeObject.fill;
        // @ts-ignore

        if (fill && (fill.type === "linear" || fill.type === "radial")) {
          const gradient = {
            // @ts-ignore
            type: fill.type,
            // @ts-ignore
            angle: fill.angle || 0,
            // @ts-ignore
            color1: fill.colorStops[0].color,
            // @ts-ignore
            color2: fill.colorStops[fill.colorStops.length - 2].color,
            // @ts-ignore
            center:
              // @ts-ignore
              fill.colorStops.length > 2 ? fill.colorStops[1].offset : 0.5,
          };
          setGradient(gradient);
        }
      }
    }
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      // @ts-ignore
      if (popupRef.current && !popupRef.current.contains(event.target)) {
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
      <div className="tabs">
        <button
          className={`${activeTab == "color" ? "active" : ""}`}
          onClick={() => setActiveTab("color")}
        >
          <PaintBucketIcon /> Color
        </button>
        <button
          className={`${activeTab == "gradient" ? "active" : ""}`}
          onClick={() => setActiveTab("gradient")}
        >
          <BlendIcon /> Gradient
        </button>
        <button
          className={`${activeTab == "pattern" ? "active" : ""}`}
          onClick={() => setActiveTab("pattern")}
        >
          <WaypointsIcon /> Pattern
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "color" && (
          // @ts-ignore
          <ColorTab color={color} setColor={setColor} updateFill={updateFill} />
        )}
        {activeTab === "gradient" && (
          <GradientTab
            gradient={gradient}
            setGradient={setGradient}
            handleGradientChange={handleGradientChange}
          />
        )}
        {activeTab === "pattern" && <PatternTab updateFill={updateFill} />}
      </div>
    </div>
  );
};

export default CustomColorPicker;
