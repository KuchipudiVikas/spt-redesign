import { TUnits } from "@/data/pageSizes";
export type TPage = {
  id: string;
  index: number;
  type: string;
  objects: any[];
  clipPath: any;
  Dimensions: {
    width: number;
    height: number;
    units: TUnits;
  };
};

export type TObject = {
  cropX: number;
  cropY: number;
  type: string;
  version: string;
  originX: string;
  originY: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fill: string;
  stroke: null;
  strokeWidth: number;
  strokeDashArray: null;
  strokeLineCap: string;
  strokeDashOffset: number;
  strokeLineJoin: string;
  strokeUniform: boolean;
  strokeMiterLimit: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  flipX: boolean;
  flipY: boolean;
  opacity: number;
  shadow: null;
  visible: boolean;
  backgroundColor: string;
  fillRule: string;
  paintFirst: string;
  globalCompositeOperation: string;
  skewX: number;
  skewY: number;
  src: string;
  crossOrigin: string;
  filters: never[];
  uid: string;
  name: string;
  object_type: string;
  locked: boolean;
};

export type TPages = TPage[];
