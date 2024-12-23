import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import useDeviceSize from "../../../utils/useDeviceSize";

import Image from "next/image";
import useCountdown, { useCountdown2 } from "@/hooks/useCountDown";

import { useRouter } from "next/router";
import { useCustomDeviceSize, EScreenSize } from "../../../utils/useDeviceSize";
import RosesImage from "@/public/assets/images/roses2.png";

import Link from "next/link";
import {
  ShoppingCartIcon,
  SparklesIcon,
  TimerIcon,
  TrendingUp,
  XIcon,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SevenBackendKWTool = ({ endDate }: { endDate: Date }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, height] = useDeviceSize();
  const router = useRouter();
  const { size } = useCustomDeviceSize();

  useEffect(() => {
    const isMobileLocal = width <= 480;
    setIsMobile(isMobileLocal);
  }, [width, height]);

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  // const endDate = new Date(Date.UTC(2024, 3, 5, 23, 59, 59));
  const timeLeft = useCountdown(endDate);

  return (
    <Popup
      contentStyle={{
        padding: 0,
        width: isMobile ? "85%" : "55%",
        borderRadius: "16px",
        maxWidth: "950px",
        maxHeight: "90vh",
      }}
      open={isOpen}
      modal
      nested
    >
      <div style={{}} className=" br-16 ">
        <div className="br-16 p-3">
          <div className="">
            <div className="flex flex-col items-center xl:flex-row ">
              <div className=" flex px-3  w-full pt-5   flex-col justify-center items-center">
                <div className="absolute top-2 right-2">
                  <a
                    className="border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
                    onClick={close}
                  >
                    <XIcon />
                  </a>
                </div>
                <h6 className="text-[30px] text-center px-4 md:text-[50px] font-Inter font-bold     text-[#f69400]">
                  7 Backend Keywords Tool
                </h6>
                {/* <h6 className="text-[19.2px] leading-5 px-10 text-center font-bold text-[#8257fe]">
                  The ultimate solution for authors who want to optimize their
                  SEO, rankings and sales on Amazon.
                </h6> */}
                <div className="mt-6 flex flex-col w-full justify-center items-start  gap-3">
                  <h6 className="md:text-[20.8px] flex items-center gap-4 leading-5   font-semibold text-[#232f3e]">
                    <TrendingUp className="text-[#f69400]" />
                    Increase your book&apos;s discoverability and rank higher on
                    Amazon.
                  </h6>
                  <h6 className="md:text-[20.8px] flex items-center gap-4 leading-5   font-semibold text-[#232f3e]">
                    <SparklesIcon className="text-[#f69400]" />
                    Improve your Amazon rankings and reach more potential
                    readers.
                  </h6>
                  <h6 className="md:text-[20.8px] flex items-center gap-4 leading-5   font-semibold text-[#232f3e]">
                    <TimerIcon className="text-[#f69400]" />
                    Save time and effort with our intuitive and powerful tool.
                  </h6>
                </div>
                <div className="flex flex-col  items-center mt-6 w-full  px-4  ">
                  {/* <h6
                    textAlign={"center"}
                    variant={size == EScreenSize.Mobile ? "h4" : "h3"}
                    className=" font-bold md:text-[41px] text-[#8257fe]  my-2 mt-2"
                  >
                    <span className="text-[#232f3e]">Launch Special - </span>
                    50% OFF{" "}
                  </h6> */}
                  {/* <h6
                    variant="h4"
                    className="text-[25px] font-bold  text-[#6B3FA0]  mt-8 my-2 "
                  >
                    Entire Store
                  </h6> */}
                </div>
                <div className="flex gap-3">
                  <Button
                    className={`redBtn bg-[#8257fe] mt-4 mb-4 md:mb=0 hover:bg-[#512c7e] text-[20px] w-fit px-10 text-center outline-none`}
                    onClick={() => {
                      router.replace(
                        "/shop/7-backend-keywords-tool-amazon-kdp"
                      );
                    }}
                  >
                    Buy Now <ShoppingCartIcon />
                  </Button>
                  <Link
                    target="_blank"
                    href="https://www.youtube.com/watch?v=RYB70LdxQC0"
                  >
                    <Button
                      className={`redBtn bg-[#8257fe] mt-4 mb-4 md:mb=0 hover:bg-[#512c7e] text-[20px] w-fit px-10 text-center outline-none`}
                    >
                      Watch Tutorial <Youtube />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SevenBackendKWTool;
