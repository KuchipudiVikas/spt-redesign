import Image from "next/image";
import { Inter } from "next/font/google";
import {
  CalculateSizesForKdpHelper,
  Ecover,
  PaperType,
  Bleed,
  TInteriorTypes,
} from "@/lib/kdp-helper";
import { useEffect, useState } from "react";
import { trimSizes } from "@/data/kdp-helper/kdp-helper";
import { GetServerSidePropsContext } from "next";
import HintWrapper from "@/utils/hint";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });
import {
  Dimensions,
  Measurement,
  MeasurementTable,
} from "@/components/Tools/kdp-helper/mesurementsTable";
import Canvas from "@/components/Tools/kdp-helper/Canvas";
import MainLayout from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";

export default function Index() {
  const [coverType, setCoverType] = useState<Ecover>(Ecover.paperback);
  const [trimSize, setTrimSize] = useState({ width: 5.5, height: 8.5 });
  const [pageCount, setPageCount] = useState(76);
  const [paperType, setPaperType] = useState<PaperType>("white");
  const [bleed, setBleed] = useState<Bleed>("no-bleed");
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

  function HandleBookTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCoverType(e.target.value as Ecover);
  }

  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  function HandleCalculateDimensions() {
    const props = {
      ecover: coverType,
      trimSize,
      pageCount,
      paperType,
      bleed,
      interiorType,
    };
    // @ts-ignore
    const dimensions = CalculateSizesForKdpHelper(props);
    // @ts-ignore
    setDimensions(dimensions);
  }

  useEffect(() => {
    setTrimSize({ width: 5.5, height: 8.5 });
    setPageCount(76);
  }, [coverType]);

  console.log("paper type ", paperType, interiorType);

  return (
    <MainLayout
      meta={{
        title: "KDP Cover Template Generator",
        description:
          "Generate a cover template for your Kindle Direct Publishing book. Enter the details of your book and get the dimensions of the cover.",
        keywords: "KDP Cover Template Generator, KDP Cover Template, KDP Cover",
      }}
      Title={
        <PageTitle title="KDP Cover Template Generator" />
        // <></>
      }
      info={{}}
      Body={
        <main
          className={`flex  flex-col mb-10 items-center justify-between px-4 md:px-24 pt-10 ${inter.className}`}
        >
          <div className="grid gap-10  grid-cols-1  md:grid-cols-2">
            <div className="sp-container p-6 rounded-3xl border light-border">
              <h3 className="text-[20px] mb-5 font-bold  text-gray-700 mb- flex items-center gap-2">
                Book Details
              </h3>
              <div className="mb-5">
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Cover Type
                  </label>
                  <select
                    value={coverType}
                    onChange={(e) => setCoverType(e.target.value as Ecover)}
                    className="p-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  >
                    <option value="paperback">Paperback</option>
                    <option value="hardcover">Hardcover</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Interior Type
                  </label>
                  <select
                    value={interiorType}
                    onChange={(e) => HandleInteriorChange(e)}
                    className="p-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  >
                    <option value="black-and-white">Black and White</option>
                    <option value="premium-color">Premium Color</option>
                    {coverType == "paperback" && (
                      <option value="standard-color">Standard Color</option>
                    )}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Paper Type
                  </label>
                  <select
                    value={paperType}
                    onChange={(e) => setPaperType(e.target.value as PaperType)}
                    className="p-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
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

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Trim Size (inches)
                  </label>
                  <select
                    value={JSON.stringify(trimSize)}
                    onChange={(e) => setTrimSize(JSON.parse(e.target.value))}
                    className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    {trimSizes
                      .filter(
                        (size) => coverType !== "hardcover" || size.isHardCover
                      )
                      .map((size, index) => (
                        <option key={index} value={JSON.stringify(size)}>
                          {size.width} x {size.height}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Page Count
                  </label>
                  <input
                    onChange={(e) => setPageCount(parseInt(e.target.value))}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (coverType === "hardcover") {
                        if (value < 76) setPageCount(76);
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder={"24"}
                    required
                  />
                </div>
                <HintWrapper hint="Click the button to get the dimensions of the cover.">
                  <Button
                    className="mt-5 w-full mb-6 md:w-full  text-[16px] rounded-full  "
                    onClick={() => HandleCalculateDimensions()}
                  >
                    Calculate
                  </Button>
                </HintWrapper>
              </div>
              <MeasurementTable measurements={dimensions} />
            </div>
            <Canvas
              info={dimensions}
              pageCount={pageCount}
              paperType={paperType}
              trimSize={trimSize}
              bleed={bleed === "bleed" ? true : false}
              bindingType={coverType}
            />
          </div>
        </main>
      }
    />
  );
}
