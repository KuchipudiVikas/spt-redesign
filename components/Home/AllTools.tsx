import React, { useEffect } from "react";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Items, Item, SelectedTab } from "@/data/home";
import Image from "next/image";
import BrandLogo from "@/public/favIcon.png";

const AllTools = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>("ft");

  const [selectedData, setSelectedData] = useState<Item>(Items[0]);

  const [expandedItem, setExpandedItem] = useState<number | null>(0);

  useEffect(() => {
    const data = Items.find((item) => item.type === selectedTab);
    setSelectedData(data as Item);
  }, [selectedData]);

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div
      style={{
        paddingTop: "50px",
      }}
      className="w-full flex flex-col max-w-[1300px] mx-auto  font-jsans justify-center"
    >
      <div
        className="font-jsans mx-auto flex gap-3 font-extrabold"
        style={{
          fontSize: "45px",
        }}
      >
        Our Comprehensive Tools
      </div>
      <div className="flex mx-auto mb-10">
        <div
          onClick={() => setSelectedTab("ft")}
          className={`${
            selectedTab === "ft" ? "border-b-2" : "bg-white text-black"
          } flex items-center px-[40px] gap-3 py-[24px] cursor-pointer`}
        >
          Free Tools
        </div>
        <div
          onClick={() => setSelectedTab("et")}
          className={`${
            selectedTab === "et" ? "border-b-2" : "bg-white text-black"
          } flex items-center px-[40px] gap-3 py-[24px] cursor-pointer`}
        >
          Education Tools
        </div>
        <div
          onClick={() => setSelectedTab("ct")}
          className={`${
            selectedTab === "ct" ? "border-b-2" : "bg-white text-black"
          } flex items-center px-[40px] gap-3 py-[24px] cursor-pointer`}
        >
          Creative Tools
        </div>
        <div
          onClick={() => setSelectedTab("rt")}
          className={`${
            selectedTab === "rt" ? "border-b-2" : "bg-white text-black"
          } flex items-center px-[40px] gap-3 py-[24px] cursor-pointer`}
        >
          Research Tools
        </div>
      </div>
      <div className="border p-5 bg-[#f7f7f8] grid grid-cols-2 gap-10 rounded-xl">
        <div className="">
          {selectedData.products.map((product, index) => {
            console.log(product);
            return (
            <div
              key={index}
              style={{
                background: expandedItem === index ? "white" : "white",
                border: expandedItem === index ? "2px solid #9539fe" : "none",
                borderRadius: "20px",
              }}
              className="border my-2 p-5 rounded-xl cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div
                className={` text-[18px] flex justify-between items-center ${
                  expandedItem === index && "font-bold"
                } `}
              >
                {product.title}{" "}
                <div className="">
                  {expandedItem === index ? (
                    <CircleArrowUp
                      className={`${
                        expandedItem === index && "text-[#6902cd]"
                      }`}
                      size={20}
                    />
                  ) : (
                    <CircleArrowDown size={20} />
                  )}
                </div>
              </div>
              {expandedItem === index && (
                <>
                  <div className="mt-2 grid grid-cols-2">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex gap-2 items-center"
                      >
                        <CheckIcon className="text-primary" size={20} />
                        <div>{feature}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-[30px]">
                    <button className=" flex items-center gap-3 font-bold px-5 py-2 rounded-full">
                      Learn More <ArrowRightIcon size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
)})}
        </div>
        <div className="my-auto">
          <Image
            src={BrandLogo.src}
            alt="Brand Logo"
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AllTools;
