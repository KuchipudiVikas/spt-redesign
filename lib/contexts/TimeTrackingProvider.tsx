import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

// Create the context
const TimeTrackingContext = createContext(null);

const getOrCreateUniqueUsingCookie = () => {
  const cookieName = "unique_id_for_statistics";
  let uniqueId = localStorage.getItem(cookieName);

  if (!uniqueId) {
    uniqueId = Date.now().toString() + "-" + v4();
    try {
      localStorage.setItem(cookieName, uniqueId);
    } catch (error) {
      console.error("Error setting unique ID:", error);
    }
  }

  return uniqueId;
};

// Provider component
export const TimeTrackingProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession(); // Destructure data and status

  const [uniqueId, setUniqueId] = useState(null);

  // Function to log the time spent on a page
  const logTimeSpent = (start, end) => {
    const timeSpent = (end - start) / 1000; // Time in seconds
    console.log(`User spent ${timeSpent} seconds on ${router.pathname}`);

    const fullURL = new URL(window.location.href);

    try {
      const URL =
        process.env.NEXT_PUBLIC_STATISTICS_API_URL + "/api/v1/pages/log-time";
      const data = {
        page_route: fullURL,
        start_time: Math.floor(start / 1000), // Convert to seconds
        end_time: Math.floor(end / 1000), // Convert to seconds
        total_time: Math.floor(timeSpent * 1e9), // Total time in nanoseconds
        user_id: status === "authenticated" ? session?.id : null, // Ensure user ID is logged only when authenticated
        unique_id: uniqueId,
      };

      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to log time: ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.error("Error logging time:", error);
        });
    } catch (error) {
      console.log("Error logging time:", error);
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const endTime = new Date().getTime();
      if (startTime) logTimeSpent(startTime, endTime); // Log the time spent when navigating away
      setStartTime(new Date().getTime()); // Reset start time for the new page
    };

    const handleBeforeUnload = () => {
      const endTime = new Date().getTime();
      if (startTime) logTimeSpent(startTime, endTime); // Log time before page close or refresh
    };

    setStartTime(new Date().getTime()); // Set the start time on page load

    router.events.on("routeChangeStart", handleRouteChangeStart);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router, startTime]); // Add startTime to dependencies to avoid stale value

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUniqueId(getOrCreateUniqueUsingCookie());
  }, []);

  return (
    <TimeTrackingContext.Provider value={{ startTime }}>
      {children}
    </TimeTrackingContext.Provider>
  );
};

// Custom hook to access the context
export const useTimeTracking = () => {
  return useContext(TimeTrackingContext);
};
