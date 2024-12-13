import styles from "@/styles/titans-pro/style.module.css";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import crossIcon from "@/public/assets/images/cross-svgrepo-com.svg";
import checkMarkIcon from "@/public/assets/images/tick-svgrepo-com.svg";
import router, { useRouter } from "next/router";
import { openSnackBar, SnackBarState } from "@/slices/snackBarSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/constants";
import { IPackage } from "@/lib/models/interfaces";
import { RootState } from "@/store";
import {
  EPaymentPeriod,
  ESubscriptionStatusType,
} from "@/lib/models/enums/common";
import MobileTableExpander from "@/components/Pricing/New/MobileTableExpander";
import { IndividualShopItems } from "./individualShop";
import SwipeableViews from "react-swipeable-views";
import LoadingBar from "@/components/utils/LoadingBar";
import {
  featuresMobileLifetime,
  lifetimeBundlePackages,
} from "@/constants/new/pricing-lifetime";
import { featuresMobile, packages } from "@/constants/new/pricing";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsList, Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import DesktopTableHeader from "./DesktopHead";
import DesktopBody from "./DesktopBody";
import TimePeriodToggle from "./PeriodToggle";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const isOwned = (featuresOwned, id) => {
  return featuresOwned?.find((item) => item.feature_shop === id);
};

export const allFeatures = [
  "64562b9ae2210da37f2bdb2c", // Titans Pro
  "6516aecf8a69c334783b3c27", // Titans Pro Max
  // "65603c9e1727b2465e1307ac", // Titans Ultra
  // "655ee43f1727b2465e13079b", // Titans Supreme
  // "66824bb5ef1f1684cc805b11", // Titans Mega
  "6687afdff6f516e9488a1ea6", // new Titans Supreme
];

export const getHeightSubscription = (featuresOwned) => {
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

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index.toString() && <div>{children}</div>}
//     </div>
//   );
// }

function getTabIntiValue(tabQuery) {
  if (tabQuery === EPaymentPeriod.Lifetime) {
    return EPaymentPeriod.Lifetime;
  } else if (tabQuery === EPaymentPeriod.Yearly) {
    return EPaymentPeriod.Yearly;
  }
  return EPaymentPeriod.Monthly;
}

export default function PricingTableTabs({
  token,
  tableTitle = "",
  features,
  featuresOwned,
  tabQuery,
}) {
  const [paymentPeriod, setPaymentPeriod] = useState(getTabIntiValue(tabQuery));
  const router = useRouter();
  let initialValue = "0";
  if (tabQuery) {
    if (tabQuery === EPaymentPeriod.Yearly) {
      initialValue = "1";
    } else if (tabQuery === EPaymentPeriod.Lifetime) {
      initialValue = "2";
    }
  }
  const [value, setValue] = useState<EPaymentPeriod>(EPaymentPeriod.Monthly);

  console.log({ paymentPeriod, tabQuery, initialValue, value });

  // update query params
  useEffect(() => {
    if (paymentPeriod === EPaymentPeriod.Lifetime) {
      router.replace(
        {
          query: {
            tab: EPaymentPeriod.Lifetime,
          },
        },
        undefined,
        { shallow: true }
      );
    } else if (paymentPeriod === EPaymentPeriod.Yearly) {
      router.replace(
        {
          query: {
            tab: EPaymentPeriod.Yearly,
          },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.replace(
        {
          query: {
            tab: EPaymentPeriod.Monthly,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [paymentPeriod]);

  const featuresOwnedList = getHeightSubscription(featuresOwned);
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

  const [isLoading, setIsLoading] = useState(false);

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

  // merge features with packages

  let featuresMobileWithIsAvailableOrder = isAvailableOrder(featuresMobile);

  let mergedPackages = packages.map((item) => {
    const feature = features.find((feature) => feature.id === item.productId);

    if (feature) {
      item = { ...item, ...feature };
    }
    return item;
  });
  let products = [
    titanProObj,
    titansProMaxObj,
    // titansUltraObj,
    // titansSupremeObj,
    titansSupremeObj,
  ];

  if (paymentPeriod === EPaymentPeriod.Lifetime) {
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

  useEffect(() => {
    setPaymentPeriod(value);
  }, [value]);

  return (
    <div className="">
      <TimePeriodToggle
        paymentPeriod={paymentPeriod}
        setPaymentPeriod={setPaymentPeriod}
        value={value}
        setValue={setValue}
      />

      <div className="">
        <PriceTable
          token={token}
          products={products}
          packages={mergedPackages}
          setIsLoading={setIsLoading}
          featuresMobile={featuresMobileWithIsAvailableOrder}
          paymentPeriod={paymentPeriod}
          tableTitle={tableTitle}
          features={features}
        />
      </div>
    </div>
  );
}

const isSubscribedByIndex = (packages, index) => {
  return packages[index]?.isOwned;
};

const splitWords = (word: string): string[] => {
  const words = word.split(" ");
  const remaining = words.slice(1).join(" ");
  return [words[0], remaining];
};

export function PriceTable({
  token,
  products,
  packages,
  setIsLoading,
  featuresMobile,
  paymentPeriod,
  tableTitle = "",
  features,
}) {
  console.log({ packages });
  const dispatch = useDispatch();
  const isTopBarOpen = useSelector((state: RootState) => state.topBar.isOpen);

  async function buyNow({
    packageItem,
    subscriptionType,
  }: {
    packageItem: IPackage;
    subscriptionType?: EPaymentPeriod;
  }) {
    try {
      setIsLoading(true);

      if (!token && packageItem.price === 0) {
        await router.push(`/auth/register?next=${router.asPath}`);
        return;
      } else if (!token) {
        await router.push(`/auth/login?next=${router.asPath}`);
        return;
      }

      localStorage.setItem("referrer", window.location.href);

      router.replace(
        `/checkout/v3?product=${packageItem.productId}&type=${subscriptionType}`
      );
      return;

      // router.reload();
    } catch (e) {
      console.error(e);
      const errorSnackBar: SnackBarState = {
        isOpen: true,
        title: "Error occurred!",
        message: e,
        severity: "error",
      };
      dispatch(openSnackBar(errorSnackBar));
    }
    setIsLoading(false);
  }

  return (
    <section className={` mx-2 `}>
      <DesktopTableHeader
        isTopBarOpen={isTopBarOpen}
        tableTitle={tableTitle}
        packages={packages}
        products={products}
        paymentPeriod={paymentPeriod}
        buyNow={buyNow}
      />
      <div
        className="flex flex-wrap items-center justify-between "
        style={{
          display:
            paymentPeriod !== EPaymentPeriod.Monthly &&
            paymentPeriod !== EPaymentPeriod.Yearly
              ? "none"
              : "",
        }}
      >
        <div className={` w-full`}>
          {/* mobile Responsive version */}

          <div
            className={` mt-8 w-full ${
              paymentPeriod !== EPaymentPeriod.Monthly &&
              paymentPeriod !== EPaymentPeriod.Yearly
                ? "hidden"
                : ""
            } `}
          >
            <div className="flex justify-start md:hidden items-center">
              {tableTitle.length > 0 ? (
                <h6 className="md:ml-2 md:text-xl font-bold md:py-2">
                  {tableTitle}
                </h6>
              ) : (
                <Fragment>
                  <p
                    style={{
                      color: "black",
                      fontWeight: 400,
                      textTransform: "none",
                    }}
                    className="text-xs mb-2 md:text-lg"
                  >
                    &nbsp; Choose A Product
                  </p>
                </Fragment>
              )}
            </div>

            <table
              style={{ border: "none" }}
              className="relative table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                className={`lg:hidden text-xs md:text-xl sticky ${
                  isTopBarOpen ? "top-36" : "top-14"
                } w-full text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 `}
              >
                <tr className="text-lg flex ">
                  {packages.map((product, idx) => {
                    // remove the free package from the list
                    if (product.type === ESubscriptionType.Free) return null;
                    if (product.name === "All Puzzle Tools Bundle") return null;
                    return (
                      <Fragment key={idx}>
                        <th
                          scope="col"
                          className="flex-1 border-2 bg-white shadow-sm"
                        >
                          <div
                            className={`text-center min-h-32 flex items-center flex-col justify-between py-2 px-0`}
                          >
                            <div
                              className={`h-fit mb-2 flex flex-col align-items-center justify-content-center`}
                            >
                              {splitWords(product.name).map((title, index) => {
                                return (
                                  <h6
                                    key={index}
                                    className={` text-sm uppercase md:text-base`}
                                  >
                                    {title} my
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
                              className={`   md:text-base text-sm px-2 py-2 ${
                                isSubscribedByIndex(products, idx)
                                  ? "bg-gray-50"
                                  : "bg-primary-150 text-white hover:bg-primary-200"
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
                                    : "UPGRADE"
                                  : "FREE")}
                            </Button>
                          </div>
                        </th>
                      </Fragment>
                    );
                  })}
                </tr>
              </thead>
              {/* desktop version head */}

              {/* desktop version body */}
              <DesktopBody
                featuresMobile={featuresMobile}
                products={products}
                paymentPeriod={paymentPeriod}
              />
              {/* mobile version body */}
              <tbody className={` lg:hidden h-96 `}>
                {featuresMobile.map((feature, idx) => {
                  // remove the free package from the list

                  return (
                    <Fragment key={"p_" + idx}>
                      <MobileTableExpander title={feature.title}>
                        {feature.includes.map((item, idx) => {
                          return (
                            <Fragment key={"c_" + idx}>
                              <tr>
                                <th
                                  scope="row"
                                  // colSpan={3}
                                  className="border text-center py-2   text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <div className="flex justify-center">
                                    <p className="text-md whitespace-normal max-w-[90vw]">
                                      {item.title}
                                    </p>{" "}
                                  </div>
                                </th>
                              </tr>

                              <tr className="bg-white flex  dark:bg-gray-800 dark:border-gray-700">
                                {item.isAvailable.map((itemChild, idx) => {
                                  // remove the free package from the list
                                  if (
                                    itemChild.name === productsType.Free ||
                                    itemChild.name == "puzzle bundle"
                                  )
                                    return null;

                                  if (
                                    paymentPeriod === EPaymentPeriod.Lifetime &&
                                    itemChild.availability ===
                                      Availability.MonthlyOnly
                                  ) {
                                    return (
                                      <Fragment key={"cc_" + idx}>
                                        <td className=" py-3 border-2 flex-1 text-center">
                                          <Image
                                            priority
                                            height={10}
                                            width={10}
                                            className={`${styles.iconD} h-4 w-4`}
                                            src={crossIcon}
                                            alt="#"
                                          />
                                        </td>
                                      </Fragment>
                                    );
                                  }
                                  if (itemChild.text) {
                                    return (
                                      <td
                                        className=" py-3 border-2 flex-1 text-center"
                                        key={"ccc_" + idx}
                                      >
                                        <h6 className="text-black capitalize">
                                          {itemChild.text}
                                        </h6>
                                      </td>
                                    );
                                  }
                                  return (
                                    <Fragment key={"cc_" + idx}>
                                      <td className=" py-3 border-2 flex-1 text-center">
                                        {itemChild.status ===
                                          AccessTypes.Limited ||
                                        itemChild.status ===
                                          AccessTypes.Max100Entries ||
                                        itemChild.status ===
                                          AccessTypes.Max200Entries ? (
                                          <span className="text-black text-center">
                                            {itemChild.status}
                                          </span>
                                        ) : (
                                          <Image
                                            priority
                                            height={10}
                                            width={10}
                                            className={`${styles.iconD} h-4 w-4`}
                                            src={
                                              feature.title ===
                                                "KDP Masterclass" &&
                                              paymentPeriod ===
                                                EPaymentPeriod.Monthly
                                                ? crossIcon
                                                : itemChild.status ===
                                                  AccessTypes.Available
                                                ? (feature.title ==
                                                    "Puzzle & Activity Book Tools" ||
                                                    feature.title ==
                                                      "Coloring Book Maker Tool") &&
                                                  paymentPeriod ==
                                                    EPaymentPeriod.Lifetime &&
                                                  idx == 3
                                                  ? crossIcon
                                                  : checkMarkIcon
                                                : crossIcon
                                            }
                                            alt="#"
                                          />
                                        )}
                                      </td>
                                    </Fragment>
                                  );
                                })}
                              </tr>
                            </Fragment>
                          );
                        })}
                      </MobileTableExpander>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {paymentPeriod === EPaymentPeriod.Lifetime && (
        <section className="optional-sec md:pt-12 pt-6">
          <div className=" flex flex-wrap items-center justify-between mx-auto">
            <div className={`${styles.toolContent} text-center w-full`}>
              <h1 className="font-bold text-xl md:text-4xl uppercase text-center">
                Individual Products With Lifetime access
              </h1>
            </div>
          </div>
          <IndividualShopItems features={features} cols={4} paddingX={""} />
        </section>
      )}
    </section>
  );
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

export function getPriceBasedOnPeriod(
  product: any,
  paymentPeriod: EPaymentPeriod
) {
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
