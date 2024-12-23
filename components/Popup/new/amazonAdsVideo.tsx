import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import BookImage from "@/public/assets/images/sps.svg";
import Image from "next/image";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { XIcon } from "lucide-react";

const AmazonAdsVideo = ({}) => {
  let heading = "Free Amazon Ads Training";

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();

  const trackingClassName = "amazon ads video" + "- popup";

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
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {heading}
        </h6>

        {/* iframe video */}
        <div className="p-3">
          <div className="relative w-full overflow-hidden rounded-lg pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/c-qW-tVeEhU?si=k7mjqW4febX0ZZXg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AmazonAdsVideo;
