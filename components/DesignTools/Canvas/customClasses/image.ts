import * as fabric from "fabric";
import api from "@/lib/api";

export class CustomImage extends fabric.Image {
  constructor(element: HTMLImageElement, options: any) {
    super(element, options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("locked", options.locked || false);
    this.set("ref_id", options.ref_id || "");
    // this.set("selectable", options.selectable || true);
    // this.set("evented", options.evented || true);
  }

  // @ts-ignore
  toObject() {
    const { src, ...rest } = super.toObject();

    // if (this.get("ref_id")) {
    //   return {
    //     ...rest,
    //     uid: this.get("uid"),
    //     name: this.get("name"),
    //     object_type: this.get("object_type"),
    //     locked: this.get("locked"),
    //     ref_id: this.get("ref_id")
    //   };
    // } else {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type"),
      locked: this.get("locked"),
      ref_id: this.get("ref_id"),
      src: src, // Include src only if ref_id is not present
    };
    // }
  }

  static async FromURL(url: string, options: any): Promise<CustomImage> {
    // console.log("Starting to load image from URL:", url);
    try {
      const img = await fabric.Image.fromURL(url, {
        ...options,
        crossOrigin: "anonymous",
      });

      // console.log("Image loaded successfully:", img);
      // @ts-ignore
      const customImage = new CustomImage(img.getElement(), options);
      // console.log("CustomImage created:", customImage);
      return customImage;
    } catch (error) {
      console.error("Error loading image:", error);
      throw error;
    }
  }

  static async fromObject(object: any): Promise<CustomImage> {
    // Initialize src with the object's src if it exists
    let src: string = object.src || "";

    // If src is not provided, fetch the image from the server using the object.ref_id
    if (!src && object.ref_id) {
      let [_src, error] = await api.images.GetImageByReferenceID(object.ref_id);
      if (error) {
        console.error("Error fetching image by reference ID:", error);
      }
      src = _src || "";
    }

    try {
      const img = await fabric.Image.fromURL(src, {
        crossOrigin: "anonymous",
      });

      // console.log("Image loaded successfully for deserialization:", img);
      const options = {
        uid: object.uid,
        name: object.name,
        object_type: object.object_type,
        left: object.left,
        top: object.top,
        angle: object.angle,
        opacity: object.opacity,
        flipX: object.flipX,
        flipY: object.flipY,
        originX: object.originX,
        originY: object.originY,
        skewX: object.skewX,
        skewY: object.skewY,
        visible: object.visible,
        clipPath: object.clipPath,
        locked: object.locked,
        selectable: object.locked == true ? false : true,
        evented: object.locked == true ? false : true,
        shadow: object.shadow,
        stroke: object.stroke,
        strokeWidth: object.strokeWidth,
        strokeDashArray: object.strokeDashArray,
        strokeLineCap: object.strokeLineCap,
        ref_id: object.ref_id,
      };

      // @ts-ignore
      const customImage = new CustomImage(img.getElement(), options);

      // Ensure the width and height are set correctly
      customImage.set({
        // width: object.width,
        // height: object.height,
        scaleX: object.scaleX,
        scaleY: object.scaleY,
      });

      // console.log("CustomImage deserialized:", customImage);
      return customImage;
    } catch (error) {
      console.error("Error deserializing object:", error);
      throw error;
    }
  }
}
