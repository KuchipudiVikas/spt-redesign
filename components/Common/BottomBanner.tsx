import React from "react";
import Link from "next/link";
import Image from "next/image";
import DotImage from "@/public/assets/home/dot-svgrepo-com.svg";
import FavIconWhite from "@/public/brand-logo.png";
import { DotIcon } from "lucide-react";

const BottomBanner = () => {
  return (
    <div className="relative bg-[#7b28da] grid grid-cols-2 comp-container p-6 py-10 rounded-2xl w-full mt-10 overflow-hidden">
      {/* Background image */}
      <div
        style={{
          backgroundImage: `url(${FavIconWhite.src})`,
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "50%",
          opacity: 0.1, // Low opacity for the image only
          pointerEvents: "none", // Prevent interaction with the image
        }}
        className="absolute inset-0"
      ></div>

      {/* Content */}
      <div
        style={{
          lineHeight: "60px",
        }}
        className="w-full text-center text-white font-extrabold text-[45px] z-10"
      >
        Transform Your Reach with Pro Tools!
      </div>

      <div className="my-auto flex gap-5 mx-auto z-10">
        <Link
          href={"/shop"}
          className="bg-white px-[40px] font-bold py-[15px] rounded-full text-primary flex w-fit"
        >
          <DotIcon
            size={20}
            style={{
              width: "20px",
              height: "20px",
              strokeWidth: "3px",
            }}
            className="mr-2 my-auto"
          />
          Get Started
        </Link>
        <Link
          href={"/tools"}
          className="border px-[40px] font-bold py-[15px] rounded-full text-white flex w-fit"
        >
          View Tools
        </Link>
      </div>
    </div>
  );
};

export default BottomBanner;
