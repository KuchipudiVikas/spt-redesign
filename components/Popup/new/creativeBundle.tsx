import Link from "next/link";
import Image from "next/image";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import { imgIndex } from "../utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type Period = "monthly" | "lifetime";

const CreativeBundle = () => {
  let heading = "Coloring Book Maker And Puzzle Bundle";
  let buttonConfig = {
    url: "/shop",
    text: "More Information",
    textColor: "#ffa800",
    bgColor: "#fff6ec",
  };

  let themeColor = "ffa800";

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const isMobile = false;

  const trackingClassName = "coloring-puzzle-bundle- popup";

  useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: "popup_impression",
      popup_id: trackingClassName,
    });
  }, []);

  return (
    <Popup
      contentStyle={{
        padding: 0,
        width: isMobile ? "85%" : "50%",
        borderRadius: "16px 16px 16px 16px",
        maxWidth: "1200px",
        maxHeight: "90vh",
      }}
      open={isOpen}
      modal
      nested
    >
      <div className="absolute top-0 right-0 p-3">
        <div onClick={close} className="cursor-pointer">
          <XIcon />
        </div>
      </div>
      <div className="p-3 px-5">
        <h6
          // textAlign={"left"}
          // variant="h6"
          // className={`font-Inter `}
          // fontSize={35}
          // fontWeight={800}
          style={{
            color: "#ffa800",
            fontSize: "35px",
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          {heading}
        </h6>
        <div className="grid grid-cols-2 p-3 gap-3 mt-5">
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <Image
              src={imgIndex.puzzleTools.src}
              width={1000}
              height={1000}
              className="w-full h-auto br-16"
              alt={heading}
            />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              All Puzzle Maker Tools
            </h6>
          </div>
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <Image
              src={imgIndex.coloringBook.src}
              width={1000}
              height={1000}
              className="w-full h-auto br-16"
              alt={heading}
            />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Coloring Book Maker
            </h6>
          </div>
        </div>
        <div className="col-span-1 mt-2 flex justify-center br-16 flex-col items-center  ">
          <div className="flex justify-center items-center flex-col">
            <div className="flex gap-1.5">
              <h6 className="text-[#5d5d5d] text-[16px] mt-8 font-bold font-Inter">
                Unleash Your
              </h6>
              <h6 className="text-[#ffa800] text-[16px] mt-8 font-Inter font-extrabold">
                {" "}
                Creativity
              </h6>
            </div>
            <Link
              href={buttonConfig.url}
              id={trackingClassName}
              className={` no-outline  pb-3 mt-0  `}
            >
              <Button
                className={` no-outline font-bold text-[20px] mt-4`}
                id={trackingClassName}
                size="lg"
                style={{
                  backgroundColor: buttonConfig.bgColor,
                  color: buttonConfig.textColor,
                }}
              >
                {"Buy Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CreativeBundle;
