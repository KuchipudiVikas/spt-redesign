import { useState } from "react";
import Accounts from "@/lib/mw/Accounts";
import Link from "next/link";
import { shopIds } from "@/data/shopData";
import {
  allIncludedTools,
  faq,
  newPuzzleTools,
} from "@/data/FeaturesIndexPage/constants";
import { getSession } from "next-auth/react";
import LoadingBar from "@/components/utils/LoadingBar";
import { CheckIcon, InfoIcon, ShoppingCartIcon } from "lucide-react";
import HintWrapper from "@/utils/hint";
import PricingTableTabs from "@/components/Pricing/New/PriceTable";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import { Button } from "@/components/ui/button";
import MainLayout, { getProfile } from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";
import { CheckIconText } from "@/components/Icons/CheckFilled";
import { SparklesIcon } from "lucide-react";

const isOwned = (featuresOwned, id) => {
  return featuresOwned?.find((item) => item.feature_shop === id);
};

function FeaturePage({
  token,
  info,
  pageData,
  features,
  featuresOwned,
  shopItems,
  tabQuery,
}) {
  console.log(shopItems);
  const titanProObj = features.find(
    (item) => item.id === "64562b9ae2210da37f2bdb2c"
  );
  // check if user owns this feature
  const isProOwned = isOwned(featuresOwned, titanProObj.id);
  // add isOwned to the object
  titanProObj.isOwned = isProOwned;
  const titansProMaxObj = features.find(
    (item) => item.id === "6516aecf8a69c334783b3c27"
  );
  // check if user owns this feature
  const isProMaxOwned = isOwned(featuresOwned, titansProMaxObj.id);
  // add isOwned to the object
  titansProMaxObj.isOwned = isProMaxOwned;

  //new tools only
  const titansUltraObj = features.find(
    (item) => item.id === "65603c9e1727b2465e1307ac"
  );
  // check if user owns this feature
  const isUltraOwned = isOwned(featuresOwned, titansUltraObj.id);
  titansUltraObj.isOwned = isUltraOwned;
  // includes everything
  const titansSupremeObj = features.find(
    (item) => item.id === "655ee43f1727b2465e13079b"
  );
  // check if user owns this feature
  const isSupremeOwned = isOwned(featuresOwned, titansSupremeObj.id);
  titansSupremeObj.isOwned = isSupremeOwned;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Puzzle & Activity Bundle - Self Publishing Titans",
        description: "Puzzle & Activity Bundle by Self Publishing Titans",
        keywords: "puzzle, activity, bundle, self publishing titans",
      }}
      Title={<PageTitle title="Puzzle & Activity Bundle" />}
      Body={
        <>
          <LoadingBar isLoading={isLoading} title={"Loading..."} />

          <section className="mt-20 ">
            <div className="flex flex-col">
              <div className="">
                <h3 className=" text-[32px] font-semibold text-center my-2">
                  Puzzle Bundle
                </h3>
                <div className="relative w-full  h-full flex justify-center ">
                  <div className="flex flex-col w-full items-center justify-center lg:flex-row px-5 text-white mt-0">
                    <iframe
                      className="videoRatioStandard w-full lg:w-[40vw] max-w-[600px] rounded-lg "
                      src={`${shopItems.PuzzleBundle.video_url}`}
                      loading="lazy"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin"
                    ></iframe>

                    <div
                      className={`flex flex-1 flex-col justify-between px-5 text-black `}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 mt-2 gap-x-6">
                        {allIncludedTools.tools.map((text, index) => (
                          <CheckIconText
                            textStyles={{
                              fontSize: "15px",
                            }}
                            key={index}
                            text={text}
                          />
                        ))}
                      </div>

                      <div className="gap-2  mt-4 flex  justify-start w-full ">
                        <Link
                          href={shopItems.PuzzleBundle.preview_url}
                          passHref
                          className=" flex justify-start "
                        >
                          <Button
                            className=" rounded-full  "
                            size="lg"
                            variant="outline"
                          >
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <h3 className=" mt-[160px] font-semibold text-[32px] md:mt-16 text-center my-2">
                  Activity Bundle
                </h3>
                <div className="relative w-full  h-full flex justify-center ">
                  <div className="flex flex-col w-full items-center justify-center lg:flex-row px-5 text-white mt-0">
                    <iframe
                      className="videoRatioStandard w-full lg:w-[40vw] lg:max-w-[600px] rounded-lg "
                      src={`${shopItems.ActivityBundle.video_url}`}
                      loading="lazy"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin"
                    ></iframe>

                    <div
                      className={`flex flex-col flex-1  justify-between px-5 text-black h-64 lg:h-80`}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6">
                        {newPuzzleTools.tools.map((text, index) => (
                          <CheckIconText
                            textStyles={{
                              fontSize: "15px",
                            }}
                            key={index}
                            text={text}
                          />
                        ))}
                      </div>

                      <div className="gap-2 mt-8 flex  justify-start w-full ">
                        <Link
                          href={shopItems.ActivityBundle.preview_url}
                          passHref
                          className=" text-start "
                        >
                          <Button
                            className="rounded-full"
                            size="lg"
                            variant="outline"
                          >
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[230px] md:mt-[100px]  flex justify-center">
              <div className="w-full mx-5 lg:w-[1200px]">
                <h3 className=" text-center font-semibold text-[32px]   mb-10">
                  Choose Lifetime Access
                </h3>
                <div className="gap-10 grid  lg:grid-cols-3 align-items-end ">
                  <PricingCard
                    title="Activity Bundle"
                    overViewTexts={[
                      "13 Activity & Puzzle Tools",
                      "Unlimited Use",
                      "No Silly Restrictions",
                      "Buy Now, Pay Later: Affirm & Klarna",
                    ]}
                    shopItem={shopItems.ActivityBundle}
                    price={
                      shopItems.ActivityBundle.isSale
                        ? shopItems.ActivityBundle.sale_price
                        : shopItems.ActivityBundle.price
                    } // note:: replace with the actual price
                    shopLink={"#pricing"}
                    puzzlesList={newPuzzleTools.tools}
                  />
                  <PricingCard
                    title="Puzzle Bundle"
                    overViewTexts={[
                      "20 Activity & Puzzle Tools",
                      "Unlimited Use",
                      "No Silly Restrictions",
                      "Buy Now, Pay Later: Affirm & Klarna",
                    ]}
                    shopItem={shopItems.PuzzleBundle}
                    price={
                      shopItems.PuzzleBundle.isSale
                        ? shopItems.PuzzleBundle.sale_price
                        : shopItems.PuzzleBundle.price
                    } // note:: replace with the actual price
                    shopLink={"#pricing"}
                    puzzlesList={[
                      ...allIncludedTools.tools,
                      ...allIncludedTools.nonPuzzleBonuses.tools,
                    ]}
                  />

                  <PricingCard
                    title=" Puzzle & Activity Bundle"
                    overViewTexts={[
                      "33 Puzzle & Activity Tools",
                      "Unlimited Use",
                      "No Silly Restrictions",
                      "Buy Now, Pay Later: Affirm & Klarna",
                    ]}
                    shopItem={shopItems.PuzzleActivityBundle}
                    price={
                      shopItems.PuzzleActivityBundle.isSale
                        ? shopItems.PuzzleActivityBundle.sale_price
                        : shopItems.PuzzleActivityBundle.price
                    } // note:: replace with the actual price
                    shopLink={"#pricing"}
                    ornament={"Best Deal"}
                    puzzlesList={[
                      ...allIncludedTools.tools,
                      ...newPuzzleTools.tools,
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center"></div>
          </section>

          <div className="mt-[50px] md:mt-[100px]  flex justify-center">
            <div className="w-full mx-5 lg:w-[1200px]">
              <h3 className=" text-[32px] font-semibold text-center my-2">
                Or Choose Monthly Subscription Plans
              </h3>
            </div>
          </div>

          <section id={`pricing`} className="">
            <PricingTableTabs
              token={token}
              features={features}
              featuresOwned={featuresOwned}
              tabQuery={tabQuery}
            />
          </section>
          <div className="min-h-[5vh] lg:min-h-[10vh]"></div>
        </>
      }
    />
  );
}

// use next-auth to check if user is logged in
export async function getServerSideProps(context) {
  try {
    const session: any = await getSession(context);
    const content = await Accounts.content.home();
    let features = await Accounts.features.list({ token: session?.token });
    const PuzzleBundle = await Accounts.features.view(
      false,
      shopIds.PUZZLE_TOOLS_V1
    );
    const ActivityBundle = await Accounts.features.view(
      false,
      shopIds.PUZZLE_TOOLS_V2
    );
    const PuzzleActivityBundle = await Accounts.features.view(
      false,
      shopIds.ALL_PUZZLE_BUNDLE
    );

    let shopItems = {
      ActivityBundle: ActivityBundle.simple,
      PuzzleBundle: PuzzleBundle.simple,
      PuzzleActivityBundle: PuzzleActivityBundle.simple,
    };

    // tab query
    const tab = context.query?.tab || EPaymentPeriod.Monthly;
    if (session?.token) {
      const featuresOwned = await Accounts.features.checkAll(session.token);
      return getProfile(context, {
        token: session.token,
        pageData: content.simple,
        isEligible: false,
        features: features.simple,
        featuresOwned: featuresOwned.simple ?? [],
        shopItems: shopItems,
        tabQuery: tab,
      }).catch((error) => {
        console.error("Error in getProfile:", error);
        return {
          notFound: true,
        };
      });
    }

    return getProfile(context, {
      token: null,
      pageData: content.simple,
      isEligible: false,
      features: features.simple,
      featuresOwned: [],
      shopItems: shopItems,
      tabQuery: tab,
    }).catch((error) => {
      console.error("Error in getProfile:", error);
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    });
  } catch (e) {
    console.error("Error in getServerSideProps:", e);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default FeaturePage;

function CheckItem({ text }: any): JSX.Element {
  return (
    <div className="flex gap-2 my-2 items-center">
      <CheckIcon className="w-7 h-auto" color="primary" />
      <p className=" text-[18px] font-medium">{text}</p>
    </div>
  );
}

function PricingCard({
  title,
  overViewTexts,
  shopLink,
  price,
  puzzlesList,
  ornament = false,
  shopItem,
}: any) {
  return (
    <div className="h-full w-full  flex items-end">
      <div className=" w-full ">
        {ornament && (
          <div className="w-full  flex justify-center">
            <div className="flex items-center gap-2 lavbg px-4 pr-5 py-1 mb-2 font-bold rounded-lg text-sm  text-primary">
              <SparklesIcon className="text-primary w-4" /> {ornament}
            </div>
          </div>
        )}
        <div className="p-3  sp-container p-2 border light-border rounded-2xl">
          <h4 className="text-[18px] text-primary font-semibold ">{title}</h4>
          <div className="my-5 ">
            {overViewTexts.map((text, index) => (
              <div key={index} className="flex  items-center gap-2 py-1.5">
                <CheckIcon className="text-primary w-4" />
                <p
                  style={{
                    fontSize: "15px",
                  }}
                  className=""
                >
                  {" "}
                  {text}
                </p>
                {/* {index == 0 && (
                  <HtmlTooltip
                    sx={{ backgroundColor: "white" }}
                    placement="top"
                    title={
                      <>
                        <div className="bg-white text-black">
                          <p className="font-bold text-[22px]">Puzzles</p>
                          <div className="grid grid-cols-3 gap-x-4">
                            {puzzlesList.map((tool, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 py-1.5"
                                >
                                  <CheckCircleOutlinedIcon
                                    className="w-4"
                                    color="primary"
                                  />
                                  <p className="text-[17px]">{tool}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    }
                  >
                    <InfoIcon className="w-4 h-auto" />
                  </HtmlTooltip>
                )} */}
              </div>
            ))}
          </div>
          <div className="w-full gap-3 flex items-center justify-center">
            {shopItem.isSale ? (
              <p className="font-bold text-[18px]">
                ${shopItem.sale_price}
                <del className="ml-3">${shopItem.price}</del>{" "}
              </p>
            ) : (
              <p className="font-bold text-[18px]">${price}</p>
            )}

            <Link href={`/shop/${shopItem.id}`} passHref>
              <Button className="rounded-full">
                Buy Now <ShoppingCartIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
