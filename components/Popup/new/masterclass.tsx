import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import VideoComponent from "./videoComp";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import {
  Facebook,
  FileIcon,
  GraduationCap,
  VideoIcon,
  XIcon,
} from "lucide-react";
const Masterclass = ({}) => {
  let heading = "KDP Masterclass";

  let buttonConfig = {
    url: "/masterclass",
    text: "More Information",
    textColor: "#000000",
    bgColor: "#f7e540",
  };

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { size } = useCustomDeviceSize();

  const trackingClassName = "masterclass" + "- popup";

  let items = [
    {
      icon: <VideoIcon />,
      text: "80+ videos",
    },
    {
      icon: <FileIcon />,
      text: "100+ resources",
    },
    {
      icon: <Facebook />,
      text: "Private Facebook group",
    },
    {
      icon: <GraduationCap />,
      text: "Over 1,300 students trained",
    },
  ];

  let isMobile = size == EScreenSize.Mobile;
  let isDesktop = size == EScreenSize.Desktop;
  let isTablet = size == EScreenSize.Tablet;

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
        width: size == EScreenSize.Mobile ? "90%" : isTablet ? "85%" : "50%",
        borderRadius: "16px 16px 16px 16px",
        maxWidth: "90vw",
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
          // className={`font-Inter`}
          // fontSize={isMobile ? 32 : 45}
          // fontWeight={800}
          style={{
            fontSize: isMobile ? 32 : 45,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {heading}
        </h6>
        <div className="flex flex-col-reverse xl:grid grid-cols-1 xl:grid-cols-3 p-3 gap-3 mt-5">
          <div className="grid col-span-1 mt-2 ">
            {items.map((item, index) => {
              return (
                <div className="flex gap-4 my-2" key={index}>
                  {item.icon}
                  <h6 className=" font-Inter font-bold text-[#5d5d5d]">
                    {item.text}
                  </h6>
                </div>
              );
            })}
          </div>
          <div className="col-span-2">
            <div className="">
              <VideoComponent imgSrc={"masterclass"} />
            </div>
          </div>
        </div>
        <div className="flex justify-center  ">
          <Link
            href={buttonConfig.url}
            className={`no-outline  pb-3 mt-6 `}
            id={trackingClassName}
          >
            <Button
              className={`no-outline text-[20px] font-extrabold font-Inter mt-4`}
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

export default Masterclass;
