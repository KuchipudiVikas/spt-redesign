import { CustomText } from "../customClasses/text";
import * as fabric from "fabric";

export const addText = async (
  canvas: fabric.Canvas,
  text: string,
  options: any
) => {
  const customText = new CustomText({ text, ...options });
  canvas.add(customText);
  return customText;
};
