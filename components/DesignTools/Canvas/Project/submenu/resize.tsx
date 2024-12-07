import { useContext, useState, useRef } from "react";
import { trimSizes, TTrimSize } from "@/data/kdp-helper/kdp-helper";
import { CanvasContext } from "@/lib/contexts/canvas";
import CoverCreator from "@/components/DesignTools/CoverCreator/coverop";
import LoadingBar from "../../LoadingBarCustom";

interface ResizeSubmenuProps {
  onCancel: () => void; // Add onCancel prop
}

const ResizeSubmenu = ({ onCancel }: ResizeSubmenuProps) => {
  const Canvas = useContext(CanvasContext);
  const [trimSize, setTrimSize] = useState<TTrimSize>({
    width: Canvas.ProjectInfo.page_width || 6,
    height: Canvas.ProjectInfo.page_height || 9,
    units: "in",
  });

  const [resizeLoading, setResizeLoading] = useState(false);

  let data, dataUrl;

  async function GetNewCoverTemplateImageSrc() {
    let page_width = 6;
    let page_height = 9;
    let pageCount = 120;
    let CoverData;

    try {
      // @ts-ignore
      CoverData = (await childRef?.current.callLocalFunction()) || [];
      [data, dataUrl, pageCount] = CoverData;
      if (!data || !dataUrl) {
        throw new Error("Invalid data returned from callLocalFunction");
      }
    } catch (error) {
      console.error("Error calling local function:", error, CoverData);
      return;
    }

    // downloadImage(dataUrl, "cover-image.png");

    page_width = data.fullCover.width.inches;
    page_height = data.fullCover.height.inches;
    // console.log("data url is", dataUrl);

    if (!dataUrl) {
      // @ts-ignore
      [data, dataUrl, pageCount] = childRef.current.callLocalFunction();
    }

    return [data, dataUrl, pageCount];
  }

  const [coverType, setCoverType] = useState("paperback");

  const handleResizeApply = async () => {
    setResizeLoading(true);

    // Generate a new template image with new trim size
    const [data, newTemplateSrc, pageCount] =
      await GetNewCoverTemplateImageSrc();

    // Replace the current template image with the new one
    Canvas.canvas?.getObjects().forEach((obj) => {
      // @ts-ignore
      if (obj.object_type === "cover_template" && obj.type === "image") {
        // @ts-ignore
        obj.setSrc(newTemplateSrc, () => {
          Canvas.canvas.renderAll();
        });
      }
    });

    // Update the project's page width and height
    const newPageWidth = data.fullCover.width.inches;
    const newPageHeight = data.fullCover.height.inches;
    const oldPageWidth = trimSize.width;
    const oldPageHeight = trimSize.height;

    // Calculate scale factors
    const scaleX = newPageWidth / oldPageWidth;
    const scaleY = newPageHeight / oldPageHeight;

    // Update project info
    Canvas.setProjectInfo((prev) => ({
      ...prev,
      page_width: newPageWidth,
      page_height: newPageHeight,
      page_count: pageCount,
      template: Canvas.ProjectInfo.template,
    }));

    const selectedPage = Canvas.selectedPage;

    const pageObject = Canvas.canvas?.getObjects().find((obj) => {
      // @ts-ignore
      obj.object_type == "page";
    });

    if (pageObject) {
      pageObject.set({
        width: newPageWidth * 96,
        height: newPageHeight * 96,
      });
    }

    // Scale the canvas and canvas elements to fit the new trim size
    Canvas.canvas?.getObjects().forEach((obj) => {
      // @ts-ignore
      if (obj.object_type === "cover_template") {
        return;
      }
      // @ts-ignore
      if (obj.object_type == "page") {
        obj.scaleX *= scaleX;
        obj.scaleY *= scaleY;
      } else {
        obj.scaleX *= scaleX;
        obj.scaleY *= scaleY;
      }

      obj.left *= scaleX;
      obj.top *= scaleY;
      obj.setCoords();
    });

    // Update the clipping path dimensions
    const clipPath = Canvas.canvas?.clipPath;

    if (clipPath) {
      clipPath.set({
        width: newPageWidth * 96,
        height: newPageHeight * 96,
      });

      // Re-attach the clipping path to the canvas
      Canvas.canvas.clipPath = clipPath;

      // Ensure the clipping path scales with the canvas
      Canvas.canvas.on("object:scaling", function (opt) {
        const obj = opt.target;
        if (obj && obj.clipPath) {
          obj.clipPath.scaleX = obj.scaleX;
          obj.clipPath.scaleY = obj.scaleY;
        }
      });

      // Ensure the canvas re-renders to apply the changes
      Canvas.canvas.requestRenderAll();
    } else {
      console.error("Clip path not found on the canvas.");
    }

    Canvas.canvas?.renderAll();

    setTimeout(() => {
      Canvas.canvas?.renderAll();
    }, 500);

    setResizeLoading(false);
  };

  const childRef = useRef(null);

  if (!Canvas) return null;

  return (
    <>
      <LoadingBar title="Resizing Canvas" isLoading={resizeLoading} />
      <div className="mt-2 resize-submenu">
        <CoverCreator
          // @ts-ignore
          setCoverType={setCoverType}
          isAplus={Canvas.ProjectInfo.template == "a+content"}
          ref={childRef}
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="mt-2 w-full p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleResizeApply}
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default ResizeSubmenu;
