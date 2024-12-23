import React, { useEffect, useState } from "react";

interface ICounterProps {
  endDate: Date;
}

const Counter: React.FC<ICounterProps> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    let now = new Date();
    const nowUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    const difference = endDate.getTime() - nowUTC;

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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <div className=" flex flex-col-reverse mt-3  xl:grid grid-cols-1 md:grid-cols-1 justify-center items-center">
      <div
        style={{ border: "1px solid #fd4c4c" }}
        className="flex items-center w-full br-16  flex-col"
      >
        <div className=" font-Inter  grid grid-cols-4 gap-2 ">
          <div className="">
            <div className="text-2xl font-Inter br-16  flex flex-col px-3 py-2   bg-white items-center ">
              <h6 className="font-Inter text-[#fd4c4c]">
                {/* @ts-ignore */}
                {timeLeft.days}
              </h6>
              <h6>Days</h6>
            </div>{" "}
          </div>
          <div className="">
            <div className="text-2xl  flex px-3 py-2 br-16  bg-white flex-col items-center">
              <h6 className="font-Inter text-[#fd4c4c]">
                {/* @ts-ignore */}
                {timeLeft.hours}
              </h6>
              <h6>Hours</h6>
            </div>{" "}
          </div>
          <div className="">
            <div className="">
              <div className="text-2xl flex  px-3 py-2  br-16  bg-white flex-col items-center">
                <h6 className="font-Inter text-[#fd4c4c]">
                  {/* @ts-ignore */}
                  {timeLeft.minutes}
                </h6>
                <h6>Minutes</h6>
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-2xl px-3 py-2   br-16  bg-white flex flex-col items-center">
              <h6 className="font-Inter text-[#fd4c4c]">
                {/* @ts-ignore */}
                {timeLeft.seconds}
              </h6>
              <h6>Seconds</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
