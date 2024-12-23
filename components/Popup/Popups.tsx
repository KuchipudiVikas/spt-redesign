import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  popupKeyOffer,
  popupKeyAffiliate,
  popupKeyFatherDay,
  titansPro,
} from "@/data/constants";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
// import PopupTitansUltra from "./special/titansUltra";
import Targeted from "./targeted";
import { useRouter } from "next/router";
import { getDomainWithoutSubdomain } from "@/utils/common";

// import NewPuzzleToolsPopUp from "./special/NewPuzzleTools";

const SpecialPopUp = dynamic(() => import("./special/amazonPrimeDay"), {
  ssr: false,
});
const BlackFridaypopup = dynamic(() => import("./special/blackfridayPopup"), {
  ssr: false,
});

export default function Popups({ info }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    popupKeyOffer,
    popupKeyAffiliate,
    popupKeyFatherDay,
    titansPro,
  ]);

  const [isOfferPopup, setIsOfferPopup] = useState(false);
  const [isTitansProPopup, setIsTitansProPopup] = useState(false);
  // const [isAffiliatePopup, setIsAffiliatePopup] = useState(false);

  let token = useSession().data?.token || false;

  useEffect(() => {
    // if (typeof window === 'undefined') {
    //   return;
    // }
    try {
      if (cookies[titansPro] === undefined) {
        const hostname = getDomainWithoutSubdomain(
          process.env.NEXT_PUBLIC_API_BASE_URL ||
            "https://selfpublishingtitans.com"
        );
        console.log("hostname", hostname);
        setCookie(
          titansPro,
          JSON.stringify({
            isPopupOpen: true,
          }),
          {
            path: "/",
            maxAge: 60 * 60 * 24, // sec * min * hours * days Expires after 1 days
            // maxAge: 10,
            sameSite: "lax",
            domain: hostname == "localhost" ? hostname : "." + hostname,
            // sameSite: true,
          }
        );
        setIsTitansProPopup(true);
      } else {
        setIsOfferPopup(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [cookies]);

  let currDate: any = new Date();
  let startTime: any = new Date("2024-11-27T00:00:00"); //note :: adjust this accordingly for starting popup
  let endDate = new Date(startTime.getTime());
  endDate.setDate(startTime.getDate() + 7);
  // endDate.setHours(startTime.getHours() + 72);
  let specialPopup = currDate < endDate;

  return (
    <div>
      {/* {isFatherDayPopup && <FatherDayPopup />} */}
      {/* {isOfferPopup && <PopupKDPLimitedOffer />} */}
      {/* {isTitansProPopup && <PopupTitansPro />} */}
      {/* {isAffiliatePopup && <AffiliatePopup />} */}
      {/* {isTitansProPopup &&
        (specialPopup ? <ValentinesDaySalePopup /> : <WinterSalePopup />)} */}
      {/* {showSurveryForm ? (
        <SurveyPopup token={token} />
      ) : (
        isTitansProPopup &&
        (specialPopup ? <ChromeExtensionPopups /> : <WinterSalePopup />)
      )} */}
      {/* {isTitansProPopup &&
        (specialPopup ? (
          <SpecialPopUp endDate={endDate} />
        ) : (
          <Targeted info={info} token={token} />
        ))} */}

      {/* {isTitansProPopup && <BlackFridaypopup endDate={endDate} />} */}

      {/* <BlackFridaypopup endDate={endDate} /> */}
      {/* <SevenBackendKWToolPopup endDate={endDate} /> */}
      {isTitansProPopup && <Targeted token={token} info={info} />}
    </div>
  );
}
