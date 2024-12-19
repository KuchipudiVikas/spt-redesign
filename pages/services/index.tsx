import MainLayout, { getProfile } from "@/components/Layout";
import Accounts from "../../lib/mw/Accounts";
import PageTitle from "@/components/Common/PageTitle";
import { roundToNone } from "@/utils/common";
import { IndividualShopItems } from "@/components/Pricing/New/individualShop";

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
        description: "Self Publishing Titans features and services.",
        keywords: "Self Publishing Titans features and services.",
      }}
      Title={<PageTitle title="Services" />}
      Body={
        <>
          <div className="min-h-screen">
            <div className="mb-10 mt-4">
              <div className="mt-10 pb-16 sm:pb-24">
                <IndividualShopItems features={features} cols={4} />
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
  let feat = await Accounts.features.list({
    allowed_feature_types: ["service"],
  });

  const info = await getProfile(context, {
    features: feat.simple,
  });

  return info;
}
