import React, { useEffect, useState, useContext } from "react";
import * as fabric from "fabric";
import { CanvasContext } from "@/lib/contexts/canvas";
import { MdCropFree } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { addRect } from "@/components/DesignTools/Canvas/extensions/shapes";
import CustomImage from "../../Canvas/image";
import { nanoid } from "nanoid";

const ImageCropper: React.FC = () => {
  const [image, setImage] = useState<fabric.Image | null>(null);
  const [cropRect, setCropRect] = useState<fabric.Rect | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const { canvas } = useContext(CanvasContext) || {};

  useEffect(() => {
    if (canvas) {
      const handleSelection = (e: any) => {
        if (isCropping && e.target !== cropRect) {
          cancelCrop();
        }
      };

      const handleSelectionCleared = () => {
        if (isCropping) {
          cancelCrop();
        }
      };

      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelectionCleared);

      return () => {
        canvas.off("selection:created", handleSelection);
        canvas.off("selection:updated", handleSelection);
        canvas.off("selection:cleared", handleSelectionCleared);
      };
    }
  }, [canvas, isCropping, cropRect]);

  const activateCrop = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "image") {
      setImage(activeObject as fabric.Image);

      if (canvas) {
        const rect = addRect(canvas, {
          left: activeObject.left,
          top: activeObject.top,
          width: activeObject.width * activeObject.scaleX,
          height: activeObject.height * activeObject.scaleY,
          fill: "rgba(0,0,0,0.3)",
          stroke: "red",
          strokeWidth: 2,
          selectable: true,
          lockRotation: true,
          object_type: "crop-rect",
          name: "crop-rect",
          uid: "crop-rect",
          angle: activeObject.angle,
        });

        canvas.setActiveObject(rect);
        // @ts-ignore
        setCropRect(rect);
        setIsCropping(true);
      }
    }
  };

  const GetRectangeRotatedCoords = (rect: fabric.Rect) => {
    const { left, top, width, height } = rect.getBoundingRect();
    const angle = rect.angle || 0;

    const points = [
      [left, top],
      [left + width * rect.scaleX, top],
      [left + width * rect.scaleX, top + height * rect.scaleY],
      [left, top + height * rect.scaleY],
    ];

    const angleRad = fabric.util.degreesToRadians(angle);

    const center = rect.getCenterPoint();
    const rotatedPoints = points.map(([x, y]) => {
      const x1 =
        center.x +
        (x - center.x) * Math.cos(angleRad) -
        (y - center.y) * Math.sin(angleRad);
      const y1 =
        center.y +
        (x - center.x) * Math.sin(angleRad) +
        (y - center.y) * Math.cos(angleRad);
      return [x1, y1];
    });

    return {
      left: Math.min(...rotatedPoints.map((p) => p[0])),
      top: Math.min(...rotatedPoints.map((p) => p[1])),
      width:
        Math.max(...rotatedPoints.map((p) => p[0])) -
        Math.min(...rotatedPoints.map((p) => p[0])),
      height:
        Math.max(...rotatedPoints.map((p) => p[1])) -
        Math.min(...rotatedPoints.map((p) => p[1])),
    };
  };

  const handleCrop = async () => {
    if (image && cropRect) {
      // const { left, top } = GetRectangeRotatedCoords(cropRect);
      const { top, left, width, height } = cropRect.getBoundingRect();
      // console.log("CropRect", { cropRectCoords }, { left, top, width, height });
      const scaleX = image.scaleX || 1;
      const scaleY = image.scaleY || 1;
      const imageCenter = image.getCenterPoint();

      // Calculate the new crop coordinates relative to the current image state
      const cropX = (left - image.left) / scaleX + (image.cropX || 0);
      const cropY = (top - image.top) / scaleY + (image.cropY || 0);
      const cropWidth = width / scaleX;
      const cropHeight = height / scaleY;

      console.log({ cropX, cropY, cropWidth, cropHeight });

      const croppedImgOG = new fabric.Image(image.getElement(), {
        left: left,
        top: top,
        width: cropWidth,
        height: cropHeight,
        cropX: cropX,
        cropY: cropY,
        scaleX: scaleX,
        scaleY: scaleY,
      });

      const croppedImg = await CustomImage.FromURL(croppedImgOG.toDataURL(), {
        left: croppedImgOG.left,
        top: croppedImgOG.top,
        object_type: "image",
        name: "Cropped Image",
        uid: nanoid(),
      });

      canvas?.remove(image);

      const objects = canvas?.getObjects();
      objects?.forEach((obj) => {
        // @ts-ignore
        if (obj.uid === "crop-rect") {
          canvas?.remove(obj);
        }
      });

      setCropRect(null);
      setIsCropping(false);
      canvas?.add(croppedImg);
      // @ts-ignore
      setImage(croppedImg);
      canvas?.renderAll();
    }
  };

  const cancelCrop = () => {
    if (canvas && cropRect) {
      canvas.remove(cropRect);
      setCropRect(null);
      setIsCropping(false);
    }
  };

  return (
    <div className="flex">
      {!isCropping && (
        <button
          className="items-center flex"
          onClick={activateCrop}
          disabled={isCropping}
        >
          <MdCropFree size={18} />
        </button>
      )}
      {isCropping && (
        <div className="flex gap-3 border p-1 items-center rounded-md px-2">
          <span className="">Crop: </span>
          <button
            className="flex items-center"
            onClick={handleCrop}
            disabled={!isCropping}
          >
            <FaCheck size={18} />
          </button>
          <button
            className="items-center flex"
            onClick={cancelCrop}
            disabled={!isCropping}
          >
            <RxCross2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
