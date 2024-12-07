import { CustomImage } from "../customClasses/image";
import * as fabric from "fabric";

export const addImage = async (
  canvas: fabric.Canvas,
  src: string,
  options: any
) => {
  const customImage = CustomImage.FromURL(src, options);
  //   canvas.add(customImage);
  return customImage;
};
