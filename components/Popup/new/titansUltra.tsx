import Link from "next/link";
import Image from "next/image";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import VideoComponent from "./videoComp";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import {
  AreaChartIcon,
  SearchCheckIcon,
  SearchIcon,
  XIcon,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TitansUltra = ({ type = "monthly", isUpgrade }) => {
  let heading = "Titans Ultra";
  let themeColor = "#8c71fd";

  let buttonConfig = {
    url: "/pricing",
    text: isUpgrade
      ? "More Information"
      : type == "monthly"
      ? "Learn More"
      : "Learn More",
    textColor: "#fff",
    bgColor: themeColor,
  };

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "titans ultra" + "- popup";

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
          // fontSize={42}
          // fontWeight={800}
          style={{
            fontSize: "42px",
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {heading}
        </h6>
        <div className="hidden xl:grid grid-cols-2 p-3 gap-3  mt-0">
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <VideoComponent imgSrc={"trvm"} />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Retro Vision
            </h6>
          </div>
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <VideoComponent imgSrc={"deep-view"} />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Deep View
            </h6>
          </div>
          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <VideoComponent imgSrc={"asin-tracker"} />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Product Tracker
            </h6>
          </div>

          <div className="col-span-1 mt-2 flex justify-center flex-col items-center ">
            <VideoComponent imgSrc={"kwt"} />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Keyword Tracker
            </h6>
          </div>
        </div>
        <div className="xl:hidden grid md:grid-cols-2 p-3 gap-3  mt-0">
          <div className="col-span-1 mt-2 flex justify-start  gap-2 items-center ">
            <SearchIcon />
            {/* <VideoComponent imgSrc={"trvm"} /> */}
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Retro Vision
            </h6>
          </div>
          <div className="col-span-1 mt-2 flex justify-start  gap-2   items-center ">
            {/* <VideoComponent imgSrc={"deep-view"} /> */}
            <SearchCheckIcon />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Deep View
            </h6>
          </div>
          <div className="col-span-1 mt-2 flex justify-start gap-2  items-center ">
            {/* <VideoComponent imgSrc={"asin-tracker"} /> */}
            <AreaChartIcon />
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Product Tracker
            </h6>
          </div>

          <div className="col-span-1 mt-2 flex justify-start gap-2 items-center ">
            <History />
            {/* <VideoComponent imgSrc={"kwt"} /> */}
            <h6 className="text-[#5d5d5d] font-Inter mt-2 font-bold">
              Titans Keyword Tracker
            </h6>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href={buttonConfig.url}
            id={trackingClassName}
            className={`no-outline pb-3 mt-2 `}
          >
            <Button
              className={`no-outline text-[20px] mt-1`}
              size="lg"
              style={{
                backgroundColor: buttonConfig.bgColor,
                color: buttonConfig.textColor,
              }}
            >
              {buttonConfig.text}
            </Button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default TitansUltra;
