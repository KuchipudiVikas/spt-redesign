import Link from "next/link";
import Image from "next/image";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import { imgIndex } from "./utils";
import VideoComponent from "./new/videoComp";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

const IndividualProductPopup = ({
  heading,
  overviewTexts,
  buttonConfig,
  imageUrl = {},
  themeColor,
  videoUrl = null,
  ga_tracking_id = "",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: "popup_impression",
      popup_id: ga_tracking_id,
    });
  }, []);

  const trackingClassName = ga_tracking_id;
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
        <h4
          className="font-Inter font-bold text-center"
          style={{ fontSize: isMobile ? "35px" : "42px" }}
        >
          {heading}
        </h4>
        <div className="flex flex-col-reverse xl:grid grid-cols-2 p-3 md:mt-5">
          <div className="grid ">
            {overviewTexts.texts.map((text, i) => (
              <HighlightedText
                key={i}
                text={text}
                highlight={overviewTexts.highlightTexts}
                themeColor={themeColor}
              />
            ))}
          </div>
          <div className="flex items-center">
            {videoUrl ? (
              <VideoComponent imgSrc={videoUrl} />
            ) : (
              <Image
                // @ts-ignore
                src={imgIndex[imageUrl.name]}
                alt={heading}
                width={1000}
                height={1000}
                className="w-full h-auto br-16"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href={buttonConfig.url}
            id={trackingClassName}
            className={`  flex w-fit justify-center no-outline my-4 md:mt-6`}
          >
            <Button
              className={` font-bold font-Inter no-outline px-10 text-[20px] `}
              size="lg"
              id={trackingClassName}
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

export default IndividualProductPopup;

const HighlightedText = ({ text, highlight, themeColor }) => {
  if (highlight == undefined || highlight.length === 0)
    return (
      <h4 className=" font-Inter font-bold  my-2.5  text-[#5d5d5d]">{text}</h4>
    );
  const parts = text.split(new RegExp(`(${highlight.join("|")})`, "gi"));
  return (
    <h4 className=" font-Inter font-bold  my-2.5    text-[#5d5d5d]">
      {parts.map((part, i) =>
        highlight.includes(part) ? (
          <span key={i} style={{ color: "#" + themeColor }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </h4>
  );
};

// G-BZ2JTP8WX3
