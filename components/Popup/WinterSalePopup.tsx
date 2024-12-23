import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
// import WinterSalePopup1 from "./wintersale/wspopup1";
import useDeviceSize from "@/utils/useDeviceSize";
// import WinterSalePopup3 from "./wintersale/wspopup3";
// import WinterSalePopup4 from "./wintersale/wspopup4";
// import WinterSalePopup5 from "./wintersale/wspopup5";
// import WinterSalePopup6 from "./wintersale/wspopup6";
// import WinterSalePopup2 from "./wintersale/wspopup2";
// import WinterSalePopup7 from "./wintersale/wspopup7";
// import WinterSalePopup8 from "./wintersale/wspopup8";
// import PopupTitansUltra from "./special/titansUltra";
import TitansPro from "./TitansPro";
const WinterSalePopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const bannerIndex = window.localStorage.getItem("bannerKeyIndex");
    console.log("current banner is ", bannerIndex);
    if (!bannerIndex) {
      window.localStorage.setItem("bannerKeyIndex", "0");
      setCurrentBanner(0);
    } else {
      if (parseInt(bannerIndex) >= 10) {
        setCurrentBanner(0);
        window.localStorage.setItem("bannerKeyIndex", "1");
      } else {
        setCurrentBanner(parseInt(bannerIndex));
        window.localStorage.setItem(
          "bannerKeyIndex",
          (parseInt(bannerIndex) + 1).toString()
        );
      }
    }
    console.log("bannerKey", currentBanner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // console.log("currentbanner",currentBanner)

  useEffect(() => {
    const isMobileLocal = width <= 576;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <>
      {/* {currentBanner == 0 && <PopupTitansUltra />}
      {currentBanner == 1 && <WinterSalePopup5 />}
      {currentBanner == 2 && <WinterSalePopup6 />}
      {currentBanner == 3 && <WinterSalePopup7 />}
      {currentBanner == 4 && <WinterSalePopup8 />}
      {currentBanner == 6 && <WinterSalePopup2 />}
      {currentBanner == 7 && <WinterSalePopup3 />}
      {currentBanner == 8 && <WinterSalePopup4 />} */}
      {currentBanner == 9 && <TitansPro />}
    </>
  );
};

export default WinterSalePopup;
