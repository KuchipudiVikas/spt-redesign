import {
  TTrimSize,
  TMarginIndex,
  MarginIndex,
} from "@/data/kdp-helper/kdp-helper";

import { hardCoverData } from "@/data/kdp-helper/hardCoverData";

export enum Ecover {
  paperback = "paperback",
  hardcover = "hardcover",
}

export type TInteriorTypes =
  | "black-and-white"
  | "premium-color"
  | "standard-color";

function ConstructTrimSizeString(trimSize: TTrimSize): string {
  const width = trimSize.width.toString().replace(".", "_");
  const height = trimSize.height.toString().replace(".", "_");
  return `${width}X${height}IN`;
}

export function GetMargin(pageCount: number, bleed: boolean): TMarginIndex {
  const margin = MarginIndex.find(
    (margin) =>
      pageCount >= margin.minPages &&
      pageCount <= margin.maxPages &&
      (bleed ? margin.outside_margin_bleed : margin.outside_margin_no_bleed)
  );

  if (margin) {
    return margin;
  } else {
    return MarginIndex[0];
  }
}

type TDimData = {
  inches: number;
  centimeters: number;
  pixels: number;
  points: number;
};

interface IhardCoverData {
  fullCover: { width: TDimData; height: TDimData };
  frontCover: { width: TDimData; height: TDimData };
  margin: { width: TDimData; height: TDimData };
  wrap: { width: TDimData; height: TDimData };
  hinge: { width: TDimData; height: TDimData };
  spineMargin: { width: TDimData; height: TDimData };
  spine: { width: TDimData; height: TDimData };
}

function parseDimData(dim: string): TDimData {
  const inches = parseFloat(dim);
  return {
    inches,
    centimeters: inches * 2.54,
    pixels: inches * 300,
    points: inches * 72,
  };
}

export function getHardCoverData(
  interiorType: string,
  paperType: string,
  pageCount: number,
  trimSize: string
): IhardCoverData | null {
  for (const data of hardCoverData) {
    if (
      data.interiorType === interiorType &&
      data.paperType === paperType &&
      data.numberOfPages === pageCount &&
      data.trimSize === trimSize
    ) {
      const dimensions = data.dimensions;
      return {
        fullCover: {
          width: parseDimData(dimensions.fullCover.width),
          height: parseDimData(dimensions.fullCover.height),
        },
        frontCover: {
          width: parseDimData(dimensions.frontCover.width),
          height: parseDimData(dimensions.frontCover.height),
        },
        margin: {
          width: parseDimData(dimensions.margin.width),
          height: parseDimData(dimensions.margin.height),
        },
        wrap: {
          width: parseDimData(dimensions.wrap.width),
          height: parseDimData(dimensions.wrap.height),
        },
        hinge: {
          width: parseDimData(dimensions.hinge.width),
          height: parseDimData(dimensions.hinge.height),
        },
        spineMargin: {
          width: parseDimData(dimensions.spineMargin.width),
          height: parseDimData(dimensions.spineMargin.height),
        },
        spine: {
          width: parseDimData(dimensions.spine.width),
          height: parseDimData(dimensions.spine.height),
        },
      };
    }
  }
  return null; // Return null if no match is found
}

export type PaperType = "white" | "cream" | "color";
export type Bleed = "bleed" | "no-bleed";

interface Props {
  ecover: Ecover;
  trimSize: TTrimSize;
  paperType: PaperType;
  bleed: Bleed;
  pageCount: number;
  interiorType: TInteriorTypes;
}

export interface IPaperbackData {
  fullCover: { width: TDimData; height: TDimData };
  spineWidth: TDimData;
  frontCover: { width: number; height: number };
}

function calculateSpineWidth(
  ecover: Ecover,
  paperType: PaperType,
  pageCount: number,
  trimSize: TTrimSize,
  interiorType: TInteriorTypes
): number {
  let spineWidth: number;

  switch (paperType) {
    case "white":
      spineWidth = pageCount * 0.002252;
      break;
    case "cream":
      spineWidth = pageCount * 0.0025;
      break;
    case "color":
      if (interiorType === "standard-color") {
        spineWidth = pageCount * 0.00225;
      } else {
        spineWidth = pageCount * 0.002347;
      }
      break;
    default:
      spineWidth = 0;
  }

  if (ecover === Ecover.hardcover) {
    const interiorType =
      paperType === "color" ? "PREMIUM_COLOR" : "BLACK_AND_WHITE";
    const hardCoverData = getHardCoverData(
      interiorType,
      paperType.toUpperCase(),
      pageCount,
      ConstructTrimSizeString(trimSize)
    );

    spineWidth = hardCoverData?.spine.width.inches || spineWidth;
  }

  return spineWidth;
}

export function CalculateSizesForKdpHelper({
  ecover,
  trimSize,
  paperType,
  bleed,
  pageCount,
  interiorType,
}: Props): IPaperbackData {
  const INCH_TO_CM = 2.54;
  const INCH_TO_PX = 300;
  const INCH_TO_PT = 72;

  const bleedSize = bleed === "bleed" ? 0.375 : 0.125;
  const spineWidth = calculateSpineWidth(
    ecover,
    paperType,
    pageCount,
    trimSize,
    interiorType
  );

  let fullCoverWidthInches;
  let fullCoverHeightInches;

  if (ecover === Ecover.paperback) {
    fullCoverWidthInches = trimSize.width * 2 + spineWidth + bleedSize * 2;
    fullCoverHeightInches = trimSize.height + bleedSize * 2;
  } else {
    const interiorType =
      paperType === "color" ? "PREMIUM_COLOR" : "BLACK_AND_WHITE";
    const hardCoverData = getHardCoverData(
      interiorType,
      paperType.toUpperCase(),
      pageCount,
      ConstructTrimSizeString(trimSize)
    );

    fullCoverWidthInches = hardCoverData?.fullCover.width.inches || 0;
    fullCoverHeightInches = hardCoverData?.fullCover.height.inches || 0;
  }

  // Convert dimensions to centimeters
  const fullCoverWidthCm = fullCoverWidthInches * INCH_TO_CM;
  const fullCoverHeightCm = fullCoverHeightInches * INCH_TO_CM;
  const spineWidthCm = spineWidth * INCH_TO_CM;

  // Convert dimensions to pixels
  const fullCoverWidthPx = fullCoverWidthInches * INCH_TO_PX;
  const fullCoverHeightPx = fullCoverHeightInches * INCH_TO_PX;
  const spineWidthPx = spineWidth * INCH_TO_PX;

  // Convert dimensions to points
  const fullCoverWidthPt = fullCoverWidthInches * INCH_TO_PT;
  const fullCoverHeightPt = fullCoverHeightInches * INCH_TO_PT;
  const spineWidthPt = spineWidth * INCH_TO_PT;

  let frontCover = {
    width: trimSize.width,
    height: trimSize.height,
  };

  if (ecover === Ecover.hardcover) {
    const interiorType =
      paperType === "color" ? "PREMIUM_COLOR" : "BLACK_AND_WHITE";
    const hardCoverData = getHardCoverData(
      interiorType,
      paperType.toUpperCase(),
      pageCount,
      ConstructTrimSizeString(trimSize)
    );

    frontCover = {
      width: hardCoverData?.frontCover.width.inches || trimSize.width,
      height: hardCoverData?.frontCover.height.inches || trimSize.height,
    };
  }

  return {
    fullCover: {
      width: {
        inches: fullCoverWidthInches,
        centimeters: fullCoverWidthCm,
        pixels: fullCoverWidthPx,
        points: fullCoverWidthPt,
      },
      height: {
        inches: fullCoverHeightInches,
        centimeters: fullCoverHeightCm,
        pixels: fullCoverHeightPx,
        points: fullCoverHeightPt,
      },
    },
    spineWidth: {
      inches: spineWidth,
      centimeters: spineWidthCm,
      pixels: spineWidthPx,
      points: spineWidthPt,
    },
    frontCover,
  };
}
