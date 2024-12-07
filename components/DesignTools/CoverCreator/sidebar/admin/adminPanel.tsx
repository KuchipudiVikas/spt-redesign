import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { FaSearch } from "react-icons/fa";
import { CustomImage } from "@/components/Canvas/customClasses/image";
import { nanoid } from "nanoid";
// import Search from "./search";
import Categories from "./category";
import Alert from "@/components/DesignTools/Canvas/alert";

interface CoversPanelProps {
  hasPurchased: boolean;
}

const CoversPanel = ({ hasPurchased }: CoversPanelProps) => {
  const Canvas = useContext(CanvasContext);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const { canvas } = Canvas || { canvas: null };

  const [showAlert, setShowAlert] = useState(false);

  if (!canvas) return null;

  return (
    <>
      {showAlert && (
        <Alert
          message="This is a pro image, please purchase the bundle to use it."
          onClose={() => setShowAlert(false)}
          type="error"
          url="/shop/66bcf76cbddfc3e1dc22a899"
        />
      )}
      <div className="options-pane">
        <h3 className="text-xl mb-2"> Cover Graphics</h3>
        <hr />
        <div className="h-[50px]">
          <div className="text-input-w-icon  mt-3 pb-3 ">
            <FaSearch />
            <input
              type="text"
              className="text-input"
              placeholder="Search book covers"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {query.length > 0 ? (
          <div />
        ) : (
          <Categories hasPurchased={hasPurchased} />
        )}
      </div>
    </>
  );
};

export default CoversPanel;
