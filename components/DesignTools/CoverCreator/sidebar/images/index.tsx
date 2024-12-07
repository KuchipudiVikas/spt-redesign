import React, { useEffect, useState } from "react";
import ExternalImagesTab from "./externalImages";
import LocalImages from "./localImages";
import AiImages from "./AiImages";

const ImagesPanel = () => {
  type TTab = "external" | "local" | "ai";
  const [imageTab, setImagesTab] = useState<TTab>("external");

  return (
    <div>
      <div className="options-pane">
        <h1 className="text-xl  ">Stock Images</h1>
        <hr className="my-3" />

        <div className="">
          {imageTab === "external" ? (
            <ExternalImagesTab />
          ) : imageTab === "local" ? (
            <LocalImages />
          ) : (
            <AiImages />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesPanel;

// <div className="mt-3">
//   <div className="flex gap-2 justify-between">
//     <button
//       className={`tab-item w-full text-[14px] flex items-center justify-center font-medium   ${
//         imageTab == "external" ? "active" : ""
//       }`}
//       onClick={() => setImagesTab("external")}>
//       External
//     </button>
//     {/* <button
//       className={`tab-item w-full text-[14px] flex items-center justify-center font-medium  ${
//         imageTab == "local" ? "active" : ""
//       }`}
//       onClick={() => setImagesTab("local")}>
//       Local
//     </button> */}
//   </div>
// </div>;
