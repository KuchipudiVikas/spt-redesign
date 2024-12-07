import { FaSearch } from "react-icons/fa";
import React from "react";

import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { MdSquare } from "react-icons/md";
import { FaStar, FaSquare, FaCircle, FaHeart } from "react-icons/fa6";
import { nanoid } from "nanoid";

const TemplatesPanel = () => {
  const Canvas = useContext(CanvasContext);

  const { canvas } = Canvas || { canvas: null };

  if (!canvas) return null;

  return (
    <div className=" options-pane">
      <h3 className="text-xl mb-2"> Templates</h3>
      <hr className="my-2" />
      <div className="text-input-w-icon ">
        <FaSearch />
        <input
          type="text"
          className="text-input"
          placeholder="search images"
          // onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TemplatesPanel;
