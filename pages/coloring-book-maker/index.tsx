import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { EPaymentPeriod } from "@/lib/ts/enums/payment";
import PageTitle from "@/components/Common/PageTitle";
import { User } from "@/lib/ts/types/user";
import { shopIds } from "@/data/shopData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoadingBar from "@/components/utils/LoadingBar";
import { ColoringBookMakerApi } from "@/lib/mw/coloring-book-maker";
import { useState, useEffect } from "react";
import numberWithCommas from "@/utils/helper";
import { allIncludedTools, faq } from "@/data/ColoringBookMaker/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import PricingTableTabs from "@/components/Pricing/New/PriceTable";
import { FaqSection } from "@/components/Common/FaqItem";
import CheckFilled from "@/components/Icons/CheckFilled";

interface ColoringPromoProps {
  featuresOwned: any;
  info: User;
  categories: any;
  subcategories: any;
  token: string;
  features: any;
  tabQuery: string;
}

const Index: React.FC<ColoringPromoProps> = ({
  featuresOwned,
  info,
  categories,
  subcategories,
  token,
  features,
  tabQuery,
}) => {
  const [localCategories, setLocalCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [totalColoringElements, setTotalColoringElements] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allCategoriesArray = [
      ...categories.categories,
      ...subcategories.subcategories,
    ];
    setAllCategories(allCategoriesArray);

    if (allCategoriesArray.length > 10) {
      setLocalCategories(allCategoriesArray.slice(0, 19));
    } else {
      setAllCategories(allCategoriesArray);
    }
    // total coloring elements
    const total = categories.categories.reduce(
      (acc, curr) => acc + categories.categoriesCount[curr],
      0
    );
    setTotalColoringElements(total);
  }, []);

  return (
    <MainLayout
      meta={{
        title: "Coloring Book Maker - Self Publishing Titans",
        description: "Coloring Book Maker for Self Publishing Titans",
        keywords: "coloring book maker, self publishing titans",
      }}
      Title={<PageTitle title="Coloring Book Maker" />}
      info={info}
      Body={
        <div className="">
          <LoadingBar isLoading={isLoading} title={`Loading...`} />

          <section className=" mt-8">
            <div className="flex flex-col items-center">
              <div className="relative w-full  lg:max-w-[1200px] grid grid-cols-1  md:grid-cols-3 flex-col items-end justify-center md:flex-row px-5 text-white mt-4">
                <div className="col-span-2 flex justify-end">
                  <iframe
                    className=" videoRatioStandard w-full  md:max-w-[600px] rounded-lg h-64 md:h-auto"
                    src="https://www.youtube.com/embed/_pgi2Ew3Hrw?autoplay=false"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin"
                  ></iframe>
                </div>

                <div className="flex w-full md:w-fit mt-5 md:mt-16 px-5 text-black">
                  <div>
                    {[
                      numberWithCommas(totalColoringElements) +
                        "+ Coloring Elements",
                      numberWithCommas(allCategories.length) + "+ Categories",
                      "100% Hand Drawn",
                      "Buy Now, Pay Later: Affirm & Klarna",
                    ].map((text, index) => (
                      <div key={index} className="flex gap-2 items-center mb-2">
                        <CheckFilled containerClassName="p-1 my-2" />
                        <h6 className="text-sm font-medium">{text}</h6>
                      </div>
                    ))}
                    <div className="flex mt-5 gap-2 items-center">
                      <div className="flex justify-center w-full ">
                        <Button
                          variant="outline"
                          className="w-full rounded-full"
                        >
                          <Link
                            href="https://editor.selfpublishingtitans.com"
                            passHref
                            className="w-full h-fit text-center "
                          >
                            Preview
                          </Link>
                        </Button>
                      </div>
                      <div className="flex    justify-center w-full ">
                        <Button
                          className="w-full rounded-full"
                          variant="default"
                        >
                          <Link
                            href="#buy"
                            passHref
                            className=" w-full text-center "
                          >
                            Get it now
                          </Link>{" "}
                          <ArrowRight />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-20">
                <h6 className="text-center text-3xl mt-24 font-extrabold">
                  {allIncludedTools.title}
                </h6>
                <div
                  className={`grid grid-cols-1  sm:grid-cols-3 md:grid-cols-5 px-5 md:px-16 mt-5`}
                >
                  {/* <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"> */}
                  {localCategories.map((item, index) => (
                    <>
                      {/* <BubbleTickItem
                        text={`${item} (${
                          categories.categoriesCount[item] ||
                          subcategories.subcategoriesCount[item]
                        })`}
                        textSize="text-xl px-2"
                        key={index}
                      /> */}
                      <div key={index} className="flex py-4 gap-2">
                        <CheckIcon
                          style={{
                            strokeWidth: 3,
                          }}
                          className="text-primary w-4"
                        />{" "}
                        {item}
                      </div>

                      {index === localCategories.length - 1 &&
                        allCategories.length > 19 && (
                          <Button
                            variant="outline"
                            className="  w-full text-center rounded-full m-2 ml-0"
                            onClick={() => {
                              if (localCategories.length > 19) {
                                setLocalCategories(allCategories.slice(0, 19));
                              } else {
                                setLocalCategories(allCategories);
                              }
                            }}
                          >
                            See{" "}
                            {allCategories.length === localCategories.length
                              ? "Less"
                              : +allCategories.length - 19 + " More"}{" "}
                            <ArrowRight />
                          </Button>
                        )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id={"buy"}>
            <PricingTableTabs
              token={token}
              features={features}
              featuresOwned={featuresOwned}
              tabQuery={tabQuery}
            />
          </section>

          <section className="flex justify-center">
            <div className="flex flex-col mt-32 md:flex-row container ">
              <FaqSection faq={faq} />
            </div>
          </section>
          <div className="min-h-[5vh] md:min-h-[10vh]"></div>
        </div>
      }
    />
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let content = await Accounts.content.home();
  const product = await Accounts.features.view(
    false,
    shopIds.COLORING_BOOK_MAKER // Coloring Book Maker ID
  );
  const ColoringBookMaker = new ColoringBookMakerApi();
  const data: any = await ColoringBookMaker.getCategoriesAndSubcategories();
  const session: any = await getSession(context);

  let features = await Accounts.features.list({ token: session?.token });
  // tab query
  const tab = context.query?.tab || EPaymentPeriod.Monthly;

  let categories = data.categories;
  let subcategories = data.subcategories;
  // sort categories and subcategories by count
  categories.categories.sort((a, b) => {
    return categories.categoriesCount[b] - categories.categoriesCount[a];
  });
  subcategories.subcategories.sort((a, b) => {
    return (
      subcategories.subcategoriesCount[b] - subcategories.subcategoriesCount[a]
    );
  });

  if (session?.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);

    return getProfile(context, {
      token: session.token,
      features: features.simple,
      product,
      pageData: content.simple,
      categories: categories,
      featuresOwned: featuresOwned.simple ?? [],
      subcategories: subcategories,
      tabQuery: tab,
    });
  }

  return getProfile(context, {
    features: features.simple,
    product,
    pageData: content.simple,
    categories: categories,
    featuresOwned: [],
    subcategories: subcategories,
    tabQuery: tab,
  });
}
