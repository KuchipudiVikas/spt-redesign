import React from "react";
import SolutionsData from "@/data/solutionsData";
import { useState } from "react";
import { TSolutionsData } from "@/data/solutionsData";
import ListItem from "./ListItem";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
          <div className="flex flex-col w-[200px]">
            {SolutionsData.map((category: TSolutionsData, index: number) => (
              <div
                key={index}
                className={`flex rounded-xl py-4 px-4 my-1 justify-between items-center text-black cursor-pointer ${
                  selectedCategory.Title === category.Title
                    ? "bg-[#690ecd] text-white"
                    : "bg-white"
                } category-`}
                onMouseEnter={() => handleCategoryClick(category)}
              >
                <h6>{category.Title}</h6>
                <ChevronRight
                  className={`${
                    selectedCategory.Title === category.Title
                      ? "text-white"
                      : "text-black"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
          {flattenedItems.map((item) => (
            <ListItem key={item.heading} title={item.heading} href={item.link}>
              {item.tag}
            </ListItem>
          ))}
        </ul>
      </div>
    </NavigationMenuContent>
  );
};

export default Solutions;
