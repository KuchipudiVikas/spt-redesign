import React from "react";
import SolutionsData from "@/data/solutionsData";
import { useState } from "react";
import { TSolutionsData } from "@/data/solutionsData";
import ListItem from "./ListItem";

import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import { ChevronRight } from "lucide-react";

const Solutions = () => {
  const [selectedCategory, setSelectedCategory] = useState<TSolutionsData>(
    SolutionsData[0]
  );

  const handleCategoryClick = (category: TSolutionsData) => {
    setSelectedCategory(category);
  };

  const flattenedItems = selectedCategory.Categories.flatMap(
    (category) => category.Items
  );

  return (
    <NavigationMenuContent>
      <div className="flex p-5">
        <div className="">
          {" "}
          <div className="flex flex-col w-[240px]">
            {SolutionsData.map((category: TSolutionsData, index: number) => (
              <div
                key={index}
                className={`flex rounded-xl py-4 px-2 my-1 justify-between items-center text-black cursor-pointer ${
                  selectedCategory.Title === category.Title
                    ? "bg-[#690ecd] text-white"
                    : "bg-[#f7f6f8]"
                } category-`}
                onMouseEnter={() => handleCategoryClick(category)}
              >
                <div className="flex gap-3 w-full items-center">
                  <div
                    style={{
                      color:
                        selectedCategory.Title === category.Title
                          ? "#6902cd"
                          : "black",
                      backgroundColor:
                        selectedCategory.Title === category.Title
                          ? "#fff"
                          : "#fff",
                    }}
                    className="p-2 rounded-full"
                  >
                    <category.icon
                      style={{
                        width: "14px",
                        height: "14px",
                      }}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <h6 className="font-bold">{category.Title}</h6>
                    <ChevronRight
                      className={`w-4 font-bold ${
                        selectedCategory.Title === category.Title
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] ml-4 md:w-[500px] lg:w-[600px]">
          <h6 className="font-bold  pl-4">{selectedCategory.Title}</h6>
          <ul className="grid   gap-3 p-4 md:grid-cols-2  w-full">
            {flattenedItems.map((item) => (
              <ListItem
                key={item.heading}
                title={item.heading}
                // @ts-ignore
                newTab={item.newTab}
                href={item.link}
                Icon={item.icon}
              >
                {item.tag}
              </ListItem>
            ))}
          </ul>
        </div>
      </div>
    </NavigationMenuContent>
  );
};

export default Solutions;
