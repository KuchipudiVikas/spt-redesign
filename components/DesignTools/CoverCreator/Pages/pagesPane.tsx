import React, { useContext, useEffect } from "react";
import { CanvasContext } from "@/lib/contexts/canvas";
import { nanoid } from "nanoid";
import { TPage } from "@/lib/models/canvas";
import { CreateBlankBg } from "@/data/page";
import { useState } from "react";
import PageSizesComp from "./pageSizeComp";
import ObjectsTab from "../layers/objects";
import UndoRedoComp from "@/components/DesignTools/Canvas/history";
import ZoomSlider from "@/components/DesignTools/Canvas/utils/ZoomSlider";

interface PagesPanesProps {
  project_id?: string;
  user_id?: string;
}

const adminID = "6323247cdc63d3001ba872e8";

const PagesPane = ({ project_id = "0", user_id = "0" }: PagesPanesProps) => {
  const Canvas = useContext(CanvasContext);

  type TThumbnail = {
    page_id: string;
    thumbnail_data: string;
    updated_on: Date;
  };

  const [thumbnails, setThumbnails] = useState<TThumbnail[]>([]);

  const { pages, setPages, canvas, selectedPage, setSelectedPage } = Canvas || {
    pages: [],
    setPages: () => {},
    canvas: null,
    selectedPage: null,
    setSelectedPage: () => {},
  };

  useEffect(() => {
    generateThumbnails();
  }, [pages]);

  // if (pages?.length === 0) {
  //   const newPage: TPage = {
  //     id: nanoid(),
  //     index: 0,
  //     type: "background",
  //     objects: [CreateBlankBg(6, 9, 300)],
  //     Dimensions: {
  //       width: 6,
  //       height: 9,
  //       units: "in"
  //     }
  //   };
  //   if (setPages) {
  //     setPages([newPage]);
  //   }

  //   if (setSelectedPage) {
  //     setSelectedPage(newPage);
  //   }
  // }

  useEffect(() => {
    if (canvas) {
      if ((pages?.length ?? 0) > 0 && selectedPage !== undefined) {
        if (selectedPage !== null && selectedPage !== undefined) {
          canvas.loadFromJSON(
            {
              objects:
                pages && selectedPage?.index !== undefined
                  ? pages[selectedPage.index]?.objects
                  : null,
            },
            () => {
              canvas.renderAll();
            },
            // @ts-ignore
            (error: any) => {
              console.log("error loading objects", error);
            }
          );
        }
        setTimeout(() => {
          printJson();
        }, 50);
      } else if ((pages?.length ?? 0) === 0) {
      }
    } else {
      console.error("Canvas is not initialized");
    }
  }, [selectedPage, pages, canvas]);

  const addNewPage = (index: number) => {
    // @ts-ignore
    const newPage: TPage = {
      id: nanoid(),
      index: index,
      type: "background",
      objects: [CreateBlankBg(6, 9, 300)],
      Dimensions: {
        width: 6,
        height: 9,
        units: "in",
      },
    };

    if (setPages && pages) {
      const updatedPages = [...pages];
      updatedPages.splice(index, 0, newPage);
      // Update indices
      updatedPages.forEach((page, idx) => (page.index = idx));
      setPages(updatedPages);
    }
    // @ts-ignore
    setSelectedPage(newPage);
  };

  const switchPage = (pageIndex: number) => {
    if (canvas && selectedPage !== undefined) {
      const updatedPages = [...pages];
      if (selectedPage?.index !== undefined) {
        updatedPages[selectedPage.index].objects = canvas.toJSON().objects;
      }

      setPages(updatedPages);

      canvas.clear();

      const newPageObjects = pages[pageIndex].objects;

      // Ensure the 0th object is treated as the background
      if (newPageObjects.length > 0) {
        newPageObjects[0].selectable = false;
        newPageObjects[0].evented = false;
        newPageObjects[0].layerType = "background";
      }

      canvas.loadFromJSON({ objects: newPageObjects }, () => {
        // Ensure custom properties are set correctly
        canvas.getObjects().forEach((obj: any, index: number) => {
          if (index === 0) {
            obj.selectable = false;
            obj.evented = false;
            obj.layerType = "background";
          }
        });
        canvas.renderAll();
      });

      // Switch page
      if (setSelectedPage) {
        setSelectedPage(pages[pageIndex]);
      }
    }
  };

  const printJson = () => {
    canvas?.renderAll();
  };

  const testFunc = () => {
    // console.log("canvas zoom is", canvas?.getZoom());
    console.log("canvas is ", canvas);
  };

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const generateThumbnails = () => {
    // if (!selectedPage) {
    //   return;
    // }
    // const currentPageThumnail = canvas?.toDataURL();
    // // @ts-ignore
    // setThumbnails((prevThumbnails: TThumbnail[]) => {
    //   const existingIndex = prevThumbnails.findIndex(
    //     (thumbnail) => thumbnail.page_id === selectedPage?.id
    //   );
    //   const newThumbnail = {
    //     page_id: selectedPage?.id,
    //     thumbnail_data: currentPageThumnail,
    //     updated_on: new Date()
    //   };
    //   if (existingIndex !== -1) {
    //     const updatedThumbnails = [...prevThumbnails];
    //     // @ts-ignore
    //     updatedThumbnails[existingIndex] = newThumbnail;
    //     return updatedThumbnails;
    //   } else {
    //     return [...prevThumbnails, newThumbnail];
    //   }
    // });
  };

  const renderPagePreviews = () => {
    const previews = [];
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const thumbnail = thumbnails.find((p) => p.page_id === page.id);

      previews.push(
        <div
          key={`page-${i}`}
          className="page-preview-container flex flex-col gap-1 justify-center items-center"
        >
          <button
            className={`border ${
              selectedPage?.index === i
                ? "border-blue-500 border-2"
                : "border-black"
            } `}
            style={{
              width: page.Dimensions.width * 20,
              height: page.Dimensions.height * 20,
              backgroundColor: "#fff",
              backgroundImage: `url(${thumbnail?.thumbnail_data})`,
              backgroundSize: "cover",
            }}
            onClick={() => switchPage(i)}
          ></button>
          <button className="" onClick={() => addNewPage(i + 1)}>
            Add
          </button>
        </div>
      );
    }
    return previews;
  };

  useEffect(() => {
    setTimeout(() => {
      generateThumbnails();
    }, 100);
  }, [selectedPage]);

  const [saveLoading, setSaveLoading] = useState(false);

  async function saveTemplate() {
    try {
      setSaveLoading(true);
      const _content = canvas.toJSON();

      const _body = {
        name: name,
        category: category,
        subcategory: subcategory,
        content: JSON.stringify(_content),
      };

      const res = await fetch(
        `/api/covers/admin/template?project_id=${project_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_body),
        }
      );

      const data = await res.json();
      alert("template saved successfully");
    } catch (error) {
      console.log(error);
      alert("There is an error saving the template");
    } finally {
      setSaveLoading(false);
    }
  }

  return (
    <div className="right-pane flex flex-col  justify-between">
      <div className="w-full  p-2">
        {/* <h1 className="text-xl font-medium">Pages</h1> */}
        <PageSizesComp />
        {/* <div className="flex flex-col mt-5  pb-10 overflow-auto gap-3"> */}
        {/* {renderPagePreviews()} */}
        {/* </div> */}
        {/* <button onClick={() => generateThumbnails()}>Updaate</button> */}
        {/* <ZoomSlider /> */}

        {/* <button onClick={() => toggleGuideLines()}>toggle</button> */}

        {/* <button onClick={() => testFunc()}>Print</button> */}
        {/* <button className="my-2" onClick={() => UpdateProject()}>
          Save
        </button> */}
        <div className="mt-3"></div>
        <ObjectsTab />
      </div>

      {user_id == adminID && (
        <div className="m-3">
          <label>template name</label>
          <input
            type="text"
            value={name}
            className="p-2 px-3 rounded-lg outline-none w-full"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Category</label>
          <input
            type="text"
            value={category}
            className="p-2 px-3 rounded-lg outline-none w-full"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label>Subcategory</label>
          <input
            type="text"
            value={subcategory}
            className="p-2 px-3 rounded-lg outline-none w-full"
            onChange={(e) => setSubcategory(e.target.value)}
          />

          <button
            style={{
              border: "1px solid #ccc",
            }}
            disabled={saveLoading}
            className="p-3 w-full rounded-lg mt-3"
            onClick={() => saveTemplate()}
          >
            {saveLoading ? "loading" : "Save Template"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PagesPane;
