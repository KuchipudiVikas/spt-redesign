import React from "react";
import { User } from "@/lib/ts/types/user";
import { ProductData, PurchasedProduct } from "@/lib/ts/types/shop";
import { useState } from "react";
import { EPaymentPeriod } from "@/lib/ts/enums/payment";

import PricingTableTabs from "@/components/Pricing/New/PriceTable";

export interface PricingProps {
  features: ProductData[];
  featuresOwned: PurchasedProduct[];
  tabQuery: string;
  info?: User;
  token: string;
}

const PricingPage: React.FC<PricingProps> = ({
  features,
  featuresOwned,
  tabQuery,
  token,
}) => {
  const [paymentPeriod, setPaymentPeriod] = useState<EPaymentPeriod>(
    tabQuery as EPaymentPeriod
  );

  return (
    <div className="max-w-[1300px] mx-auto flex justify-center font-jsans py-10">
      <div className="mx-auto">
        <PricingTableTabs
          token={token}
          features={features}
          featuresOwned={featuresOwned}
          tabQuery={tabQuery}
        />
        {/* <Table selectedPeriod={paymentPeriod} /> */}
      </div>
    </div>
  );
};

export default PricingPage;
