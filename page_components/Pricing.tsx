import React from "react";
import { User } from "@/lib/ts/types/user";
import { ProductData, PurchasedProduct } from "@/lib/ts/types/shop";
import { useState } from "react";
import { EPaymentPeriod } from "@/lib/ts/enums/payment";
import PricingHeader from "@/components/Pricing/Header";
import Table from "@/components/Pricing/Table";

export interface PricingProps {
  features: ProductData[];
  featuresOwned: PurchasedProduct[];
  tabQuery: string;
  info?: User;
}

const PricingPage: React.FC<PricingProps> = ({
  features,
  featuresOwned,
  tabQuery,
}) => {
  const [paymentPeriod, setPaymentPeriod] = useState<EPaymentPeriod>(
    tabQuery as EPaymentPeriod
  );

  return (
    <div className="max-w-[1300px] mx-auto flex justify-center font-jsans py-10">
      <div className="mx-auto">
        <TimePeriodToggle
          paymentPeriod={paymentPeriod}
          setPaymentPeriod={setPaymentPeriod}
        />

        <PricingHeader
          selectedPeriod={paymentPeriod}
          userOwnedFeatures={featuresOwned}
        />

        <Table />
      </div>
    </div>
  );
};

export default PricingPage;

interface TimePeriodToggleProps {
  paymentPeriod: EPaymentPeriod;
  setPaymentPeriod: (period: EPaymentPeriod) => void;
}

const TimePeriodToggle: React.FC<TimePeriodToggleProps> = ({
  paymentPeriod,
  setPaymentPeriod,
}) => {
  return (
    <div
      style={{
        margin: "30px 0px",
      }}
      className="grid font-jsans  grid-cols-2"
    >
      <div className="text-[40px] font-bold my-auto">Choose Payment Type</div>
      <div className="flex gap-2">
        <button
          onClick={() => setPaymentPeriod(EPaymentPeriod.Monthly)}
          className={`px-[24px] py-[8px] font-bold rounded-full w-full  ${
            paymentPeriod === EPaymentPeriod.Monthly
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setPaymentPeriod(EPaymentPeriod.Lifetime)}
          className={`px-[24px] py-[8px] font-bold rounded-full w-full  ${
            paymentPeriod === EPaymentPeriod.Lifetime
              ? "bg-primary text-white"
              : "bg-gray-200 border"
          }`}
        >
          Lifetime Bundles
        </button>
        <button
          onClick={() => setPaymentPeriod(EPaymentPeriod.Yearly)}
          className={`px-[24px] py-[8px] font-bold rounded-full w-full  ${
            paymentPeriod === EPaymentPeriod.Yearly
              ? "bg-primary text-white"
              : "bg-gray-200 border"
          }`}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};
