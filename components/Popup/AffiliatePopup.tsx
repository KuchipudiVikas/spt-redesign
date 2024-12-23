import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import BubbleTickItem from "../Common/BubbleTickItem";
import useDeviceSize from "../../utils/useDeviceSize";
import { useCookies } from "react-cookie";

const AffiliatePopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();

  useEffect(() => {
    // if (typeof window !== "undefined") {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
    // }
  }, [width, height]);

  const overviewTexts = [
    "Refer a Friend & Earn Money",
    "30% Per Sale",
    "Get Paid Monthly",
    "Easy To Get Started",
  ];
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
  };
  if (!isOpen) return null;
  return (
    <div
      className="relative z-[100]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div>
              <div
                style={{
                  background:
                    "linear-gradient(270.11deg, #6B49FC -13.64%, #DE85FF 86.1%, #E26FF1 106.52%)",
                  borderRadius: "5.10404px 5.10404px 0px 0px",
                }}
              >
                <div className="flex justify-end p-2">
                  <a
                    className="border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-lg text-2xl"
                    onClick={close}
                  >
                    X
                  </a>
                </div>
                <div>
                  <p className="text-3xl text-white text-center font-extrabold pb-8">
                    Affiliate Program - Now Open
                  </p>
                </div>
              </div>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <div className="flex m-8 px-5 text-black">
                  <div>
                    {overviewTexts.map((text, index) => (
                      <BubbleTickItem
                        text={text}
                        key={index}
                        textSize="text-2xl"
                      />
                    ))}
                    <div className="flex justify-center w-full ">
                      <Link
                        href="https://affiliates.selfpublishingtitans.com/signup.php"
                        target="_blank"
                        passHref
                        className="mt-5 twButton themeGradient p-3 w-full text-center "
                      >
                        <p className="text-xl md:text-4xl">Join Now</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatePopup;
