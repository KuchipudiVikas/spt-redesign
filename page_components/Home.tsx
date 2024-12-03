import React from "react";
import NewAuthorTools from "@/components/Home/AuthorTools";
import ChromeExtensions from "@/components/Home/ChromeExtensions";
import AllTools from "@/components/Home/AllTools";
import OurBook from "@/components/Home/OurBook";
import Reviews from "@/components/Home/Reviews";
import Image from "next/image";
import DotImage from "@/public/assets/home/dot-svgrepo-com.svg";
import Link from "next/link";

const Home = () => {
  return (
    <div className="">
      <NewAuthorTools />
      <ChromeExtensions />
      <AllTools />
      <OurBook />
      <Reviews />

      <div className="bg-primary grid grid-cols-2 p-6 py-10 rounded-2xl w-full my-10 relative z-10">
        <div
          style={{
            lineHeight: "60px",
          }}
          className="w-full text-center  text-white font-extrabold text-[45px]"
        >
          Transform Your Reach with Pro Tools!
        </div>

        <div className="my-auto flex gap-5 mx-auto">
          <Link
            href={""}
            className="bg-white px-[40px] font-bold py-[24px] rounded-full text-primary flex w-fit"
          >
            <Image src={DotImage.src} alt="Brand Logo" width={5} height={5} />
            Get Started
          </Link>
          <Link
            href={""}
            className="border px-[40px] font-bold py-[24px] rounded-full text-white flex w-fit"
          >
            View Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
