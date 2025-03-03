import React from "react";
import { StarIcon } from "lucide-react";
import BySptButton from "../Common/BySptButton";

const Hero = () => {
  return (
    <div className="flex my-10 mb-20 justify-center flex-col items-center">
      <h1 className="text-[45px] mt-[20px] font-jsans flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 sm:text-4xl">
        Titans <StarIcon strokeWidth={3} className="text-primary font-bold" />{" "}
        Retro View
      </h1>
      <BySptButton />
    </div>
  );
};

export default Hero;
