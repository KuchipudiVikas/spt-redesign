import React from "react";
import SptBookImage from "@/public/assets/home/bookImage.png";
import Image from "next/image";
import Link from "next/link";
import AmazonImage from "@/public/assets/home/social.png";
import GradientImage from "@/public/assets/home/bg.svg";

const OurBook = () => {
  const backgroundStyle = {
    backgroundImage: `url(${GradientImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    padding: "50px 0", // Adjust padding as needed
  };

  return (
    <div style={backgroundStyle}>
      <div
        className="font-jsans mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      ></div>
      <div className="mx-auto grid grid-cols-2 gap-[60px] max-w-[1300px]">
        <div className="">
          <Image
            src={SptBookImage}
            alt="Brand Logo"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
        <div className="my-auto">
          <div
            className="font-jsans flex leading-3 items-center mx-auto flex gap-3 font-extrabold"
            style={{
              fontSize: "45px",
            }}
          >
            Our Book on{" "}
            <Image
              className="object-contain mt-3"
              src={AmazonImage.src}
              width={40}
              height={40}
              alt=""
            />{" "}
            Amazon
          </div>
          <div
            style={{
              lineHeight: "25px",
              color: "#333",
            }}
            className="mb-4 mt-[25px]"
          >
            Packed with actionable advice, case studies, and expert tips, this
            book is an invaluable resource for anyone looking to elevate their
            self-publishing game. Learn how to optimize keywords, master book
            categories, and implement proven marketing tactics to increase your
            book’s visibility and sales. Join the thousands of authors who are
            transforming their publishing journeys with the help of this
            comprehensive guide. Check it out on Amazon and take your first step
            towards publishing success!"
          </div>

          <div className="mt-[40px]">
            <Link
              href={"https://a.co/d/2s50Owj"}
              className="px-[25px] rounded-full border-2  border-black  py-[16px]"
            >
              Get it Now{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurBook;
