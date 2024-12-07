import { CanvasContextType } from "@/lib/contexts/canvas";
import { getMetadata } from "./utils/svgDataParser";
import { TMetadata } from "./SvgCoverCreator";

const SNAP_THRESHOLD = 5;

export const handleObjectMoving = async (
  e: any,
  _canvas: CanvasContextType,
  showSnapGuides: boolean
) => {
  const activeObject = e.target;
  if (!activeObject || !_canvas?.canvas) return;

  const shouldSnap = _canvas.isSnappingOn || showSnapGuides;

  if (!shouldSnap) return;
  const objects = _canvas?.canvas.getObjects();
  const page = objects.find((obj: any) => obj.object_type === "page");
  if (!page) return;
  if (!_canvas.isSnappingOn) return;

  const guideImage = objects.find(
    // @ts-ignore
    (obj) => obj.object_type == "cover_template"
  );

  const transformPoint = (x: number, y: number) => {
    // @ts-ignore
    const vpt = _canvas?.canvas.viewportTransform;
    if (!vpt) return { x, y };
    return {
      x: x * vpt[0] + y * vpt[2] + vpt[4],
      y: x * vpt[1] + y * vpt[3] + vpt[5],
    };
  };

  let snapX = null;
  let snapY = null;
  let snapCenterX = null;
  let snapCenterY = null;
  let snapBottomY = null;
  let snap25X = null;
  let snap75X = null;
  let snap25Y = null;
  let snap75Y = null;

  const pageLeft = page.left;
  const pageTop = page.top;
  const pageWidth = page.width * page.scaleX;
  const pageHeight = page.height * page.scaleY;

  const pageRight = page.left + page.width * page.scaleX;
  const pageBottom = page.top + page.height * page.scaleY;

  // @ts-ignore
  const Metadata: TMetadata | null = await getMetadata(
    // @ts-ignore
    guideImage._originalElement.currentSrc
  );

  if (!Metadata) {
    console.log("no metadata");
    return;
  }

  const convertedScale = 0.32;

  const margin = Metadata.margin * convertedScale;

  const topMargin = page.scaleX * margin * _canvas.canvas.getZoom();

  const snapPointsX = [
    pageLeft,
    pageLeft + pageWidth * 0.25,
    pageLeft + pageWidth * 0.5,
    pageLeft + pageWidth * 0.75,
    pageLeft + pageWidth,
  ];
  const snapPointsY = [
    pageTop,
    pageTop + pageHeight * 0.25,
    pageTop + pageHeight * 0.5,
    pageTop + pageHeight * 0.75,
    pageTop + pageHeight,
  ];

  // const snapPointsCoverTemplateX = [
  //   pageLeft + leftMargin,
  //   pageLeft + pageWidth - rightMargin
  // ];

  objects.forEach((obj: any) => {
    if (obj === activeObject || obj.object_type === "page") return;

    const distX = Math.abs(activeObject.left - obj.left);
    const distY = Math.abs(activeObject.top - obj.top);
    const distCenterX = Math.abs(
      activeObject.left +
        (activeObject.width * activeObject.scaleX) / 2 -
        (obj.left + (obj.width * obj.scaleX) / 2)
    );
    const distCenterY = Math.abs(
      activeObject.top +
        (activeObject.height * activeObject.scaleY) / 2 -
        (obj.top + (obj.height * obj.scaleY) / 2)
    );
    const distBottomY = Math.abs(
      activeObject.top +
        activeObject.height * activeObject.scaleY -
        (obj.top + obj.height * obj.scaleY)
    );

    // Check for snapping against existing objects
    if (distX < SNAP_THRESHOLD) {
      snapX = obj.left;
    }
    if (distY < SNAP_THRESHOLD) {
      snapY = obj.top;
    }
    if (distCenterX < SNAP_THRESHOLD) {
      snapCenterX =
        obj.left +
        (obj.width * obj.scaleX) / 2 -
        (activeObject.width * activeObject.scaleX) / 2;
    }
    if (distCenterY < SNAP_THRESHOLD) {
      snapCenterY =
        obj.top +
        (obj.height * obj.scaleY) / 2 -
        (activeObject.height * activeObject.scaleY) / 2;
    }
    if (distBottomY < SNAP_THRESHOLD) {
      snapBottomY =
        obj.top +
        obj.height * obj.scaleY -
        activeObject.height * activeObject.scaleY;
    }
  });

  // Check for snapping against p#4780b2efined snap points (25%, 50%, 75%)
  snapPointsX.forEach((pointX) => {
    const distSnapX = Math.abs(activeObject.left - pointX);
    if (distSnapX < SNAP_THRESHOLD) {
      snapX = pointX;
    }
  });

  snapPointsY.forEach((pointY) => {
    const distSnapY = Math.abs(activeObject.top - pointY);
    if (distSnapY < SNAP_THRESHOLD) {
      snapY = pointY;
    }
  });

  if (snapX !== null) {
    activeObject.left = snapX;
  }
  if (snapY !== null) {
    activeObject.top = snapY;
  }
  if (snapCenterX !== null) {
    activeObject.left = snapCenterX;
  }
  if (snapCenterY !== null) {
    activeObject.top = snapCenterY;
  }
  if (snapBottomY !== null) {
    activeObject.top = snapBottomY;
  }

  const leftMargin = page.scaleX * margin * _canvas.canvas.getZoom();
  const bottomMargin = page.scaleY * margin * _canvas.canvas.getZoom();

  const { x: pageObjLeft, y: pageObjTop } = transformPoint(page.left, page.top);

  // cover snapping points

  const { x: actLeft, y: actTop } = transformPoint(
    activeObject.left,
    activeObject.top
  );

  // left margin
  const leftMarginX = pageObjLeft + leftMargin;
  const leftMarginDistX = Math.abs(actLeft - leftMarginX);

  const k = 0.00001;

  if (leftMarginDistX < SNAP_THRESHOLD) {
    activeObject.left = margin + k;
  }

  // top margin
  const topMarginY = pageObjTop + topMargin;
  const topMarginDistY = Math.abs(actTop - topMarginY);

  if (topMarginDistY < SNAP_THRESHOLD) {
    activeObject.top = margin + k;
  }

  // bottom margin
  const bottomMarginY = pageHeight - bottomMargin;
  const bottomMarginDistY = Math.abs(
    activeObject.top + activeObject.height * activeObject.scaleY - bottomMarginY
  );

  if (bottomMarginDistY < SNAP_THRESHOLD) {
    activeObject.top =
      pageHeight - activeObject.height * activeObject.scaleY - margin - k;
  }

  //  right margin
  const rightMarginX = pageWidth - margin;
  const rightMarginDistX = Math.abs(
    activeObject.left + activeObject.width * activeObject.scaleX - rightMarginX
  );

  if (rightMarginDistX < SNAP_THRESHOLD * 2) {
    activeObject.left =
      pageWidth - activeObject.width * activeObject.scaleX - margin - k;
  }

  // section 1 end
  const sec1end = Metadata.sec1endX * convertedScale;
  const sec1endDistX = Math.abs(
    activeObject.left + activeObject.width * activeObject.scaleX - sec1end
  );
  if (sec1endDistX < SNAP_THRESHOLD) {
    activeObject.left = sec1end - activeObject.width * activeObject.scaleX - k;
  }

  // spine start
  const spineStart =
    (Metadata.spineMargin + Metadata.innerLine1x) * convertedScale;
  const spineStartDistX = Math.abs(
    activeObject.left + activeObject.width * activeObject.scaleX - spineStart
  );
  const spineStartDistX2 = Math.abs(activeObject.left - spineStart + 10);

  if (spineStartDistX < 5) {
    activeObject.left =
      spineStart - activeObject.width * activeObject.scaleX - k;
  }

  if (spineStartDistX2 < 5) {
    activeObject.left = spineStart + k;
  }

  // spine end
  const spineEnd =
    (Metadata.innerLine2x - Metadata.spineMargin) * convertedScale;

  const spineEndDistX = Math.abs(
    activeObject.left + activeObject.width * activeObject.scaleX - spineEnd
  );

  const spineEndDistX2 = Math.abs(activeObject.left - spineEnd + 5);

  if (spineEndDistX < 5) {
    activeObject.left = spineEnd - activeObject.width * activeObject.scaleX - k;
  }

  if (spineEndDistX2 < 5) {
    activeObject.left = spineEnd + k;
  }

  // section 2 start
  const section2start = Metadata.startSec2x * convertedScale;
  const section2startDistX = Math.abs(activeObject.left - section2start);

  if (section2startDistX < SNAP_THRESHOLD) {
    activeObject.left = section2start + k;
  }

  _canvas.canvas.renderAll();
};

export const handleAfterRender = async (
  _canvas: CanvasContextType,
  showSnapGuides: boolean
) => {
  if (!_canvas?.canvas) return;
  const ctx = _canvas?.canvas.getContext();
  if (!ctx) return;

  const shouldSnap = _canvas.isSnappingOn && showSnapGuides;
  if (!shouldSnap) return;

  const activeObject = _canvas?.canvas.getActiveObject();
  if (!activeObject) return;

  const objects = _canvas?.canvas.getObjects();
  const page = objects.find((obj: any) => obj.object_type === "page");
  if (!page) return;
  if (!_canvas.isSnappingOn) return;

  const pageLeft = page.left;
  const pageTop = page.top;
  const pageRight = page.left + page.width * page.scaleX;
  const pageBottom = page.top + page.height * page.scaleY;

  const pageWidth = page.width * page.scaleX;
  const pageHeight = page.height * page.scaleY;

  const snapPointsX = [
    pageLeft,
    pageLeft + pageWidth * 0.25,
    pageLeft + pageWidth * 0.5,
    pageLeft + pageWidth * 0.75,
    pageLeft + pageWidth,
  ];
  const snapPointsY = [
    pageTop,
    pageTop + pageHeight * 0.25,
    pageTop + pageHeight * 0.5,
    pageTop + pageHeight * 0.75,
    pageTop + pageHeight,
  ];

  const transformPoint = (x: number, y: number) => {
    // @ts-ignore
    const vpt = _canvas?.canvas.viewportTransform;
    if (!vpt) return { x, y };
    return {
      x: x * vpt[0] + y * vpt[2] + vpt[4],
      y: x * vpt[1] + y * vpt[3] + vpt[5],
    };
  };

  objects.forEach((obj) => {
    // @ts-ignore
    if (obj === activeObject || obj.object_type === "page") return;

    const distX = Math.abs(activeObject.left - obj.left);
    const distY = Math.abs(activeObject.top - obj.top);
    const distCenterX = Math.abs(
      activeObject.left +
        (activeObject.width * activeObject.scaleX) / 2 -
        (obj.left + (obj.width * obj.scaleX) / 2)
    );
    const distCenterY = Math.abs(
      activeObject.top +
        (activeObject.height * activeObject.scaleY) / 2 -
        (obj.top + (obj.height * obj.scaleY) / 2)
    );
    const distBottomY = Math.abs(
      activeObject.top +
        activeObject.height * activeObject.scaleY -
        (obj.top + obj.height * obj.scaleY)
    );

    if (!_canvas?.canvas) return;

    const { x: objLeft, y: objTop } = transformPoint(obj.left, obj.top);
    const { x: objRight, y: objBottom } = transformPoint(
      obj.left + obj.width * obj.scaleX,
      obj.top + obj.height * obj.scaleY
    );

    if (distX < SNAP_THRESHOLD) {
      const snapX = Math.max(pageLeft, Math.min(pageRight, objLeft));
      ctx.save();
      ctx.strokeStyle = "#4780b2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(snapX, Math.max(pageTop, Math.min(pageBottom, objTop)));
      ctx.lineTo(snapX, Math.max(pageTop, Math.min(pageBottom, objBottom)));
      ctx.stroke();
      ctx.restore();
    }
    if (distY < SNAP_THRESHOLD) {
      const snapY = Math.max(pageTop, Math.min(pageBottom, objTop));
      ctx.save();
      ctx.strokeStyle = "#4780b2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.max(pageLeft, Math.min(pageRight, objLeft)), snapY);
      ctx.lineTo(Math.max(pageLeft, Math.min(pageRight, objRight)), snapY);
      ctx.stroke();
      ctx.restore();
    }
    if (distCenterX < SNAP_THRESHOLD) {
      const { x: centerX } = transformPoint(
        obj.left + (obj.width * obj.scaleX) / 2,
        obj.top
      );
      const snapCenterX = Math.max(pageLeft, Math.min(pageRight, centerX));
      ctx.save();
      ctx.strokeStyle = "#4780b2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(snapCenterX, Math.max(pageTop, Math.min(pageBottom, objTop)));
      ctx.lineTo(
        snapCenterX,
        Math.max(pageTop, Math.min(pageBottom, objBottom))
      );
      ctx.stroke();
      ctx.restore();
    }
    if (distCenterY < SNAP_THRESHOLD) {
      const { y: centerY } = transformPoint(
        obj.left,
        obj.top + (obj.height * obj.scaleY) / 2
      );
      const snapCenterY = Math.max(pageTop, Math.min(pageBottom, centerY));
      ctx.save();
      ctx.strokeStyle = "#4780b2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.max(pageLeft, Math.min(pageRight, objLeft)), snapCenterY);
      ctx.lineTo(
        Math.max(pageLeft, Math.min(pageRight, objRight)),
        snapCenterY
      );
      ctx.stroke();
      ctx.restore();
    }
    if (distBottomY < SNAP_THRESHOLD) {
      const { y: bottomY } = transformPoint(
        obj.left,
        obj.top + obj.height * obj.scaleY
      );
      const snapBottomY = Math.max(pageTop, Math.min(pageBottom, bottomY));
      ctx.save();
      ctx.strokeStyle = "#4780b2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.max(pageLeft, Math.min(pageRight, objLeft)), snapBottomY);
      ctx.lineTo(
        Math.max(pageLeft, Math.min(pageRight, objRight)),
        snapBottomY
      );
      ctx.stroke();
      ctx.restore();
    }
  });

  // cover snapping points

  snapPointsX.forEach((pointX) => {
    const distSnapX = Math.abs(activeObject.left - pointX);
    if (distSnapX < SNAP_THRESHOLD) {
      const { x: snapX } = transformPoint(pointX, pageTop);
      if (snapX >= pageLeft && snapX <= pageRight) {
        ctx.save();
        ctx.strokeStyle = "#4780b2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(snapX, Math.max(pageTop, pageTop));
        ctx.lineTo(snapX, Math.min(pageBottom, pageBottom));
        ctx.stroke();
        ctx.restore();
      }
    }
  });

  snapPointsY.forEach((pointY) => {
    const distSnapY = Math.abs(activeObject.top - pointY);
    if (distSnapY < SNAP_THRESHOLD) {
      const { y: snapY } = transformPoint(pageLeft, pointY);
      if (snapY >= pageTop && snapY <= pageBottom) {
        ctx.save();
        ctx.strokeStyle = "#4780b2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.max(pageLeft, pageLeft), snapY);
        ctx.lineTo(Math.min(pageRight, pageRight), snapY);
        ctx.stroke();
        ctx.restore();
      }
    }
  });
};
