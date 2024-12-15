import React from "react";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import { CheckIcon } from "lucide-react";
import { Separator } from "../ui/separator";

type Price = {
  monthly: number;
  yearly: number;
};

type Item = {
  title: string;
  price: Price;
  features: string[];
};

const items: Item[] = [
  {
    title: "Titans Pro",
    price: {
      monthly: 14,
      yearly: 100,
    },
    features: [
      "Keyword Research with Chrome Extension",
      "Search volume, Competition, and BSR data",
      "Backend keyword optimization tools.",
      "Great for KDP Beginners",
    ],
  },
  {
    title: "Titans Pro Max",
    price: {
      monthly: 24,
      yearly: 12,
    },
    features: [
      "Advanced Rank Tracking competitor analysis",
      "Reverse keyword Research with `Retro View`. ",
      "Batch Analysis for upto 100 products",
      "Ideal for deeper marker analysis",
    ],
  },
  {
    title: "Titans Supreme",
    price: {
      monthly: 44,
      yearly: 316,
    },
    features: [
      "Include Pro, Puzzle Tools, and Coloring Book Maker",
      "Bulk Product Analysis with `Deep view`",
      "Comprehensive tool-kit for pro publishers",
      "Designed for multi product publishing",
    ],
  },
];

interface SummaryProps {
  selectedPeriod: EPaymentPeriod;
}

const Summary: React.FC<SummaryProps> = ({ selectedPeriod }) => {
  return (
    <div className="flex w-full justify-center items-center ">
      <div className="flex grid-cols-3 w-fit mx-auto my-10 gap-4">
        {items.map((item, index) => {
          return (
            <div
              style={
                {
                  //   background: "#ede8ff",
                  //   borderWidth: "2px",
                  //   borderColor: index == 2 ? "#6902ed" : "#ede8ff",
                }
              }
              className=" p-6 rounded-3xl bg-gray-50 border light-border"
            >
              <div className="text-black font-bold mb-1 text-[24px]">
                {item.title}
              </div>
              <div className="text-primary text-[28px] font-extrabold ">
                $
                {
                  item.price[
                    selectedPeriod == EPaymentPeriod.Monthly
                      ? "monthly"
                      : "yearly"
                  ]
                }{" "}
                /{" "}
                <span className="text-[14px] font-medium text-black">
                  month
                </span>
              </div>
              <hr className="my-4" />
              <div className="mt-2">
                <h6 className="font-bold mb-1">Key Features</h6>
                <ul>
                  {item.features.map((feature, index) => {
                    return (
                      <li
                        key={index}
                        className="flex gap-2 items-center my-3 text-[15px]"
                      >
                        {" "}
                        <CheckIcon className="bg-green-400 w-5 h-5 rounded-full p-1 text-white" />{" "}
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
