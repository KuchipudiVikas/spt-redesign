import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { BookIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
  // @ts-ignore
>(({ className, title, children, Icon, newTab, ...props }, ref) => {
  console.log("icon is", Icon);

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href}
          ref={ref}
          target={newTab ? "_blank" : "_self"}
          className={cn(
            "block select-none space-y-1 h-[100px] rounded-md p-3 sp-container light-border border leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent flex-wrap focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex gap-3 ">
            {Icon && (
              <div className="">
                <Icon
                  style={{
                    width: "20px",
                    strokeWidth: "2",
                  }}
                  className="text-primary"
                />
              </div>
            )}
            <div className="">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ListItem;
