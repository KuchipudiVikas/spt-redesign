import { Button } from "../ui/button";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { Alert } from "../ui/alert";
import { BrowserUtils } from "@/lib/utils";

export interface IProductCard {
  title: string;
  unsubscribeNow: (subscriptionId: string) => void;
  updatePaymentMethod: (subscriptionId: string) => void;
  links: { text: string; url?: string }[];
  manageBillingCycle: (subscriptionId: string) => void;
  isSubscription: boolean;
  subscription?: any;
  token: string;
}

export default function ProductCard({
  title,
  unsubscribeNow,
  updatePaymentMethod,
  links,
  manageBillingCycle,
  isSubscription,
  subscription,
  token,
}: IProductCard) {
  console.log(links);

  return (
    <div className="mx-auto sp-container border-2 light-border rounded-2xl w-full lg:w-[272px]  ">
      <div
        style={{
          minHeight: "160px",
        }}
        className={`flex flex-col justify-between shadowAround  rounded-lg p-3`}
      >
        <div className="">
          <h2 className="text-lg font-bold">{title}</h2>
          <p>{isSubscription ? "Subscription" : "Lifetime"}</p>
        </div>
        <div className="flex flex-col items-start justify-start  gap-2 ">
          {/* {subscription.cancel_at_period_end &&
            subscription.cancel_at_period_end === true ? (
              <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Subscription will end on{" "}
                {BrowserUtils.getLocalDate(subscription.cancel_at)}
              </div> */}
          <div className="flex flex-row gap-3 justify-center items-center">
            {links &&
              links.map((link, index) => (
                <Button
                  variant="outline"
                  style={{}}
                  className="border light-border"
                  key={index}
                >
                  <Link
                    className="
                   transition-all    rounded-lg cursor-pointer"
                    href={link.url}
                  >
                    {link.text}
                  </Link>
                </Button>
              ))}
          </div>

          {isSubscription && (
            <Button
              className=" cursor-pointer"
              onClick={() => {
                manageBillingCycle(subscription.subscription_id);
              }}
            >
              Manage Subscription
            </Button>
          )}

          <div hidden={!isSubscription}>
            <Button
              className=" cursor-pointer"
              onClick={() => {
                updatePaymentMethod(subscription.subscription_id);
              }}
            >
              <DollarSign className="mr-2" />
              Update Card
            </Button>
          </div>

          {isSubscription &&
            subscription.cancel_at_period_end &&
            subscription.cancel_at_period_end === true && (
              <Alert className="  font-bold rounded">
                Subscription will end on{" "}
                {BrowserUtils.getLocalDate(subscription.cancel_at)}
              </Alert>
            )}

          {isSubscription && subscription && (
            <Button
              className=" cursor-pointer "
              onClick={() => {
                unsubscribeNow(subscription.subscription_id);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
