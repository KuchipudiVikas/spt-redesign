import { TShopFeature, SingleFeature } from "@/data/pricing";
import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/data";

import { CheckIcon } from "lucide-react";
import { XIcon } from "lucide-react";

const AccessRender: React.FC<{
  item: SingleFeature;
  Product: productsType;
}> = ({ item, Product }) => {
  const FinalProduct = item.isAvailable.find(
    (access) => access.name == Product
  );

  if (!FinalProduct) {
    return <div className="text-red-500">Not Available</div>;
  }

  return (
    <div className="flex items-center justify-center">
      {FinalProduct.status == AccessTypes.Available ? (
        <div
          style={{
            strokeWidth: "3px",
            // width: "35px",
            // height: "35px",
          }}
          className="bg-green-700 rounded-full w-fit text-white p-2 "
        >
          <CheckIcon size={24} />
        </div>
      ) : FinalProduct.status == AccessTypes.Limited ? (
        <div className="">Limited</div>
      ) : (
        <div
          style={{
            strokeWidth: "3px",
          }}
          className="bg-red-500 rounded-full w-fit text-white p-2 "
        >
          <XIcon size={24} />
        </div>
      )}
    </div>
  );
};

export default AccessRender;
