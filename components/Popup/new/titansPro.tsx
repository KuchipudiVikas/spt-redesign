import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import VideoComponent from "./videoComp";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TitansPro = ({}) => {
  let heading = "Titans Pro";
  let overviewTexts = {
    highlightTexts: [],
    texts: [
      "See all key niche metrics",
      "Niche Score Analysis",
      "BSR on search pages",
      "One click download all data",
    ],
  };
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

  const trackingClassName = "titans pro" + " - popup";

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
            fontSize: 42,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {heading}
        </h6>
        <div className="flex flex-col-reverse xl:grid xl:grid-cols-3 p-3 gap-3 mt-5">
          <div className="grid col-span-1 mt-2 ">
            {overviewTexts.texts.map((text, i) => (
              <HighlightedText
                key={i}
                text={text}
                highlight={overviewTexts.highlightTexts}
                themeColor={themeColor}
              />
            ))}
          </div>
          <div className="col-span-2">
            <div className="">
              <VideoComponent imgSrc={"titans-pro"} />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full  ">
          <Link
            href={buttonConfig.url}
            className={`no-outline pb-3 mt-6 `}
            id={trackingClassName}
          >
            <Button
              className={` no-outline text-[20px] mt-4`}
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

export default TitansPro;

const HighlightedText = ({ text, highlight, themeColor }) => {
  const parts = text.split(new RegExp(`(${highlight.join("|")})`, "gi"));
  return (
    <h6 className=" font-Inter font-bold  my-2  text-[#5d5d5d]">
      {parts.map((part, i) =>
        highlight.includes(part) ? (
          <span key={i} style={{ color: "#" + themeColor }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </h6>
  );
};
