import { CanvasContextType } from "@/lib/contexts/canvas";
import { readTextFromSvgDataUrl, getMetadata } from "./svgDataParser";
import { TMetadata } from "../SvgCoverCreator";
import { ICanvasObject } from "./types";

enum LineType {
  LEFT_MARGIN = "left_margin",
  RIGHT_MARGIN = "right_margin",
  TOP_MARGIN = "top_margin",
  BOTTOM_MARGIN = "bottom_margin",
  SECTION1_END = "section1_end",
  SECTION2_START = "section2_start",
  SPINE_START = "spine_start",
  SPINE_END = "spine_end",
}

export default async function DrawGuidLines(_canvas: CanvasContextType) {
  try {
    // @ts-ignore
    const objects: ICanvasObject[] = _canvas?.canvas?.getObjects();

    if (!objects) return;

    const ctx = _canvas?.canvas?.getContext();
    if (!ctx) return;

    const page = objects.find(
      (obj: ICanvasObject) => obj.object_type === "page"
    );
    const guideImage = objects.find(
      (obj: ICanvasObject) => obj.object_type == "cover_template"
    );

    if (!page) {
      console.log("no page");
      return;
    }
    // @ts-ignore
    const Metadata: TMetadata | null = await getMetadata(
      guideImage._originalElement.currentSrc
    );

    if (!Metadata) {
      console.log("no metadata");
      return;
    }

    const convertedScale = 0.32;

    const margin = Metadata.margin * convertedScale;
    const pageLeft = page.left;
    const pageTop = page.top;
    const pageRight = page.left + page.width * page.scaleX;
    const pageBottom = page.top + page.height * page.scaleY;

    const defaulatAlpha = 0.3;
    const activeAlpha = 1;

    const transformPoint = (x: number, y: number) => {
      // @ts-ignore
      const vpt = _canvas?.canvas.viewportTransform;
      if (!vpt) return { x, y };
      return {
        x: x * vpt[0] + y * vpt[2] + vpt[4],
        y: x * vpt[1] + y * vpt[3] + vpt[5],
      };
    };

    const { x: objLeft, y: objTop } = transformPoint(page.left, page.top);
    const { x: objRight, y: objBottom } = transformPoint(
      page.left + page.width * page.scaleX,
      page.top + page.height * page.scaleY
    );

    const topMargin = page.scaleX * margin * _canvas.canvas.getZoom();
    const leftMargin = page.scaleX * margin * _canvas.canvas.getZoom();
    const rightMargin = page.scaleX * margin * _canvas.canvas.getZoom();
    const bottomMargin = page.scaleX * margin * _canvas.canvas.getZoom();

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.globalAlpha = alpha; // Set the transparency level
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const isObjectTouchingLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      lineType: LineType,
      isLeft: boolean = false
    ) => {
      return objects
        .filter((obj) => obj.object_type != "cover_template")
        .filter((obj) => obj.object_type != "page")
        .some((obj) => {
          const { x: _objLeft, y: _objTop } = transformPoint(obj.left, obj.top);
          const { x: _objRight, y: _objBottom } = transformPoint(
            obj.left + obj.width * obj.scaleX,
            obj.top + obj.height * obj.scaleY
          );
          let isTouching = false;

          if (lineType === LineType.LEFT_MARGIN) {
            isTouching = _objLeft <= x1;
          }

          if (lineType === LineType.TOP_MARGIN) {
            isTouching = _objTop <= y1;
          }

          if (lineType === LineType.RIGHT_MARGIN) {
            isTouching = _objRight >= x1;
          }

          if (lineType === LineType.BOTTOM_MARGIN) {
            isTouching = _objBottom >= y1;
          }

          if (lineType === LineType.SECTION1_END) {
            isTouching = _objRight >= x1 && _objLeft <= x1;
          }

          if (lineType === LineType.SECTION2_START) {
            isTouching = _objLeft <= x1 && _objRight >= x1;
          }

          if (lineType === LineType.SPINE_START) {
            isTouching = _objLeft <= x1 && _objRight >= x1;
          }

          if (lineType === LineType.SPINE_END) {
            isTouching = _objLeft <= x1 && _objRight >= x1;
          }
          return isTouching;
        });
    };

    // Right margin
    const rightMarginX = objRight - rightMargin;
    drawLine(
      rightMarginX,
      pageTop,
      rightMarginX,
      pageBottom,
      isObjectTouchingLine(
        rightMarginX,
        pageTop,
        rightMarginX,
        pageBottom,
        LineType.RIGHT_MARGIN
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Bottom margin
    const bottomMarginY = objBottom - bottomMargin;
    drawLine(
      pageLeft,
      bottomMarginY,
      pageRight,
      bottomMarginY,
      isObjectTouchingLine(
        pageLeft,
        bottomMarginY,
        pageRight,
        bottomMarginY,
        LineType.BOTTOM_MARGIN
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Section 1 end
    const section1end =
      Metadata.sec1endX * convertedScale * _canvas.canvas.getZoom();
    const section1endX = objLeft + section1end;
    drawLine(
      section1endX,
      pageTop,
      section1endX,
      pageBottom,
      isObjectTouchingLine(
        section1endX,
        pageTop,
        section1endX,
        pageBottom,
        LineType.SECTION1_END
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Section 2 start
    const section2start =
      Metadata.startSec2x * convertedScale * _canvas.canvas.getZoom();
    const section2startX = objLeft + section2start;
    drawLine(
      section2startX,
      pageTop,
      section2startX,
      pageBottom,
      isObjectTouchingLine(
        section2startX,
        pageTop,
        section2startX,
        pageBottom,
        LineType.SECTION2_START
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Spine start
    const spineStart =
      (Metadata.spineMargin + Metadata.innerLine1x) *
      convertedScale *
      _canvas.canvas.getZoom();
    const spineStartX = objLeft + spineStart;
    drawLine(
      spineStartX,
      pageTop,
      spineStartX,
      pageBottom,
      isObjectTouchingLine(
        spineStartX,
        pageTop,
        spineStartX,
        pageBottom,
        LineType.SPINE_START
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Spine end
    const spineEnd =
      (Metadata.innerLine2x - Metadata.spineMargin) *
      convertedScale *
      _canvas.canvas.getZoom();
    const spineEndX = objLeft + spineEnd;
    drawLine(
      spineEndX,
      pageTop,
      spineEndX,
      pageBottom,
      isObjectTouchingLine(
        spineEndX,
        pageTop,
        spineEndX,
        pageBottom,
        LineType.SPINE_END
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Left margin
    const leftMarginX = objLeft + leftMargin;
    drawLine(
      leftMarginX,
      pageTop,
      leftMarginX,
      pageBottom,
      isObjectTouchingLine(
        leftMarginX,
        pageTop,
        leftMarginX,
        pageBottom,
        LineType.LEFT_MARGIN,
        true
      )
        ? activeAlpha
        : defaulatAlpha
    );

    // Top margin
    const topMarginY = objTop + topMargin;
    drawLine(
      pageLeft,
      topMarginY,
      pageRight,
      topMarginY,
      isObjectTouchingLine(
        pageLeft,
        topMarginY,
        pageRight,
        topMarginY,
        LineType.TOP_MARGIN
      )
        ? activeAlpha
        : defaulatAlpha
    );
  } catch (error) {
    console.error("Error drawing guidelines:", error);
  }
}
