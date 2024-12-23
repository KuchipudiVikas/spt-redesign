import { useState, useEffect } from "react";

function useCountdown(endDate) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const utcNow = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );

    const utcEndDate = new Date(endDate).getTime(); // Convert endDate to milliseconds
    const difference = utcEndDate - utcNow;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]); // Ensure effect re-runs if endDate changes

  return timeLeft;
}

export default useCountdown;

// Utility function to fetch server time
const fetchServerTime = async () => {
  const response = await fetch("/api/server-time"); // Adjust the API endpoint as needed
  const data = await response.json();
  return new Date(data.serverTime);
};
export function useCountdown2(endDate) {
  const [timeLeft, setTimeLeft] = useState({});
  const [serverTime, setServerTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Fetch server time once when the component mounts
  useEffect(() => {
    const getServerTime = async () => {
      const time = await fetchServerTime();
      setServerTime(time);
      setStartTime(new Date()); // Save client time when server time was fetched
    };

    getServerTime();
  }, []);

  // Function to calculate remaining time
  const calculateTimeLeft = (elapsedTime) => {
    if (!serverTime) return {}; // Return empty object if server time is not set yet

    const now = +new Date(serverTime) + elapsedTime; // Adjust current time using server time + elapsed time
    const difference = +new Date(endDate) - now; // Calculate time difference to the end date

    let timeLeft = {};

    if (difference > 0) {
      const totalHours = Math.floor(difference / (1000 * 60 * 60));
      timeLeft = {
        hours: totalHours,
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // Update countdown every second using local time and the initial server time
  useEffect(() => {
    if (!serverTime || !startTime) return; // Wait until both serverTime and startTime are available

    const timer = setInterval(() => {
      const elapsedTime = +new Date() - +startTime; // Calculate time passed since we fetched server time
      setTimeLeft(calculateTimeLeft(elapsedTime));
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [serverTime, startTime]); // Re-run this effect when serverTime and startTime are set

  return timeLeft;
}
