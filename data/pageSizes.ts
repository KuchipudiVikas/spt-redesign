export type TUnits = "in" | "cm" | "mm" | "px" | "pt" | "pc";

export type TPageSize = {
  width: number;
  height: number;
  units: TUnits;
  Label: string;
};

export const pageSizes: TPageSize[] = [
  {
    width: 6,
    height: 9,
    units: "in",
    Label: "6 x 9 in",
  },
  {
    width: 8.5,
    height: 11,
    units: "in",
    Label: "8.5 x 11 in",
  },
  {
    width: 7,
    height: 10,
    units: "in",
    Label: "7 x 10 in",
  },
  {
    width: 8,
    height: 10,
    units: "in",
    Label: "8 x 10 in",
  },
  {
    width: 5,
    height: 8,
    units: "in",
    Label: "5 x 8 in",
  },
  {
    width: 14.888,
    height: 10.25,
    units: "in",
    Label: "14 x 10 in",
  },
  {
    width: 5,
    height: 8,
    units: "in",
    Label: "5 x 8 in",
  },
];
