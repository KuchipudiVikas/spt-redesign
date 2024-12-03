import { EPaymentPeriod } from "@/lib/ts/enums/payment";
import { ProductData, PurchasedProduct } from "@/lib/ts/types/shop";
import { Button } from "../ui/button";
import { packages } from "@/data/pricing";

export interface PricingHeaderProps {
  selectedPeriod: EPaymentPeriod;
  userOwnedFeatures: PurchasedProduct[];
}

const PricingHeader: React.FC<PricingHeaderProps> = ({
  selectedPeriod,
  userOwnedFeatures,
}) => {
  return (
    <div
      style={{
        gap: "20px",
      }}
      className="grid grid-cols-2 "
    >
      <div
        style={{
          borderRadius: "16px",
          padding: "30px",
        }}
        className=" flex  items-start bg-[#f7f7f8] justify-center  flex-col border-2 h-full "
      >
        <h3
          style={{
            fontSize: "22px",
          }}
          className="my-auto font-extrabold"
        >
          Monthly Subscription
        </h3>
        <div
          style={{
            paddingTop: "15px",
          }}
          className=""
        >
          Try our tools Risk Free - <strong>7 Days Money Back Guarantee</strong>
        </div>
      </div>
      <div
        style={{
          borderRadius: "16px",
          padding: "8 px",
        }}
        className="border-2 "
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            padding: "20px",
          }}
          className=""
        >
          {packages.map((tier, index) => {
            return (
              <div
                key={index}
                className="font-bold flex flex-col gap-2 items-center text-center"
              >
                <h3>{tier.name}</h3>
                <h2
                  style={{
                    fontSize: "26px",
                  }}
                  className="font-extrabold"
                >
                  ${tier.price}
                </h2>
                <Button
                  style={{
                    padding: "7px 20px",
                    width: "80%",
                  }}
                  className="font-bold mt-[10px] rounded-full  h-fit"
                >
                  Select
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
