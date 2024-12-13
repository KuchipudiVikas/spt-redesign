import React from "react";
import { freeItemsWithoutTitle } from "@/data/FreeKDPTools/constants";
import Link from "next/link";

const WelcomePageHeader = () => {
  return (
    <div className="grid grid-cols-2 gap-14  py-20 max-w-[1300px] mx-auto">
      <div className=" font-extrabold my-auto">
        <div className="text-[60px] flex items-center">
          Welcome 🤝 to the Self Publishing Titans family
        </div>
        <div className="text-[20px] font-medium mt-10">
          Here are the next steps you can take
        </div>
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "28px",
        }}
        className="white-shadow-container "
      >
        <div className="flex flex-col items-center">
          <h6 className="text-[28px] font-bold">Acess free resources</h6>
          <div className="mt-1">🎉 included with your account 🎉 </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {freeItemsWithoutTitle.map((item, index) => {
              return (
                <Link
                  href={item.url}
                  style={{
                    border: "1px solid #6902cd",
                  }}
                  className="border p-2 py-3 px-3 bg-white font-semibold rounded-full"
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePageHeader;
