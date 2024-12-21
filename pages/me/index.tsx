import React from "react";
import MainLayout, {
  getProfile,
  getProfileWithToken,
} from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Account from "../../lib/mw/Accounts";
import Features from "@/lib/mw/Accounts/Features";

import PageTitle from "@/components/Common/PageTitle";
import AccountPageComp, {
  AccountPageProps,
} from "@/page_components/Auth/AccountPage";

const AccountPage: React.FC<AccountPageProps> = ({
  info,
  token,
  downloadList,
  purchaseList,
  courses,
  collectionHistory,
}) => {
  return (
    <MainLayout
      meta={{
        title: "Account - Self publishing titans",
        description:
          "Self publishing titans is a platform that provides tools and resources for authors to self publish their books.",
        keywords:
          "self publishing titans, self publish, self publishing, self publishing tools, self publishing resources, self publishing platform",
      }}
      info={info}
      Body={
        <div className="comp-container">
          <AccountPageComp
            info={info}
            token={token}
            downloadList={downloadList}
            collectionHistory={collectionHistory}
            courses={courses}
            purchaseList={purchaseList}
          />
        </div>
      }
      Title={<PageTitle showBySptButton={false} title="Account" />}
    />
  );
};

export default AccountPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let productList = { simple: {} };
  let courses = { simple: {} };
  let boardCollectionHistory = { simple: {} };
  let features = { simple: [] };

  const { resolvedUrl } = context;

  const session: any = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  let purchaseList = [];

  try {
    const token = session.token;
    productList = await Account.download.getList(token);
    courses = await Account.download.getCourses(token);
    features = await Features.checkAllNew(token);
    boardCollectionHistory = await Account.board.getCollectionHistory(token);
    const list = await Features.checkPurchasedTools(token);
    purchaseList = list?.data?.data || [];
  } catch (e) {
    console.error("auth/me.tsx" + e);
  }

  try {
    // check if feature is active and feature is multishop then get the subscription id and and remove those features have same subscription id
    let filteredFeatures = [];

    let multiShopList = [];

    for (let i = 0; i < features.simple.length; i++) {
      if (
        features.simple[i].status === "active" ||
        features.simple[i].status === "past_due"
      ) {
        if (features.simple[i].feature_shop.isMultiShop === true) {
          multiShopList.push(features.simple[i]);
        } else {
          filteredFeatures.push(features.simple[i]);
        }
      }
    }

    for (let i = 0; i < multiShopList.length; i++) {
      let subscriptionId = multiShopList[i].subscription_id;
      let index = filteredFeatures.findIndex(
        (x) => x.subscription_id === subscriptionId
      );
      if (index === -1) {
        filteredFeatures.push(multiShopList[i]);
      }
    }

    // check if multiShopList is empty then push the features that are not subscription based
    if (multiShopList.length === 0) {
      for (let i = 0; i < features.simple.length; i++) {
        if (
          (features.simple[i].status === "active" ||
            features.simple[i].status === "past_due") &&
          features.simple[i].buy_type !== "subscription"
        ) {
          filteredFeatures.push(features.simple[i]);
        }
      }
    }

    // push the features that are not subscription based
    for (let i = 0; i < features.simple.length; i++) {
      if (
        features.simple[i].status === undefined &&
        features.simple[i].buy_type !== "subscription"
      ) {
        filteredFeatures.push(features.simple[i]);
      }
    }

    features.simple = filteredFeatures;
  } catch (error) {}

  if (productList.simple === false) {
    productList.simple = [];
  }

  if (courses.simple === false) {
    courses.simple = [];
  }

  if (boardCollectionHistory.simple === false) {
    boardCollectionHistory.simple = { total: 0 };
  }

  return await getProfileWithToken(
    context,
    {
      downloadList: productList.simple,
      courses: JSON.parse(JSON.stringify(courses.simple)),
      collectionHistory:
        boardCollectionHistory.simple === false
          ? { total: 0 }
          : boardCollectionHistory.simple,
      features: features.simple,
      purchaseList,
    },
    true,
    true
  );
}
