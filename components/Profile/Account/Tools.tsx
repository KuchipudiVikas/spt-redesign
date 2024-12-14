import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "../ProductCard";

interface IToolsTab {
  purchaseList: any;
  unsubscribeNow: (subscriptionId: string) => void;
  updatePaymentMethod: (subscriptionId: string) => void;
  token: string;
  manageBillingCycle: (subscriptionId: string) => void;
}

export default function ToolsTab({
  purchaseList,
  unsubscribeNow,
  updatePaymentMethod,
  token,
  manageBillingCycle,
}: IToolsTab) {
  return (
    <div
      style={{ marginLeft: "5px", marginRight: "5px" }}
      className="grid grid-cols-1 lg:grid-cols-3  gap-4"
    >
      {purchaseList.length && (
        <div className="flex  items-center justify-center">
          <h6>
            No Tools were Purchased.{" "}
            <Link href={"/shop"}>
              <Button>Visit shop </Button>
            </Link>
          </h6>
        </div>
      )}

      {purchaseList?.subscriptions?.map((card, index) => (
        <ProductCard
          key={index}
          title={card.feature_shop.title}
          isSubscription={true}
          subscription={card}
          unsubscribeNow={unsubscribeNow}
          updatePaymentMethod={updatePaymentMethod}
          links={card.feature_shop.links}
          manageBillingCycle={manageBillingCycle}
          token={token}
        />
      ))}
      {purchaseList?.lifetime_access?.map((card, index) => (
        <ProductCard
          key={index}
          title={card.feature_shop.title}
          isSubscription={false}
          unsubscribeNow={unsubscribeNow}
          updatePaymentMethod={updatePaymentMethod}
          links={card.feature_shop.links}
          manageBillingCycle={manageBillingCycle}
          token={token}
        />
      ))}
    </div>
  );
}
