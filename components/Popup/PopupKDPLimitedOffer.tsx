import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import BubbleTickItem from "../Common/BubbleTickItem";
import useDeviceSize from "../../utils/useDeviceSize";

const PopupKDPLimitedOffer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();

  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const overviewTexts = [
    "80+ Videos",
    "100+ Resources",
    "1200+ Students",
    "Private FB Mastermind",
  ];
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <Popup
      contentStyle={{
        padding: 0,
        width: isMobile ? "85%" : "50%",
        borderRadius: "6px 6px 0 0",
      }}
      open={isOpen}
      modal
      nested
    >
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
              KDP Masterclass
            </p>
            {/* <p className="text-center text-white text-2xl font-extrabold">
              Limited Time Only $147
            </p> */}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex m-8 px-5 text-black">
            <div>
              {overviewTexts.map((text, index) => (
                <BubbleTickItem text={text} key={index} />
              ))}
              <div className="flex justify-center w-full ">
                <Link
                  href="/masterclass"
                  passHref
                  className="mt-5 twButton themeGradient p-3 w-full text-center "
                >
                  <p className="text-xl md:text-4xl">Learn More</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PopupKDPLimitedOffer;
