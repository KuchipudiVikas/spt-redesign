import { jsPDF } from "jspdf";
import * as fabric from "fabric";

export type TQuality = "low" | "medium" | "high" | "very high";
export type TType = "png" | "pdf" | "jpg" | "jpeg" | "webp" | "svg" | "avif";

const getMultiplier = (quality: TQuality): number => {
  switch (quality) {
    case "low":
      return 0.5;
    case "medium":
      return 1;
    case "high":
      return 2;
    case "very high":
      return 5;
    default:
      return 1;
  }
};

const exportCanvasAsImage = async (
  canvas: fabric.Canvas,
  quality: TQuality,
  format: TType
) => {
  const multiplier = getMultiplier(quality);
  const dataURL = canvas.toDataURL({
    // @ts-ignore
    format: format === "jpeg" ? "jpg" : format,
    multiplier: multiplier
  });

  // console.log("canvas", canvas.getObjects());

  // console.log("dataURL", dataURL);

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `canvas_${quality}.${format}`;
  link.click();
  return true;
};

const exportCanvasAsSVG = (canvas: fabric.Canvas) => {
  const svgData = canvas.toSVG();
  const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `canvas.svg`;
  link.click();
  URL.revokeObjectURL(url);
};

const exportCanvasAsPDF = (canvas: fabric.Canvas, quality: TQuality) => {
  const multiplier = getMultiplier(quality);
  const dataURL = canvas.toDataURL({
    format: "png",
    multiplier: multiplier
  });

  const pageObject = canvas
    .getObjects()
    // @ts-ignore
    .find((obj) => obj.object_type === "page");
  const pageWidthPx = pageObject?.width || canvas.getWidth();
  const pageHeightPx = pageObject?.height || canvas.getHeight();

  // Convert dimensions from pixels to inches
  const pageWidthIn = pageWidthPx / 96;
  const pageHeightIn = pageHeightPx / 96;

  // Create a new jsPDF instance with custom page size in inches
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [pageWidthIn, pageHeightIn]
  });

  // console.log(
  //   "pageWidth (inches)",
  //   pageWidthIn,
  //   "pageHeight (inches)",
  //   pageHeightIn
  // );

  // Add the image to the PDF with the correct dimensions and position
  pdf.addImage(dataURL, "PNG", 0, 0, pageWidthIn, pageHeightIn);
  pdf.save(`canvas_${quality}.pdf`);
};

export { exportCanvasAsImage, exportCanvasAsSVG, exportCanvasAsPDF };
