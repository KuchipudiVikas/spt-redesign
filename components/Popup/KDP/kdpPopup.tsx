import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import BubbleTickItem from "../../Common/BubbleTickItem";
import useDeviceSize from "../../../utils/useDeviceSize";
import Image from "next/image";
import SPS from "./../../../public/assets/images/sps.svg";

const SptBookPopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();

  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  //info
  let headerText = "Self-Publishing Simplified";
  let SubHeaderText = "Paperback, Kindle Unlimited & Kindle eBook";
  const overviewTexts = [
    "Learn the basics of KDP",
    "Learn the basics of Ads",
    "Tips throughout the book",
    "Find out about our journey",
  ];
  const buttonText = "Get It Now";
  const bgThemeClass = "winterTheme5";

  const ThemeGradient: string[] = ["#00dbde", "#fc00ff"];
  const gtagtrackingClass = "winterBanner5";

  //info-end

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
              className="border cursor-pointer text-black rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
              onClick={close}
            >
              X
            </a>
          </div>
          <div className="pb-8 mainHeader">
            <p className="text-center text-white text-xl md:text-4xl font-extrabold">
              {headerText}
            </p>
            <p className="text-center text-white  text-md md:text-2xl font-extrabold mt-2">
              {SubHeaderText}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col md:flex-row">
          <div className="ml-1 md:ml-4 mt-2 md:mt-4 w-36 md:w-64 h-auto">
            <Image src={SPS} width={300} height={300} alt="SPS" />
          </div>
          <div className="flex mb-1 md:mb-3 mx-8 mt-6 md:mt-5  text-black contentList">
            <div>
              <div className="">
                {overviewTexts.map((text, index) => (
                  <div
                    className="flex items-center mt-2 w-fit my-2  contentList"
                    key={index}
                  >
                    <div className="flex items-center w-fit w-10 h-10">
                      <svg
                        width="27"
                        height="25"
                        viewBox="0 0 27 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.6198 0.811523C6.52772 0.811523 0.757812 6.19461 0.757812 12.8115C0.757812 19.4283 6.52772 24.8115 13.6198 24.8115C20.7118 24.8115 26.4817 19.4283 26.4817 12.8115C26.4817 6.19461 20.7119 0.811523 13.6198 0.811523ZM21.0053 10.7846L12.9248 18.3235C12.5812 18.6441 12.1245 18.8205 11.6386 18.8205C11.1528 18.8205 10.6961 18.6441 10.3525 18.3235L6.2342 14.4812C5.89062 14.1607 5.70138 13.7346 5.70138 13.2813C5.70138 12.8279 5.89062 12.4017 6.2342 12.0812C6.57765 11.7606 7.03437 11.5841 7.52035 11.5841C8.0062 11.5841 8.46306 11.7606 8.80651 12.0813L11.6385 14.7234L18.4327 8.38453C18.7763 8.06398 19.233 7.88755 19.7189 7.88755C20.2047 7.88755 20.6615 8.06398 21.005 8.38453C21.7145 9.04643 21.7145 10.1229 21.0053 10.7846Z"
                          fill="url(#paint0_linear_2_875)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2_875"
                            x1="30.0277"
                            y1="9.68178"
                            x2="-0.939434"
                            y2="9.61925"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#6B49FC" />
                            <stop offset="0.830081" stop-color="#DE85FF" />
                            <stop offset="1" stop-color="#E26FF1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <p
                      className = {`listItem font-bold ml-2 md:my-2 text-xxs md:text-2xl`}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full custombutton2 my-2 md:my-5  contentList  ">
          <div className="flex justify-center w-full  contentList">
            <Link
              href="https://a.co/d/2OSa6Oh"
              passHref
              target="_blank"
              className={`custombutton2 twButton themeGradient TitansPro p-3 w-fit px-10 text-center TitansPro`}
            >
              <p className="text-xl md:text-4xl">Get It Now</p>
            </Link>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SptBookPopup;
