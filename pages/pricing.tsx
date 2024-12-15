import React from "react";
import MainLayout from "@/components/Layout";
import { StarIcon } from "lucide-react";
import { ArrowDownIcon } from "lucide-react";
import PricingPage, { PricingProps } from "@/page_components/Pricing";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Accounts from "@/lib/mw/Accounts";
import { getProfile } from "@/components/Layout";
import { EPaymentPeriod } from "@/lib/ts/enums/payment";

const Pricing: React.FC<PricingProps> = ({
  info,
  features,
  featuresOwned,
  tabQuery,
  token,
}) => {
  return (
    <MainLayout
      meta={{
        title: "Pricing - Self Publishing Titans",
        description: "Pricing for Self Publishing Titans",
        keywords: "pricing, self publishing titans",
      }}
      info={info}
      Title={
        <div className="flex my-10 justify-center flex-col items-center">
          <h1 className="text-[55px] mt-[20px]  flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 ">
            Titans{" "}
            <StarIcon strokeWidth={3} className="text-primary font-bold" />{" "}
            Pricing
          </h1>
          <ScrollDownButtonSpecial />
        </div>
      }
      Body={
        <PricingPage
          features={features}
          featuresOwned={featuresOwned}
          tabQuery={tabQuery}
          token={token}
        />
      }
    />
  );
};

export default Pricing;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  let features = await Accounts.features.list({ token: session?.token });
  // tab query
  const tab = context?.query?.tab || EPaymentPeriod.Monthly;
  if (session?.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);
    return getProfile(context, {
      token: session.token,
      features: features.simple,
      featuresOwned: featuresOwned.simple ?? [],
      tabQuery: tab,
    }).catch((error: any) => {
      console.log("error in getProfile", error);
    });
  }
  return getProfile(context, {
    token: null,
    features: features.simple,
    featuresOwned: [],
    tabQuery: tab,
  }).catch((error: any) => {
    console.log("error in getProfile", error);
  });
}

function ScrollDownButtonSpecial() {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className="font-normal mt-[30px] mb-5 bg-transparent w-fit flex text-[14px] items-center rounded-full"
    >
      <span
        style={{
          boxShadow: "0px 0px 8px 2px #ddd",
        }}
        className="font-mono w-[26px] mr-2 font-bold h-[26px] shadow bg-white text-[#c31fe4] p-1 rounded-full flex items-center justify-center"
      >
        <ArrowDownIcon strokeWidth={3} />
      </span>
      Scroll Down To Explore
    </div>
  );
}
