import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Inter } from "next/font/google";
import {
  CalculateSizesForKdpHelper,
  Ecover,
  PaperType,
  Bleed,
} from "@/components/DesignTools/kdp-helper";
import { trimSizes } from "@/data/kdp-helper/kdp-helper";
import { Dimensions } from "@/components/DesignTools/kdp-helper/mesurementsTable";
import { createSvgDataUrl } from "@/components/DesignTools/Canvas/SvgCoverCreator";
import { Label } from "@/components/ui/label";

type TInteriorTypes = "black-and-white" | "premium-color" | "standard-color";

const inter = Inter({ subsets: ["latin"] });

const CoverCreator = forwardRef(function CoverCreator(props, ref) {
  // @ts-ignore
  const {
    // @ts-ignore
    setCoverType: setCoverTypeParent,
    // @ts-ignore
    isAplus: isAPlusBook,
    // @ts-ignore
    // trimSize,
    // // @ts-ignore
    defaultTrimSize,
    // @ts-ignore
    defaultPageCount,
  } = props;

  const [coverType, setCoverType] = useState<Ecover>(Ecover.paperback);
  const [pageCount, setPageCount] = useState(defaultPageCount || 120);
  const [paperType, setPaperType] = useState<PaperType>("white");
  const [_bleed, setBleed] = useState<Bleed>("no-bleed");
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trimSize, setTrimSize] = useState(
    defaultTrimSize || { width: 8.5, height: 11 }
  );

  const [interiorType, setInteriorType] =
    useState<TInteriorTypes>("black-and-white");
  const [paperTypeOptions, setPaperTypeOptions] = useState<PaperType[]>([
    "white",
    "cream",
    "color",
  ]);

  function HandleInteriorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setInteriorType(e.target.value as TInteriorTypes);
    if (e.target.value === "black-and-white") {
      setPaperTypeOptions(["white", "cream"]);
    } else if (e.target.value === "premium-color") {
      setPaperTypeOptions(["white"]);
      setPaperType("color");
    } else {
      setPaperTypeOptions(["white"]);
      setPaperType("color");
    }
  }

  const getCanasImage = async (info: any): Promise<string> => {
    const svgDataUrl = createSvgDataUrl(
      info,
      _bleed,
      pageCount,
      coverType,
      trimSize,
      paperType
    );
    return svgDataUrl;
  };

  async function HandleCalculateDimensions() {
    const props = {
      ecover: coverType,
      trimSize,
      pageCount,
      paperType,
      _bleed,
    };
    // @ts-ignore
    const dimensions = CalculateSizesForKdpHelper(props);
    // @ts-ignore
    setDimensions(dimensions);
    const dataUrl = await getCanasImage(dimensions);

    return [dimensions, dataUrl, pageCount];
  }

  useEffect(() => {
    setTrimSize({ width: 8.5, height: 11 });
  }, [coverType]);

  useImperativeHandle(ref, () => ({
    callLocalFunction: HandleCalculateDimensions,
  }));

  const handleDownloadClick = async () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas?.toDataURL("image/png");

    if (!dataUrl) {
      console.error("Error generating image data URL");
      alert("Error generating image data URL");
      return;
    }

    try {
      const fileName =
        trimSize.width +
        "x" +
        trimSize.height +
        "_" +
        new Date().toLocaleTimeString() +
        ".png";

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image");
    }
  };

  useEffect(() => {
    setCoverTypeParent(coverType);
  }, [coverType]);

  return (
    <main
      className={`flex flex-col items-center justify-between   mt-2 ${inter.className}`}
    >
      <div className="grid w-full  grid-cols-1 md:grid-cols-1">
        <div>
          {!isAPlusBook && (
            <div className="  mt-2 gap-3 mr-2.5">
              <div className="w-full ">
                <Label className="text-label">Cover Type</Label>
                <select
                  value={coverType}
                  onChange={(e) => setCoverType(e.target.value as Ecover)}
                  className="p-2 border border-gray-300 h-[40px] mt-2 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full"
                >
                  <option value="paperback">Paperback</option>
                  <option value="hardcover">Hardcover</option>
                  <option value={"ebook"}>Ebook</option>
                </select>
              </div>

              {coverType != "ebook" && (
                <div className=" w-full flex gap-2">
                  <div className="mt-4 w-full">
                    <Label htmlFor="first_name" className="text-label ">
                      Interior Type
                    </Label>
                    <select
                      value={interiorType}
                      onChange={(e) => HandleInteriorChange(e)}
                      className="p-2  bg-gray-50 border border-gray-300 mt-2  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    >
                      <option value="black-and-white">Black and White</option>
                      <option value="premium-color">Premium Color</option>
                      {coverType == "paperback" && (
                        <option value="standard-color">Standard Color</option>
                      )}
                    </select>
                  </div>
                  <div className="mt-4 w-full">
                    <Label htmlFor="first_name" className="text-label">
                      Paper Type
                    </Label>
                    <select
                      value={paperType}
                      onChange={(e) =>
                        setPaperType(e.target.value as PaperType)
                      }
                      className="p-2 mt-2  bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                    >
                      {paperTypeOptions.map((type, index) => (
                        <option
                          key={index}
                          value={
                            interiorType == "premium-color" ||
                            interiorType == "standard-color"
                              ? "color"
                              : type
                          }
                          // value={
                          //   interiorType == "premium-color" ? "color" : "color"
                          // }
                          // value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4  mr-2.5">
            <Label className="text-label">Trim Size</Label>
            <select
              value={JSON.stringify({
                width: trimSize.width,
                height: trimSize.height,
              })}
              onChange={(e) => {
                const selectedSize = JSON.parse(e.target.value);
                console.log("selected trim size", selectedSize);
                setTrimSize({
                  width: selectedSize.width,
                  height: selectedSize.height,
                });
              }}
              className="p-2 h-[40px] mt-2 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            >
              {trimSizes
                .filter((size) => {
                  if (isAPlusBook) {
                    return size.isAPlusOnly;
                  } else if (size.isAPlusOnly) {
                    return false;
                  } else if (coverType === "hardcover") {
                    return size.isHardCover;
                  } else if (coverType === "ebook") {
                    return size.isEbookOnly;
                  } else if (coverType === "paperback") {
                    return !size.isEbookOnly;
                  }
                  return true;
                })
                .map((size, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      width: size.width,
                      height: size.height,
                    })}
                  >
                    {size.width} x {size.height} {size.units}{" "}
                    {size.isRecommended && "(Recommended)"}
                  </option>
                ))}
            </select>
          </div>
          {coverType != "ebook" && !isAPlusBook && (
            <div className="mt-4  mr-[7px] ">
              <Label htmlFor="first_name" className="text-label">
                Page Count
              </Label>
              <input
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                onBlur={(e) => {
                  const value = parseInt(e.target.value);
                  if (coverType === "hardcover") {
                    if (value < 76) setPageCount(120);
                    else if (value > 550) setPageCount(550);
                  } else if (coverType === "paperback") {
                    if (value < 24) setPageCount(24);
                    else if (value > 800) setPageCount(800);
                  }
                }}
                style={{
                  border: "1px solid #D1D5DB",
                }}
                value={pageCount}
                type="number"
                id="first_name"
                className="h-[40px] border mt-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ml-1  p-2.5"
                placeholder={"24"}
                required
              />
            </div>
          )}

          {/* <button className="mt-5" onClick={() => HandleCalculateDimensions()}>
            Calculate
          </button> */}
          {/* <button
            // disabled={info === null}
            type="button"
            // variant="contained"
            className="mt-4"
            onClick={() => handleDownloadClick()}>
            Download
          </button> */}
          <canvas style={{ display: "none" }} ref={canvasRef}></canvas>
        </div>
      </div>
    </main>
  );
});

export default CoverCreator;
