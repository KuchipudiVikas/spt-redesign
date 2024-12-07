import * as fabric from "fabric";
import {
  CustomRect,
  CustomCircle,
  CustomPolygon,
  CustomPath,
} from "../customClasses/shapes";

type TCustomRect = {
  left: number;
  top: number;
  fill: string;
  width: number;
  height: number;
  uid: string;
  name: string;
  object_type: string;
  selectable?: boolean;
  evented?: boolean;
  stroke?: string;
  strokeWidth?: number;
  lockRotation?: boolean;
  angle?: number;
};

export const addRect = (canvas: fabric.Canvas, options: TCustomRect) => {
  const rect = new CustomRect(options);
  canvas.add(rect);
  return rect;
};

type TCustomCircle = {
  left: number;
  top: number;
  fill: string;
  radius: number;
  uid: string;
  name: string;
  object_type: string;
};

export const addCircle = (canvas: fabric.Canvas, options: TCustomCircle) => {
  const circle = new CustomCircle(options);
  canvas.add(circle);
  return circle;
};

export const addHexagon = (canvas: fabric.Canvas, options: any) => {
  const hexagon = new CustomPolygon(
    [
      // @ts-ignore
      { x: 50, y: 0 },
      // @ts-ignore
      { x: 100, y: 25 },
      // @ts-ignore
      { x: 100, y: 75 },
      // @ts-ignore
      { x: 50, y: 100 },
      // @ts-ignore
      { x: 0, y: 75 },
      // @ts-ignore
      { x: 0, y: 25 },
    ],
    {
      left: 100,
      top: 100,
      fill: "blue",
      stroke: "black",
      strokeWidth: 1,
      ...options,
    }
  );
  canvas.add(hexagon);
  return hexagon;
};

export const addHeart = (canvas: fabric.Canvas, options: any) => {
  const { scale = 1, ...otherOptions } = options;

  const heart = new CustomPath(
    "M 272.701 0 C 238.701 0 204.701 18 182.701 54 C 160.701 18 126.701 0 92.7012 0 C 41.7012 0 0.701172 41 0.701172 92 C 0.701172 183 182.701 272 182.701 272 C 182.701 272 364.701 183 364.701 92 C 364.701 41 323.701 0 272.701 0 Z",
    {
      left: 100,
      top: 100,
      fill: "red",
      stroke: "black",
      strokeWidth: 2,
      ...otherOptions,
    }
  );

  heart.scale(scale);
  canvas.add(heart);
  return heart;
};

export const addStar = (canvas: fabric.Canvas, options: any) => {
  const star = new CustomPolygon(
    [
      // @ts-ignore
      { x: 50, y: 0 },
      // @ts-ignore
      { x: 61, y: 35 },
      // @ts-ignore
      { x: 98, y: 35 },
      // @ts-ignore
      { x: 68, y: 57 },
      // @ts-ignore
      { x: 79, y: 91 },
      // @ts-ignore
      { x: 50, y: 70 },
      // @ts-ignore
      { x: 21, y: 91 },
      // @ts-ignore
      { x: 32, y: 57 },
      // @ts-ignore
      { x: 2, y: 35 },
      // @ts-ignore
      { x: 39, y: 35 },
    ],
    {
      left: 100,
      top: 100,
      fill: "yellow",
      stroke: "black",
      strokeWidth: 2,
      ...options,
    }
  );
  canvas.add(star);
  return star;
};
