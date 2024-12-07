import React from "react";
import { useContext } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { useRef, useState } from "react";
import type { TObject } from "@/lib/models/canvas";
import { CreateBlankBg, CreateImage } from "@/data/page";
import { CreateClipPath } from "@/data/page";
import { useRouter } from "next/router";
import CoverCreator from "@/components/DesignTools/CoverCreator/coverop";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { Create } from "@/components/DesignTools/acontent/create";

type Template = "none" | "book-cover" | "a+content";
interface CreatePopupProps {
  //   showPopUp: boolean;
  //   setShowPopUp: (showPopUp: boolean) => void;
}

const CreatePopup: React.FC<CreatePopupProps> = ({}) => {
  const Canvas = useContext(CanvasContext);

  const onClose = () => {
    Canvas.setShowCreatePopup(false);
  };

  const router = useRouter();

  const [name, setName] = useState<string>("Untitled");
  const [template, setTemplate] = useState<Template>(
    router.pathname.includes("book-cover-creator") ? "book-cover" : "a+content"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [coverType, setCoverType] = useState<string>("");
  const [isAPlusBook, setIsAPlusBook] = useState<boolean>(
    router.pathname.includes("book-cover-creator") ? false : true
  );

  useEffect(() => {
    setTemplate(
      router.pathname.includes("book-cover-creator")
        ? "book-cover"
        : "a+content"
    );
    setIsAPlusBook(
      router.pathname.includes("book-cover-creator") ? false : true
    );
  }, [router.pathname]);

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

    if (
      template == "book-cover" &&
      coverType != "ebook" &&
      template == "book-cover"
    ) {
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
      // console.log("data url is", dataUrl);

      if (!dataUrl) {
        // @ts-ignore
        [data, dataUrl, pageCount] = childRef.current.callLocalFunction();
      }

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
        user_id: Canvas.userID,
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
    onClose();
    setLoading(false);
    window.open(`/book-cover-creator/${result.id}`, "_blank");
  }
  const childRef = useRef(null);

  if (Canvas.showCreatePopup === false) return null;

  const closeHanlder = () => {
    Canvas.setShowCreatePopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          {!isAPlusBook ? (
            <h2 className="text-xl font-bold "> Create New Cover</h2>
          ) : (
            <div></div>
          )}
          <button onClick={onClose} className="">
            <MdClose size={24} />
          </button>
        </div>
        {isAPlusBook ? (
          <Create userID={Canvas.userID} closeHandler={closeHanlder} />
        ) : (
          <div className=" ">
            <div className="w-[500px]">
              {/* <span className="close" onClick={togglePopup}>
              &times;
            </span> */}
              <hr className="my-3" />
              <div className="flex  flex-col">
                {/* <div className="flex flex-col">
                <label htmlFor="">Book cover name</label>
                <input
                  type="text"
                  className="input-text h-[40px] py-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Book cover name"
                />
              </div> */}

                {/* <div className="flex mtmt-1.5 flex-col">
                <label htmlFor="">Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as Template)}
                  name=""
                  className="h-[40px]"
                  id="">
                  <option value="none">Blank</option>
                  <option value="book-cover">Book Cover</option>
                </select>
              </div> */}
                {template == "book-cover" && (
                  <CoverCreator
                    // @ts-ignore
                    setCoverType={setCoverType}
                    isAplus={isAPlusBook}
                    ref={childRef}
                  />
                )}
              </div>
              <div className="flex mt-4 justify-center">
                <button
                  onClick={() => createProject()}
                  // onClick={() => callChildFunction()}
                  className="bg-[#ad28da] hover:bg-[#e62eff] transition-all px-4 py-2 w-[160px] text-[16px] rounded-full text-white"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePopup;
