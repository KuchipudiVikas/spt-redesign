import { useEffect, useState } from "react";
import Account from "../../lib/mw/Accounts";
import Image from "next/image";
import covrinImg from "../../public/assets/corvin.jpeg";
import courseAppIls from "../../public/assets/masterclass/course-app.svg";
import notifyIls from "../../public/assets/masterclass/notify.svg";
import computerLoginIls from "../../public/assets/masterclass/computer-login.svg";
import computerTroubleshootingIls from "../../public/assets/masterclass/computer-troubleshooting.svg";
import checkIcon from "../../public/assets/masterclass/check.svg";
import xCircleIcon from "../../public/assets/masterclass/x-circle.svg";
import Link from "next/link";
import AboutMasterclassItem from "../../components/Common/DescriptionWithTitle";
import VideoCardWithDetails from "../../components/Common/VideoCardWithDetails";
import NoFakePromisesILS from "@/components/Common/NoFakePromisesILS";
import MainLayout, { getProfile } from "@/components/Layout";
import { CheckIcon } from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";
import Features from "@/lib/mw/Accounts/Features";
import BGsvg from "@/public/assets/home/bg.svg";
import Reviews from "@/components/Home/Reviews";
import { StarIcon } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import {
  languageItemsIndex,
  masterclassInfo,
} from "@/data/MasterClassPage/index";
import { useCustomDeviceSize } from "@/utils/useDeviceSize";
import { Button } from "@/components/ui/button";

import { FaqSection } from "@/components/Common/FaqItem";

import ReviewSection from "@/components/Common/ReviewSection";
import { formatCurrency } from "@/utils/common";
import { ShoppingCartIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";

function MasterClassPage({ info, pageData, masterclassDetails }) {
  const [currentLanguage, setCurrentLanguage] = useState("English");
  let currLangItem = languageItemsIndex[`${currentLanguage}`];

  return (
    <MainLayout
      info={info}
      Title={<PageTitle title={"Titans Masterclass"} />}
      meta={{
        title: "Masterclass - Self Publishing Titans",
        description:
          "Learn how to self publish your book with our masterclass. Get the best tips and tricks from the best in the industry.",
        keywords:
          "self publishing, masterclass, self publishing masterclass, self publishing titans",
      }}
      Body={
        <>
          <section className="">
            <div className="flex flex-col items-center">
              <TabSection
                masterclassDetails={masterclassInfo}
                setCurrentLanguage={setCurrentLanguage}
                currLangItem={currLangItem}
              />

              <div
                style={{
                  backgroundImage: `url(${BGsvg.src})`, // Ensure the correct path to the SVG
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "99vw",

                  borderBottom: "1.5px solid #ccc",
                }}
                className="w-full flex mt-20 flex-col items-center"
              >
                <div className="py-3  mt-12   md:py-9 md:mx-0">
                  <div className="container  flex gap-10 items-start">
                    <div className="text-lg  text-justify">
                      <div className=" px-3 ">
                        <h6 className="font-bold text-center mb-6 text-[45px]">
                          {currLangItem.ourJourneyTitle}
                        </h6>
                      </div>
                      {languageItemsIndex[`${currentLanguage}`].ourJourney.map(
                        (item, index) => {
                          return (
                            <div key={index}>
                              <h6 className="text-[14px]"> {item} </h6>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <Image
                      className="float-right py-3  d-inline-block h-auto w-full md:w-1/2 md:px-4"
                      height={1080}
                      style={{
                        borderRadius: "40px",
                      }}
                      width={1920}
                      src={covrinImg.src}
                      alt="my img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className=" py-8 flex justify-center">
            <div className="pb-5 md:mx-20 md:pb-5">
              <h6 className="my-8 font-extrabold text-center text-[45px]">
                {currLangItem.aboutMasterclassTitle}
              </h6>

              <div className="grid grid-cols-1 max-w-[1200px] md:grid-cols-2 gap-5">
                <AboutMasterclassItem
                  items={currLangItem.descriptionTexts.included}
                  svg={checkIcon}
                  title={
                    <h6 className={` font-extrabold`}>
                      {currLangItem.includedText}
                    </h6>
                  }
                  titleImage={courseAppIls}
                />
                <AboutMasterclassItem
                  items={currLangItem.descriptionTexts.notInlcuded}
                  svg={xCircleIcon}
                  title={
                    <h6 className={` font-extrabold`}>
                      {currLangItem.notInlcudedText}
                    </h6>
                  }
                  titleImage={notifyIls}
                />

                <AboutMasterclassItem
                  items={currLangItem.descriptionTexts.expected}
                  svg={checkIcon}
                  title={
                    <h6 className=" font-extrabold">
                      {currLangItem.expectedText}
                    </h6>
                  }
                  titleImage={computerLoginIls}
                />

                <AboutMasterclassItem
                  items={currLangItem.descriptionTexts.notExpexted}
                  svg={xCircleIcon}
                  title={
                    <h6 className=" font-extrabold">
                      {currLangItem.notExpextedText}
                    </h6>
                  }
                  titleImage={computerTroubleshootingIls}
                />
              </div>
            </div>
          </section>

          {/* <NoFakePromisesILS /> */}

          {/* <ReviewSection testimonials={currLangItem.testimonials} /> */}
          <div
            style={{
              marginTop: "50px",
            }}
            className="w-full p-10 rounded-3xl lavbg  flex flex-col font-jsans justify-center  "
          >
            <Reviews
              testimonials={pageData.testimonials}
              containerStyle={{
                paddingTop: "0px",
                marginTop: "0px",
              }}
            />
          </div>
          <section
            style={{
              background: "white",
            }}
            className="pb-20 sp-container border-2 light-border rounded-3xl mt-20 flex justify-center flex-col items-center from-pink-100 via-pink-200 to-pink-200"
            id="masterclass"
          >
            <h6 className="my-5 flex items-center gap-4 text-[45px] font-bold md:my-10 ">
              <StarIcon size={40} className="text-primary" />{" "}
              {currLangItem.trainingOptionsTitle}
            </h6>

            <div className="grid   grid-cols-1 md:grid-cols-1 mx-5 xl:mx-28 xl:px-10 gap-4 xl:max-w-[1200px] text-justify">
              {languageItemsIndex[`${currentLanguage}`].videoCardInfo.map(
                (item, index) => {
                  // update masterclass price but checking if the title contains masterclass is not the best way to do it
                  if (item.title.toLowerCase().includes("masterclass")) {
                    return (
                      <VideoCardWithDetails
                        info={info}
                        key={index}
                        title={
                          <span>
                            {item.title.split("$")[0]}
                            {/* <div className="w-fit flex flex-col justify-center"> */}
                            {masterclassDetails.isSale &&
                              masterclassDetails.sale_price && (
                                // <p className="text-md flex-1 text-gray-900 text-right">
                                <span className="font-extrabold">
                                  {formatCurrency(
                                    masterclassDetails.sale_price
                                  )}
                                </span>
                                // </p>
                              )}
                            <span
                              className={`text-md flex-1 font-bold text-right ${
                                masterclassDetails.isSale &&
                                masterclassDetails.sale_price
                                  ? "text-xs line-through transform scale-70 text-right text-gray-500"
                                  : ""
                              }`}
                            >
                              {masterclassDetails.price <= 0
                                ? "FREE!"
                                : formatCurrency(masterclassDetails.price)}
                            </span>
                            {/* </div> */}
                          </span>
                        }
                        contentList={item.contentList}
                        url={item.url}
                        button={item.button}
                      />
                    );
                  }

                  return (
                    <VideoCardWithDetails
                      info={info}
                      key={index}
                      title={item.title}
                      contentList={item.contentList}
                      url={item.url}
                      button={item.button}
                    />
                  );
                }
              )}
            </div>
          </section>
          <div className="mt-20">
            <FaqSection faq={currLangItem.faq} />
          </div>
          <div className="min-h-[5vh] md:min-h-[10vh]"></div>
        </>
      }
    />
  );
}

// using next auth
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const content = await Account.content.home();
  // get feature Shop data
  const masterclassDetails = await Features.getFeatureShopByID(
    "63149a704f08614dd053ec3d"
  );

  return getProfile(context, {
    pageData: content.simple,
    masterclassDetails: masterclassDetails.simple,
  });
}

export default MasterClassPage;

const TabContent = ({ masterclassInfo, currLangItem }) => {
  const { overviewTexts } = masterclassInfo;
  const { specialNote } = currLangItem;
  return (
    <section className="w-[95vw] md:max-w-[1200px]">
      <div className="flex flex-col items-center">
        <div className="relative w-full flex flex-col items-end justify-center mt-10 md:flex-row md:grid grid-cols-2 px-5 text-white ">
          <iframe
            className="videoRatioStandard  rounded-xl w-full"
            src="https://www.youtube.com/embed/uemGiTGeGKw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>

          <div className="flex flex-col w-[90vw] md:w-full mt-5 md:mt-10  px-5 text-black">
            {specialNote && (
              <div className="">
                <h6>{specialNote}</h6>
              </div>
            )}
            <div>
              {overviewTexts.map((text, index) => (
                <div className="flex my-2 md:my-5" key={index}>
                  <CheckIcon
                    style={{
                      strokeWidth: 3,
                    }}
                    className="mr-2 text-primary"
                  />
                  <h6 className="text-md font-medium">{text}</h6>
                </div>
              ))}
              <div className="flex mt-5 md:mt-0 justify-start w-full ">
                <Link
                  data-cy="masterclass-get-it-now-1"
                  href={"#masterclass"}
                  className=" md:mt-0 text-center "
                >
                  <Button className="mx-9 py-6 px-6 rounded-full">
                    <ShoppingCartIcon />
                    <p className="">Get it now</p>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TabSection = ({
  masterclassDetails,
  setCurrentLanguage,
  currLangItem,
}) => {
  const [selectedTab, setSelectedTab] = useState(masterclassDetails[0].id);

  const currMasterclass = masterclassDetails.find(
    (tab) => tab.id === selectedTab
  );

  return (
    <div className="flex justify-center mt-10 h-fit">
      <div className="flex flex-col items-center">
        <div
          className={` bg-white w-full md:max-w-[1100px]  rounded-3xl shadowAround lightBorder   grid grid-cols-1 md:grid-cols-7 `}
        >
          {masterclassDetails.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentLanguage(item.language);
                  setSelectedTab(item.id);
                }}
                style={{
                  borderBottom:
                    selectedTab === item.id ? "4px solid #690ecd" : "",
                }}
                className={`${
                  selectedTab === item.id ? "  shadow-none  font-bold  " : ""
                } text-center cursor-pointer py-2
                    `}
              >
                <h6>{item.language}</h6>
              </div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-w-[1050px]">
              <TabContent
                masterclassInfo={currMasterclass}
                currLangItem={currLangItem}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
