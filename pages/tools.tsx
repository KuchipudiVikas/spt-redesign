import React from "react";
import MainLayout from "@/components/Layout";
import ToolsPage from "@/page_components/ToolsPage";
import { StarIcon, ArrowDownIcon } from "lucide-react";
import BrandIcon from "@/public/favIcon.png";
import Image from "next/image";

const Tools = () => {
  return (
    <MainLayout
      meta={{
        title: "Shop Self Publishing Titans",
        description: "Shop Self Publishing Titans",
        keywords: "Shop Self Publishing Titans",
      }}
      Title={
        <div className="flex my-10 justify-center flex-col items-center">
          <h1 className="text-[45px] mt-[20px] font-jsans flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 sm:text-4xl">
            Shop
            <StarIcon strokeWidth={3} className="text-primary font-bold" /> Self
            Publishing Titans
          </h1>
          <ScrollDownButtonSpecial />
        </div>
      }
      Body={<ToolsPage />}
    />
  );
};

export default Tools;

function ScrollDownButtonSpecial() {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className="font-normal mt-[30px] mb-5 bg-transparent w-fit flex text-[14px] gap-2 items-center rounded-full"
    >
      BY :
      <Image src={BrandIcon.src} alt="Brand Icon" width={30} height={30} />
      Self Publishing Titans
    </div>
  );
}
