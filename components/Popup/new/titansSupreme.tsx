import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import DesignerIcon from "@/public/assets/logos/a.png";
import ColoringBookIcon from "@/public/assets/logos/crayon.png";
import PuzzleIcon from "@/public/assets/logos/puzzle.png";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import {
  ChartAreaIcon,
  FileSearch2,
  HistoryIcon,
  School,
  SearchCheckIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

type Period = "monthly" | "lifetime";

const TitansSupreme = ({ type = "monthly", isUpgrade = false }) => {
  let heading = "Titans Supreme";
  let themeColor = "#8c71fd";

  let buttonConfig = {
    url: "/pricing",
    text: isUpgrade
      ? "More Information"
      : type == "monthly"
      ? "More Information"
      : "More Information",
    textColor: "#fff",
    bgColor: themeColor,
  };

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "titans supreme" + " - popup";

  useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: "popup_impression",
      popup_id: trackingClassName,
    });
  }, []);

  const ResearchToolsSections = [
    {
      title: "Retro Vision",
      icon: <SearchIcon />,
    },
    {
      title: "Deep View",
      icon: <SearchCheckIcon />,
    },
    {
      title: "Product Tracker",
      icon: <ChartAreaIcon />,
    },
    {
      title: "Keyword Tracker",
      icon: <HistoryIcon />,
    },
  ];
  const CreativeToolsSection = [
    {
      title: "Puzzle Tools Bundle",
      icon: (
        <Image
          src={PuzzleIcon.src}
          width={100}
          height={100}
          className="w-6 h-auto"
          alt="puzzle"
        />
      ),
    },
    {
      title: "Coloring Book Maker",
      icon: (
        <Image
          src={ColoringBookIcon.src}
          width={100}
          height={100}
          className="w-6 h-auto"
          alt="puzzle"
        />
      ),
    },
    {
      title: "Digital Titans Designer",
      icon: (
        <Image
          src={DesignerIcon.src}
          width={100}
          height={100}
          className="w-6 h-auto"
          alt="puzzle"
        />
      ),
    },
  ];
  const othersItems = [
    {
      title: "Titans Pro",
      icon: <SearchIcon />,
    },
    {
      title: " Masterclass",
      icon: <School />,
    },
  ];

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
      <div className="pt-6 px-5">
        <h6
          // textAlign={"center"}
          // variant="h6"
          // className={`font-Inter gradient-text`}
          // fontSize={isMobile ? 35 : 42}
          // style={{ lineHeight: 1 }}
          // fontWeight={800}
          style={{
            fontSize: isMobile ? 35 : 42,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          {heading}
        </h6>
        <div style={{ lineHeight: 0.8 }} className="px-3 font-Inter">
          <h6 className="font-Inter mt-2 text-[14px]  text-[#5d5d5d] font-bold">
            Our biggest bundle with the
          </h6>
          <h6 className={`font-Inter text-[#8c71fd] font-bold`}>
            biggest savings
          </h6>
        </div>
        <div className="md:grid grid-cols-3 p-3 gap-3  mt-4">
          <div className="col-span-1 mt-2 flex justify-center flex-col items-start ">
            <div className="">
              {ResearchToolsSections.map((item, index) => (
                <div
                  key={index}
                  className="flex md:py-3  justify-center items-start flex-col"
                >
                  <TextWithIcon icon={item.icon} text={item.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 mt-5 md:mt-2 flex justify-start flex-col items-start ">
            <div className="">
              {CreativeToolsSection.map((item, index) => (
                <div
                  key={index}
                  className="flex md:py-3  justify-center items-start flex-col"
                >
                  <TextWithIcon icon={item.icon} text={item.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 mt-5 md:mt-2 flex justify-start flex-col items-start ">
            <div className="">
              {othersItems.map((item, index) => (
                <div
                  key={index}
                  className="flex md:py-3  justify-center items-start flex-col"
                >
                  <TextWithIcon icon={item.icon} text={item.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <Link
            href={buttonConfig.url}
            className={` no-outline pb-3 mt-2 `}
            id={trackingClassName}
          >
            <Button
              className={` no-outline text-[20px] mt-1`}
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

export default TitansSupreme;

function TextWithIcon({ icon, text }) {
  return (
    <div className="flex gap-4">
      <div>{icon}</div>
      <div>
        <h6 className="text-[#5d5d5d] font-Inter font-bold">{text}</h6>
      </div>
    </div>
  );
}
