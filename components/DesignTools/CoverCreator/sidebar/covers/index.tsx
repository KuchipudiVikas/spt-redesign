import React, { useEffect, useState } from "react";
import { Eshapes } from "@/lib/models/canvas/shapes";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaSearch } from "react-icons/fa";
import CustomImage from "@/components/DesignTools/Canvas/image";
import { nanoid } from "nanoid";
import Search from "./search";
import Categories from "./category";

interface CoversPanelProps {
  hasPurchased: boolean;
}

const CoversPanel = ({ hasPurchased }: CoversPanelProps) => {
  const Canvas = useContext(CanvasContext);
  const fillColor = "#E6E6FA";
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const { canvas } = Canvas || { canvas: null };

  if (!canvas) return null;

  async function AddImageToTheCanvas(url: string, access: string) {
    setLoading(true);
    if (!canvas) return;

    console.log("Access", access);

    if (access == "paid") {
      console.log("This is a pro image, please purchase the pro version");
      setLoading(false);
      return;
    }

    // Find the background object
    const background = canvas
      .getObjects()
      // @ts-ignore
      .find((obj) => obj.object_type === "page");

    if (!background) {
      console.error("Background not found");
      setLoading(false);
      return;
    }

    try {
      const customImage = await CustomImage.FromURL(url, {
        uid: nanoid(),
        name: "Example Image",
        object_type: "image",
      });

      const scaleX = background.width / customImage.width;
      const scaleY = background.height / customImage.height;
      let scale = Math.min(scaleX, scaleY);

      scale = scale - scale * 0.2;

      customImage.scale(scale);

      const centerX =
        background.left + (background.width - customImage.width * scale) / 2;
      const centerY =
        background.top + (background.height - customImage.height * scale) / 2;
      customImage.set({
        left: centerX,
        top: centerY,
      });

      canvas.add(customImage);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="options-pane">
      <h3 className="text-xl mb-2"> Elements</h3>
      <hr />

      <div className="text-input-w-icon  mt-3 ">
        <FaSearch />
        <input
          type="text"
          className="text-input"
          placeholder="search elements"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {query.length > 0 ? (
        // @ts-ignore
        <Search query={query} AddImageToTheCanvas={AddImageToTheCanvas} />
      ) : (
        // @ts-ignore
        <Categories AddImageToTheCanvas={AddImageToTheCanvas} />
      )}
    </div>
  );
};

export default CoversPanel;
