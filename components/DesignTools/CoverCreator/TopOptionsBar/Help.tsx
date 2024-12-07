import React from "react";
import { useState, useRef, useEffect } from "react";
import { BugIcon, ImageIcon } from "lucide-react";
import { LayoutList } from "lucide-react";

const HelpComp = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setShowDownloadPopup(false);
    }
  };

  useEffect(() => {
    if (showDownloadPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadPopup]);
  const togglePopover = () => {
    setShowDownloadPopup(!showDownloadPopup);
  };

  return (
    <div>
      <button
        className="flex items-center"
        onClick={togglePopover}
        style={{ cursor: "pointer" }}
      >
        Help
        {/* <MdOutlineQuestionMark className="ml-1.5 text-[2px]" size={10} /> */}
        {/* <MdQuestionMark
          style={{
            color: "black",
            fontSize: "8px"
            // marginLeft: "1.5px"
          }}
          className="ml-1 "
          size={16}
        /> */}
      </button>
      {showDownloadPopup && (
        <div className="popover rounded-lg z-5" ref={popoverRef}>
          <div className="rounded-lg flex flex-col">
            <button
              onClick={() =>
                window.open(
                  "https://selfpublishingtitans.com/support",
                  "_blank"
                )
              }
              style={{ border: "2px solid #e8e8e0" }}
              className=" px-4 py-3 mx-0.5  hover:bg-gray-100 flex justify-between items-center rounded-md mt-1"
            >
              <span className="text-[14px] ">Report Bug</span>
              <BugIcon className="inline-block ml-3" size={20} />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://selfpublishingtitans.com/support",
                  "_blank"
                )
              }
              style={{ border: "2px solid #e8e8e0" }}
              className=" px-4 py-3 mx-0.5  hover:bg-gray-100 flex justify-between items-center rounded-md mt-1"
            >
              <span className="text-[14px] ">Feature Request</span>
              <LayoutList className="inline-block ml-3" size={20} />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://selfpublishingtitans.com/support",
                  "_blank"
                )
              }
              style={{ border: "2px solid #e8e8e0" }}
              className=" px-4 py-3 mx-0.5  hover:bg-gray-100 flex justify-between items-center rounded-md mt-1"
            >
              <span className="text-[14px] ">Image Requests</span>
              <ImageIcon className="inline-block ml-3" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpComp;
