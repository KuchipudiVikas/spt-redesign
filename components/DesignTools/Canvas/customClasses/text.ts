import * as fabric from "fabric";

export class CustomText extends fabric.Textbox {
  constructor(options: any) {
    // Ensure options is an object and pass the text and options separately to the parent constructor
    const { type, ...restOptions } = options; // Exclude the type property
    super(options.text || "", restOptions);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("locked", options.locked || false);
    this.set("selectable", !options.locked);
    this.set("evented", !options.locked);
  }

  // @ts-ignore
  toObject() {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type"),
      locked: this.get("locked"),
      selectable: this.get("selectable"),
      evented: this.get("evented")
    };
  }

  static async fromObject(object: any): Promise<CustomText> {
    // console.log("Starting to deserialize text:", object);
    const options = {
      uid: object.uid,
      name: object.name,
      object_type: object.object_type,
      left: object.left,
      top: object.top,
      scaleX: object.scaleX,
      scaleY: object.scaleY,
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
      text: object.text,
      fontSize: object.fontSize,
      fontFamily: object.fontFamily,
      fontWeight: object.fontWeight,
      fontStyle: object.fontStyle,
      underline: object.underline,
      overline: object.overline,
      linethrough: object.linethrough,
      textAlign: object.textAlign,
      lineHeight: object.lineHeight,
      charSpacing: object.charSpacing,
      fill: object.fill,
      stroke: object.stroke,
      strokeWidth: object.strokeWidth,
      shadow: object.shadow,
      // textBackgroundColor: object.textBackgroundColor,
      width: object.width,
      height: object.height
      // Add any other properties you need to deserialize
    };

    const text = new CustomText(options);

    // Ensure the width and height are set correctly
    text.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY
    });

    // console.log("Text deserialized:", text);
    return text;
  }
}
