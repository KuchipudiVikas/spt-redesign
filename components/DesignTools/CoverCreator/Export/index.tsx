import React, { useState, useEffect, useRef, useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import {
  exportCanvasAsImage,
  exportCanvasAsSVG,
  exportCanvasAsPDF,
  TQuality,
  TType,
} from "./renderers";
import * as fabric from "fabric";
import { CustomImage } from "@/components/DesignTools/Canvas/customClasses/image";
import {
  CustomRect,
  CustomPath,
  CustomCircle,
  CustomPolygon,
} from "@/components/DesignTools/Canvas/customClasses/shapes";
import { CustomText } from "@/components/DesignTools/Canvas/customClasses/text";
import { classRegistry } from "fabric";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CloudDownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// import { MdOutlineFileDownload } from "react-icons/md";

classRegistry.setClass(CustomImage, "Image");
classRegistry.setClass(CustomRect, "Rect");
classRegistry.setClass(CustomText, "Textbox");
classRegistry.setClass(CustomText, "textbox");
classRegistry.setClass(CustomPath, "Path");
classRegistry.setClass(CustomPolygon, "Polygon");
classRegistry.setClass(CustomCircle, "Circle");

const ExportPopover = () => {
  const { canvas, showDownloadPopup, setShowDownloadPopup, userID } =
    useContext(CanvasContext) || {};

  const popoverRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState({
    type: "png" as TType,
    quality: "medium" as TQuality,
  });

  const togglePopover = () => {
    setShowDownloadPopup(!showDownloadPopup);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     popoverRef.current &&
  //     !popoverRef.current.contains(event.target as Node)
  //   ) {
  //     setShowDownloadPopup(false);
  //   }
  // };

  // useEffect(() => {
  //   if (showDownloadPopup) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showDownloadPopup]);

  const handleExport = async () => {
    if (canvas) {
      setLoading(true);
      const { type, quality } = selectedOption;

      const clipPath = canvas.clipPath;
      if (!clipPath) {
        setLoading(false);
        return;
      }

      const clipLeft = clipPath.left || 0;
      const clipTop = clipPath.top || 0;
      const clipWidth = clipPath.width || canvas.getWidth();
      const clipHeight = clipPath.height || canvas.getHeight();

      // @ts-ignore
      const tempCanvas = new fabric.Canvas(null, {
        width: clipWidth,
        height: clipHeight,
      });

      const objectsToCopy = canvas.getObjects().filter((obj) => {
        const objLeft = obj.left || 0;
        const objTop = obj.top || 0;
        const objWidth = obj.width * obj.scaleX || 0;
        const objHeight = obj.height * obj.scaleY || 0;

        return (
          objLeft + objWidth > clipLeft &&
          objLeft < clipLeft + clipWidth &&
          objTop + objHeight > clipTop &&
          objTop < clipTop + clipHeight
        );
      });

      const coverTemplateIncluded =
        objectsToCopy.length === 2 &&
        // @ts-ignore
        objectsToCopy[1].object_type === "cover_template";

      for (const obj of objectsToCopy) {
        const clonedObj = await obj.clone();
        if (
          // @ts-ignore
          clonedObj.object_type === "cover_template" &&
          !coverTemplateIncluded
        ) {
          continue;
        }
        clonedObj.set({
          left: (obj.left || 0) - clipLeft,
          top: (obj.top || 0) - clipTop,
        });
        tempCanvas.add(clonedObj);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      tempCanvas.renderAll();

      // Export the temporary canvas
      if (type === "pdf") {
        exportCanvasAsPDF(tempCanvas, quality);
      } else if (type === "svg") {
        exportCanvasAsSVG(tempCanvas);
      } else {
        const res = await exportCanvasAsImage(tempCanvas, quality, type);
      }
      const currentUrl = window.location.href;
      if (userID) {
        if (currentUrl.includes("book-cover-creator")) {
          UpdateToolUsage(userID, "cover-creator");
        } else {
          UpdateToolUsage(userID, "a+-template-creator");
        }
      }

      setLoading(false);
    }
  };

  return (
    <Dialog open={showDownloadPopup} onOpenChange={setShowDownloadPopup}>
      <div className="flex items-center">
        <button
          className="topbar-button"
          onClick={togglePopover}
          style={{ cursor: "pointer" }}
        >
          Download
        </button>
      </div>
      <DialogContent>
        <div className="">
          {showDownloadPopup && (
            <div className="popover rounded-lg px-6 py-3 z-5" ref={popoverRef}>
              <div className="rounded-lg flex flex-col">
                <div className="flex gap-10 ">
                  <div className="flex w-full items-center">
                    <label className=" mr-3 font-medium" htmlFor="">
                      Type:
                    </label>
                    <select
                      className="w-full"
                      value={selectedOption.type}
                      onChange={(e) =>
                        setSelectedOption({
                          ...selectedOption,
                          type: e.target.value as TType,
                        })
                      }
                    >
                      <option value="png">PNG</option>
                      <option value="pdf">PDF</option>
                      {/* <option value="jpg">JPG</option> */}
                      <option value="jpeg">JPEG</option>
                      {/* <option value="webp">WEBP</option>
                <option value="svg">SVG</option>
                <option value="avif">AVIF</option> */}
                    </select>
                  </div>
                  <div className="flex w-full items-center">
                    <label className="mr-3 font-medium" htmlFor="">
                      Quality:
                    </label>
                    <select
                      value={selectedOption.quality}
                      className="w-full"
                      onChange={(e) =>
                        setSelectedOption({
                          ...selectedOption,
                          quality: e.target.value as TQuality,
                        })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very high">Very High</option>
                    </select>
                  </div>
                </div>
                <Button
                  disabled={loading}
                  className=" text-white p-1 flex justify-center rounded-lg mt-4"
                  onClick={() => handleExport()}
                >
                  {loading ? (
                    <div className="loader pt-2" />
                  ) : (
                    <>
                      {`Export ${selectedOption.type.toUpperCase()}`}
                      <CloudDownloadIcon size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportPopover;
