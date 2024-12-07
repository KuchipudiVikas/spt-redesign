import * as fabric from "fabric";

export class CustomGroup extends fabric.Group {
  constructor(objects: fabric.Object[], options: any) {
    super(objects, options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
  }

  // @ts-ignore
  toObject() {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type")
    };
  }

  static async fromObject(object: any): Promise<CustomGroup> {
    // Deserialize the objects within the group
    const objects = await Promise.all(
      object.objects.map((obj: any) => fabric.util.enlivenObjects([obj]))
    );

    const options = {
      ...object,
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
      selectable: object.selectable,
      evented: object.evented
      // Add any other properties you need to deserialize
    };

    const group = new CustomGroup(objects, options);

    // Ensure the scale is set correctly
    group.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY
    });

    return group;
  }
}
