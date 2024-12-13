import MainLayout from "@/components/Layout";
import { RootState } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PageTitle from "@/components/Common/PageTitle";
import { TicketIcon } from "lucide-react";

function Index({ info }) {
  const isTopBarOpen = useSelector((state: RootState) => state.topBar.isOpen);
  return (
    <MainLayout
      meta={{
        title: "Self Publishing Titans - Support",
        description: "Self Publishing Titans Support Page",
        keywords: "Self Publishing Titans, Support",
      }}
      info={info}
      //   showSidebar={false}
      //   bgGray={false}
      // transparentNav={false}
      Title={<PageTitle title="Welcome to Support" />}
      Body={
        <div className="">
          {/* welcome to support */}

          <div className="flex min-h-[40vh] flex-col md:flex-row justify-center items-center my-16">
            {/* knowledgbase card */}
            {/* <Link
              href={"https://support.selfpublishingtitans.com/hc/877668820"}
            >
              <div className="flex flex-col items-center justify-center w-64 h-80 p-4 m-4 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                <div className="flex items-center justify-center w-36 h-36 bg-gray-200 rounded-full">
                  <FontAwesomeIcon
                    icon={["fas", "book"]}
                    width={100}
                    height={100}
                  />
                </div>
                <h1 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Knowledge Base
                </h1>
                <p className="mt-2 text-base text-center text-gray-500">
                  Search our knowledge base for answers to your questions.
                </p>
              </div>
            </Link> */}
            {/* end to end support or create a ticket */}
            <Link
              href={`https://support.selfpublishingtitans.com/help/877668820`}
            >
              <div className="flex  flex-col items-center justify-center w-64 h-80 p-4 m-4 bg-white rounded-lg sp-container border-2 light-border ">
                <div className="flex items-center justify-center w-36 h-36 bg-gray-200 rounded-full">
                  <TicketIcon />
                </div>
                <h6 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Contact Support
                </h6>
                <h6 className="mt-2 text-base text-center text-gray-500">
                  Usually fast response times - 7 days a week.
                </h6>
              </div>
            </Link>

            {/* live chat */}
            {/* <Link
              href={
                "https://support.selfpublishingtitans.com/chat/widget/form/3846642261?color=%230068bd&position=br&locale=en&require%5B0%5D=name&require%5B1%5D=email&id=3846642261"
              }
            >
              <div className="flex shadowAround flex-col items-center justify-center w-64 h-80 p-4 m-4 bg-white rounded-lg shadow-lg ">
                <div className="flex items-center justify-center w-36 h-36 bg-gray-200 rounded-full">
                  <FontAwesomeIcon
                    icon={["fas", "comment-dots"]}
                    width={100}
                    height={100}
                    color="#9a35a7"
                  />
                </div>
                <h6 className="mt-4 text-xl font-bold text-center text-gray-900">
                  Live Chat
                </h6>
                <h6 className="mt-2 text-base text-center text-gray-500">
                  Chat with our support team in real time.
                </h6>
              </div>
            </Link> */}
          </div>
        </div>
      }
    />
  );
}

export const getServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Index;
