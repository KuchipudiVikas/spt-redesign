import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { allFonts, recommendedFonts } from "@/data/page";
import TextLeftIcon from "@/public/images/textleft.png";
import TextCenterIcon from "@/public/images/textcenter.png";
import TextRightIcon from "@/public/images/textright.png";
import Image from "next/image";

import { CanvasContext } from "@/lib/contexts/canvas";

const Index = () => {
  const Canvas = useContext(CanvasContext);
  const [selectionType, setSelectionType] = useState<string | null>(null);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<number>(16);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const { canvas } = Canvas;

  useEffect(() => {
    const handleSelectionCreated = (e: any) => {
      setSelectionType(e.selected[0].type);
      if (e.selected[0].type === "textbox") {
        setFontFamily(e.selected[0].fontFamily || "Arial");
        setFontSize(e.selected[0].fontSize || 16);
        setIsBold(e.selected[0].fontWeight === "bold");
        setIsItalic(e.selected[0].fontStyle === "italic");
        setIsUnderline(e.selected[0].underline);
      }

      if (e.selected[0].type == null) {
        setSelectionType("background");
      }
    };

    const handleSelectionUpdated = (e: any) => {
      setSelectionType(e.selected[0].type);
      if (e.selected[0].type === "textbox") {
        setFontFamily(e.selected[0].fontFamily || "Arial");
      }

      if (e.selected[0].type === "textbox") {
        setFontSize(e.selected[0].fontSize || 16);
        setIsBold(e.selected[0].fontWeight === "bold");
        setIsItalic(e.selected[0].fontStyle === "italic");
        setIsUnderline(e.selected[0].underline);
      }
    };

    const handleSelectionCleared = () => {
      setSelectionType(null);
    };

    if (canvas) {
      canvas.on("selection:created", handleSelectionCreated);
      canvas.on("selection:updated", handleSelectionUpdated);
      canvas.on("selection:cleared", handleSelectionCleared);
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", handleSelectionCreated);
        canvas.off("selection:updated", handleSelectionUpdated);
        canvas.off("selection:cleared", handleSelectionCleared);
      }
    };
  }, [canvas]);

  const updateTextProperty = (
    property: string,
    value: string | React.SetStateAction<number>
  ) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set(property, value);
      canvas?.renderAll();
    }
  };

  const updateFontFamily = (font: string) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set({ fontFamily: font });
      canvas?.renderAll();
      setFontFamily(font);
    }
  };

  const toggleBold = () => {
    updateTextProperty("fontWeight", isBold ? "normal" : "bold");
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    updateTextProperty("fontStyle", isItalic ? "normal" : "italic");
    setIsItalic(!isItalic);
  };

  const changeFontSize = (size: React.SetStateAction<number>) => {
    // @ts-ignore
    if (size < 1) return;
    updateTextProperty("fontSize", size);
    setFontSize(size);
  };

  const toggleUnderline = () => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      // @ts-ignore
      const currentUnderline = !!activeObject.underline;
      activeObject.set("underline", !currentUnderline);
      canvas?.renderAll();
      setIsUnderline(!currentUnderline);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  const alignTextToCenter = () => {
    const activeObject = canvas?.getActiveObject();
    // @ts-ignore
    if (activeObject && activeObject.object_type === "text") {
      activeObject.set({
        textAlign: "center",
      });
      canvas?.renderAll();
    }
  };

  const alignTextToLeft = () => {
    const activeObject = canvas?.getActiveObject();
    // @ts-ignore
    if (activeObject && activeObject.object_type === "text") {
      activeObject.set({
        textAlign: "left",
      });
      canvas?.renderAll();
    }
  };

  const alignTextToRight = () => {
    const activeObject = canvas?.getActiveObject();

    console.log("activeObject", activeObject);

    // @ts-ignore
    if (activeObject && activeObject.object_type === "text") {
      activeObject.set({
        textAlign: "right",
      });
      canvas?.renderAll();
    }
  };

  return (
    <>
      {selectionType === "textbox" && (
        <div className="relative flex gap-2">
          <div className="">
            <button
              style={{ border: "1px solid #ccc", fontFamily: fontFamily }}
              className="border p-1 px-3 flex items-center rounded-md min-w-[100px] text-left"
              onClick={() => setShowPopover(!showPopover)}
            >
              {fontFamily}
            </button>
            {showPopover && (
              <div
                ref={popoverRef}
                style={{
                  border: "1px solid #ccc",
                }}
                className="absolute max-h-[50vh] overflow-y-scroll p-3 mb-2 rounded-lg w-[300px] bg-white border p-2"
              >
                <div>
                  <h4 className="text-[18px] mb-1 font-bold">
                    Recommended Fonts
                  </h4>
                  <hr className="mb-2" />
                  {recommendedFonts.map((font) => (
                    <div
                      key={font}
                      className="cursor-pointer my-1 py-0.5"
                      style={{ fontFamily: font, fontSize: "18px" }}
                      onClick={() => updateFontFamily(font)}
                    >
                      {font}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <h4 className="text-xl mb-1 font-bold">All Fonts</h4>
                  <hr className="mb-2" />
                  {allFonts.map((font) => (
                    <div
                      key={font}
                      className="cursor-pointer my-1 py-0.5"
                      style={{ fontFamily: font, fontSize: "18px" }}
                      onClick={() => updateFontFamily(font)}
                    >
                      {font}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              style={{ fontSize: "13px", border: "1px solid #ccc" }}
              className="w-[50px] border p-1 pr-1 rounded-md"
              value={fontSize}
              onChange={(e) => changeFontSize(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      )}
      {selectionType === "textbox" && (
        <>
          <div className="flex gap-2 items-center">
            <button
              className={`flex justify-center items-center`}
              onClick={toggleBold}
            >
              {isBold ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M260.04-192.11v-576.02h240.61q68.11 0 123.71 42.03 55.6 42.03 55.6 113.99 0 48.13-21.81 77.43-21.8 29.29-45.39 42.48v.72q29.54 12.68 58.37 45.07t28.83 89.52q0 86.61-64.29 125.69-64.28 39.09-127.5 39.09H260.04Zm129.13-116.3h109.98q43.22 0 56.11-22.95 12.89-22.94 12.89-37.77 0-14.83-12.89-37.89-12.89-23.07-58.39-23.07h-107.7v121.68Zm0-234.22h99.46q31.09 0 46.92-16.88 15.84-16.88 15.84-38.6 0-24-17.36-39.36t-43.88-15.36H389.17v110.2Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M315.08-230v-500H483q57.31 0 101.15 36.15Q628-657.69 628-599.77q0 38.69-20.31 67.73-20.31 29.04-50.31 42.58 36.54 10.23 62.04 42.92t25.5 78.85q0 64.38-48.07 101.04Q548.77-230 491-230H315.08Zm51-47.38h122.46q46.46 0 75.04-27.97 28.57-27.96 28.57-65.11 0-37.16-28.57-65.12-28.58-27.96-75.73-27.96H366.08v186.16Zm0-232.62h114.54q39.92 0 67.61-24.69 27.69-24.69 27.69-61.85 0-37.84-28.15-62.08-28.15-24.23-66.69-24.23h-115V-510Z" />
                </svg>
              )}
            </button>
            <button
              className={`flex justify-center items-center`}
              onClick={toggleItalic}
            >
              {!isItalic ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M231.54-230v-44.62h145.38l139.23-410.76H370.77V-730h332.31v44.62H562.31L423.08-274.62h140.77V-230H231.54Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M194.02-192.11v-111h161.44l117.84-353.3H315.46v-111h411v111H585.02l-117.85 353.3h137.85v111h-411Z" />
                </svg>
              )}
            </button>
            <button
              className={`flex justify-center mt-0.5 items-center`}
              onClick={toggleUnderline}
            >
              {isUnderline ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M194.5-100.87v-91h571v91h-571ZM480-268.04q-105.78 0-165.37-64.92-59.59-64.91-59.59-172.97v-333.11h113.29v337.67q0 55.52 28.83 89.69Q426-377.52 480-377.52t82.84-34.16q28.83-34.17 28.83-89.69v-337.67h113.29v333.11q0 108.06-59.59 172.97-59.59 64.92-165.37 64.92Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M227.69-190v-40h504.62v40H227.69ZM480-317.69q-85.62 0-134.31-50.31T297-504.62v-302.3h45.31v303.69q0 65.23 36.46 103.31 36.46 38.07 101.23 38.07 64.77 0 101.23-38.07 36.46-38.08 36.46-103.31v-303.69H663v302.3q0 86.31-48.69 136.62T480-317.69Z" />
                </svg>
              )}
            </button>
          </div>
          {canvas?.getActiveObject()?.type === "textbox" && (
            <div className="flex my-2 p-2 gap-2">
              <button
                style={{
                  fontWeight: "normal",
                }}
                className="flex justify-start  items-center gap-2 text-[16px]"
                onClick={() => alignTextToLeft()}
              >
                <Image
                  src={TextLeftIcon.src}
                  alt="left"
                  width={14}
                  height={14}
                />
              </button>
              <button
                style={{
                  fontWeight: "normal",
                }}
                className="flex justify-start items-center gap-2 text-[14px]"
                onClick={() => alignTextToCenter()}
              >
                <Image
                  src={TextCenterIcon.src}
                  alt="left"
                  width={14}
                  height={14}
                />
              </button>
              <button
                style={{
                  fontWeight: "normal",
                }}
                className="flex justify-start items-center gap-2 text-[14px]"
                onClick={() => alignTextToRight()}
              >
                <Image
                  src={TextRightIcon.src}
                  alt="left"
                  width={14}
                  height={14}
                />
              </button>
              {/* <button onClick={alignTextToJustify}>Justify</button> */}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Index;
