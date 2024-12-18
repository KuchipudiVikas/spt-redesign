import Link from "next/link";
import { freeItemsWithoutTitle } from "@/data/FreeKDPTools/constants";
import Accounts from "../lib/mw/Accounts";
import { useCustomDeviceSize } from "@/utils/useDeviceSize";
import { IndividualShopItems } from "@/components/Pricing/New/individualShop";
import PricingTableTabs, {
  PriceTable,
} from "@/components/Pricing/New/PriceTable";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import MainLayout, { getProfile } from "@/components/Layout";

import Onboarding from "@/components/Home/onboarding";
import WelcomePageHeader from "@/components/Misc/WelcomePageHeader";
import request from "@/lib/api/interface";

import { User } from "@/lib/ts/types/user";
import { StarIcon } from "lucide-react";

interface HomeProps {
  info: User;
  token: string;
  features: any[];
  featuresOwned: any;
  tabQuery: string;
}

type OnboardingStatusResponse = {
  status: string;
  updated_at: string;
  user_id: string;
};

function Home({ info, token, features, featuresOwned, tabQuery }: HomeProps) {
  const { size } = useCustomDeviceSize();
  const [hasOnboarded, setHasOnboarded] = useState(true);

  console.log("info is ", info);

  async function checkOnboardingStatus() {
    if (info?._id) {
      const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;
      const url = base + "/api/onboarding/status?user_id=" + info._id;

      const { data, error } = await request.get(url);
      if (error) {
        return console.error(error);
      }
      console.log("onboarding status is ", data, error);
      const res: OnboardingStatusResponse = data as OnboardingStatusResponse;

      if (res.status == "submitted") {
        setHasOnboarded(true);
        return;
      }
      if (res.status == "skipped") {
        setHasOnboarded(true);
        return;
      }
      setHasOnboarded(false);
    }
  }

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const tutorialUrl =
    "https://www.youtube.com/playlist?list=PLjxLsHDn5LtM4_G62teJAp6Ml2B-oFWD6";

  return (
    <MainLayout
      info={info}
      Title={<WelcomePageHeader />}
      meta={{
        title: " Welcome | Self Publishing Titans",
        description: `
              
              Welcome to the Self Publishing Titans family
              Self Publishing Titans,
               KDP Masterclass,
               KDP,
               KDP Tools,
               KDP Research Tools,
                KDP Keyword Research,
                KDP Keyword Research Tools,
                Coloring Books, Coloring Pages,
                Coloring Book Maker,
                Coloring Book Maker Tools,
                Puzzle Tools,
                Sudoku Tools,
                Crossword Tools,
                Word Search Tools,
                Word Search Maker,
                Nonogram Tools,
                Nonogram Maker,
                Activities Book Maker,
                Activities Book Maker Tools,
                ${features.map((f) => f.Title).join(", ")}
                `,
        keywords: `Self Publishing Titans,
                KDP Masterclass,
                KDP,
                KDP Tools,
                `,
      }}
      Body={
        <>
          {/* premium tools section */}
          <section className="relative min-h-[30vh]   w-full  ">
            {/* add flex with 4 columns */}
            <div className="comp-container">
              <div className="mt-20 "></div>
              <PricingTableTabs
                token={token}
                featuresOwned={featuresOwned}
                tabQuery={tabQuery}
                features={features}
              />
            </div>
            <div className="mt-2 pb-16 sm:pb-24">
              <IndividualShopItems features={features} cols={3} size={2} />
            </div>
          </section>

          <div className="min-h-[5vh] md:min-h-[10vh]"></div>
        </>
      }
    />
  );
}

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  let feat = await Accounts.features.list({ token: session?.token });

  let featuresOwned: any = [];
  let info: any = false;

  // tab query
  const tab = context.query?.tab || EPaymentPeriod.Monthly;
  if (session?.token) {
    info = await getProfile(context, {});
    featuresOwned = await Accounts.features.checkAll(session.token);
  }

  return {
    props: {
      info: info?.props?.info || false,
      token: session ? session.token : false,
      featuresOwned: featuresOwned.simple ?? [],
      features: feat.simple,
      tabQuery: tab,
    },
  };
}

export default Home;
