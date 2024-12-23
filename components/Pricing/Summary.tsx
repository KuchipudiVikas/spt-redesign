import React from "react";
import {
  EPaymentPeriod,
  ESubscriptionStatusType,
} from "@/lib/models/enums/common";

import { ArrowRight, Car, CheckIcon } from "lucide-react";
import { getButtonText } from "./New/DesktopHead";
import { IPackage, ProductDetails } from "@/data/pricing";
import { getPriceBasedOnPeriod } from "./New/PriceTable";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import useEmblaCarousel from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";

type Item = ProductDetails & {
  overview_items: string[];
};

interface SummaryProps {
  selectedPeriod: EPaymentPeriod;
  packages: IPackage[];
  products: ProductDetails[];
  token: string;
}

const Summary: React.FC<SummaryProps> = ({
  selectedPeriod,
  packages,
  products,
  token,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [emblaRef] = useEmblaCarousel();

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (selectedPeriod == EPaymentPeriod.Lifetime) {
    return null;
  }

  async function buyNow({
    packageItem,
    subscriptionType,
  }: {
    packageItem: IPackage;
    subscriptionType?: EPaymentPeriod;
  }) {
    try {
      if (!token && packageItem.price === 0) {
        await router.push(`/register?next=${router.asPath}`);
        return;
      } else if (!token) {
        await router.push(`/login?next=${router.asPath}`, undefined);
        return;
      }

      localStorage.setItem("referrer", window.location.href);

      router.replace(
        `/checkout/v3?product=${packageItem.productId}&type=${subscriptionType}`
      );
      return;

      // router.reload();
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    }
  }

  const items: Item[] = [
    {
      ...products[0],
      overview_items: [
        "Keyword Research with Chrome Extension",
        "Search volume, Competition, and BSR data",
        "Backend keyword optimization tools.",
        "Great for KDP Beginners",
      ],
    },
    {
      ...products[1],
      overview_items: [
        "Advanced Rank Tracking competitor analysis",
        "Reverse keyword Research with `Retro View`. ",
        "Batch Analysis for upto 100 products",
        "Ideal for deeper marker analysis",
      ],
    },
    {
      ...products[2],
      overview_items: [
        "Include Pro, Puzzle Tools, and Coloring Book Maker",
        "Bulk Product Analysis with `Deep view`",
        "Comprehensive tool-kit for pro publishers",
        "Designed for multi product publishing",
      ],
    },
  ];

  // if (isMobile) {
  //   return (
  //     <div className="flex justify-center mb-10 items-center">
  //       <div className="w-full mx-auto">
  //         <Carousel
  //           style={{
  //             width: "100vw",
  //           }}
  //           className="w-full mx-auto"
  //         >
  //           <CarouselContent
  //             ref={emblaRef}
  //             className="flex gap-4 px-10"
  //           >
  //             {items.map((item, index) => (
  //               <CarouselItem
  //                 key={index}
  //                 style={
  //                   {
  //                   }
  //                 }
  //                 className="flex-[0_0_85%]"
  //               >
  //                 <div className="p-6 rounded-3xl bg-gray-50 border h-full light-border">
  //                   <div className="text-black flex items-center gap-3 font-bold mb-1 text-[24px]">
  //                     {item.Title}{" "}
  //                     {index === 1 && (
  //                       <span
  //                         style={{ fontSize: "11.5px" }}
  //                         className="lavbg p-1 px-3 rounded-full text-primary my-auto"
  //                       >
  //                         Most Popular
  //                       </span>
  //                     )}
  //                   </div>
  //                   <div className="text-primary flex items-end text-[28px] font-extrabold">
  //                     {getPriceBasedOnPeriod(item, selectedPeriod)}/
  //                     <span className="text-[14px] pb-1 font-medium text-black">
  //                       {selectedPeriod}
  //                     </span>
  //                     {index === 1 && (
  //                       <span
  //                         style={{ fontSize: "11.5px" }}
  //                         className="p-1 px-3 rounded-full"
  //                       >
  //                         - Save Up to 40%
  //                       </span>
  //                     )}
  //                   </div>
  //                   <hr className="my-4" />
  //                   <div
  //                     style={{ height: "70%" }}
  //                     className="flex justify-between flex-col"
  //                   >
  //                     <div className="mt-2">
  //                       <h6 className="font-bold mb-1">Key Features</h6>
  //                       <ul>
  //                         {item.overview_items.map((feature, idx) => (
  //                           <li
  //                             key={idx}
  //                             className="flex gap-2 items-center my-3 text-[15px]"
  //                           >
  //                             <CheckIcon className="bg-green-400 w-5 h-5 rounded-full p-1 text-white" />
  //                             {feature}
  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                     <Button
  //                       className="w-full rounded-full"
  //                       size="lg"
  //                       variant={
  //                         item.buttonType === ESubscriptionStatusType.Subscribed
  //                           ? "default"
  //                           : "outline"
  //                       }
  //                       onClick={() =>
  //                         buyNow({
  //                           packageItem: packages[index + 1],
  //                           subscriptionType: selectedPeriod,
  //                         })
  //                       }
  //                     >
  //                       {getButtonText(
  //                         selectedPeriod,
  //                         item.buttonType ===
  //                           ESubscriptionStatusType.Subscribed,
  //                         // @ts-ignore
  //                         selectedPeriod === EPaymentPeriod.Lifetime
  //                       )}
  //                       {item.buttonType !==
  //                         ESubscriptionStatusType.Subscribed && (
  //                         <ArrowRight className="w-5 h-5" />
  //                       )}
  //                     </Button>
  //                   </div>
  //                 </div>
  //               </CarouselItem>
  //             ))}
  //           </CarouselContent>
  //         </Carousel>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex w-full justify-center items-center ">
      <div
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(3, 1fr)",
        // }}
        className=" w-fit mx-auto grid grid-cols-1 p-5 md:grid-cols-3 my-10 gap-4"
      >
        {items.map((item, index) => {
          return (
            <div className=" p-6 rounded-3xl bg-gray-50 border h-full light-border">
              <div className="text-black flex items-center gap-3 font-bold mb-1 text-[24px]">
                {item.Title}{" "}
                {index == 1 && (
                  <span
                    style={{
                      fontSize: "11.5px",
                    }}
                    className="lavbg  p-1 px-3 rounded-full  text-primary my-auto  "
                  >
                    Most Popular
                  </span>
                )}
              </div>
              <div className="text-primary flex items-end text-[28px] font-extrabold ">
                {getPriceBasedOnPeriod(item, selectedPeriod)}/{" "}
                <span className="text-[14px] pb-1 font-medium text-black">
                  {selectedPeriod}
                </span>
                {index == 1 && (
                  <span
                    style={{
                      fontSize: "11.5px",
                    }}
                    className="  p-1 px-3 rounded-full   "
                  >
                    - Save Upto 40%
                  </span>
                )}
                <div className=""></div>
              </div>
              <hr className="my-4" />
              <div
                style={{
                  height: "70%",
                }}
                className="flex justify-between flex-col  "
              >
                <div className="mt-2">
                  <h6 className="font-bold mb-1">Key Features</h6>
                  <ul>
                    {item.overview_items.map((feature, index) => {
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

                <Button
                  className=" w-full rounded-full"
                  size="lg"
                  variant={
                    item.buttonType == ESubscriptionStatusType.Subscribed
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    buyNow({
                      packageItem: packages[index + 1],
                      subscriptionType: selectedPeriod,
                    })
                  }
                >
                  {getButtonText(
                    selectedPeriod,
                    item.buttonType == ESubscriptionStatusType.Subscribed,
                    // @ts-ignore
                    selectedPeriod == EPaymentPeriod.Lifetime
                  )}
                  {item.buttonType !== ESubscriptionStatusType.Subscribed && (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
