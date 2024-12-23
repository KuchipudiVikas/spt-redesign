import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import useDeviceSize from "../../../utils/useDeviceSize";
import { useCookies } from "react-cookie";
import useRotatingBanner from "@/hooks/useRotatingBanner";
const Etsypopup1 = dynamic(() => import("./etsypopup1"), {
  ssr: false,
});
const BsrGraphPopup = dynamic(() => import("./bsrgraphPopup"), {
  ssr: false,
});
const BsrEtsyPopup = dynamic(() => import("./bsrandetsyPopup"), {
  ssr: false,
});

const ChromeExtensionPopups = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const numberOfBanners = 3;
  const uniqueKey = "EA_bannerKeyIndex";
  const currentBanner = useRotatingBanner(numberOfBanners - 1, uniqueKey);

  useEffect(() => {
    const isMobileLocal = width <= 576;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <>
      {/* { && <Etsypopup1 />} */}
      {currentBanner == 0 && <Etsypopup1 />}
      {currentBanner == 1 && <BsrEtsyPopup />}
      {currentBanner == 2 && <BsrGraphPopup />}
    </>
  );
};
export default ChromeExtensionPopups;
