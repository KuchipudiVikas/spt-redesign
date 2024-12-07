import { Dimensions } from "@/components/DesignTools/kdp-helper/mesurementsTable";
import { Ecover, GetMargin } from "../kdp-helper";

const bgColor = "#d996fe";
const lineColor = bgColor;
const gColor = "#808080";
const hinge = 0.394;
const dpi = 300;

export type TMetadata = {
  sec1endX: number;
  margin: number;
  safeArea: {
    width: {
      inches: number;
      pixels: number;
    };
    height: {
      inches: number;
      pixels: number;
    };
  };
  startSec2x: number;
  innerLine1x: number;
  innerLine2x: number;
  spineMargin: number;
};

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

export const createSvgDataUrl = (
  info: Dimensions,
  _bleed: string,
  pageCount: number,
  coverType: Ecover,
  trimSize: any,
  paperType: any
): string => {
  const bleed: boolean = _bleed == "bleed";
  const margin = GetMargin(pageCount, bleed);

  const bindingType = coverType;
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");

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

  // Referencing the external font from Google Fonts
  const style = document.createElementNS(svgNamespace, "style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    text {
      font-family: 'Roboto', sans-serif;
    }
  `;
  svg.appendChild(style);

  svg.setAttribute("width", canvasWidth.toString());
  svg.setAttribute("height", canvasHeight.toString());

  const section1X = pageMargin;
  let section2X = section1X + safeArea.width.pixels + spine.pixels;

  if (bindingType === Ecover.hardcover) {
    section2X += _margin * dpi * 2;
  }

  let sec1endx;
  let sec2endx;
  let _sec1endx;
  let sec2startX;

  const createRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    fill: string
  ) => {
    const rect = document.createElementNS(svgNamespace, "rect");
    rect.setAttribute("x", x.toString());
    rect.setAttribute("y", y.toString());
    rect.setAttribute("width", width.toString());
    rect.setAttribute("height", height.toString());
    rect.setAttribute("fill", fill);
    return rect;
  };

  if (bindingType === Ecover.hardcover) {
    sec1endx = safeArea.width.pixels;
    _sec1endx = section1X + sec1endx;
    sec2startX = section2X;

    svg.appendChild(
      createRect(
        section1X,
        pageMargin,
        sec1endx,
        canvasHeight - pageMargin * 2,
        "transparent"
      )
    );

    svg.appendChild(
      createRect(
        section2X,
        pageMargin,
        safeArea.width.pixels,
        canvasHeight - pageMargin * 2,
        "transparent"
      )
    );
  } else {
    sec2startX = section2X + _margin * dpi;
    _sec1endx = section1X + safeArea.width.pixels - _margin * dpi;
    svg.appendChild(
      createRect(
        section1X,
        pageMargin,
        safeArea.width.pixels - _margin * dpi,
        canvasHeight - pageMargin * 2,
        "transparent"
      )
    );

    svg.appendChild(
      createRect(
        section2X + _margin * dpi,
        pageMargin,
        safeArea.width.pixels + _margin * dpi,
        canvasHeight - pageMargin * 2,
        "transparent"
      )
    );
  }

  const drawLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    stroke: string,
    strokeWidth: number = 1
  ) => {
    const line = document.createElementNS(svgNamespace, "line");
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", strokeWidth.toString());
    return line;
  };

  svg.appendChild(
    drawLine(
      section1X,
      pageMargin / 2,
      canvasWidth,
      pageMargin / 2,
      `rgba(${hexToRgb(bgColor)}, 1)`,
      pageMargin
    )
  ); // Top
  svg.appendChild(
    drawLine(
      canvasWidth - pageMargin / 2,
      pageMargin,
      canvasWidth - pageMargin / 2,
      canvasHeight - pageMargin,
      `rgba(${hexToRgb(bgColor)}, 1)`,
      pageMargin
    )
  ); // Right
  svg.appendChild(
    drawLine(
      canvasWidth,
      canvasHeight - pageMargin / 2,
      section1X,
      canvasHeight - pageMargin / 2,
      `rgba(${hexToRgb(bgColor)}, 1)`,
      pageMargin
    )
  ); // Bottom
  svg.appendChild(
    drawLine(
      section1X / 2,
      canvasHeight,
      section1X / 2,
      0,
      `rgba(${hexToRgb(bgColor)}, 1)`,
      pageMargin
    )
  ); // Left

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

  if (bindingType === Ecover.hardcover) {
    svg.appendChild(
      drawLine(
        centerLine1X + _margin * dpi,
        pageMargin,
        canvasHeight - pageMargin,
        // @ts-ignore
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
    svg.appendChild(
      drawLine(
        centerLine2X + _margin * dpi,
        pageMargin,
        canvasHeight - pageMargin,
        // @ts-ignore
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
  } else {
    svg.appendChild(
      drawLine(
        centerLine1X,
        pageMargin,
        canvasHeight - pageMargin,
        // @ts-ignore
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
    svg.appendChild(
      drawLine(
        centerLine2X,
        pageMargin,
        canvasHeight - pageMargin,
        // @ts-ignore
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
  }

  if (bindingType === Ecover.hardcover) {
    svg.appendChild(
      drawLine(
        centerLine1X + _margin * dpi,
        pageMargin,
        centerLine1X + _margin * dpi,
        canvasHeight - pageMargin,
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
    svg.appendChild(
      drawLine(
        centerLine2X + _margin * dpi,
        pageMargin,
        centerLine2X + _margin * dpi,
        canvasHeight - pageMargin,
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
  } else {
    svg.appendChild(
      drawLine(
        centerLine1X,
        pageMargin,
        centerLine1X,
        canvasHeight - pageMargin,
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
    svg.appendChild(
      drawLine(
        centerLine2X,
        pageMargin,
        centerLine2X,
        canvasHeight - pageMargin,
        `rgba(${hexToRgb(bgColor)}, 1)`,
        spineMargin.pixels + _margin * dpi
      )
    );
  }

  // inner lines
  const drawInnerLine = (
    x: number,
    y1: number,
    y2: number,
    color: string | number | CanvasGradient | CanvasPattern
  ) => {
    // @ts-ignore
    const line = drawLine(x, y1, x, y2, color, 1);
    svg.appendChild(line);
  };

  let innerLine1x;
  let innerLine2x;

  if (bindingType === Ecover.hardcover) {
    innerLine1x = pageMargin + safeArea.width.pixels + _margin * dpi;
    innerLine2x =
      pageMargin + safeArea.width.pixels + spine.pixels + _margin * dpi;
    drawInnerLine(innerLine1x, 0, canvasHeight, gColor);

    drawInnerLine(innerLine2x, 0, canvasHeight, gColor);
  } else {
    innerLine1x = pageMargin + safeArea.width.pixels;
    innerLine2x = pageMargin + safeArea.width.pixels + spine.pixels;
    drawInnerLine(innerLine1x, 0, canvasHeight, gColor);
    drawInnerLine(innerLine2x, 0, canvasHeight, gColor);
  }

  // Diagonal lines
  const drawDiagonal = (x1: number, y1: number, x2: number, y2: number) => {
    svg.appendChild(drawLine(x1, y1, x2, y2, lineColor, 1));
  };

  if (bindingType === Ecover.paperback) {
    drawDiagonal(
      pageMargin,
      pageMargin,
      safeArea.width.pixels + pageMargin - _margin * dpi,
      canvasHeight - pageMargin
    ); // Section 1 Top Left to Bottom Right
    drawDiagonal(
      pageMargin + safeArea.width.pixels - _margin * dpi,
      pageMargin,
      pageMargin,
      canvasHeight - pageMargin
    ); // Section 1 Top Right to Bottom Left
    drawDiagonal(
      section2X + _margin * dpi,
      pageMargin,
      section2X + safeArea.width.pixels,
      canvasHeight - pageMargin
    ); // Section 2 Top Left to Bottom Right
    drawDiagonal(
      section2X + safeArea.width.pixels,
      pageMargin,
      section2X + _margin * dpi,
      canvasHeight - pageMargin
    ); // Section 2 Top Right to Bottom Left
  } else {
    drawDiagonal(
      pageMargin,
      pageMargin,
      section1X + safeArea.width.pixels,
      canvasHeight - pageMargin
    ); // Section 1 Top Left to Bottom Right
    drawDiagonal(
      pageMargin + safeArea.width.pixels,
      pageMargin,
      section1X,
      canvasHeight - pageMargin
    ); // Section 1 Top Right to Bottom Left
    drawDiagonal(
      section2X + _margin * dpi,
      pageMargin,
      section2X + safeArea.width.pixels,
      canvasHeight - pageMargin
    ); // Section 2 Top Left to Bottom Right
    drawDiagonal(
      section2X + safeArea.width.pixels,
      pageMargin,
      section2X + _margin * dpi,
      canvasHeight - pageMargin
    ); // Section 2 Top Right to Bottom Left
  }

  const drawText = (
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fill: string
  ) => {
    const textElement = document.createElementNS(svgNamespace, "text");
    textElement.setAttribute("x", x.toString());
    textElement.setAttribute("y", y.toString());
    textElement.setAttribute("font-size", fontSize.toString());
    textElement.setAttribute("fill", fill);
    textElement.textContent = text;
    return textElement;
  };

  const lineHeight = 60;
  let leftOffset = 160;
  const fontSizeScale = 1.1;

  svg.appendChild(
    drawText(
      "Self Publishing Titans",
      section1X + leftOffset,
      pageMargin + lineHeight * 2,
      80 * fontSizeScale,
      bgColor
    )
  );
  svg.appendChild(
    drawText(
      "Back Cover",
      section1X + leftOffset,
      pageMargin + lineHeight * 7,
      70 * fontSizeScale,
      bgColor
    )
  );
  svg.appendChild(
    drawText(
      `${pageCount} pages on ${paperType} paper`,
      section1X + leftOffset,
      pageMargin + lineHeight * 8,
      40,
      bgColor
    )
  );
  svg.appendChild(
    drawText(
      `Cover Size (inches) : ${info.fullCover.width.inches.toFixed(2)}" x ${
        info.fullCover.height.inches
      }"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 12,
      40,
      bgColor
    )
  );
  svg.appendChild(
    drawText(
      `Cover Size (pixels) : ${info.fullCover.width.pixels.toFixed(
        2
      )} x ${info.fullCover.height.pixels.toFixed(2)} px`,
      section1X + leftOffset,
      pageMargin + lineHeight * 13,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine Text : ${
        pageCount < 80 ? "not enough pages" : "spine text allowed"
      }`,
      section1X + leftOffset,
      pageMargin + lineHeight * 15,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine (inches) : ${info.spineWidth.inches.toFixed(2)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 16,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine (pixels) : ${info.spineWidth.pixels.toFixed(0)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 17,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Trim Size (inches) : ${trimSize.width.toFixed(
        2
      )}" x ${trimSize.height.toFixed(2)}"`,
      section1X + leftOffset,
      pageMargin + lineHeight * 19,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Trim Size (pixels) : ${trimSize.width * 300}px x ${
        trimSize.height * 300
      }px`,
      section1X + leftOffset,
      pageMargin + lineHeight * 20,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      "Book Cover Template",
      section2X + 160,
      pageMargin + lineHeight * 2,
      80 * fontSizeScale,
      bgColor
    )
  );

  leftOffset = 260;
  svg.appendChild(
    drawText(
      "Front Cover",
      section2X + leftOffset,
      pageMargin + lineHeight * 7,
      70 * fontSizeScale,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `${pageCount} pages on ${paperType} paper`,
      section2X + leftOffset,
      pageMargin + lineHeight * 8,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Cover Size (inches) : ${info.fullCover.width.inches.toFixed(
        2
      )}" x ${info.fullCover.height.inches.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 12,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Cover Size (inches) : ${info.fullCover.width.pixels.toFixed(
        0
      )}px x ${info.fullCover.height.pixels.toFixed(0)}px`,
      section2X + leftOffset,
      pageMargin + lineHeight * 13,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine Text : ${pageCount < 80 ? "not enough pages" : "spine text"}`,
      section2X + leftOffset,
      pageMargin + lineHeight * 15,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine (inches) : ${info.spineWidth.inches.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 16,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Spine (pixels) : ${info.spineWidth.pixels.toFixed(0)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 17,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Trim Size (inches) : ${trimSize.width.toFixed(
        2
      )}" x ${trimSize.height.toFixed(2)}"`,
      section2X + leftOffset,
      pageMargin + lineHeight * 19,
      40,
      bgColor
    )
  );

  svg.appendChild(
    drawText(
      `Trim Size (pixels) : ${(
        Number(trimSize.width.toFixed()) * 300
      ).toFixed()}px x ${Number(trimSize.height * 300).toFixed()}px`,
      section2X + leftOffset,
      pageMargin + lineHeight * 20,
      40,
      bgColor
    )
  );

  let barcodeX =
    safeArea.width.pixels -
    _margin * dpi * 2 +
    barCodeMargin.pixels -
    barCodeSizes.width.pixels;

  if (bindingType === Ecover.hardcover) {
    barcodeX =
      safeArea.width.pixels +
      (hinge * dpi) / 2 +
      barCodeMargin.pixels -
      barCodeSizes.width.pixels;
  }

  let barcodeY =
    canvasHeight -
    barCodeSizes.height.pixels -
    barCodeMargin.pixels -
    pageMargin / 2;

  if (bindingType === Ecover.hardcover) {
    barcodeY =
      canvasHeight -
      barCodeSizes.height.pixels -
      barCodeMargin.pixels -
      pageMargin;
  }

  svg.appendChild(
    createRect(
      barcodeX,
      barcodeY,
      barCodeSizes.width.pixels,
      barCodeSizes.height.pixels,
      "#fff200"
    )
  );

  const barcodeText = drawText(
    "Barcode here",
    barcodeX + 30,
    barcodeY + 100,
    40,
    "#000"
  );

  svg.appendChild(barcodeText);

  const metadata = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "metadata"
  );

  let sec1endX = _sec1endx;

  const metadataObject: TMetadata = {
    sec1endX,
    margin: pageMargin,
    safeArea: safeArea,
    startSec2x: sec2startX,
    innerLine1x,
    innerLine2x,
    spineMargin: spineMargin.pixels,
  };

  const metadataContent = JSON.stringify(metadataObject);

  metadata.textContent = metadataContent;

  // Append metadata to SVG
  svg.insertBefore(metadata, svg.firstChild);

  // Serialize the SVG to a string and create a data URL
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgData
  )}`;

  return svgDataUrl;
};
