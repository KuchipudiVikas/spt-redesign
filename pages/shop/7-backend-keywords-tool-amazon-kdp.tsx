import { useState } from "react";
import Account from "@/lib/mw/Accounts";
import Accounts from "@/lib/mw/Accounts";
import MainLayout, { getProfile } from "@/components/Layout";
import Link from "next/link";
import { shopIds } from "@/data/shopData";
import { getSession } from "next-auth/react";
import LoadingBar from "@/components/utils/LoadingBar";
import { FaqSection } from "@/components/Common/FaqItem";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CheckIcon,
  CheckSquareIcon,
  ShoppingCartIcon,
  SparkleIcon,
} from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";
import { CheckIconText } from "@/components/Icons/CheckFilled";

const bkt_faq = [
  {
    question: "How does the 7 Backend Keywords Tool work?",
    answer:
      "Our tool uses advanced algorithms to analyze and suggest the most effective keywords to improve its discoverability on Amazon.",
  },
  {
    question: "Can I use this tool for multiple books",
    answer:
      "Yes, our tool is designed to help you optimize keywords for all your books.",
  },
  {
    question: "Is the 50% discount applicable for the future?",
    answer:
      "The 50% discount is only available during the launch special. After launch it will be at full price.",
  },
];

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
}) {
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
        title: "7 Backend Keywords Tool for Amazon KDP",
        description:
          "Our 7 Backend Keywords Tool is the ultimate solution for authors who want to optimize their SEO, rankings and sales on Amazon.",
        keywords: "7 Backend Keywords Tool, Amazon KDP, SEO, rankings, sales",
      }}
      Title={<PageTitle title="7 Backend Keywords Tool" />}
      Body={
        <>
          <LoadingBar isLoading={isLoading} title={"Loading..."} />
          <section className="mt-10 px-4 text-center">
            <div className="font-Inter md:w-[80vw] 2xl:w-[1300px] font-semibold  flex flex-col items-center justify-center mt-10 mx-auto">
              <h3 className="mx-auto  text-[20.2px] md:text-[30px] text-black ">
                Are you struggling to get book sales or does keyword
                research confuse you?
              </h3>
              <p className=" font-normal font-Inter text-center mt-6 leading-7 ">
                Our 7 Backend Keywords Tool is the first of its kind research
                tool. It is the ultimate solution for authors who want to
                optimize their SEO, rankings and sales on Amazon.
              </p>
            </div>
            <div className="flex flex-col mt-12">
              <div className="">
                <div className="relative w-full  h-full flex justify-center ">
                  <div className="flex flex-col  items-center justify-center lg:flex-row px-5 text-white mt-">
                    <iframe
                      className="videoRatioStandard w-full lg:w-[40vw] max-w-[600px] rounded-lg "
                      src={`https://www.youtube.com/embed/RYB70LdxQC0`}
                      loading="lazy"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid border-2 light-border rounded-2xl py-4 mt-16  mx-auto md:grid-cols-2 text-left px-4 lg:w-[800px] xl:w-[1000px]">
              <div className="flex flex-col   mx-auto w-full  items-start  justify-start">
                <div className="w-full flex justify-center">
                  <h3 className="font-Inter flex items-center font-semibold gap-3 text-[20.2] pb-2">
                    {" "}
                    <CheckSquareIcon className="text-primary" /> Features
                  </h3>
                </div>
                <div className="">
                  <CheckIconText text=" Use-friendly and easy to use for quick and easy keywordresearch." />

                  <CheckIconText text="Customizable options to tailor specifically to your book." />

                  <CheckIconText text="Lifetime Access and unlimited use" />
                </div>
              </div>
              <div className="flex flex-col   items-start mx-auto w-full   justify-start">
                <div className="w-full flex justify-center">
                  <h3 className="font-Inter flex items-center font-semibold  gap-3 pb-2 ">
                    <SparkleIcon className="text-primary" /> Benefits
                  </h3>
                </div>
                <div className="">
                  <CheckIconText
                    text="Increase your book's discoverability and rank higher on
                    Amazon"
                  />

                  <CheckIconText text="Improve your Amazon rankings and reach more potential readers" />
                  <CheckIconText text="Save time and effort with our intuitive and powerful tool." />
                </div>
              </div>
            </div>
            {/* <div className="max-w-[80vw] font-medium md:text-[20.2px] text-black text-center mx-auto mt-16 font-Inter">
              Right now during this launch we are doing a limited-time special
              offer and giving you a 50% discount for the lifetime bundles.
            </div>

            <div className="max-w-[80vw] text-center mx-auto mt-7 mb-12 ">
              <div className="max-w-[80vw] font-medium text-black  text-center mx-auto md:text-[20.2px] font-Inter">
                Don&apos;t miss out. Take advantage of this awesome offer and
                start optimizing your book&apos;s keywords today.
              </div>
            </div> */}
            <div className=" mt-10  flex justify-center">
              <div className="w-full mx-0 xl:w-fit">
                <h3 className="flex w-full justify-center font-semibold text-start text-[22px]   mb-2">
                  Get Started Now
                </h3>
                <div className="gap-5 grid w-fit mx-auto  align-items-end items-center ">
                  <PricingCard
                    title="7 Backend Keywords Tool"
                    overViewTexts={["Improve Your Amazon KDP Book Rankings"]}
                    shopItem={shopItems.seven_backend_kw_tool}
                    price={shopItems.seven_backend_kw_tool.price}
                    shopLink={"#pricing"}
                  />
                  {/* <PricingCard
                    title="Limited Time Bundle #1"
                    overViewTexts={["7 Backend Keywords Tool", "Titans Pro"]}
                    shopItem={shopItems.limited_bundle1}
                    price={shopItems.limited_bundle1.price}
                    shopLink={"#pricing"}
                  />

                  <PricingCard
                    title=" Limited Time Bundle #2"
                    overViewTexts={[
                      "7 Backend Keywords Tool",
                      "Titans Pro",
                      "Titans Deep View",
                    ]}
                    shopItem={shopItems.limited_bundle2}
                    price={shopItems.limited_bundle2.sale_price} // note:: replace with the actual price
                    shopLink={"#pricing"}
                  />
                  <PricingCard
                    title=" Limited Time Bundle #3"
                    overViewTexts={[
                      "7 Backend Keywords Tool",
                      "Titans Pro",
                      "Titans Deep View",
                      "Titans Retro View",
                    ]}
                    shopItem={shopItems.limited_bundle3}
                    price={shopItems.limited_bundle3.sale_price} // note:: replace with the actual price
                    shopLink={"#pricing"}
                  /> */}
                </div>
              </div>
            </div>
            <div className="mx-auto mt-16">
              <FaqSection faq={bkt_faq} />
            </div>
            <div className="flex justify-center"></div>
          </section>

          {/* <div className="min-h-[5vh] lg:min-h-[10vh]"></div> */}
        </>
      }
    />
  );
}

// use next-auth to check if user is logged in
export async function getServerSideProps(context) {
  try {
    const session: any = await getSession(context);
    const content = await Account.content.home();
    let features = await Accounts.features.list({});
    const backend_keyword_tool = await Accounts.features.view(
      false,
      shopIds.BACKEND_KW_TOOL
    );
    const bkwt_limited_bundle1 = await Accounts.features.view(
      false,
      shopIds.BACKEND_KW_TOOL_B1
    );
    const bkwt_limited_bundle2 = await Accounts.features.view(
      false,
      shopIds.BACKEND_KW_TOOL_B2
    );
    const bkwt_limited_bundle3 = await Accounts.features.view(
      false,
      shopIds.BACKEND_KW_TOOL_B3
    );

    let shopItems = {
      seven_backend_kw_tool: backend_keyword_tool.simple,
      limited_bundle1: bkwt_limited_bundle1.simple,
      limited_bundle2: bkwt_limited_bundle2.simple,
      limited_bundle3: bkwt_limited_bundle3.simple,
    };

    if (session && session.token) {
      const featuresOwned = await Accounts.features.checkAll(session.token);
      return getProfile(context, {
        token: session.token,
        pageData: content.simple,
        isEligible: false,
        features: features.simple,
        featuresOwned: featuresOwned.simple ?? [],
        shopItems: shopItems,
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

function PricingCard({
  title,
  overViewTexts,
  shopLink,
  price,
  puzzlesList,
  ornament = false,
  shopItem,
}: any) {
  const getPercentage = (price, salePrice) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="h-full w-full  text-left   flex items-end">
      <div className=" w-full ">
        {ornament && (
          <div className="w-full  flex justify-center">
            {/* <div className="  flex justify-center font-bold text-[14px] bg-[#faca15] text-black px-8 py-0.5 rounded-full">
          {ornament}
          </div> */}
            <div
              className="px-7 mb-2 py-2 font-Inter font-semibold w-full text-center  text-[22px]"
              style={{
                backgroundColor: "#ffea05",
                color: "black",
                boxShadow: "none",
              }}
            >
              {ornament}
            </div>
          </div>
        )}
        <div
          // style={{ border: "1px solid #808080", borderRadius: "10px" }}
          className="p-4 flex flex-col justify-between border light-border  rounded-lg h-fit md:h-[300px] font-Inter"
        >
          <div className="">
            <h4 className=" text-primary font-bold text-[20px] ">{title}</h4>
            <div className="my-5 ">
              {overViewTexts.map((text, index) => (
                <CheckIconText key={index} text={text} />
              ))}
            </div>
          </div>
          <div className="w-full gap-3 flex items-start justify-center">
            {shopItem.isSale ? (
              <div>
                <p className="font-bold text-[18px]">
                  ${shopItem.sale_price}
                  <del className="ml-3">${shopItem.price}</del>{" "}
                </p>
                <p className="font-bold text-[18px] text-red-500 text-start">
                  Save {getPercentage(shopItem.price, shopItem.sale_price)}%
                </p>
              </div>
            ) : (
              <p className="font-bold text-[18px]">${price}</p>
            )}

            <Link href={`/shop/${shopItem.id}`}>
              <Button className="w-full" style={{ backgroundColor: "#7449fb" }}>
                Buy Now <ShoppingCartIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
