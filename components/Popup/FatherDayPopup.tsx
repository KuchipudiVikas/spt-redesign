import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDeviceSize from "../../utils/useDeviceSize";

const FatherDayPopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const [remainingTime, setRemainingTime] = useState("00:00:00:00");
  const countdownDate =
    new Date(
      Date.parse("Mon Jun 12 2023 11:42:03 GMT+0600 (Bangladesh Standard Time)")
    ).getTime() +
    6 * 24 * 60 * 60 * 1000 -
    // this will convert to us time
    -(11 * 60 * 60 * 1000);

  useEffect(() => {
    // Update the countdown every second
    const countdownTimer = setInterval(function () {
      // Get the current date and time
      const now = new Date().getTime();

      // Calculate the remaining time in milliseconds
      const remainingTime = countdownDate - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // Display the countdown in the console or on a webpage
      setRemainingTime(`${days} Days, ${hours} Hours, ${minutes} Minutes`);

      // Check if the countdown has finished
      if (remainingTime < 0) {
        clearInterval(countdownTimer);
        setRemainingTime("00:00:00:00");
        close();
      }
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);
  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <div
      className={`fixed inset-0 flex items-center p-8 md:p-0 justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg md:p-6">
        <div>
          <div
            style={{
              background:
                "linear-gradient(270.11deg, #6B49FC -13.64%, #DE85FF 86.1%, #E26FF1 106.52%)",
              borderRadius: "5.10404px 5.10404px 0px 0px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "end", padding: "8px" }}
            >
              <a
                className="border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
                onClick={close}
              >
                X
              </a>
            </div>
            <div className="pb-8">
              <p className="text-center text-white text-4xl font-extrabold">
                Special Father&apos;s Day Sale
              </p>
              <p className="text-center px-4 text-white text-2xl font-extrabold">
                {remainingTime} Left
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex my-8 px-5 text-black">
              <div>
                <p className="mb-4 text-2xl">
                  Save <span className="font-bold">$50</span> on our KDP
                  Masterclass, <br /> Puzzle Tools, Activity Tools and our
                  Bundles.
                </p>
                <p className="mb-4 text-2xl">
                  Coupon Code:{" "}
                  <code className="bg-gray-100 p-1 md:p-2 rounded font-bold">
                    happydad
                  </code>
                </p>
                <div className="flex justify-center w-full ">
                  <Link
                    href="/shop"
                    passHref
                    className="mt-5 twButton themeGradient p-3 w-full text-center "
                  >
                    <p className="text-xl md:text-4xl">Buy Now</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FatherDayPopup;
