import { useState, useEffect, useRef, useContext } from "react";
import { TPageSize, pageSizes } from "@/data/pageSizes";
import { CanvasContext } from "@/lib/contexts/canvas";

interface PageSizesCompProps {}

export default function PageSizesComp({}: PageSizesCompProps) {
  const [currentPageSize, setCurrentPageSize] = useState<TPageSize | null>();
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const dpi = 96;

  const Canvas = useContext(CanvasContext);

  const { canvas, selectedPage } = Canvas || {
    canvas: null,
  };

  const handlePageSizeChange = (size: TPageSize) => {
    // if (canvas) {
    //   canvas.setWidth(size.width * dpi);
    //   canvas.setHeight(size.height * dpi);
    //   canvas.renderAll();
    // }
    setCurrentPageSize(size);
    if (Canvas?.setSelectedPage) {
      // @ts-ignore
      Canvas?.setSelectedPage({ ...Canvas.selectedPage, Dimensions: size });
    }
  };

  const handleCustomPageSizeChange = () => {
    const customSize: TPageSize = {
      width: customWidth,
      height: customHeight,
      units: "in",
      Label: "Custom",
    };
    handlePageSizeChange(customSize);
  };

  useEffect(() => {
    setCurrentPageSize({
      width: selectedPage?.Dimensions.width ?? 6,
      height: selectedPage?.Dimensions.height ?? 9,
      units: selectedPage?.Dimensions.units ?? "in",
      Label: "",
    });
  }, [Canvas?.selectedPage]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const popoverRef = useRef(null);

  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (popoverRef.current && !popoverRef.current?.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <h4 className="text-sm font-medium"> Cover Size: </h4>
        <div
          onClick={() => togglePopover()}
          className="text-sm  p-1 px-2 underline  cursor-pointer"
        >
          {currentPageSize?.width.toFixed(2)} x{" "}
          {currentPageSize?.height.toFixed(2)} {currentPageSize?.units}
        </div>
      </div>

      {/* <div>
        {isPopoverOpen && (
          <div className="popover" ref={popoverRef}>
            <div className="popover-header text-[16px]">Page Size</div>
            <div className="flex flex-col gap-2">
              {pageSizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handlePageSizeChange(size);
                    togglePopover();
                  }}
                  className={`border ${
                    currentPageSize?.Label === size.Label
                      ? "border-blue-500 border-1"
                      : "border"
                  } text-sm`}>
                  {size.Label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <h4 className="text-sm">Custom Page Size:</h4>
                <div className="flex w-full gap-2">
                  <input
                    type="number"
                    placeholder="Width (in)"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    className="border p-1 text-sm w-full"
                  />
                  x
                  <input
                    type="number"
                    placeholder="Height (in)"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Number(e.target.value))}
                    className="border p-1 text-sm w-full"
                  />
                </div>
                <button
                  onClick={() => {
                    handleCustomPageSizeChange();
                    togglePopover();
                  }}
                  className="border p-1 text-sm mt-2">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
