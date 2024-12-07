import * as fabric from "fabric";
import { pillRender, horizontalPillRender } from "./pill";
import ControlDiv, {
  renderControlDiv,
  hideControlDiv
} from "./FloatingControls";
import { customRender } from "./corner";

let rotationIcon;
if (typeof window !== "undefined") {
  rotationIcon = new Image();
  rotationIcon.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNNDgwLTE2MHEtMTM0IDAtMjI3LTkzdC05My0yMjdxMC0xMzQgOTMtMjI3dDIyNy05M3E2OSAwIDEzMiAyOC41VDcyMC02OTB2LTExMGg4MHYyODBINTIwdi04MGgxNjhxLTMyLTU2LTg3LjUtODhUNDgwLTcyMHEtMTAwIDAtMTcwIDcwdC03MCAxNzBxMCAxMDAgNzAgMTcwdDE3MCA3MHE3NyAwIDEzOS00NHQ4Ny0xMTZoODRxLTI4IDEwNi0xMTQgMTczdC0xOTYgNjdaIi8+PC9zdmc+";
}

export const ApplyCustomControls = (obj, canvas) => {
  obj.cornerColor = "#da4eed";
  let isMoving = false;

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    if (!isMoving) {
      const adjustedLeft = left + 400 - 70;
      renderControlDiv(adjustedLeft, top, canvas);
    }
  }

  obj.controls = {
    ...obj.controls,
    tl: new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: 0,
      cursorStyle: "nwse-resize",
      actionHandler: fabric.controlsUtils.scalingEqually,
      actionName: "scale",
      render: customRender
    }),
    mt: new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: 0,
      cursorStyle: "ns-resize",
      actionHandler: fabric.controlsUtils.scalingY,
      actionName: "scale",
      render: (ctx, left, top, styleOverride, fabricObject) =>
        pillRender(ctx, left, top, styleOverride, fabricObject, 24, 10)
    }),
    tr: new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 0,
      cursorStyle: "nesw-resize",
      actionHandler: fabric.controlsUtils.scalingEqually,
      actionName: "scale",
      render: customRender
    }),
    ml: new fabric.Control({
      x: -0.5,
      y: 0,
      offsetY: 0,
      cursorStyle: "ew-resize",
      actionHandler: fabric.controlsUtils.scalingX,
      actionName: "scale",
      render: (ctx, left, top, styleOverride, fabricObject) =>
        horizontalPillRender(
          ctx,
          left,
          top,
          styleOverride,
          fabricObject,
          24,
          10
        )
    }),
    mr: new fabric.Control({
      x: 0.5,
      y: 0,
      offsetY: 0,
      cursorStyle: "ew-resize",
      actionHandler: fabric.controlsUtils.scalingX,
      actionName: "scale",
      render: (ctx, left, top, styleOverride, fabricObject) =>
        horizontalPillRender(
          ctx,
          left,
          top,
          styleOverride,
          fabricObject,
          24,
          10
        )
    }),
    bl: new fabric.Control({
      x: -0.5,
      y: 0.5,
      offsetY: 0,
      cursorStyle: "nesw-resize",
      actionHandler: fabric.controlsUtils.scalingEqually,
      actionName: "scale",
      render: customRender
    }),
    mb: new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 0,
      cursorStyle: "ns-resize",
      actionHandler: fabric.controlsUtils.scalingY,
      actionName: "scale",
      render: (ctx, left, top, styleOverride, fabricObject) =>
        pillRender(ctx, left, top, styleOverride, fabricObject, 24, 10)
    }),
    br: new fabric.Control({
      x: 0.5,
      y: 0.5,
      offsetY: 0,
      cursorStyle: "nwse-resize",
      actionHandler: fabric.controlsUtils.scalingEqually,
      actionName: "scale",
      render: customRender
    }),
    deleteControl: new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: "pointer",
      render: renderIcon
    }),
    mtr: new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 28,
      cursorStyle: "crosshair",
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      actionName: "rotate",
      render: (ctx, left, top, styleOverride, fabricObject) => {
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        if (rotationIcon) {
          ctx.drawImage(rotationIcon, -12, -12, 24, 24);
        }
        ctx.restore();
      }
    })
  };

  canvas.on("mouse:down", function (e) {
    if (e.target !== obj && ControlDiv) {
      hideControlDiv();
    }
  });

  canvas.on("selection:cleared", function () {
    hideControlDiv();
  });

  canvas.on("object:moving", function () {
    isMoving = true;
    hideControlDiv();
  });

  canvas.on("object:modified", function (e) {
    if (e.target === obj) {
      isMoving = false;
      const { left, top } = obj.getBoundingRect();
      renderControlDiv(left, top, canvas);
    }
  });
};
