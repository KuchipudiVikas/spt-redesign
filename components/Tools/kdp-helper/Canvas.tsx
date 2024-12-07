import React from "react";
import { Dimensions } from "./mesurementsTable";
import { useRef, useEffect } from "react";
import { TMarginIndex } from "@/data/kdp-helper/kdp-helper";
import { GetMargin, Ecover } from "@/lib/kdp-helper";
import { Button } from "@/components/ui/button";
import HintWrapper from "@/utils/hint";
import { CloudDownloadIcon } from "lucide-react";

interface CanvasProps {
  pageCount: number;
  paperType: string;
  trimSize: {
    width: number;
    height: number;
  };
  info: Dimensions | null;
  bleed: boolean;
  bindingType: Ecover;
  // setDataUrl: (dataUrl: string) => void;
}

const Canvas = ({
  pageCount,
  paperType,
  bleed,
  trimSize,
  info,
  bindingType,
}: // setDataUrl
CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgColor = "#d996fe";
  const lineColor = bgColor;
  const gColor = "#808080";
  const hinge = 0.394;
  const dpi = 300;

  const margin: TMarginIndex = GetMargin(pageCount, bleed);

  const createPng = (info: Dimensions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let _margin = 0.125;

    if (bindingType == Ecover.hardcover) {
      _margin = hinge;
    }

    const canvasWidth = info.fullCover.width.pixels;
    const canvasHeight = info.fullCover.height.pixels;
    const outerMargin = bleed
      ? margin.outside_margin_bleed
      : margin.outside_margin_no_bleed;

    const wrap = 0.591;

    let pageMargin = outerMargin * dpi;

    if (bindingType === Ecover.hardcover) {
      pageMargin = wrap * dpi + 0.125 * dpi;
    }

    const bleedSize = { inches: 0.125, pixels: 0.125 * dpi };
    const spine = info.spineWidth;
    const spineMargin = { inches: 0.062, pixels: 0.062 * dpi };
    const barCodeMargin = { inches: 0.25, pixels: 0.25 * dpi };
    const barCodeSizes = {
      width: {
        inches: 2,
        pixels: 2 * dpi,
      },
      height: {
        inches: 1.2,
        pixels: 1.2 * dpi,
      },
    };

    const saw = trimSize.width + hinge / 2 - 0.125 - hinge;
    const sah = info.frontCover.height.inches - 2 * 0.125;

    let safeArea;

    if (bindingType == Ecover.paperback) {
      safeArea = {
        width: {
          inches: trimSize.width - bleedSize.inches,
          pixels: trimSize.width * dpi - bleedSize.pixels,
        },
        height: {
          inches: trimSize.height - outerMargin,
          pixels: trimSize.height * dpi - bleedSize.pixels,
        },
      };
    } else {
      safeArea = {
        width: {
          inches: saw,
          pixels: saw * dpi,
        },
        height: {
          inches: sah,
          pixels: sah * dpi,
        },
      };
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const section1X = pageMargin;
    let section2X = section1X + safeArea.width.pixels + spine.pixels;

    if (bindingType === Ecover.hardcover) {
      section2X += _margin * dpi * 2;
    }

    ctx.fillStyle = "white";

    if (bindingType === Ecover.hardcover) {
      ctx.fillRect(
        section1X,
        pageMargin,
        safeArea.width.pixels,
        canvas.height - pageMargin * 2
      );

      ctx.fillRect(
        section2X,
        pageMargin,
        safeArea.width.pixels,
        canvas.height - pageMargin * 2
      );
    } else {
      ctx.fillRect(
        section1X,
        pageMargin,
        safeArea.width.pixels - _margin * dpi,
        canvas.height - pageMargin * 2
      );

      ctx.fillRect(
        section2X + _margin * dpi,
        pageMargin,
        safeArea.width.pixels + _margin * dpi,
        canvas.height - pageMargin * 2
      );
    }

    // Drawing the borders
    const drawBorder = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      lineWidth: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    ctx.strokeStyle = `rgba(${hexToRgb(bgColor)}, 1)`;
    drawBorder(
      section1X,
      pageMargin / 2,
      canvas.width,
      pageMargin / 2,
      pageMargin
    ); // Top
    drawBorder(
      canvas.width - pageMargin / 2,
      pageMargin,
      canvas.width - pageMargin / 2,
      canvas.height - pageMargin,
      pageMargin
    ); // Right
    drawBorder(
      canvas.width,
      canvas.height - pageMargin / 2,
      section1X,
      canvas.height - pageMargin / 2,
      pageMargin
    ); // Bottom
    drawBorder(section1X / 2, canvas.height, section1X / 2, 0, pageMargin); // Left

    // Center lines
    const drawCenterLine = (
      x: number,
      y1: number,
      y2: number,
      lineWidth: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const centerLine1X =
      pageMargin +
      safeArea.width.pixels -
      (_margin * dpi) / 2 +
      spineMargin.pixels / 2;
    const centerLine2X =
      pageMargin +
      safeArea.width.pixels +
      spine.pixels +
      (_margin * dpi) / 2 -
      spineMargin.pixels / 2;

    // ctx.strokeStyle = "rgba(217, 150, 254, 0.5)";

    if (bindingType === Ecover.hardcover) {
      drawCenterLine(
        centerLine1X + _margin * dpi,
        pageMargin,
        canvas.height - pageMargin,
        spineMargin.pixels + _margin * dpi
      );
      drawCenterLine(
        centerLine2X + _margin * dpi,
        pageMargin,
        canvas.height - pageMargin,
        spineMargin.pixels + _margin * dpi
      );
    } else {
      drawCenterLine(
        centerLine1X,
        pageMargin,
        canvas.height - pageMargin,
        spineMargin.pixels + _margin * dpi
      );
      drawCenterLine(
        centerLine2X,
        pageMargin,
        canvas.height - pageMargin,
        spineMargin.pixels + _margin * dpi
      );
    }

    // Inner lines
    const drawInnerLine = (
      x: number,
      y1: number,
      y2: number,
      color: string | number | CanvasGradient | CanvasPattern
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = String(color);
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    if (bindingType === Ecover.hardcover) {
      drawInnerLine(
        pageMargin + safeArea.width.pixels + _margin * dpi,
        0,
        canvas.height,
        gColor
      );
      drawInnerLine(
        pageMargin + safeArea.width.pixels + spine.pixels + _margin * dpi,
        0,
        canvas.height,
        gColor
      );
    } else {
      drawInnerLine(
        pageMargin + safeArea.width.pixels,
        0,
        canvas.height,
        gColor
      );
      drawInnerLine(
        pageMargin + safeArea.width.pixels + spine.pixels,
        0,
        canvas.height,
        gColor
      );
    }

    // Diagonal lines
    const drawDiagonal = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    if (bindingType === Ecover.paperback) {
      drawDiagonal(
        pageMargin,
        pageMargin,
        safeArea.width.pixels + pageMargin - _margin * dpi,
        canvas.height - pageMargin
      ); // Section 1 Top Left to Bottom Right
      drawDiagonal(
        pageMargin + safeArea.width.pixels - _margin * dpi,
        pageMargin,
        pageMargin,
        canvas.height - pageMargin
      ); // Section 1 Top Right to Bottom Left
      drawDiagonal(
        section2X + _margin * dpi,
        pageMargin,
        section2X + safeArea.width.pixels,
        canvas.height - pageMargin
      ); // Section 2 Top Left to Bottom Right
      drawDiagonal(
        section2X + safeArea.width.pixels,
        pageMargin,
        section2X + _margin * dpi,
        canvas.height - pageMargin
      ); // Section 2 Top Right to Bottom Left
    } else {
      drawDiagonal(
        pageMargin,
        pageMargin,
        safeArea.width.pixels + pageMargin,
        canvas.height - pageMargin
      ); // Section 1 Top Left to Bottom Right
      drawDiagonal(
        pageMargin + safeArea.width.pixels,
        pageMargin,
        pageMargin,
        canvas.height - pageMargin
      ); // Section 1 Top Right to Bottom Left
      drawDiagonal(
        section2X,
        pageMargin,
        section2X + safeArea.width.pixels,
        canvas.height - pageMargin
      ); // Section 2 Top Left to Bottom Right
      drawDiagonal(
        section2X + safeArea.width.pixels,
        pageMargin,
        section2X,
        canvas.height - pageMargin
      ); // Section 2 Top Right to Bottom Left
    }

    // Center lines for sections
    const drawCenter = (sectionX: number, width: number, offset: number) => {
      const sectionCenterX = sectionX + (width - _margin * dpi) / 2 + offset;
      const centerY = pageMargin + (canvas.height - 2 * pageMargin) / 2;
      drawCenterLine(sectionCenterX, pageMargin, canvas.height - pageMargin, 1);
      drawInnerLine(sectionX, centerY, centerY, 1);
    };

    if (bindingType === Ecover.paperback) {
      drawCenter(section1X, safeArea.width.pixels, 0);
      drawCenter(section2X, safeArea.width.pixels, _margin * dpi);
    } else {
      drawCenter(section1X + (_margin * dpi) / 2, safeArea.width.pixels, 0);
      drawCenter(section2X + (_margin * dpi) / 2, safeArea.width.pixels, 0);
    }

    ctx.fillStyle = bgColor;
    const lineHeight = 60;
    let leftOffset = 160;
    const fontSizeScale = 1.1;

    const addText = (
      text: string,
      x: number,
      y: number,
      size = 55,
      color = "black"
    ) => {
      ctx.font = `${size}px Arial`;
      ctx.fillStyle = color; // Set the text color
      ctx.fillText(text, x, y);
    };

    addText(
      "Self Publishing Titans",
      section1X + leftOffset,
      pageMargin + lineHeight * 2,
      80 * fontSizeScale
    );
    addText(
      "Back Cover",
      section1X + leftOffset,
      pageMargin + lineHeight * 7,
      70 * fontSizeScale
    );
    addText(
      `${pageCount} pages on ${paperType} paper`,
      section1X + leftOffset,
      pageMargin + lineHeight * 8,
      50
    );
    addText(
      `Cover Size (inches) : ${info.fullCover.width.inches.toFixed(2)}" x ${
        info.fullCover.height.inches
      }"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 12
    );
    addText(
      `Cover Size (pixels) : ${info.fullCover.width.pixels.toFixed(
        0
      )}px x ${info.fullCover.height.pixels.toFixed(0)}px`,
      section1X + leftOffset,
      pageMargin + lineHeight * 13.3
    );
    addText(
      `Spine Text : ${
        pageCount < 80 ? "not enough pages" : "spine text allowed"
      }`,
      section1X + leftOffset,
      pageMargin + lineHeight * 15.6
    );
    addText(
      `Spine (inches) : ${info.spineWidth.inches.toFixed(2)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 16.9
    );
    addText(
      `Spine (pixels) : ${info.spineWidth.pixels.toFixed(0)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 18.2
    );
    addText(
      `Trim Size (inches) : ${trimSize.width.toFixed(
        2
      )}" x ${trimSize.height.toFixed(2)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 20.6
    );
    addText(
      `Trim Size (pixels) : ${trimSize.width * 300}px x ${
        trimSize.height * 300
      }px`,
      section1X + leftOffset,
      pageMargin + lineHeight * 21.9
    );
    // addText(
    //   "Self Publishing Titans",
    //   section1X + leftOffset,
    //   pageMargin + lineHeight * 22
    // );

    addText(
      "Book Cover Template",
      section2X + 160,
      pageMargin + lineHeight * 2,
      80 * fontSizeScale
    );
    addText(
      "Front Cover",
      section2X + 160,
      pageMargin + lineHeight * 7,
      70 * fontSizeScale
    );
    leftOffset = 160;
    addText(
      `${pageCount} pages on ${paperType} paper`,
      section2X + leftOffset,
      pageMargin + lineHeight * 8,
      50
    );
    addText(
      `Cover Size (inches) : ${info.fullCover.width.inches.toFixed(
        2
      )}" x ${info.fullCover.height.inches.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 12
    );
    addText(
      `Cover Size (inches) : ${info.fullCover.width.pixels.toFixed(
        0
      )}px x ${info.fullCover.height.pixels.toFixed(0)}px`,
      section2X + leftOffset,
      pageMargin + lineHeight * 13.3
    );
    addText(
      `Spine Text : ${pageCount < 80 ? "not enough pages" : "spine text"}`,
      section2X + leftOffset,
      pageMargin + lineHeight * 15.6
    );
    addText(
      `Spine (inches) : ${info.spineWidth.inches.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 16.9
    );
    addText(
      `Spine (pixels) : ${info.spineWidth.pixels.toFixed(0)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 18.2
    );
    addText(
      `Trim Size (inches) : ${trimSize.width.toFixed(
        2
      )}" x ${trimSize.height.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 20.6
    );
    addText(
      `Trim Size (pixels) : ${(
        Number(trimSize.width.toFixed()) * 300
      ).toFixed()}px x ${Number(trimSize.height * 300).toFixed()}px`,
      section2X + leftOffset,
      pageMargin + lineHeight * 21.9
    );

    ctx.fillStyle = "#fff200";

    let barcodeX =
      safeArea.width.pixels -
      _margin * dpi * 2 +
      barCodeMargin.pixels -
      barCodeSizes.width.pixels;

    let barcodeY =
      canvas.height -
      barCodeSizes.height.pixels -
      barCodeMargin.pixels -
      pageMargin / 2;

    if (bindingType === Ecover.hardcover) {
      barcodeY =
        canvas.height -
        barCodeSizes.height.pixels -
        barCodeMargin.pixels -
        pageMargin;
    }

    if (bindingType === Ecover.hardcover) {
      barcodeX =
        safeArea.width.pixels +
        (hinge * dpi) / 2 +
        barCodeMargin.pixels -
        barCodeSizes.width.pixels;
    }

    ctx.fillRect(
      barcodeX,
      barcodeY,
      barCodeSizes.width.pixels,
      barCodeSizes.height.pixels
    );

    // Draw the barcode text
    ctx.fillStyle = "#000";
    ctx.font = "40px Arial";
    ctx.fillText("Barcode here", barcodeX + 30, barcodeY + 100);
  };

  const handleDownloadClick = async () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL("image/png");

    console.log("dataUrl", dataUrl);

    if (!dataUrl) {
      console.error("Error generating image data URL");
      alert("Error generating image data URL");
      return;
    }

    try {
      // Send the image data to the server
      // const response = await fetch("http://localhost:8000/upload", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     imageData: dataUrl,
      //     metadata: {
      //       dpi: 300, // Example metadata, adjust as needed
      //       customKey: { exampleKey: "exampleValue" } // Example custom metadata
      //     }
      //   })
      // });

      // console.log("response", response);

      // if (!response.ok) {
      //   throw new Error("Error processing image on server");
      // }

      // const responseData = await response.json();
      // const processedImageDataUrl = responseData.imageData;

      // Create a download link for the processed image
      const fileName =
        trimSize.width +
        "x" +
        trimSize.height +
        "_" +
        new Date().toLocaleTimeString() +
        ".png";

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image");
    }
  };

  useEffect(() => {
    if (info !== null) {
      createPng(info);
    }
  }, [info]);

  return (
    <div className="flex flex-col min-w-full md:min-w-[600px]  items-start ">
      <h3 className="mb-4 text-gray-700 font-bold ml-8 text-[20px] ">
        Cover Template
      </h3>
      <div className="flex justify-center">
        {info !== null && (
          <canvas
            // className=" w-[300px] h-auto"
            ref={canvasRef}
            style={{
              // border: "2px  #808080 dashed",
              // display: "none",
              // scale: 0.,
              width: "600px",
              maxWidth: "90%",
              height: "auto",
            }}
          ></canvas>
        )}
      </div>
      <div className="w-full flex justify-center ">
        <HintWrapper hint="Download the template as a PNG image.">
          <Button
            disabled={info === null}
            type="button"
            className="mt-4 w-full rounded-full md:w-fit"
            onClick={() => handleDownloadClick()}
          >
            Download <CloudDownloadIcon size={20} />
          </Button>
        </HintWrapper>
      </div>
    </div>
  );
};

export default Canvas;
function hexToRgb(bgColor: string) {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
