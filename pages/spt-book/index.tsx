import React from "react";
import MainLayout from "@/components/Layout";
import { useState } from "react";
import { PdfViewer } from "@/components/audioBook/PdfViewer";
import { AudioPlayer } from "@/components/audioBook/AudioPlayer";
import { metaData } from "@/data/sample/audiobook";
import { getSession } from "next-auth/react";
import Account from "@/lib/mw/Accounts";
import axios from "axios";
import PageTitle from "@/components/Common/PageTitle";

type tab = "pdf" | "audio";
type Al = {
  isAudioBookPurchased: boolean;
  isBookPurchased: boolean;
};
interface CompProps {
  info: any;
  AccessList: Al;
}

const Index = ({ info, AccessList }: CompProps) => {
  const [value, setValue] = useState<tab>("audio");

  const bookUrl = "./assets/pdfs/sptBookIntro.pdf";

  return (
    <>
      <MainLayout
        meta={{
          title: "Self Publishing Simplified",
          description: "Self Publishing Simplified",
          keywords: "Self Publishing Simplified",
        }}
        Title={<PageTitle title="Self Publishing Simplified" />}
        info={info}
        Body={
          <>
            <main className="">
              <div className="">
                <div className="flex justify-center">
                  <div className="flex justify-center my-6">
                    <div className="flex gap-10 br-16">
                      <div
                        className={` bg-white mx-0 shadowAround  overflow-auto   grid md:grid-cols-2 `}
                      >
                        <div
                          onClick={() => setValue("pdf")}
                          className={`${
                            value === "pdf"
                              ? "bg-[#8257fe]  rounded-2xl text-white "
                              : ""
                          } text-center cursor-pointer py-2 px-5
                    `}
                        >
                          <h6 className="font-Inter font-bold">E-Book</h6>
                        </div>
                        <div
                          onClick={() => setValue("audio")}
                          className={`${
                            value === "audio"
                              ? "bg-[#8257fe] rounded-2xl text-white "
                              : ""
                          } text-center font-Inter font-bold cursor-pointer py-2 px-4
                    `}
                        >
                          <h6 className="font-Inter font-bold">Audio Book</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  {value == "pdf" ? (
                    <PdfViewer
                      url={bookUrl}
                      hasAccess={AccessList.isBookPurchased}
                      comp={value}
                    />
                  ) : (
                    <AudioPlayer
                      metaData={metaData}
                      hasAccess={AccessList.isAudioBookPurchased}
                    />
                  )}
                </div>
              </div>
            </main>
          </>
        }
      />
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }
  let AudioBookId = "65e302172d647e09bd5ac0d8";
  let checkAccess = await axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/api/fc/byproduct/65e302172d647e09bd5ac0d8",
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );

  let hasAccess =
    checkAccess.data?.data?.feature_shop == AudioBookId ? true : false;
  let info = await Account.getInfo(session.token);

  let AccessList = {
    isBookPurchased: hasAccess,
    isAudioBookPurchased: hasAccess,
  };

  return {
    props: {
      info: info.full.data,
      AccessList,
    },
  };
}
