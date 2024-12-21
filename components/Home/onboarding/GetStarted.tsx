import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import CelebrationIcon from "@/public/assets/onboarding/celebrating owl.png";
import Link from "next/link";

import {
  BookIcon,
  BookUser,
  BrushIcon,
  PartyPopper,
  SearchIcon,
  XIcon,
  YoutubeIcon,
} from "lucide-react";

import Image from "next/image";
import { IoExtensionPuzzle } from "react-icons/io5";

interface GetStartedProps {
  handleClose: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ handleClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 4000);

    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  function HandleClick(url: string) {
    handleClose();
    window.open(url, "_blank");
  }

  return (
    <>
      {showConfetti && (
        <div
          style={{
            opacity: opacity,
            transition: "opacity 1s ease-out",
          }}
          className="w-full"
        >
          <Confetti />
        </div>
      )}
      <div className="col-span-8 relative ">
        <button
          className="absolute top-0 right-0 bg-transparent border-none cursor-pointer"
          onClick={() => handleClose()}
        >
          <XIcon />
        </button>

        <div className="bg-white w-full h-full">
          <div className="h-[300px]  flex-col justify-center flex items-center">
            <h2 className="text-[#6800cc] flex items-center w-full mx-auto justify-center gap-3 text-3xl text-center font-sans">
              <PartyPopper
                //   color="primary"
                className="gradient-text"
                style={{
                  fontSize: 40,
                }}
              />{" "}
              Congrats, you&apos;re all set and ready to begin!
            </h2>
            <Image
              width={300}
              height={300}
              className="h-[130px] my-6 w-auto object-cover rounded-md "
              src={CelebrationIcon.src}
              alt=""
            />
            <h4 className="text-center font-sans mt-4">You can start by</h4>
          </div>
          <div className="grid grid-cols-6 mt-2 gap-6 w-full mx-auto">
            <div
              onClick={() =>
                HandleClick(
                  "https://www.selfpublishingtitans.com/titans-pro/on-site"
                )
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#20acef",
                // background: "#82db13",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <SearchIcon
                style={{
                  background: "#82db13",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Find Hot Niche
            </div>
            <div
              onClick={() =>
                HandleClick("https://author.selfpublishingtitans.com/")
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#ff3131",
                // background: "#ff3131",
                // background: "#ffe117",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <BookIcon
                style={{
                  background: "#ffe117",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Start Writing Book
            </div>
            <div
              onClick={() =>
                HandleClick(
                  "https://selfpublishingtitans.com/book-cover-creator"
                )
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#ffa320",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <BrushIcon
                style={{
                  background: "#ffa320",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Design Cover
            </div>

            <div
              onClick={() =>
                HandleClick("https://www.youtube.com/@SelfPublishingTitans")
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#82db13",
                // background: "#ff3131",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <YoutubeIcon
                style={{
                  background: "#ff3131",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Watch Tutorials
            </div>
            <div
              onClick={() =>
                HandleClick(
                  "https://books.selfpublishingtitans.com/Puzzle-Maker-Software"
                )
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#ffe117",
                // background: "#b16eff",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <IoExtensionPuzzle
                style={{
                  background: "#b16eff",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Create Puzzle Books{" "}
            </div>
            <div
              onClick={() =>
                HandleClick(
                  "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software/start-now?simple=true"
                )
              }
              style={{
                // border: "1px solid #ccc",
                borderRadius: "6px",
                // background: "#b16eff",
                // background: "#20acef",
              }}
              className="text-center items-center p-2 rounded-2xl px-3 font-sans flex gap-3 flex-col gap-5 p-3 cursor-pointer text-black"
            >
              <BookUser
                style={{
                  background: "#20acef",
                  color: "#fff",
                  fontSize: "70px",
                  padding: "14px",
                  borderRadius: "50%",
                }}
              />
              Create Low Content Books{" "}
            </div>
          </div>
          <div className="flex flex-col mt-6 items-center">
            <div className="font-sans text-center font-semibold">
              Unlock all features
            </div>
            <Link
              href={"/pricing"}
              style={{
                borderRadius: "16px",
              }}
              className="bg-[#7449fb] font-sans my-3 px-6  w-fit mx-auto text-white p-3 "
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
