import { useRouter } from "next/router";
import { useState } from "react";
import { TObject } from "@/lib/models/canvas";
import { CreateBlankBg, CreateImage, CreateClipPath } from "@/data/page";
import { trimSizes } from "@/data/kdp-helper/kdp-helper";
import { Button } from "@/components/ui/button";

interface CreateProps {
  userID: string;
  closeHandler?: () => void;
}

type Template = "none" | "book-cover";

export const Create = ({ userID, closeHandler = () => {} }: CreateProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const [name, setName] = useState<string>("Untitled");
  const [template, setTemplate] = useState<Template>("book-cover");
  const [loading, setLoading] = useState<boolean>(false);
  const [coverType, setCoverType] = useState<string>("");
  const [isAPlusBook, setIsAPlusBook] = useState<boolean>(true);

  async function createProject() {
    setLoading(true);
    let page_width = trimSize.width / 96;
    let page_height = trimSize.height / 96;
    let CoverData;

    // if (!name) {
    //   alert("Please enter a name for the project");
    //   return;
    // }

    let _objects: TObject[] = [];

    const data = {
      version: "6.0.2",
      objects: [CreateBlankBg(page_width, page_height, 96), ..._objects],
      clipPath: CreateClipPath(0, 0, page_width * 96, page_height * 96),
    };

    // console.log("return", data);

    // console.log("data", data, page_height, page_width, trimSize);

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
        template: "a+content",
        page_width: page_width,
        page_height: page_height,
      }),
    });

    const result = await response.json();
    setLoading(false);
    router.push(`/A+-content-template-generator/${result.id}`);
    closeHandler();
  }

  const [trimSize, setTrimSize] = useState(
    trimSizes.filter((size) => size.isAPlusOnly)[0]
  );

  return (
    <div>
      {true && (
        <div className=" ">
          <div className="w-[550px]">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-2">Create A+ Template</h2>
            <hr className="my-3" />
            <div className="flex font-space flex-col">
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

              <div className="mt-4 font-space">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Trim Size
                </label>
                <select
                  value={JSON.stringify(trimSize)}
                  onChange={(e) => setTrimSize(JSON.parse(e.target.value))}
                  className="p-2 h-[40px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
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
                      <option key={index} value={JSON.stringify(size)}>
                        {size.width} x {size.height} {size.units}{" "}
                        {size.isRecommended && "(Recommended)"}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <div
                className="relative ml-2 bg-white border rounded-lg border-gray-300"
                style={{
                  width: "500px",
                  height: "220px",
                  border: "1px solid #ccc",
                }}
              >
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    width: `${(trimSize.width / 96) * 30}px`,
                    height: `${(trimSize.height / 96) * 30}px`,
                    top: "50%",
                    left: "50%",
                    background: "#eee",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #bbb",
                  }}
                >
                  <span className="text-sm font-space text-gray-700">
                    {trimSize.width} x {trimSize.height} {trimSize.units}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex mt-4 justify-center">
              <Button
                onClick={() => createProject()}
                className="bg-primary  transition-all px-4 py-2 w-[160px] text-[16px] rounded-full text-white"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
