import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import BookImage from "@/public/assets/images/sps.svg";
import Image from "next/image";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, XIcon } from "lucide-react";

const SptBook = ({}) => {
  let heading = "Self Publishing Simplified";

  let buttonConfig = {
    url: "https://a.co/d/2s50Owj",
    text: "Get It Now",
    textColor: "#ffffff",
    bgColor: "#4e0565",
  };

  let texts = [
    "Learn the basics of KDP",
    "Learn the basics of Amazon Ads",
    "Tips throughout the book",
    "Find out about our journey",
  ];

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "spt book" + "- popup";

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
          // fontSize={isMobile ? 22 : 45}
          // fontWeight={800}
          style={{
            fontSize: isMobile ? 22 : 45,
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {heading}
        </h6>
        <div className="flex flex-col md:grid md:grid-cols-2 p-3 gap-3 mt-5">
          <div className="col-span-1 flex justify-center flex-col items-center">
            <div className="">
              <Image
                width={1000}
                height={1000}
                src={BookImage.src}
                alt="self publishign simplified"
                className=" w-44 h-auto"
              />
            </div>
            <h6 className="font-Inter font-bold mt-6 text-[#5d5d5d]">
              Paperback & Kindle eBook
            </h6>
            {/* <h6
              textAlign={"center"}
              className="font-Inter text-[13px] font-bold px-4 mt-1 text-[#000000]"
            >
              Our simple A-Z guide on how we have sold 170,000 books on Amazon
            </h6> */}
          </div>
          <div className="grid col-span-1 mt-2">
            {texts.map((text, index) => {
              return (
                <div className="flex gap-5 my-2" key={index}>
                  <CheckCircleIcon className="text-[#af09ca]" />
                  <h6 className="font-Inter font-bold text-[#5d5d5d]">
                    {text}
                  </h6>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center  ">
          <Link
            href={buttonConfig.url}
            className={` no-outline  pb-3 md:mt-6 `}
            id={trackingClassName}
          >
            <Button
              className={` no-outline text-[20px] font-extrabold font-Inter mt-4`}
              id={trackingClassName}
              style={{ color: "#ffffff", background: "#af09ca" }}
              size="lg"
            >
              {buttonConfig.text}
            </Button>
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default SptBook;
