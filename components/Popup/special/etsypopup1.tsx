import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDeviceSize from "../../../utils/useDeviceSize";
import Image from "next/image";
import klarnaLogo from "@/public/assets/logos/klarna/Klarnalogo.png";
import affirmLogo from "@/public/assets/logos/klarna/affirm.png";
import newLogo from "@/public/assets/logos/klarna/new.jpg";
import { useRouter } from "next/router";
import BsrGraphImage from "@/public/assets/images/bsrGraphImage.jpg";
import EtsyImage from "@/public/assets/images/etsyImage.jpg";

export const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check2"
      viewBox="0 0 16 16"
    >
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
    </svg>
  );
};

const BsrEtsyPopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const router = useRouter();

  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const overviewTextsEtsy = [
    "Suggestion Expander",
    "Search Volume Est.",
    "Search Results",
    "Demand Score",
    "Opportunity Score",
  ];

  const [isOpen, setIsOpen] = useState(true);
  const close = () => setIsOpen(false);

  return (
    <Popup
      contentStyle={{
        maxWidth: "80vw",
        padding: 0,
        width: isMobile ? "85%" : "50%",
        borderRadius: "6px 6px 6px 6px",
        maxHeight: "95vh",
      }}
      open={isOpen}
      modal
      nested
    >
      <div className="noBorder">
        <div
          className="flex justify-center p-2 noBorder items-center gradient-background-static"
          style={{
            borderRadius: "5.10404px 5.10404px 0px 0px",
          }}
        >
          <div className="" style={{ padding: "8px" }}>
            <a
              className="absolute top-1 right-1  border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
              onClick={close}
            >
              X
            </a>
          </div>
          <div className="my-2 md:my-5 mainHeader flex  items-center justify-center ">
            <p
              style={{ fontWeight: "600" }}
              className="text-center h-full my-1 text-xl md:text-4xl text-white "
            >
              New - Etsy Research Tool
            </p>
          </div>
        </div>
        <div className="flex mb-4 justify-center items-center">
          <div className="flex mb-3 mx-8 mt-2  text-black contentList">
            <div className="max-w-[1500px]">
              <div className="flex flex-col my-10 md:flex-row justify-center items-center gap-2 md:gap-6">
                <div className="w-3/5">
                  <Image
                    src={EtsyImage.src}
                    alt="See All Segments"
                    width={1000}
                    height={1000}
                    className="w-full shadowAround  h-auto"
                  />
                </div>
                <div className="">
                  {overviewTextsEtsy.map((text, index) => (
                    <div
                      className="flex items-center smMargin my-2.5  w-fit  contentList"
                      key={index}
                    >
                      <div className="flex items-center w-fit w-10 h-5 md:h-8">
                        <CheckIcon />
                      </div>
                      <p
                        className={` smMargin text-[16px] md:listItem font-semibold   ml-3`}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex justify-center w-full mt-2 contentList">
                  <div className="flex justify-end">
                    <Link
                      style={{ fontWeight: "bold" }}
                      className="w-fit h-fit themeGradient  px-4 py-2 rounded-lg  text-[16px] md:text-[]"
                      href="/shop"
                    >
                      Get Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default BsrEtsyPopup;
