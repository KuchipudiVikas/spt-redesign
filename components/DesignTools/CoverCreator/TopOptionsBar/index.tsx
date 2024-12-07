import Image from "next/image";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import FillPicker from "./FillPicker";
import EffectsPopup from "./Effects";
import ExportPopover from "@/components/DesignTools/CoverCreator/Export";
import ImageCropper from "./imageCrop";
import AlignmentPane from "./Alignment";
import FlipOptions from "./flip";
import ColorWheel from "@/public/images/colorwheel.png";
import ProjectSettings from "@/components/DesignTools/Canvas/Project";
import HelpComp from "./Help";
import SaveIndex from "./save";
import TextOptions from "./text";
import * as fabric from "fabric";

const TopBarOptions = () => {
  const Canvas = useContext(CanvasContext);
  const [selectionType, setSelectionType] = useState<string | null>(null);
  const [hasSelection, setHasSelection] = useState<boolean>(false);

  const [showEffectsPopup, setShowEffectsPopup] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [fillColor, setFillColor] = useState<string>("#000000");

  const { canvas } = Canvas || {
    canvas: null,
  };

  useEffect(() => {
    const handleSelectionCreated = (e: any) => {
      setSelectionType(e.selected[0].type);
      setSelectedObject(e.selected[0]);
      setFillColor(e.selected[0].fill);
      setHasSelection(true);
      if (e.selected[0].type === "textbox") {
      }

      if (e.selected[0].type == null) {
        setSelectionType("background");
      }
    };

    const handleSelectionUpdated = (e: any) => {
      setSelectionType(e.selected[0].type);
      setSelectedObject(e.selected[0]);
      setFillColor(e.selected[0].fill);
    };

    const handleSelectionCleared = () => {
      setSelectionType(null);
      setHasSelection(false);
      setSelectedObject(null);
    };

    if (canvas) {
      canvas.on("selection:created", handleSelectionCreated);
      canvas.on("selection:updated", handleSelectionUpdated);
      canvas.on("selection:cleared", handleSelectionCleared);
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", handleSelectionCreated);
        canvas.off("selection:updated", handleSelectionUpdated);
        canvas.off("selection:cleared", handleSelectionCleared);
      }
    };
  }, [canvas]);

  const updateSelectedShapeBorderRadius = (radius: number) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "rect") {
      activeObject.set({ rx: radius, ry: radius });
      canvas?.requestRenderAll();
    }
  };

  const [showPicker, setShowPicker] = useState(false);
  const toggleColorPicker = () => setShowPicker(!showPicker);

  const [showAlignmentOptions, setShowAlignmentOptions] = useState(false);
  const [showFlipOptions, setShowFlipOptions] = useState(false);

  const [showRemovePopup, setShowRemovePopup] = useState(false);

  const [updatedUrl, setUpdatedUrl] = useState<string | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const applyChanges = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const { left, top, width, height } = activeObject;

      // Create a clipping path with the same dimensions as the active object
      const clipPath = new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: "rgba(0,0,0,0)", // Transparent area
        absolutePositioned: false, // Make the clipping path absolute
      });

      // Create a solid color overlay with the same dimensions as the active object
      const overlay = new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: "red", // Solid color for the clipping area
        selectable: false,
        evented: false,
        absolutePositioned: false, // Make the overlay absolute
      });

      // Group the active object and the overlay
      const group = new fabric.Group([overlay, activeObject], {
        clipPath: clipPath,
        left: left,
        top: top,
      });

      // Replace the active object with the group
      canvas.remove(activeObject);
      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.requestRenderAll();
    }
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "rgba(0,0,0,0.3)",
      width: 100,
      height: 100,
      selectable: true,
    });
    canvas.add(rect);
  };

  return (
    <>
      <div className="top-options-bar font-space">
        <div className=" quick-actions-container">
          <div className="color-picker-container">
            <ProjectSettings />
          </div>
          {/* <button onClick={addRectangle}>Rectangle Tool</button>
          <button onClick={applyChanges}>Apply Changes</button> */}
          {/* <button onClick={() => applyChanges()}>Apply Changes</button> */}
          {selectionType != "image" && (
            <div className="color-picker-container">
              <button
                className="flex items-center"
                onClick={() => toggleColorPicker()}
              >
                <Image
                  src={ColorWheel.src}
                  width={30}
                  height={30}
                  alt="color wheel"
                />
              </button>
              {showPicker && (
                <FillPicker onClose={() => setShowPicker(false)} />
              )}
            </div>
          )}

          {(selectionType === "rect" || selectionType == "circle") &&
            selectedObject.object_type != "crop-rect" && (
              <div className="flex gap-2 items-center">
                <label>Border Radius:</label>
                <input
                  type="number"
                  className="w-[40px] border "
                  onChange={(e) =>
                    updateSelectedShapeBorderRadius(
                      parseInt(e.target.value, 10)
                    )
                  }
                />
              </div>
            )}
          {(selectedObject?.type === "image" ||
            selectedObject?.object_type === "crop-rect") && <ImageCropper />}

          <TextOptions />
        </div>

        <div className="quick-actions-container">
          <div
            style={{ display: hasSelection ? "block" : "none" }}
            className="color-picker-container"
          >
            <button
              onClick={() => setShowAlignmentOptions(!showAlignmentOptions)}
            >
              Align
            </button>
            {showAlignmentOptions && (
              <AlignmentPane onClose={() => setShowAlignmentOptions(false)} />
            )}
          </div>

          <div
            style={{ display: hasSelection ? "block" : "none" }}
            className="color-picker-container"
          >
            <button onClick={() => setShowFlipOptions(!showFlipOptions)}>
              Flip
            </button>
            {showFlipOptions && (
              <FlipOptions onClose={() => setShowFlipOptions(false)} />
            )}
          </div>
          <div
            style={{ display: hasSelection ? "block" : "none" }}
            className="color-picker-container"
          >
            <button onClick={() => setShowEffectsPopup(!showEffectsPopup)}>
              Effects
            </button>
            {showEffectsPopup && (
              <EffectsPopup onClose={() => setShowEffectsPopup(false)} />
            )}
          </div>
          <div className="">
            <button
              onClick={() => Canvas.setIsSnappingOn(!Canvas.isSnappingOn)}
            >
              {Canvas.isSnappingOn ? "Snapping On" : "Snapping Off"}
            </button>
          </div>
          {/* <SaveIndex /> */}
          <ExportPopover />
          <HelpComp />
        </div>
      </div>
    </>
  );
};

export default TopBarOptions;
