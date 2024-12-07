import React from "react";
import { useState } from "react";
import CoverCreator from "../coverop";
import { useRouter } from "next/router";
import { CreateBlankBg, CreateImage } from "@/data/kdp-helper/page";
import { CreateClipPath } from "@/data/kdp-helper/page";
import { useRef } from "react";
import type { TObject } from "@/lib/models/canvas";
import { Button } from "@/components/ui/button";

import { PaperType } from "@/lib/kdp-helper";

interface CreateProps {
  userID: string;
}

type Template = "none" | "book-cover";
type TInteriorTypes = "black-and-white" | "premium-color" | "standard-color";

const Create = ({ userID }: CreateProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const [name, setName] = useState<string>("Untitled");
  const [template, setTemplate] = useState<Template>("book-cover");
  const [loading, setLoading] = useState<boolean>(false);
  const [coverType, setCoverType] = useState<string>("");
  const [isAPlusBook, setIsAPlusBook] = useState<boolean>(false);

  const [interiorType, setInteriorType] =
    useState<TInteriorTypes>("black-and-white");
  const [paperTypeOptions, setPaperTypeOptions] = useState<PaperType[]>([
    "white",
    "cream",
    "color",
  ]);

  let _objects: TObject[] = [];

  async function createProject() {
    let page_width = 6;
    let page_height = 9;
    let pageCount = 120;
    let CoverData;

    if (!name) {
      // alert("Please enter a name for the project");
      // return;
      // name = "Untitled";
    }

    if (template == "book-cover" && coverType != "ebook") {
      let data, dataUrl;

      try {
        setLoading(true);
        // @ts-ignore
        CoverData = (await childRef?.current.callLocalFunction()) || [];
        [data, dataUrl, pageCount] = CoverData;
        // console.log("v121 ", data, dataUrl);
        if (!data || !dataUrl) {
          throw new Error("Invalid data returned from callLocalFunction");
        }
      } catch (error) {
        console.error("Error calling local function:", error, CoverData);
        return;
      }

      // downloadImage(dataUrl, "cover-image.png");

      page_width = parseFloat(data.fullCover.width.inches.toFixed(2));
      page_height = parseFloat(data.fullCover.height.inches.toFixed(2));

      // return;
      // console.log("data url is", dataUrl);

      if (!dataUrl) {
        // @ts-ignore
        [data, dataUrl, pageCount] = childRef.current.callLocalFunction();
      }

      // console.log("data url is", dataUrl);

      // return;

      const Image = CreateImage(
        dataUrl,
        0,
        0,
        page_width * 96,
        page_height * 96,
        "cover_template",
        "Cover Template",
        true
      );
      // @ts-ignore
      _objects = [Image];
    }

    if (coverType == "ebook") {
      page_width = 1600 / 96;
      page_height = 2400 / 96;
    }

    const data = {
      version: "6.0.2",
      objects: [CreateBlankBg(page_width, page_height, 96), ..._objects],
      clipPath: CreateClipPath(0, 0, page_width * 96, page_height * 96),
    };

    // // // return;
    // return;

    const response = await fetch("/api/project/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        user_id: userID,
        data: JSON.stringify(data),
        thumbnail_uri: "",
        template,
        cover_type: coverType,
        page_width: page_width,
        page_height: page_height,
        page_count: pageCount,
      }),
    });

    const result = await response.json();
    // const create = await fetch("/api/canvas/create");
    // const res = await create.json();
    // console.log("headless", res, create);
    // console.log(result);

    // console.log("result", result);
    // return;

    router.push(`/book-cover-creator/${result.id}`);
  }

  const childRef = useRef(null);

  return (
    <div>
      {true && (
        <div className=" ">
          <div className="w-[500px]">
            <span className="close" onClick={togglePopup}></span>
            <div className="flex  flex-col">
              {template == "book-cover" && (
                <CoverCreator
                  // @ts-ignore
                  setCoverType={setCoverType}
                  isAplus={isAPlusBook}
                  ref={childRef}
                  defaultPageCount={120}
                />
              )}
            </div>
            <div className="flex mt-4 justify-center">
              <Button
                onClick={() => createProject()}
                className=" transition-all px-4 py-6 mt-4 w-full text-[16px] rounded-full text-white"
              >
                {loading ? "Creating..." : "Create Cover"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
