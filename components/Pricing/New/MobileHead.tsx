import React from "react";
import { Fragment } from "react";
import { ESubscriptionType } from "@/constants";
import { getPriceBasedOnPeriod } from "./PriceTable";
import { Button } from "@/components/ui/button";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import { ChevronDown } from "lucide-react";

const splitWords = (word: string): string[] => {
  const words = word.split(" ");
  const remaining = words.slice(1).join(" ");
  return [words[0], remaining];
};

const isSubscribedByIndex = (packages, index) => {
  return packages[index]?.isOwned;
};

interface MobileHeadProps {
  packages: any[];
  paymentPeriod: any;
  products: any[];
  buyNow: (props: { packageItem: any; subscriptionType: any }) => void;
  token: string;
}

const MobileHead: React.FC<MobileHeadProps> = ({
  packages,
  paymentPeriod,
  products,
  buyNow,
  token,
}) => {
  return (
    <thead
      className={`lg:hidden  text-xs md:text-xl sticky ${
        false ? "top-36" : "top-14"
      } w-full text-gray-700 border-2 light-border rounded-3xl bg-gray-50 dark:bg-gray-700 dark:text-gray-400 `}
    >
      <tr className="text-lg ">
        {packages.map((product, idx) => {
          // remove the free package from the list
          if (product.type === ESubscriptionType.Free) return null;
          if (product.name === "All Puzzle Tools Bundle") return null;
          return (
            <Fragment key={idx}>
              <th scope="col" className="flex-1  bg-white shadow-sm">
                <div
                  className={`text-center min-h-32 flex items-center flex-col justify-between py-2 px-0`}
                >
                  <div
                    className={`h-fit mb-2 flex flex-col align-items-center justify-content-center`}
                  >
                    {splitWords(product.name).map((title, index) => {
                      return (
                        <h6 key={index} className={` text-sm  md:text-base`}>
                          {title}
                        </h6>
                      );
                    })}
                  </div>
                  {/* <GetMobilePrice
                              name={product.productType}
                              product={product}
            
                              paymentPeriod={paymentPeriod}
                            /> */}
                  {getPriceBasedOnPeriod(product, paymentPeriod)}
                  <h6 className="md:px-2 mt-4 md:mt-0 text-xs md:text-base">
                    {idx !== 0 &&
                      (paymentPeriod == EPaymentPeriod.Lifetime
                        ? "One Time Payment"
                        : paymentPeriod == EPaymentPeriod.Yearly
                        ? "Billed Yearly"
                        : paymentPeriod == EPaymentPeriod.Monthly
                        ? "Billed Monthly"
                        : "FREE")}
                  </h6>
                  <div hidden={!token} className={`h-9`} />
                  <Button
                    hidden={token && idx === 0}
                    className={`   md:text-base text-sm  py-2 ${
                      isSubscribedByIndex(products, idx)
                        ? "bg-gray-50"
                        : " text-white hover:bg-primary-200"
                    } `}
                    onClick={() =>
                      buyNow({
                        packageItem: product,
                        subscriptionType: paymentPeriod,
                      })
                    }
                  >
                    {idx !== 0 &&
                      (paymentPeriod == EPaymentPeriod.Lifetime
                        ? "Select"
                        : paymentPeriod == EPaymentPeriod.Yearly
                        ? "Subscribe"
                        : paymentPeriod == EPaymentPeriod.Monthly
                        ? isSubscribedByIndex(products, idx)
                          ? "SUBSCRIBED"
                          : "Upgrade"
                        : "FREE")}
                  </Button>
                </div>
              </th>
            </Fragment>
          );
        })}
      </tr>
    </thead>
  );
};

export default MobileHead;
