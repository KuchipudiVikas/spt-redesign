import { useEffect, useState } from "react";

export enum EScreenSize {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
  Large = "large",
  ExtraLarge = "extra large",
}

const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height];
};

export default useDeviceSize;

export const useCustomDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [size, setSize] = useState("desktop");

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [isExtraLarge, setIsExtraLarge] = useState(false);

  const [atLeastMobile, setAtLeastMobile] = useState(false);
  const [atLeastTablet, setAtLeastTablet] = useState(false);
  const [atLeastDesktop, setAtLeastDesktop] = useState(false);
  const [atLeastLarge, setAtLeastLarge] = useState(false);

  const handleWindowResize = () => {
    const width = window.innerWidth;
    setWidth(width);
    setHeight(window.innerHeight);

    // Determine the size of the display
    if (width <= 480) {
      setSize(EScreenSize.Mobile);
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
      setIsLarge(false);
      setIsExtraLarge(false);

      setAtLeastMobile(true);
      setAtLeastTablet(false);
      setAtLeastDesktop(false);
      setAtLeastLarge(false);
    } else if (width <= 768) {
      setSize(EScreenSize.Tablet);
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
      setIsLarge(false);
      setIsExtraLarge(false);

      setAtLeastMobile(true);
      setAtLeastTablet(true);
      setAtLeastDesktop(false);
      setAtLeastLarge(false);
    } else if (width <= 1024) {
      setSize(EScreenSize.Desktop);
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
      setIsLarge(false);
      setIsExtraLarge(false);

      setAtLeastMobile(true);
      setAtLeastTablet(true);
      setAtLeastDesktop(true);
      setAtLeastLarge(false);
    } else if (width <= 1440) {
      setSize(EScreenSize.Large);
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(false);
      setIsLarge(true);
      setIsExtraLarge(false);

      setAtLeastMobile(true);
      setAtLeastTablet(true);
      setAtLeastDesktop(true);
      setAtLeastLarge(true);
    } else {
      setSize(EScreenSize.ExtraLarge);
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(false);
      setIsLarge(false);
      setIsExtraLarge(true);

      setAtLeastMobile(true);
      setAtLeastTablet(true);
      setAtLeastDesktop(true);
      setAtLeastLarge(true);
    }
  };

  useEffect(() => {
    // Component is mounted and window is available
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    // Unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return {
    width,
    height,
    size,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isExtraLarge,
    atLeastMobile,
    atLeastTablet,
    atLeastDesktop,
    atLeastLarge,
  };
};
