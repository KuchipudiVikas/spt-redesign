import { useLocalStorage } from "./hooks";
import { popupsIndex } from "./index";
import { useState, useEffect } from "react";
import { getCurrentPopUpDetails } from "./utils";

const Targeted = ({ token, info }) => {
  const [storedValue, setValue] = useLocalStorage("bannerv2", "");
  const [currentSetId, setCurrentSetId] = useLocalStorage("setId", "");
  const [CurrentPopUp, setCurrentPopUp] = useState(null);
  const [showLifeTime, setShowLifeTime] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const notPurchasedList: any = await getCurrentPopUpDetails(token, info);
      if (notPurchasedList == null) return;
      if (notPurchasedList.featuresToShow.length === 0) return;

      const {
        featuresToShow: showFeatures,
        targetUpgrade,
        targetLifeTime,
        id: featureSetId
      } = notPurchasedList;

      if (featureSetId !== currentSetId) {
        setValue("");
        setCurrentSetId(featureSetId);
      }

      const handleFeature = (curr: string) => {
        setValue(curr);
        const currentPopUpToShow = popupsIndex.find(
          (popUp) => popUp.items[0] === curr
        );

        // const currentPopUpToShow = popupsIndex[popupsIndex.length - 1];

        const isUpgrade = targetUpgrade.includes(curr);
        const isLifeTime = targetLifeTime.includes(curr);

        setShowUpgrade(isUpgrade);

        // console.log("current popup", currentPopUpToShow);
        try {
          setCurrentPopUp(currentPopUpToShow.popUpComponent);
        } catch (error) {
          console.log("error", error);
        }
      };

      if (storedValue == "") {
        const curr = notPurchasedList.featuresToShow[0];
        handleFeature(curr);
        return;
      }

      for (let i = 0; i < showFeatures.length; i++) {
        if (storedValue.split(",").pop() === showFeatures[i]) {
          const curr = showFeatures[(i + 1) % showFeatures.length];
          handleFeature(curr);
          break;
        }
      }
    };

    fetchDetails();
  }, [token]);

  return (
    <div>{CurrentPopUp != null && <CurrentPopUp isUpgrade={showUpgrade} />}</div>
  );
};

export default Targeted;
