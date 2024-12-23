import Link from "next/link";
import Image from "next/image";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import VideoComponent from "./videoComp";
import { Button } from "@/components/ui/button";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { GrapeIcon, XIcon } from "lucide-react";

type Period = "monthly" | "lifetime";

const KwtBundle = ({}) => {
  let heading = "Keyword & Product Tracker Bundle";
  let themeColor = "#8c71fd";

  let buttonConfig = {
    url: "/shop",
    text: "More Information",
    textColor: "#fff",
    bgColor: themeColor,
  };

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "tracker-bundle" + "- popup";

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
          // textAlign={"left"}
          // variant="h6"
          // className={`font-Inter`}
          // fontSize={isMobile ? 25 : 36}
          // fontWeight={800}
          style={{
            fontSize: isMobile ? 25 : 36,
            fontWeight: 800,
            textAlign: "left",
          }}
        >
          {heading}
        </h6>

        <div className="flex gap-2">
          <GrapeIcon color="primary" />
          <h6 className="font-Inter font-bold text-[#5d5d5d]">
            Analytics Made Easy
          </h6>
        </div>

        <div className="xl:grid grid-cols-2 p-3 gap-3  mt-0">
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
        <div className="flex justify-center">
          <Link
            href={buttonConfig.url}
            id={trackingClassName}
            className={`no-outline  pb-3 mt-2 `}
          >
            <Button
              className={`no-outlines text-[20px] mt-1`}
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

export default KwtBundle;
