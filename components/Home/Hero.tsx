import React from "react";
import { Button } from "../ui/button";
import DotIcon from "@/public/assets/home/dot-svgrepo-com.svg";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { StarIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-black max-w-[1300px] mb-20 mt-20 mx-auto grid grid-cols-2">
      <div className="w-[585px]">
        <AllToolsButton />

        <div className="text-[55px] flex gap-3 font-extrabold">
          Grow
          <span className="text-primary">Visibility</span>
          with
        </div>
        <div className="text-[55px] flex gap-3 font-extrabold">
          Powerful Author Tools
        </div>

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
          <Button
            className="font-bold flex text-[16px] rounded-full"
            style={{
              padding: "24px 40px",
            }}
          >
            <Image src={DotIcon} alt="Brand Logo" width={5} height={5} />
            Get Started
          </Button>
          <Button
            variant={"outline"}
            className="font-bold bg-transparent flex text-[16px] rounded-full"
            style={{
              padding: "24px 40px",
              border: "2px solid #000",
            }}
          >
            View Tools
          </Button>
        </div>

        <div className="">
          <ReviewsHero />
        </div>
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
    "https://github.com/shadcn.png",
    "https://github.com/user1.png",
    "https://github.com/user2.png",
    "https://github.com/user3.png",
    "https://github.com/user4.png",
  ];

  return (
    <div className="mt-8 flex items-center gap-4 ">
      <div className="flex -space-x-4">
        {avatars.map((src, index) => (
          <Avatar key={index} className="w-[50px] h-[50px]">
            <AvatarImage src={src} alt={`Avatar ${index + 1}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="font-extrabold text-[40px]">5.0</span>
      <div style={{ borderLeft: "1px solid #ccc", height: "40px" }}></div>
      <div className="flex flex-col justify-center gap-1">
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
          Trusted by over 130,000 Users
        </div>
      </div>
    </div>
  );
}