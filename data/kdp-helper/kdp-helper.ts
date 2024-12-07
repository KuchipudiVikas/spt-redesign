export type TTrimSize = {
  width: number;
  height: number;
  isHardCover?: boolean;
  isEbookOnly?: boolean;
  isAPlusOnly?: boolean;
  units: "in" | "px";
  isRecommended?: boolean;
};

export const trimSizes: TTrimSize[] = [
  { width: 5, height: 8, units: "in" },
  { width: 5.06, height: 7.81, units: "in" },
  { width: 5.25, height: 8, units: "in" },
  { width: 5.5, height: 8.5, isHardCover: true, units: "in" },
  { width: 6, height: 9, isHardCover: true, units: "in" },
  { width: 6.14, height: 9.21, isHardCover: true, units: "in" },
  { width: 6.69, height: 9.61, units: "in" },
  { width: 7, height: 10, isHardCover: true, units: "in" },
  { width: 7.44, height: 9.69, units: "in" },
  { width: 7.5, height: 9.25, units: "in" },
  { width: 8, height: 10, units: "in" },
  { width: 8.27, height: 11.69, units: "in" },
  { width: 8.25, height: 8.25, units: "in" },
  { width: 8.25, height: 11.69, units: "in" },
  { width: 8.5, height: 8.5, units: "in" },
  { width: 8.5, height: 11, units: "in", isRecommended: true },
  { width: 8.25, height: 11, isHardCover: true, units: "in" },
  { width: 1600, height: 2400, isEbookOnly: true, units: "px" },
  { width: 970, height: 600, isAPlusOnly: true, units: "px" },
  { width: 600, height: 180, isAPlusOnly: true, units: "px" },
  { width: 970, height: 300, isAPlusOnly: true, units: "px" },
  { width: 220, height: 220, isAPlusOnly: true, units: "px" },
  { width: 150, height: 300, isAPlusOnly: true, units: "px" },
  { width: 300, height: 300, isAPlusOnly: true, units: "px" }
];

export type TMarginIndex = {
  minPages: number;
  maxPages: number;
  gutter: number;
  outside_margin_no_bleed: number;
  outside_margin_bleed: number;
};

export const MarginIndex: TMarginIndex[] = [
  {
    minPages: 24,
    maxPages: 150,
    gutter: 0.375,
    outside_margin_no_bleed: 0.25,
    outside_margin_bleed: 0.375
  },
  {
    minPages: 151,
    maxPages: 300,
    gutter: 0.5,
    outside_margin_no_bleed: 0.25,
    outside_margin_bleed: 0.375
  },
  {
    minPages: 301,
    maxPages: 500,
    gutter: 0.625,
    outside_margin_no_bleed: 0.25,
    outside_margin_bleed: 0.375
  },
  {
    minPages: 501,
    maxPages: 700,
    gutter: 0.75,
    outside_margin_no_bleed: 0.25,
    outside_margin_bleed: 0.375
  },
  {
    minPages: 701,
    maxPages: 828,
    gutter: 0.875,
    outside_margin_no_bleed: 0.25,
    outside_margin_bleed: 0.375
  }
];
