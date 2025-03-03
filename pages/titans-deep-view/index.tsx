import React from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Account from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { GetServerSidePropsContext } from "next";
import { StarIcon } from "lucide-react";
import SearchApiCardInfo from "@/components/ResearchTools/deepview/search-api-card";
import PageTitle from "@/components/Common/PageTitle";

import { getSession } from "next-auth/react";
import { User } from "@/lib/ts/types/user";
import { useState } from "react";

interface IndexProps {
  info: User;
  isOwner: boolean;
}

const Index: React.FC<IndexProps> = ({ info, isOwner }) => {
  const [ASIN, setASIN] = useState("");

  return (
    <MainLayout
      info={info}
      // title="Deep View - Self Publishing Titans"
      // description=""
      // keywords=""
      meta={{
        title: "Deep View - Self Publishing Titans",
        description: "Deep View - Self Publishing Titans",
        keywords: "Deep View - Self Publishing Titans",
      }}
      Title={<PageTitle title="Titans Deep View" />}
      Body={
        <div className=" comp-container ">
          <SearchApiCardInfo
            asin={ASIN}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            info={info}
            isOwner={isOwner}
          />
        </div>
      }
    />
  );
};

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const content = await Account.content.home();

  if (session && session.token) {
    const featuresOwned = await Account.features.checkAll(session.token);
    let isOwner = AccountUtils.checkOwnerShip(
      featuresOwned.simple,
      "655ee6781727b2465e13079c"
    );
    return getProfile(context, {
      token: session.token,
      isOwner: isOwner,
    });
  }

  return getProfile(context, {
    token: null,
    isOwner: false,
  });
}
