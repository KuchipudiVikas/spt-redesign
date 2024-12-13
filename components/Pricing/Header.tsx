import { EPaymentPeriod } from "@/lib/ts/enums/payment";
import { ProductData, PurchasedProduct } from "@/lib/ts/types/shop";
import { Button } from "../ui/button";
import { packages } from "@/data/pricing";
import { Fragment } from "react";
import { ESubscriptionType } from "@/constants";
import { splitWords } from "@/utils/helper";
import { ESubscriptionStatusType } from "@/lib/models/enums/common";
import { useRouter } from "next/router";
import { IPackage } from "@/data/pricing";

import {
  featuresMobileLifetime,
  lifetimeBundlePackages,
} from "@/constants/new/pricing-lifetime";

export interface PricingHeaderProps {
  selectedPeriod: EPaymentPeriod;
  userOwnedFeatures: PurchasedProduct[];
  token: string;
}

function getPrice(price: number, isSale: boolean, salePrice: number | null) {
  if (isSale && salePrice) {
    return (
      <div className={`h-10 flex align-items-center justify-content-center`}>
        <p className="my-auto">
          ${salePrice} <s>${price}</s>
        </p>
      </div>
    );
  }
  return (
    <div className={`h-10 flex align-items-center justify-content-center`}>
      <p className="my-auto">${price}</p>
    </div>
  );
}

const isSubscribedByIndex = (packages, index) => {
  return packages[index]?.isOwned;
};

function getPriceBasedOnPeriod(product: any, paymentPeriod: EPaymentPeriod) {
  if (paymentPeriod === EPaymentPeriod.Monthly) {
    return getPrice(
      product.monthly_price,
      product.is_monthly_sale,
      product.monthly_sale_price
    );
  } else if (paymentPeriod === EPaymentPeriod.Yearly) {
    return getPrice(
      product.yearly_price,
      product.isYearlySale,
      product.yearly_sale_price
    );
  } else if (paymentPeriod === EPaymentPeriod.Lifetime) {
    return getPrice(product.price, product.isSale, product.sale_price);
  }
  return null;
}

export const allFeatures = [
  "64562b9ae2210da37f2bdb2c", // Titans Pro
  "6516aecf8a69c334783b3c27", // Titans Pro Max
  // "65603c9e1727b2465e1307ac", // Titans Ultra
  // "655ee43f1727b2465e13079b", // Titans Supreme
  // "66824bb5ef1f1684cc805b11", // Titans Mega
  "6687afdff6f516e9488a1ea6", // new Titans Supreme
];

const PricingHeader: React.FC<PricingHeaderProps> = ({
  selectedPeriod,
  userOwnedFeatures,
  token,
  features,
}) => {
  const isOwned = (featuresOwned, id) => {
    return featuresOwned?.find((item) => item.feature_shop === id);
  };

  function isAvailableOrder(features) {
    return features.map((feature) => ({
      title: feature.title,
      includes: feature.includes.map((includedItem) => ({
        title: includedItem.title,
        isAvailable: includedItem.isAvailable.slice(),
        isNew: includedItem.isNew ?? false,
        subtitle: includedItem?.subtitle,
      })),
    }));
  }

  const getHeightSubscription = (featuresOwned) => {
    // featuresOwned?.find((item) => item.feature_shop === id)
    let featureOwnedList = [];
    allFeatures.forEach((feature) => {
      if (isOwned(featuresOwned, feature)) {
        featureOwnedList.push(ESubscriptionStatusType.Subscribed);
        // make all previous features as Downgrade
        for (let i = 0; i < featureOwnedList.length - 1; i++) {
          featureOwnedList[i] = ESubscriptionStatusType.Downgrade;
        }
      } else {
        featureOwnedList.push(ESubscriptionStatusType.Default);
      }
    });
    return featureOwnedList;
  };

  const featuresOwnedList = getHeightSubscription(userOwnedFeatures);
  const titanProObj = features.find(
    (item) => item.id === "64562b9ae2210da37f2bdb2c"
  );

  // add isOwned to the object
  titanProObj.buttonType = featuresOwnedList[0];
  const titansProMaxObj = features.find(
    (item) => item.id === "6516aecf8a69c334783b3c27"
  );
  titansProMaxObj.buttonType = featuresOwnedList[1];

  const titansSupremeObj = features.find(
    (item) => item.id === "6687afdff6f516e9488a1ea6"
  );
  titansSupremeObj.buttonType = featuresOwnedList[2];

  //new tools only
  // const titansUltraObj = features.find(
  //   (item) => item.id === "65603c9e1727b2465e1307ac"
  // );
  // titansUltraObj.buttonType = featuresOwnedList[2];
  // includes everything
  // const titansSupremeObj = features.find(
  //   (item) => item.id === "655ee43f1727b2465e13079b"
  // );
  // titansSupremeObj.buttonType = featuresOwnedList[3];

  const titansMegaObj = features.find(
    (item) => item.id === "66824bb5ef1f1684cc805b11"
  );
  titansMegaObj.buttonType = featuresOwnedList[2];

  // 6682549f162266c1417d4a72 Basic Plus Bundle
  const basicPlusBundleObj = features.find(
    (item) => item.id === "6682549f162266c1417d4a72"
  );

  // 668255c5162266c1417d4a73 Research Bundle
  const researchBundleObj = features.find(
    (item) => item.id === "668255c5162266c1417d4a73"
  );

  // 6682563d162266c1417d4a74 Creative Bundle
  const creativeBundleObj = features.find(
    (item) => item.id === "66825715162266c1417d4a74"
  );

  const router = useRouter();

  // let featuresMobileWithIsAvailableOrder = isAvailableOrder(featuresMobile);

  // let mergedPackages = packages.map((item) => {
  //   const feature = features.find((feature) => feature.id === item.productId);

  //   if (feature) {
  //     item = { ...item, ...feature };
  //   }
  //   return item;
  // });

  let products = [
    titanProObj,
    titansProMaxObj,
    // titansUltraObj,
    // titansSupremeObj,
    titansSupremeObj,
  ];

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
        await router.push(`/login?next=${router.asPath}`);
        return;
      }

      localStorage.setItem("referrer", window.location.href);

      router.replace(
        `/checkout/v3?product=${packageItem.productId}&type=${subscriptionType}`
      );
      return;

      // router.reload();
    } catch (e) {}
    // setIsLoading(false);
  }

  if (selectedPeriod === EPaymentPeriod.Lifetime) {
    mergedPackages = lifetimeBundlePackages.map((item) => {
      const feature = features.find((feature) => feature.id === item.productId);

      if (feature) {
        item = { ...item, ...feature };
      }
      return item;
    });

    products = [
      basicPlusBundleObj,
      researchBundleObj,
      // titansUltraObj,
      // titansSupremeObj,
      creativeBundleObj,
      titansMegaObj,
    ];
  }

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
          {/* {packages.map((tier, index) => {
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
          })} */}

          {packages.map((product, idx) => {
            // remove the free package from the list
            if (product.type === ESubscriptionType.Free) return null;
            if (product.name === "All Puzzle Tools Bundle") return null;
            return (
              <Fragment key={idx}>
                <th scope="col" className="flex-1 border-2 bg-white shadow-sm">
                  <div
                    className={`text-center min-h-32 flex items-center flex-col justify-between py-2 px-0`}
                  >
                    <div
                      className={`h-fit mb-2 flex flex-col align-items-center justify-content-center`}
                    >
                      {splitWords(product.name).map((title, index) => {
                        return (
                          <h6
                            fontWeight={700}
                            key={index}
                            className={` text-sm uppercase md:text-base`}
                          >
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
                    {getPriceBasedOnPeriod(product, selectedPeriod)}
                    <h6
                      fontWeight={600}
                      className="md:px-2 mt-4 md:mt-0 text-xs md:text-base"
                    >
                      {idx !== 0 &&
                        (selectedPeriod == EPaymentPeriod.Lifetime
                          ? "One Time Payment"
                          : selectedPeriod == EPaymentPeriod.Yearly
                          ? "Billed Yearly"
                          : selectedPeriod == EPaymentPeriod.Monthly
                          ? "Billed Monthly"
                          : "FREE")}
                    </h6>
                    <div hidden={!token} className={`h-9`} />
                    <Button
                      hidden={token && idx === 0}
                      className={`   md:text-base text-sm px-2 py-2 ${
                        isSubscribedByIndex(products, idx)
                          ? "bg-gray-50"
                          : "bg-primary-150 text-white hover:bg-primary-200"
                      } `}
                      onClick={() =>
                        buyNow({
                          packageItem: product,
                          subscriptionType: selectedPeriod,
                        })
                      }
                    >
                      {idx !== 0 &&
                        (selectedPeriod == EPaymentPeriod.Lifetime
                          ? "Select"
                          : selectedPeriod == EPaymentPeriod.Yearly
                          ? "Subscribe"
                          : selectedPeriod == EPaymentPeriod.Monthly
                          ? isSubscribedByIndex(products, idx)
                            ? "SUBSCRIBED"
                            : "UPGRADE"
                          : "FREE")}
                    </Button>
                  </div>
                </th>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
