import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { checkCountry } from "@/components/Shop/Paypal";
import { createAffiliate } from "@/pages/user/affiliate";
import { useDispatch } from "react-redux";
import {
  setAffiliateData,
  setAffiliateError,
  setAffiliateIsLoading,
} from "@/slices/affiliate";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Create the context
const VisitTrackerContext = createContext({ hasTracked: false });

// Create the provider component
export const VisitTrackerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const affiliateData = useSelector(
    (state: RootState) => state.affiliate.affiliateData
  );
  const excludedCounties = [
    // "BD",
    "NG",
  ];
  const { data: session, status } = useSession(); // Destructure session and status
  const [hasTracked, setHasTracked] = useState(false);

  // Function to track visit once per calendar day
  const trackVisitOncePerDay = async () => {
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (lastVisit !== today && session?.id) {
      try {
        const body = {
          user_id: session.id,
          tool_id: "visit",
        };

        const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;
        await axios.post(base + "/api/usage", body); // Send request to track the visit
        localStorage.setItem("lastVisit", today); // Store today's date
        setHasTracked(true); // Update state to indicate visit is tracked
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    } else {
      setHasTracked(true); // Already tracked today
    }
  };

  useEffect(() => {
    if (status === "authenticated" && !hasTracked) {
      trackVisitOncePerDay(); // Track visit once session is authenticated

      dispatch(setAffiliateIsLoading(true));

      if (!affiliateData) {
        checkCountry()
          .then(async (data) => {
            if (data) {
              if (
                data &&
                data?.country &&
                !excludedCounties.includes(data.country)
              ) {
                const res = await createAffiliate(session.token);
                dispatch(setAffiliateData(res));
                console.log("Affiliate data:", res);
              }
            }
          })
          .catch((error) => {
            setAffiliateError(error);
            console.error("Error checking country:", error);
          })
          .finally(() => {
            dispatch(setAffiliateIsLoading(false));
          });
      }
    }
  }, [status, session, hasTracked]);

  return (
    <VisitTrackerContext.Provider value={{ hasTracked }}>
      {children}
    </VisitTrackerContext.Provider>
  );
};

// Custom hook to use the VisitTrackerContext
export const useVisitTracker = () => useContext(VisitTrackerContext);
