import { useState, useEffect } from "react";

function useRotatingBanner(numberOfBanners: number, key: string) {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const bannerIndex = window.localStorage.getItem(key);
    if (!bannerIndex) {
      window.localStorage.setItem(key, "0");
      setCurrentBanner(0);
    } else {
      if (parseInt(bannerIndex) >= numberOfBanners + 1) {
        setCurrentBanner(0);
        window.localStorage.setItem(key, "1");
      } else {
        setCurrentBanner(parseInt(bannerIndex));
        window.localStorage.setItem(
          key,
          (parseInt(bannerIndex) + 1).toString()
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentBanner;
}

export default useRotatingBanner;
