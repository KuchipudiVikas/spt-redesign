import React from "react";
import { useState } from "react";
import Image from "next/image";
import DotImage from "@/public/assets/home/dot-svgrepo-com.svg";
import { CheckIcon } from "lucide-react";
import ChromeIcon from "@/public/assets/home/chrome.png";
import Link from "next/link";

const ChromeExtensions = () => {
  const [selectedTab, setSelectedTab] = useState("tp");

  return (
    <div
      style={{
        marginTop: "50px",
        paddingTop: "50px",
        paddingBottom: "80px",
      }}
      className="w-full bg-[#f7f7f8] flex flex-col font-jsans justify-center  "
    >
      <div
        className="font-jsans mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      >
        KDP Keyword Research <span className="text-primary"> Extensions </span>
      </div>
      <div className="mt-[41px]">
        <div className="flex border-2 mx-auto  rounded-full w-fit p-2 ">
          <div
            onClick={() => setSelectedTab("tp")}
            className={` ${
              selectedTab == "tp"
                ? "bg-primary text-white"
                : "bg-white text-black"
            } flex items-center px-[40px] gap-3 rounded-full py-[24px] cursor-pointer`}
          >
            <Image src={DotImage} alt="Brand Logo" width={5} height={5} />
            Titans Pro Chrome Extension
          </div>
          <div
            onClick={() => setSelectedTab("qv")}
            className={` ${
              selectedTab == "qv"
                ? "bg-primary text-white"
                : "bg-white text-black"
            } flex items-center px-[40px] gap-3 rounded-full py-[24px] cursor-pointer`}
          >
            <Image src={DotImage} alt="Brand Logo" width={5} height={5} />
            Titans Quick View Chrome Extension{" "}
          </div>
        </div>

        <div className="mt-[50px] max-w-[1200px] mx-auto ">
          {selectedTab == "tp" ? (
            <div className="grid grid-cols-2 gap-10">
              <div className="">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/c4vouirX7xs?si=uOhwr9IJPwlfcHrM"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="">
                <h3 className="text-[30px] font-bold">
                  Titans Pro Chrome Extension
                </h3>
                <div className="mt-[30px]">
                  {[
                    " See all key niche metrics",

                    "  Niche Score Analysis",

                    "BSR on search pages",

                    " One click download all data",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 my-[10px] items-center text-[18px] text-[#333333] font-semibold"
                    >
                      <CheckIcon
                        style={{
                          strokeWidth: "3px",
                        }}
                        className="text-primary font-bold"
                        size={20}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  target="_blank"
                  href={
                    "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid"
                  }
                  className="border-black flex border w-fit gap-2 px-[30px] mt-[40px] font-bold py-[21px] rounded-full"
                >
                  <Image
                    src={ChromeIcon.src}
                    alt="Brand Logo"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  Download Chrome Extension
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-10">
              <div className="">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/llqi_Rs3dc4?si=AvRZQb0mXFdV5e-C"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="">
                <h3 className="text-[30px] font-bold">
                  Titans Quick View Chrome Extension
                </h3>
                <div className="mt-[30px]">
                  {[
                    " See all key niche metrics",

                    "  Niche Score Analysis",

                    "BSR on search pages",

                    " One click download all data",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-2 my-[10px] items-center text-[18px] text-[#333333] font-semibold"
                    >
                      <CheckIcon
                        style={{
                          strokeWidth: "3px",
                        }}
                        className="text-primary font-bold"
                        size={20}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href={
                    "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece"
                  }
                  target="_blank"
                  className="border-black flex border w-fit gap-2 px-[30px] mt-[40px] font-bold py-[21px] rounded-full"
                >
                  <Image
                    src={ChromeIcon.src}
                    alt="Brand Logo"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  Download Chrome Extension
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChromeExtensions;
