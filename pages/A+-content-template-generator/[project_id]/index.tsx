import { AccountUtils } from "@/utils/retroVision";
import Image from "next/image";
import { Inter } from "next/font/google";
import FabricComponent from "@/components/DesignTools/Canvas";
import SidebarMain from "@/components/DesignTools/CoverCreator/sidebar/index";
import { useEffect, useRef } from "react";
import CanvasProvider from "@/lib/contexts/canvas";
import PagesPane from "@/components/DesignTools/CoverCreator/Pages/pagesPane";
import { useState, useContext } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Account from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Accounts from "@/lib/mw/Accounts";
import MainLayoutForDesigner from "@/components/DesignTools/CoverCreator/Layout/MainLayout";

interface ProjectPageProps {
  project_id: string;
  info: any;
  isOwner: boolean;
}

export default function Project({
  project_id,
  info,
  isOwner,
}: ProjectPageProps) {
  return (
    <main className={`min-h-screen  `}>
      <div className="">
        <MainLayout
          showFooter={false}
          info={info}
          Title={""}
          meta={{
            title: "Book Cover Creator for KDP",
            description:
              "Create your book cover for KDP. Choose from a variety of templates and customize it to your liking.",
            keywords:
              "Book Cover Creator, KDP, Book Cover, Create Book Cover, Design Book Cover, Book Cover Design",
          }}
          Body={
            <>
              <CanvasProvider>
                <MainLayoutForDesigner>
                  <SidebarMain isOwner={isOwner} userID={info.id} />
                  <FabricComponent userID={info.id} project_id={project_id} />
                  <PagesPane />
                </MainLayoutForDesigner>
              </CanvasProvider>
            </>
          }
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);

  if (!session) {
    return {
      props: {
        info: false,
      },
    };
  }
  let info = await Account.getInfo(session.token);
  const featuresOwned = await Accounts.features.checkAll(session.token);
  let isOwner = AccountUtils.checkOwnerShip(
    featuresOwned.simple,
    "66bcf76cbddfc3e1dc22a899"
  );

  return {
    props: {
      info: info.full.data,
      project_id: context.params.project_id,
      isOwner,
    },
  };
}
