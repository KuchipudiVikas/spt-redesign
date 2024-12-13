import React from "react";
import ListItem from "./ListItem";
import ResourcesData from "../../../data/ResourcesData";
import { useState } from "react";
import { TResourcesData } from "../../../data/ResourcesData";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Resources = () => {
  const [tab, setTab] = React.useState("Resources");
  const [selectedCategory, setSelectedCategory] = useState<TResourcesData>(
    ResourcesData[0]
  );

  const handleCategoryClick = (category: TResourcesData) => {
    setSelectedCategory(category);
  };

  const flattenedItems = selectedCategory.Categories.flatMap(
    (category) => category.Items
  );

  return (
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {flattenedItems.map((item) => (
          <ListItem key={item.heading} title={item.heading} href={item.link}>
            {item.tag}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  );
};

export default Resources;
