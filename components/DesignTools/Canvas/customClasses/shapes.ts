import * as fabric from "fabric";

export class CustomRect extends fabric.Rect {
  constructor(options: any) {
    super(options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("borderColor", options.borderColor || "");
    this.set("borderStyle", options.borderStyle || "");
    this.set("borderWidth", options.borderWidth || 0);
    this.set("locked", options.locked || false);
    this.set("angle", options.angle || 0);
  }

  // @ts-ignore
  toObject() {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type"),
      borderColor: this.get("borderColor"),
      borderStyle: this.get("borderStyle"),
      borderWidth: this.get("borderWidth"),
      locked: this.get("locked"),
      angle: this.get("angle"),
    };
  }

  static async fromObject(object: any): Promise<CustomRect> {
    // console.log("Starting to deserialize rect:", object);
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
      locked: object.locked,
      selectable: object.locked == true ? false : true,
      evented: object.locked == true ? false : true,
      borderColor: object.borderColor,
      borderStyle: object.borderStyle,
      borderWidth: object.borderWidth,
      width: object.width,
      height: object.height,
      fill: object.fill,

      // Add any other properties you need to deserialize
    };

    const rect = new CustomRect(options);

    // Ensure the width and height are set correctly
    rect.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY,
    });

    // console.log("Rect deserialized:", rect);
    return rect;
  }
}

export class CustomCircle extends fabric.Circle {
  constructor(options: any) {
    super(options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("borderColor", options.borderColor || "");
    this.set("borderStyle", options.borderStyle || "");
    this.set("borderWidth", options.borderWidth || 0);
    this.set("locked", options.locked || false);
    this.set("selectable", options.selectable || true);
    this.set("evented", options.evented || true);
  }

  // @ts-ignore
  toObject() {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type"),
      borderColor: this.get("borderColor"),
      borderStyle: this.get("borderStyle"),
      borderWidth: this.get("borderWidth"),
      locked: this.get("locked"),
      selectable: this.get("selectable"),
      evented: this.get("evented"),
    };
  }

  static async fromObject(object: any): Promise<CustomCircle> {
    // console.log("Starting to deserialize circle:", object);
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
      locked: object.locked,
      selectable: object.locked == true ? false : true,
      evented: object.locked == true ? false : true,
      borderColor: object.borderColor,
      borderStyle: object.borderStyle,
      borderWidth: object.borderWidth,
      radius: object.radius,
      fill: object.fill,

      // Add any other properties you need to deserialize
    };

    const circle = new CustomCircle(options);

    // Ensure the scaleX and scaleY are set correctly
    circle.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY,
    });

    // console.log("Circle deserialized:", circle);
    return circle;
  }
}

export class CustomPolygon extends fabric.Polygon {
  constructor(points: fabric.Point[], options: any) {
    super(points, options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("borderColor", options.borderColor || "");
    this.set("borderStyle", options.borderStyle || "");
    this.set("borderWidth", options.borderWidth || 0);
    this.set("locked", options.locked || false);
    this.set("selectable", options.selectable || true);
    this.set("evented", options.evented || true);
  }

  // @ts-ignore
  toObject() {
    return {
      ...super.toObject(),
      uid: this.get("uid"),
      name: this.get("name"),
      object_type: this.get("object_type"),
      borderColor: this.get("borderColor"),
      borderStyle: this.get("borderStyle"),
      borderWidth: this.get("borderWidth"),
      locked: this.get("locked"),
      selectable: this.get("selectable"),
      evented: this.get("evented"),
    };
  }

  static async fromObject(object: any): Promise<CustomPolygon> {
    // console.log("Starting to deserialize polygon:", object);
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
      locked: object.locked,
      selectable: object.locked == true ? false : true,
      evented: object.locked == true ? false : true,
      borderColor: object.borderColor,
      borderStyle: object.borderStyle,
      borderWidth: object.borderWidth,
      points: object.points,
      fill: object.fill,

      // Add any other properties you need to deserialize
    };

    const polygon = new CustomPolygon(object.points, options);

    // Ensure the scaleX and scaleY are set correctly
    polygon.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY,
    });

    // console.log("Polygon deserialized:", polygon);
    return polygon;
  }
}

export class CustomPath extends fabric.Path {
  constructor(path: string, options: any) {
    super(path, options);
    this.set("uid", options.uid || "");
    this.set("name", options.name || "");
    this.set("object_type", options.object_type || "");
    this.set("locked", options.locked || false);
    this.set("selectable", options.selectable || true);
    this.set("evented", options.evented || true);
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
      evented: this.get("evented"),
    };
  }

  static async fromObject(object: any): Promise<CustomPath> {
    // console.log("Starting to deserialize path:", object);
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
      locked: object.locked,
      selectable: object.locked == true ? false : true,
      evented: object.locked == true ? false : true,
      path: object.path,
      fill: object.fill,

      // Add any other properties you need to deserialize
    };

    const path = new CustomPath(object.path, options);

    // Ensure the scaleX and scaleY are set correctly
    path.set({
      scaleX: object.scaleX,
      scaleY: object.scaleY,
    });

    // console.log("Path deserialized:", path);
    return path;
  }
}
