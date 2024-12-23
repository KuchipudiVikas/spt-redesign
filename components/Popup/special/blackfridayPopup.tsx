import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import useDeviceSize from "../../../utils/useDeviceSize";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import useCountdown, { useCountdown2 } from "@/hooks/useCountDown";

import { useRouter } from "next/router";
import { useCustomDeviceSize, EScreenSize } from "../../../utils/useDeviceSize";
import { XIcon } from "lucide-react";

const BlackFridaypopup = ({ endDate }: { endDate: Date }) => {
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
        width: isMobile ? "85%" : "48%",
        borderRadius: "16px",
        maxWidth: "900px",
        border: "5px solid #d72c49",
        maxHeight: "90vh",
      }}
      open={isOpen}
      modal
      nested
    >
      <div style={{}} className=" br-16 border h-full bg-white">
        <div className="br-16 h-full">
          <div className="h-full">
            <div className="flex flex-col items-center xl:flex-row h-full ">
              <div
                // style={{
                //   border: "1px solid #ccc",
                // }}
                className=" grid grid-cols-1 flex-col  justify-between w-full py-5 h-full  px-5 items-center"
              >
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    className="border cursor-pointer rounded-full bg-white w-8 h-8 text-center justify-center items-center flex font-bold shadow-xl text-2xl"
                    onClick={close}
                  >
                    <XIcon />
                  </button>
                </div>
                {/* <Image
                  src={fatherImage.src}
                  alt="4th of july"
                  width={500}
                  height={400}
                  className="test md:w-[430px] md:h-[370px] w-full h-[200px] rounded-xl"
                /> */}
                <div className="flex flex-col h-full justify-between mt-5 md:mt-0   w-full items-center">
                  <div className="">
                    <h6 className="text-3xl md:text-[44px] text-center font-dancn mb-3 font-bold text-[#d72c49]">
                      Black Friday Specials
                    </h6>
                    <h6 className=" font-bold text-xl text-center md:text-[28px]  text-black mb-5 ">
                      Biggest Savings of the Year
                    </h6>
                  </div>

                  <div className="flex items-center br-16  flex-col">
                    <div className=" font-Inter  grid grid-cols-4 gap-2 ">
                      <div className="">
                        <div className="text-2xl  flex px-3 py-2 br-16  bg-white flex-col items-center">
                          <h6 className="font-Inter font-semibold text-[#d72c49]">
                            {/* @ts-ignore */}
                            {timeLeft.days}
                          </h6>
                          <h6 className="font-medium">Days</h6>
                        </div>{" "}
                      </div>
                      <div className="">
                        <div className="text-2xl  flex px-3 py-2 br-16  bg-white flex-col items-center">
                          <h6 className="font-Inter text-[#d72c49]">
                            {/* @ts-ignore */}
                            {timeLeft.hours}
                          </h6>
                          <h6 className="font-medium">Hours</h6>
                        </div>{" "}
                      </div>
                      <div className="">
                        <div className="">
                          <div className="text-2xl flex  px-3 py-2  br-16  bg-white flex-col items-center">
                            <h6 className="font-Inter text-[#d72c49]">
                              {/* @ts-ignore */}
                              {timeLeft.minutes}
                            </h6>
                            <h6 className="font-medium">Minutes</h6>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-2xl px-3 py-2   br-16  bg-white flex flex-col items-center">
                          <h6 className="font-Inter text-[#d72c49]">
                            {/* @ts-ignore */}
                            {timeLeft.seconds}
                          </h6>
                          <h6 className="font-medium">Seconds</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full  flex justify-center items-center flex-col rounded-lg">
                    <h6 className=" font-bold text-xl md:text-[28px] text-black mb-5  mt-2 md:mt-[40px] my-2 mt-2">
                      Up to 57% Off - All Lifetime Items, Bundles & Yearly
                      Subscriptions
                    </h6>
                    <Image
                      src={
                        "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/black_gift.webp"
                      }
                      alt="giftbox"
                      width={500}
                      height={400}
                      className="test w-[150px] md:w-[250px] object-cover h-auto rounded-xl"
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-col  items-center  w-full  px-4  ">
                      {/* <h6 className="mt-2 mb-7 text-[24px]">
                        <span className="text-[#283976]  my-0 font-bold">
                          Our{" "}
                          <span className="text-[#d72c49] font-bold">
                            biggest
                          </span>{" "}
                          sale we have ever done.
                        </span>{" "}
                        <br />
                        <span className="text-[#283976]  my-0 font-bold">
                          Don’t miss this amazing opportunity.
                        </span>{" "}
                      </h6> */}
                      {/* <h6
                    variant="h4"
                    className="text-[25px] font-bold  text-[#6B3FA0]  mt-8 my-2 "
                  >
                    Entire Store
                  </h6> */}
                      <Button
                        className={` redBtn bg-[#d72c49] mb-4 md:mb=0  mt-4 font-extrabold hover:bg-[#d72c49] text-[20px] w-fit px-10 text-center  text-white`}
                        onClick={() => {
                          router.replace("/shop");
                        }}
                      >
                        Shop Now
                      </Button>
                    </div>
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

export default BlackFridaypopup;
