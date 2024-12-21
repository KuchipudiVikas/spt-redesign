import React from "react";
import { Button } from "../ui/button";
import DotIcon from "@/public/assets/home/dot-svgrepo-com.svg";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import LinkIndex from "@/lib/linkIndex";

import SteveImage from "@/public/images/testimonials/9.png";
import PamImage from "@/public/images/testimonials/10.png";
import LorenzoImage from "@/public/images/testimonials/1.png";
import NuriaImage from "@/public/images/testimonials/2.png";
import RachelImage from "@/public/images/testimonials/6.png";
import { Banner } from "./Banner";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // return null;
  return (
    <div
      style={{
        margin: isMobile
          ? "0px auto 25px auto"
          : isTablet
          ? "100px auto"
          : isDesktop
          ? "100px auto"
          : "00px auto",
        marginBottom: "130px",
      }}
      className="text-black comp-container lg:px-5  mx-auto flex flex-col-reverse lg:grid md:grid-cols-2"
    >
      <div className="max md:mt-10 lg:mt-0 px-6 lg:px-0 ">
        <AllToolsButton />
        {/* <div className=""> */}
        <div className="text-[35px] md:text-[55px] flex gap-3 gap-y-0 flex-wrap font-extrabold">
          Grow
          <span className="text-primary">Visibility</span>
          with
          <span className=" block md:hidden">Powerful </span>
        </div>
        <div className="text-[35px] md:text-[55px] flex items-center flex-wrap gap-3 font-extrabold">
          <span className=" hidden md:block">Powerful </span> Author Tools
        </div>
        {/* </div> */}
        <div
          style={{
            lineHeight: "30px",
          }}
          className=" text-[18px] text-[#1a1a1a]"
        >
          Our platform combines advanced analytics with practical resources,
          empowering you to make informed decisions at every stage of your
          publishing journey.
        </div>
        <div className="mt-8 flex gap-4">
          <Link href={LinkIndex.PRICING}>
            <Button
              className="font-bold px-5 py-6 md:py-[40px] md:px-[24px] flex text-[16px] rounded-full"
              style={{
                // padding: "24px 40px",
                padding: isDesktop ? "30px 40px" : "16px 24px",
              }}
            >
              <Image src={DotIcon} alt="Brand Logo" width={5} height={5} />
              Get Started
            </Button>
          </Link>
          <Link href={LinkIndex.TOOLS}>
            <Button
              variant={"outline"}
              className="font-bold  bg-transparent flex text-[16px] rounded-full"
              style={{
                padding: isDesktop ? "30px 40px" : "16px 24px",
                // padding: "24px 40px",
                border: "2px solid #000",
              }}
            >
              View Tools
            </Button>
          </Link>
        </div>

        <div className="">
          <ReviewsHero />
        </div>
      </div>
      <div className="relative  flex justify-center items-center">
        <Banner />{" "}
      </div>
    </div>
  );
};

export default Hero;

function AllToolsButton() {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className="font-normal mb-5 bg-transparent w-fit flex text-[14px] items-center rounded-full"
    >
      <span
        style={{
          boxShadow: "0px 0px 8px 2px #ddd",
        }}
        className="font-mono w-[26px] mr-2 font-bold h-[26px] shadow bg-white text-[#c31fe4] p-1 rounded-full flex items-center justify-center"
      >
        i
      </span>
      All tools in one place
    </div>
  );
}

function ReviewsHero() {
  const avatars = [
    NuriaImage.src,
    LorenzoImage.src,
    SteveImage.src,
    PamImage.src,
    RachelImage.src,
  ];

  return (
    <div className="mt-8 flex md:flex-row flex-col  items-center gap-4 ">
      <div className="flex md:flex-row  items-center gap-4">
        <div className="flex -space-x-4">
          {avatars.map((src, index) => (
            <Avatar
              key={index}
              style={{
                border: "0.5px solid #ccc",
              }}
              className="w-[50px]  bg-[#f7f6f8] h-[50px]"
            >
              <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="font-extrabold text-[40px]">5.0</span>
        <div style={{ borderLeft: "1px solid #ccc", height: "40px" }}></div>
      </div>
      <div className="flex flex-col items-center md:items-start  md:justify-center gap-1">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ff6b00"
          >
            <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ff6b00"
          >
            <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ff6b00"
          >
            <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ff6b00"
          >
            <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ff6b00"
          >
            <path d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />
          </svg>
        </div>
        <div className="text-[14px] font-medium">
          Trusted by over 150,000 Users
        </div>
      </div>
    </div>
  );
}
