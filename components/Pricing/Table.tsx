import React from "react";
import { featuresMobile } from "@/data/pricing";
import { TShopFeature, SingleFeature } from "@/data/pricing";
import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/data";
import { CheckIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { EPaymentPeriod } from "@/lib/ts/enums/payment";

interface TableProps {
  selectedPeriod: EPaymentPeriod;
}

const Table: React.FC<TableProps> = ({ selectedPeriod }) => {
  return (
    <div className="flex flex-col mt-5 gap-4 mb-20">
      {featuresMobile.map((feature: TShopFeature, index: number) => {
        return <Row key={index} feature={feature} />;
      })}
    </div>
  );
};

export default Table;

interface RowProps {
  feature: TShopFeature;
}

const Row: React.FC<RowProps> = ({ feature }) => {
  return (
    <div
      style={{
        borderRadius: "20px",
      }}
      className="border"
    >
      <div
        style={{
          background: "#ede8ff",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          fontSize: "18px",
        }}
        className="p-3 font-bold uppercase"
      >
        {feature.title}
      </div>
      <div className="bg-[f9f7ff] p-3">
        <div className="">
          <div className="">
            {feature.includes.map((item, index) => {
              const showBottomBorder =
                feature.includes.length > 1 &&
                index < feature.includes.length - 1;

              return (
                <div
                  style={{
                    borderBottom: showBottomBorder
                      ? "1px solid #e5e5e5"
                      : "none",
                  }}
                  className="grid grid-cols-2 gap-20"
                >
                  <div className=" py-5 ">{item.title}</div>
                  <div className="grid grid-cols-4">
                    <AccessRender item={item} Product={productsType.Free} />

                    <AccessRender
                      item={item}
                      Product={productsType.TitansPro}
                    />

                    <AccessRender
                      item={item}
                      Product={productsType.TitansProMax}
                    />
                    <AccessRender
                      item={item}
                      Product={productsType.TitansMega}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

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
            width: "35px",
            height: "35px",
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