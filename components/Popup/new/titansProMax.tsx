import Link from "next/link";
import Image from "next/image";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { imgIndex } from "../utils";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TitansProMax = ({ type = "monthly", isUpgrade = false }) => {
  console.log(isUpgrade, "is Upgrade pro max");
  let heading = "Titans Pro Max";
  let buttonConfig = {
    url: "/pricing",
    text: "More Information",
    textColor: "#fff",
    bgColor: "#da77ef",
  };

  let themeColor = "ffa800";

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "titans pro max" + " - popup";

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
        width: isMobile ? "90%" : isTablet ? "85%" : "50%",
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
          // textAlign={"center"}
          // variant="h6"
          // className={`font-Inter gradient-text`}
          // fontSize={isMobile ? 35 : 42}
          // fontWeight={800}
          style={{
            fontSize: isMobile ? 35 : 42,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {heading}
        </h6>
        <div className="md:grid grid-cols-2 p-3 gap-3 md:mt-5">
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <Image
              src={imgIndex.puzzleTools.src}
              width={1000}
              height={1000}
              className=" w-40 md:w-full h-auto br-16"
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
              className="w-40 md:w-full h-auto br-16"
              alt={heading}
            />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Coloring Book Maker
            </h6>
          </div>

          <div className="md:hidden col-span-1 mt-2 flex justify-center flex-col items-center ">
            <Image
              src={imgIndex.designer.src}
              width={1000}
              height={1000}
              className="w-40 md:w-full h-auto br-16"
              alt={heading}
            />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Digital Titans Designer
            </h6>
          </div>

          <div className="col-span-1 mt-4 md:mt-2 flex flex-col bg-[#fffaf4] justify-center br-16  items-center  ">
            <div className="flex justify-center items-center flex-col">
              <h6 className="text-[#5d5d5d] md:text-[20px] font-bold">
                Everything Titans Pro +
              </h6>
              <h6
                style={{ lineHeight: 1 }}
                className="md:text-[24px] text-[#ffa800] font-Inter font-bold"
              >
                Creative Tools
              </h6>
              <Link
                href={buttonConfig.url}
                className={` no-outline  pb-3 mt-5  `}
                id={trackingClassName}
              >
                <Button
                  className={`no-outline text-[20px] md:mt-4`}
                  size="lg"
                  style={{
                    backgroundColor: buttonConfig.bgColor,
                    color: buttonConfig.textColor,
                  }}
                >
                  {isUpgrade
                    ? "Upgrade Now"
                    : type == "monthly"
                    ? "Subscribe Now"
                    : "Buy Now"}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden col-span-1 mt-2 md:flex justify-center flex-col items-center ">
            <Image
              src={imgIndex.designer.src}
              width={1000}
              height={1000}
              className="w-40 md:w-full h-auto br-16"
              alt={heading}
            />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Digital Titans Designer
            </h6>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default TitansProMax;
