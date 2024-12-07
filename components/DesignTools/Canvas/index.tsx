import { useContext, useEffect, useRef } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import TopBarOptions from "@/components/DesignTools/CoverCreator/TopOptionsBar";
import { useState } from "react";
import * as fabric from "fabric";
import { CustomText } from "./customClasses/text";
import { CustomImage } from "./customClasses/image";
import { handleObjectMoving, handleAfterRender } from "./snapping";
// import ApplyCustomControls from "./customControls";
import { ApplyCustomControls } from "./controls";
import { fetchProject } from "./api";
import LoadingBar from "./LoadingBarCustom";
import ZoomSlider from "./utils/ZoomSlider";
// @ts-ignore
import { debounce } from "lodash";
import { useCallback } from "react";
import { classRegistry } from "fabric";
import {
  CustomRect,
  CustomPath,
  CustomPolygon,
  CustomCircle,
} from "./customClasses/shapes";
import DrawGuidLines from "./utils/guides";

classRegistry.setClass(CustomImage, "Image");
classRegistry.setClass(CustomRect, "Rect");
classRegistry.setClass(CustomText, "Textbox");
classRegistry.setClass(CustomPath, "Path");
classRegistry.setClass(CustomPolygon, "Polygon");
classRegistry.setClass(CustomCircle, "Circle");

fabric.FabricObject.prototype.transparentCorners = false;
fabric.FabricObject.prototype.cornerColor = "blue";
fabric.FabricObject.prototype.cornerStyle = "circle";

const FabricComponent = ({
  project_id,
  userID,
}: {
  project_id: string;
  userID: string;
}) => {
  const canvasRef = useRef(null);
  const _canvas = useContext(CanvasContext);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.5);
  const [projectLoading, setProjectLoading] = useState(false);
  const [canvasLoading, setCanvasLoading] = useState<boolean>(false);
  const [ScrollX, setScrollX] = useState(0);

  const lastPosX = useRef(0);
  const lastPosY = useRef(0);

  const initPageSize = {
    width: 6,
    height: 9,
  };
  const dpi = 96;

  useEffect(() => {
    _canvas.setUserID(userID);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      _canvas?.setCanvas(canvas);

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      canvas.setDimensions({
        width: wrapper.clientWidth,
        height: wrapper.clientHeight,
      });

      const pageWidth = initPageSize.width * dpi;
      const pageHeight = initPageSize.height * dpi;

      canvas.on("object:added", (e) => {
        if (e.target) {
          // @ts-ignore
          if (e.target.object_type === "crop-rect") {
            return;
          }
          ApplyCustomControls(e.target, canvas);
        }
      });

      // ------------------------------

      fetchProject({
        project_id,
        userID,
        setProjectLoading,
      }).then((project) => {
        const pageWidth = project.page_width * dpi;
        const pageHeight = project.page_height * dpi;

        const data = JSON.parse(project.data);

        _canvas?.setProjectInfo({
          projectID: project.id,
          projectName: project.name,
          page_width: project.page_width,
          page_height: project.page_height,
          cover_type: project.cover_type,
          page_count: project.page_count,
          template: project.template,
        });

        if (_canvas) {
          // @ts-ignore
          _canvas?.setSelectedPage({
            id: project.id,
            index: 0,
            type: "cover",
            objects: data.objects,
            Dimensions: {
              width: project.page_width,
              height: project.page_height,
              units: "in",
            },
          });
        }

        _canvas?.setProjectID(project.id);

        setCanvasLoading(true);
        canvas
          .loadFromJSON(
            data,
            () => {
              canvas.renderAll();
              console.log("canvas loading loaded successfully");
            },
            // @ts-ignore
            (error: any) => {
              console.log("error loading objects", error);
            }
          )
          .then(() => {
            setCanvasLoading(false);
            canvas.renderAll();
          });

        setTimeout(() => {
          canvas.renderAll();
        }, 100);

        const wrapperWidth = wrapper.clientWidth - 180;
        const wrapperHeight = wrapper.clientHeight - 180;
        const zoomX = wrapperWidth / pageWidth;
        const zoomY = wrapperHeight / pageHeight;
        const zoom = Math.min(zoomX, zoomY);

        canvas.setZoom(zoom);
        setZoomLevel(zoom);

        const vpt = canvas.viewportTransform;
        if (vpt) {
          vpt[4] = (canvas.getWidth() - pageWidth * zoom) / 2;
          vpt[5] = (canvas.getHeight() + 58 - pageHeight * zoom) / 2;
          canvas.requestRenderAll();
        }
      });

      const CanvasClipPath = new fabric.Rect({
        left: (canvas.getWidth() - pageWidth) / 2,
        top: (canvas.getHeight() - pageHeight) / 2,
        width: pageWidth,
        height: pageHeight,
        absolutePositioned: true,
      });

      canvas.clipPath = CanvasClipPath;

      // const handleMouseDown = (event: fabric.IEvent<MouseEvent>) => {
      //   console.log("mouse down event", event);
      //   if (event.e.shiftKey && event.e.key === "T") {
      //     const pointer = canvas.getPointer(event.e);
      //     const text = new fabric.Textbox("New Text", {
      //       left: pointer.x,
      //       top: pointer.y,
      //       fontSize: 20,
      //       fill: "#000"
      //     });
      //     canvas.add(text);
      //     canvas.setActiveObject(text);
      //     canvas.renderAll();
      //   }
      // };

      // canvas.on("mouse:down", handleMouseDown);

      // DrawGuidLines(canvas);

      return () => {
        // canvas.off("mouse:down", handleMouseDown);

        canvas.dispose();
      };
    }
  }, [project_id]);

  const HandleZoom = useCallback(
    debounce((opt: fabric.TPointerEventInfo<WheelEvent>) => {
      const delta = opt.e.deltaY;

      if (!_canvas?.canvas) return;
      setZoomLevel((prevZoomLevel) => {
        if (!_canvas?.canvas) return prevZoomLevel;

        let zoom = _canvas?.canvas?.getZoom();
        zoom *= 0.999 ** delta;
        zoom = Math.round(zoom * 100) / 100;

        if (_canvas && _canvas.canvas) {
          if (delta > 0) {
            // Zooming out
            const pageObject = _canvas.canvas
              .getObjects()
              // @ts-ignore
              .find((obj) => obj.object_type === "page");

            fabric.util.animate({
              startValue: _canvas.canvas.getZoom(),
              endValue: zoom,
              duration: 10,
              onChange: (value) => {
                _canvas.canvas.zoomToPoint(
                  // @ts-ignore
                  { x: opt.e.offsetX, y: opt.e.offsetY },
                  value
                );
                _canvas.canvas.requestRenderAll();
              },
            });
          } else {
            // Zooming in
            fabric.util.animate({
              startValue: _canvas.canvas.getZoom(),
              endValue: zoom,
              duration: 10,
              onChange: (value) => {
                _canvas.canvas.zoomToPoint(
                  // @ts-ignore
                  { x: opt.e.offsetX, y: opt.e.offsetY },
                  value
                );
                _canvas.canvas.requestRenderAll();
              },
            });
          }
        }
        return zoom;
      });
    }, 20),
    [_canvas]
  );

  useEffect(() => {
    if (!_canvas?.canvas) return;

    const canvas = _canvas.canvas;

    canvas.on("mouse:wheel", function (opt) {
      HandleZoom(opt);

      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    const handleMouseDown = (opt: { e: any }) => {
      const evt = opt.e;
      if (evt.altKey === true) {
        setIsDragging(true);
        canvas.selection = false;
        lastPosX.current = evt.clientX;
        lastPosY.current = evt.clientY;
      } else {
        setIsDragging(false);
      }
    };

    const handleMouseMove = (opt: { e: any }) => {
      if (isDragging) {
        const e = opt.e;
        const vpt = canvas.viewportTransform;

        if (vpt) {
          vpt[4] += e.clientX - lastPosX.current;
          vpt[5] += e.clientY - lastPosY.current;
          setScrollX(vpt[4]);
          canvas.requestRenderAll();
          lastPosX.current = e.clientX;
          lastPosY.current = e.clientY;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      canvas.selection = true;
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        setIsDragging(false);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [_canvas, isDragging]);

  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;

      const logDimensions = () => {
        setCanvasWidth(wrapper.clientWidth);
        setCanvasHeight(wrapper.clientHeight);
      };

      logDimensions();

      const resizeObserver = new ResizeObserver(() => {
        logDimensions();
      });

      resizeObserver.observe(wrapper);

      return () => {
        resizeObserver.unobserve(wrapper);
      };
    }
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (_canvas?.canvas) {
      _canvas.canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    if (!_canvas?.canvas) return;

    const canvas = _canvas.canvas;
    // @ts-ignore
    const page = canvas.getObjects().find((obj) => obj.object_type === "page");

    if (!page) return;

    const pageWidth = _canvas.selectedPage?.Dimensions.width * 96;
    const pageHeight = _canvas.selectedPage?.Dimensions.height * 96;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperWidth = wrapper.clientWidth - 180;
    const wrapperHeight = wrapper.clientHeight - 180;
    const zoomX = wrapperWidth / pageWidth;
    const zoomY = wrapperHeight / pageHeight;
    const zoom = Math.min(zoomX, zoomY);

    canvas.setZoom(zoom);
    setZoomLevel(zoom);

    const centerX = (canvas.getWidth() - pageWidth * zoom) / 2;
    const centerY = (canvas.getHeight() + 58 - pageHeight * zoom) / 2;

    // Update the borderRect dimensions and position
    page.set({
      // left: centerX / zoom,
      // top: centerY / zoom,
      width: pageWidth,
      height: pageHeight,
      // scaleX: zoom,
      // scaleY: zoom
    });

    // page.setCoords();

    // Update the clipPath dimensions and position
    if (canvas.clipPath) {
      canvas.clipPath.set({
        left: zoom,
        top: zoom,
        width: pageWidth,
        height: pageHeight,
        // scaleX: zoom,
        // scaleY: zoom
      });
      canvas.clipPath.setCoords();
    }

    // Apply the zoom level and center the canvas view
    const vpt = canvas.viewportTransform;
    if (vpt) {
      vpt[4] = centerX;
      vpt[5] = centerY;
      canvas.setViewportTransform(vpt);
    }

    // Center the canvas within its container
    const container = canvas.getElement().parentNode;
    if (container) {
      // @ts-ignore
      container.scrollLeft = centerX;
      // @ts-ignore
      container.scrollTop = centerY;
    }

    canvas.renderAll();
  }, [_canvas.selectedPage]);

  useEffect(() => {
    if (_canvas?.canvas) {
      const handleObjectMovingWrapper = (e: any) =>
        handleObjectMoving(e, _canvas, true);
      const handleAfterRenderWrapper = () => handleAfterRender(_canvas, true);

      const handleObjectSelectedWrapper = () => {
        handleAfterRender(_canvas, false);
      };

      _canvas.canvas.on("object:moving", handleObjectMovingWrapper);
      _canvas.canvas.on("after:render", handleAfterRenderWrapper);
      _canvas.canvas.on("selection:created", handleObjectSelectedWrapper);

      return () => {
        if (_canvas?.canvas) {
          _canvas.canvas.off("object:moving", handleObjectMovingWrapper);
          _canvas.canvas.off("after:render", handleAfterRenderWrapper);
          _canvas.canvas.off("selection:created", handleObjectSelectedWrapper);
        }
      };
    }
  }, [_canvas.canvas, _canvas?.isSnappingOn]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      try {
        const activeObject = _canvas.canvas.getActiveObject();
        const activeObjects = _canvas.canvas.getActiveObjects();

        switch (true) {
          case e.key === "Delete" || e.key === "Backspace":
            if (activeObject) {
              _canvas.canvas.remove(activeObject);
              _canvas.canvas.discardActiveObject();
              _canvas.canvas.renderAll();
            } else if (activeObjects.length > 0) {
              activeObjects.forEach((obj) => {
                _canvas.canvas.remove(obj);
              });
              _canvas.canvas.discardActiveObject();
              _canvas.canvas.renderAll();
            }
            break;

          case (e.ctrlKey || e.metaKey) && e.key === "d":
            e.preventDefault();
            if (activeObject) {
              const clone = await activeObject.clone();
              clone.set({
                left: activeObject.left + 100,
                top: activeObject.top + 100,
                evented: true,
              });
              _canvas.canvas.add(clone);
              _canvas.canvas.setActiveObject(clone);
              _canvas.canvas.renderAll();
            }
            break;

          case e.shiftKey && e.key.toLowerCase() === "g":
            e.preventDefault();
            _canvas.setShowGuideLines((prev) => !prev);
            break;

          case e.shiftKey && e.key.toLowerCase() === "c":
            e.preventDefault();
            _canvas.RecenterCanvas();
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error handling keydown event:", error);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [_canvas.canvas]);

  useEffect(() => {
    const drawGuidelines = async () => {
      try {
        if (_canvas.canvas && _canvas.showGuideLines) {
          await DrawGuidLines(_canvas);
        }
      } catch (error) {
        console.error("Error drawing guidelines:", error);
      }
    };

    const clearGuidelines = () => {
      if (_canvas.canvas) {
        _canvas.canvas.renderAll();
      }
    };

    if (_canvas.showGuideLines) {
      drawGuidelines();

      const handleCanvasUpdate = () => {
        drawGuidelines();
      };

      _canvas?.canvas?.on("object:modified", handleCanvasUpdate);
      _canvas?.canvas?.on("after:render", handleCanvasUpdate); // Use after:render for viewport changes

      return () => {
        _canvas?.canvas?.off("object:modified", handleCanvasUpdate);
        _canvas?.canvas?.off("after:render", handleCanvasUpdate);
      };
    } else {
      clearGuidelines();
    }
  }, [_canvas.showGuideLines, _canvas.canvas]);

  return (
    <>
      {/* <LoadingBar
        isLoading={projectLoading || canvasLoading}
        title={projectLoading ? "Fetching Project Data" : "Preparing Canvas"}
      /> */}
      <div className="editor-canvas-container">
        <TopBarOptions />
        <div className=""></div>
        <div className="canvas-wrapper " ref={wrapperRef}>
          <canvas
            id="fabric-canvas"
            ref={canvasRef}
            style={{
              display: projectLoading ? "none" : "block",
            }}
            className="editor-canvas  "
          ></canvas>
        </div>
        {/* <CustomScrollbar
          contentWidth={
            _canvas?.canvas?.getZoom() * _canvas?.canvas?.clipPath?.width
          }
          ScrollX={ScrollX}
          viewportWidth={_canvas?.canvas?.width}
        /> */}

        <ZoomSlider />
      </div>
    </>
  );
};

export default FabricComponent;
