import React, { useEffect, useState } from "react";
import { Eshapes } from "@/lib/models/canvas/shapes";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaShapes } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import { FaStar, FaSquare, FaCircle, FaHeart } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {
  addRect,
  addCircle,
  addHexagon,
  addHeart,
  addStar,
} from "@/components/DesignTools/Canvas/extensions/shapes";
import { nanoid } from "nanoid";
import Search from "./search";
import Categories from "./category";

interface ShapesPanelProps {
  hasPurchased: boolean;
}

const ShapesPanel = ({ hasPurchased }: ShapesPanelProps) => {
  const Canvas = useContext(CanvasContext);
  const fillColor = "#E6E6FA";
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const { canvas } = Canvas || { canvas: null };

  const [activeTab, setActiveTab] = useState("images");

  if (!canvas) return null;

  const addRectangle = () => {
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

    if (background) {
      const centerX = background.left + background.width / 2;
      const centerY = background.top + background.height / 2;

      const size = background.width / 6;

      addRect(canvas, {
        left: centerX - 10,
        top: centerY - 10,
        fill: fillColor,
        width: size,
        height: size,
        uid: nanoid(),
        name: "rect shape",
        object_type: "shape",
      });
    }
  };

  const addCircleShape = () => {
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");
    console.log("background", background);

    if (background) {
      const centerX = background.left + background.width / 2;
      const centerY = background.top + background.height / 2;

      const size = background.width / 6;

      addCircle(canvas, {
        left: centerX,
        top: centerY,
        fill: fillColor,
        radius: size,
        uid: nanoid(),
        name: "circle shape",
        object_type: "shape",
      });
    }
  };

  const addHexagonShape = () => {
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");
    console.log("background", background);

    if (background) {
      const centerY = background.top + background.height / 2;
      const centerX = background.left + background.width / 2;

      const size = background.width / 6;

      addHexagon(canvas, {
        left: centerX,
        top: centerY,
        uid: nanoid(),
        fill: fillColor,
        name: "hexagon shape",
        object_type: "shape",
      });
    }
  };

  const addHeartShape = () => {
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");
    console.log("background", background);

    if (background) {
      const centerX = background.left + background.width / 2;
      const centerY = background.top + background.height / 2;

      addHeart(canvas, {
        left: centerX,
        top: centerY,
        fill: fillColor,
        stroke: "black",
        strokeWidth: 1,
        uid: nanoid(),
        name: "heart shape",
        object_type: "shape",
        scale: 0.5,
      });
    }
  };

  const addStarShape = () => {
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");
    console.log("background", background);

    if (background) {
      const centerX = background.left + background.width / 2;
      const centerY = background.top + background.height / 2;

      addStar(canvas, {
        left: centerX,
        top: centerY,
        fill: fillColor,
        stroke: "black",
        strokeWidth: 1,
        uid: nanoid(),
        name: "star shape",
        object_type: "shape",
      });
    }
  };

  const handleAddShape = (shape: Eshapes) => {
    switch (shape) {
      case Eshapes.RECTANGLE:
        addRectangle();
        break;
      case Eshapes.CIRCLE:
        addCircleShape();
        break;
      case Eshapes.STAR:
        addStarShape();
        break;
      case Eshapes.HEART:
        addHeartShape();
        break;
      case Eshapes.HEXAGON:
        addHexagonShape();
        break;
      default:
        break;
    }
  };

  return (
    <div className="options-pane">
      <h3 className="text-xl mb-2">Elements</h3>
      <hr />

      <div className="tabs">
        <button
          style={{
            border: "1px solid #f5f5f5",
            padding: "10px 20px",
            borderRadius: "16px",
          }}
          className={`tab font-space p-2 ${
            activeTab === "images" ? "active" : ""
          }`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          style={{
            border: "1px solid #f5f5f5",
            padding: "10px 20px",
            borderRadius: "16px",
          }}
          className={`tab font-space ${activeTab === "shapes" ? "active" : ""}`}
          onClick={() => setActiveTab("shapes")}
        >
          Shapes
        </button>
      </div>

      {activeTab === "images" && (
        <>
          <div className="h-[50px]">
            <div className="text-input-w-icon mt-3">
              <FaSearch />
              <input
                type="text"
                className="text-input"
                placeholder="search elements"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {query.length > 0 ? (
            <Search query={query} hasPurchased={hasPurchased} />
          ) : (
            <Categories hasPurchased={hasPurchased} />
          )}
        </>
      )}

      {activeTab === "shapes" && (
        <div className=" grid mt-4 grid-cols-2 items-start gap-3">
          <button
            style={{
              border: "1px solid #f5f5f5",
            }}
            className="p-2 flex items-center gap-2"
            onClick={() => handleAddShape(Eshapes.CIRCLE)}
          >
            <FaCircle size={35} className="text-[#ccc] " /> Circle
          </button>
          <button
            style={{
              border: "1px solid #f5f5f5",
            }}
            className="p-2 flex items-center gap-2"
            onClick={() => handleAddShape(Eshapes.RECTANGLE)}
          >
            <FaSquare size={35} className="text-[#ccc] " /> Rectangle
          </button>
          <button
            style={{
              border: "1px solid #f5f5f5",
            }}
            className="p-2 flex items-center gap-2"
            onClick={() => handleAddShape(Eshapes.HEXAGON)}
          >
            <FaShapes size={35} className="text-[#ccc] " /> Hexagon
          </button>
          <button
            style={{
              border: "1px solid #f5f5f5",
            }}
            className="p-2 flex items-center gap-2"
            onClick={() => handleAddShape(Eshapes.HEART)}
          >
            <FaHeart size={35} className="text-[#ccc] " /> Heart
          </button>
          <button
            style={{
              border: "1px solid #f5f5f5",
            }}
            className="p-2 flex items-center gap-2"
            onClick={() => handleAddShape(Eshapes.STAR)}
          >
            <FaStar size={35} className="text-[#ccc] " /> Star
          </button>
          {/* Add more shapes as needed */}
        </div>
      )}
    </div>
  );
};

export default ShapesPanel;
