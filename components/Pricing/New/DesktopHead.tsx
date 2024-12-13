import { EPaymentPeriod } from "@/lib/models/enums/common";
import { IPackage } from "@/lib/models";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { getPriceBasedOnPeriod } from "./PriceTable";
import styles from "@/styles/titans-pro/style.module.css";
import { ESubscriptionStatusType } from "@/lib/models/enums/common";

import { ESubscriptionType } from "@/constants";

export interface ITableHeaderProps {
  isTopBarOpen: boolean;
  tableTitle: string;
  packages: IPackage[];
  products: any[];
  paymentPeriod: EPaymentPeriod;
  buyNow: (props: {
    packageItem: IPackage;
    subscriptionType: EPaymentPeriod;
  }) => void;
}

export default function DesktopTableHeader({
  isTopBarOpen,
  tableTitle,
  packages,
  products,
  paymentPeriod,
  buyNow,
}: ITableHeaderProps) {
  if (paymentPeriod == EPaymentPeriod.Lifetime) {
    return null;
  }

  return (
    <div
      className={`
                 text-xs
                  md:text-xl
                    sticky
                     w-full overflow-x-auto
                      text-gray-700
                         dark:bg-gray-700 gap-5 dark:text-gray-400  grid grid-cols-5 `}
    >
      <div
        style={{
          border: "none",
        }}
        className={` bg-white  col-span-2 h-full`}
      >
        <div
          style={{
            borderRadius: "16px",
            padding: "30px",
            height: "170px",
          }}
          className=" flex border-2 p-2 light-border sp-container  items-start bg-[#f7f7f8] justify-center  flex-col border-2 h-full "
        >
          <h3
            style={{
              fontSize: "22px",
            }}
            className="my-auto font-extrabold"
          >
            {paymentPeriod == EPaymentPeriod.Monthly
              ? "Monthly Subscription"
              : paymentPeriod == EPaymentPeriod.Yearly
              ? "Yearly"
              : "Lifetime"}
          </h3>
          <div
            style={{
              paddingTop: "15px ",
            }}
            className="text-sm font-normal "
          >
            Try our tools Risk Free -{" "}
            <strong>7 Days Money Back Guarantee</strong>
          </div>
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-4 rounded-3xl border-2 p-2 light-border sp-container">
        <div className="">
          <div className={`${styles.theadInner} ${styles.mostInner} `}>
            <h6 className="font-bold">{packages[0].name}</h6>

            <p className="font-extrabold  text-[26px] my-auto">$0</p>

            {/* <div
              className={`h-12 flex align-items-center justify-content-center`}
            >
              <h6
                style={{ textTransform: "none" }}
                className="md:px-1 mt-7 "
              >
                Free
              </h6>
            </div> */}

            <Button className={` `}>SELECTED</Button>
          </div>
        </div>

        {products.map((product, idx) => {
          if (product.type === ESubscriptionType.Free) return null;
          if (product.name === "All Puzzle Tools Bundle") return null;
          console.log({ product });
          return (
            <Fragment key={idx}>
              <div
                className={` relative   ${
                  product.buttonType == ESubscriptionStatusType.Subscribed
                    ? "bg-gray-50"
                    : ""
                }`}
              >
                <div className={`${styles.theadInner}  `}>
                  <h6 color={"black"} className={`font-bold`}>
                    {packages[idx + 1].name}
                  </h6>
                  <div className=" text-[26px] font-extrabold">
                    {getPriceBasedOnPeriod(product, paymentPeriod)}
                  </div>

                  {/* <div
                    className={`h-12 flex align-items-center justify-content-center`}
                  >
                    <h6 className="md:px-2 paymentPeriodText  my-auto">
                      {getBillingPeriodText(paymentPeriod)}
                    </h6>
                  </div> */}
                  <Button
                    variant="outline"
                    onClick={() =>
                      buyNow({
                        packageItem: packages[idx + 1],
                        subscriptionType: paymentPeriod,
                      })
                    }
                    style={{
                      border: "1px solid hsl(var(--primary))",
                    }}
                    className={` rounded-full   ${
                      product.buttonType == ESubscriptionStatusType.Subscribed
                        ? "bg-primary text-white"
                        : "bg-primary-150  hover:bg-primary-200"
                    } `}
                  >
                    {getButtonText(
                      paymentPeriod,
                      product.buttonType == ESubscriptionStatusType.Subscribed,
                      paymentPeriod == EPaymentPeriod.Lifetime
                    )}
                  </Button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function getBillingPeriodText(paymentPeriod: EPaymentPeriod) {
  if (paymentPeriod === EPaymentPeriod.Monthly) {
    return "Billed Monthly";
  } else if (paymentPeriod === EPaymentPeriod.Lifetime) {
    return "One Time Payment";
  } else if (paymentPeriod === EPaymentPeriod.Yearly) {
    return "Billed Yearly";
  }
}

function getButtonText(
  paymentPeriod: EPaymentPeriod,
  isSubscribed: boolean,
  isLifetime: boolean
) {
  if (isLifetime) {
    return "Select";
  }
  if (isSubscribed) {
    return "Subscribed";
  }
  if (paymentPeriod === EPaymentPeriod.Lifetime) {
    return "Select";
  }
  return "Upgrade";
}
