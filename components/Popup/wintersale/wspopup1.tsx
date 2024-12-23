import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDeviceSize from "../../../utils/useDeviceSize";
import klarnaLogo from "@/public/assets/logos/klarna/Klarnalogo.png";
import affirmLogo from "@/public/assets/logos/klarna/affirm.png";
import newLogo from "@/public/assets/logos/klarna/new.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import { XIcon } from "lucide-react";

const WinterSalePopup1 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const router = useRouter();

  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const overviewTexts = [
    "Titans Pro",
    "KDP Masterclass",
    "Puzzle Tools",
    "Coloring Book App",
    "Bundles",
  ];
  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);
  return (
    <Popup
      contentStyle={{
        padding: 0,
        width: isMobile ? "85%" : "50%",
        borderRadius: "6px",
        maxWidth: "1200px",
      }}
      open={isOpen}
      modal
      nested
    >
      <div>
        <div
          style={{
            borderRadius: "6px 6px 0px 0px",
          }}
          className="winterTheme1"
        >
          <div
            style={{ display: "flex", justifyContent: "end", padding: "8px" }}
          >
            <a
              className=" border cursor-pointer text-black rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
              onClick={close}
            >
              <XIcon />
            </a>
          </div>
          <div className="pb-8 mainHeader">
            <h4 className="text-center font-bold text-white ">
              Special Offer - Flash Sale
            </h4>
            <h4 className="text-center font-semibold text-white  mt-2">
              UP TO 34% OFF
            </h4>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex mb-3 mx-8 mt-8 text-black contentList">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2">
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
                            <stop stop-color="#1a2980" />
                            <stop offset="0.830081" stop-color="#26d0ce" />
                            <stop offset="1" stop-color="#26d0ce" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <h4 className={` listItem  ml-2`}>{text}</h4>
                  </div>
                ))}
              </div>

              <div className="flex justify-center w-full contentList mt-7  ">
                <Link
                  href="/shop"
                  passHref
                  className="mt-5 twButton winterTheme1 p-3 w-fit px-10 text-center winterBanner1 winterThemebt1"
                >
                  <h4 className="Pbutton getInfoBtnText m-0 p-0 text-xl  md:text-4xl">
                    More Information
                  </h4>
                </Link>
              </div>

              {!isMobile ? (
                <div className="flex justify-center w-full newAnnouncement">
                  <div className="flex mr-10 bnpl items-center mt-5 ">
                    <Image
                      src={newLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                      className="w-10 h-auto"
                    />
                    <h4 className=" annoucementText text-small ml-2  font-bold ">
                      Buy Now - Pay Later
                    </h4>
                  </div>

                  <div className="flex mt-3 bnpl_logos ">
                    <Image
                      className="bnpl_logo"
                      src={affirmLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                    />
                    <Image
                      className="bnpl_logo"
                      src={klarnaLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                      style={{ marginLeft: "25px" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full newAnnouncement mt-5">
                  <div className="flex bnpl items-center mr-10 ">
                    <Image
                      src={newLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                      style={{ paddingTop: "4px" }}
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <Image
                      // className="bnpl_logo"
                      src={affirmLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                      style={{
                        marginLeft: "12px",
                        width: "50px",
                        height: "15px",
                      }}
                    />
                    <Image
                      // className="bnpl_logo"
                      src={klarnaLogo.src}
                      alt="See All Segments"
                      width={100}
                      height={100}
                      style={{
                        marginLeft: "17px",
                        width: "50px",
                        height: "15px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default WinterSalePopup1;
