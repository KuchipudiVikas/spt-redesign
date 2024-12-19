import MainLayout, { getProfile } from "@/components/Layout";
import Accounts from "../../lib/mw/Accounts";
import { roundToNone } from "@/utils/common";
import { IndividualShopItems } from "@/components/Pricing/New/individualShop";
import { FaqSection } from "@/components/Common/FaqItem";
import { defaultFaqs } from "./[productId]";
import { getSession } from "next-auth/react";
import PageTitle from "@/components/Common/PageTitle";

function ShopIndex({ info, features }) {
  type coEx = boolean | number; // co-existence type
  let discount: coEx = false;
  features
    .filter((item) => item.isOnShop === true)
    .map((listing, index2) => {
      if (listing.isSale && listing.sale_price) {
        discount = roundToNone((1 - listing.sale_price / listing.price) * 100);
      }
    });

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Features - Self Publishing Titans",
        description:
          "Self Publishing Titans offers a variety of features to help you publish your book. From book cover design to editing, we have you covered.",
        keywords: "self publishing",
      }}
      Title={<PageTitle title="Shop - Self Publishing Titans" />}
      Body={
        <>
          <div className="min-h-screen">
            <div className="mb-10 mt-4">
              <div className="mt-10 pb-16 sm:pb-24">
                <IndividualShopItems features={features} cols={4} />
                <section className="w-full flex justify-center">
                  <div className="flex flex-col-reverse md:flex-row container mt-20 ">
                    <div className="flex flex-col  ">
                      <FaqSection faq={defaultFaqs} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export default ShopIndex;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let feat = await Accounts.features.list({ token: session?.token });

  const info = await getProfile(context, {
    features: feat.simple,
  });

  return info;
}
