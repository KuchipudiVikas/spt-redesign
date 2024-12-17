import { useEffect, useState } from "react";
import Account from "../../../lib/mw/Accounts";
import MainLayout, { getProfile } from "@/components/Layout";
import Image from "next/image";
import covrinImg from "/public/assets/corvin.jpeg";
// import SquigglyImageWithTitle from "../../../components/Common/SquigglyImageWithTitle";
// import EmailSubscribeComponentTw from "../../../components/emailSubscribeComponent";
import {
  videoCardWithDetailsObj,
  ourJourney,
  overviewTexts,
} from "@/data/FreeKDPCoursePage/constants";
import VideoCardWithDetails from "../../../components/Common/VideoCardWithDetails";
// import splashImage from "/public/assets/bg/splash.svg";
import { CheckIcon } from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";
import { Button } from "@/components/ui/button";
import FreeKDPCoursePopup from "@/components/Misc/FreeKDPCoursePopup";
import BGsvg from "@/public/assets/home/bg.svg";
import {
  languageItemsIndex,
  masterclassInfo,
} from "@/data/MasterClassPage/index";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

function FreeKDPCourse({ info, pageData }) {
  const [currentLanguage, setCurrentLanguage] = useState("English");
  let currLangItem = languageItemsIndex[`${currentLanguage}`];

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Free Amazon KDP Intro Course By Self Publishing Titans",
        description:
          "Includes 18 videos for beginners, free KDP resources, and more.",
        ogImage:
          "https://booksbytitans-bucket.sgp1.digitaloceanspaces.com/selfpublishingtitans-booksbytitans-files/free_kdp_intro.jpeg",
        keywords: "",
      }}
      Title={<PageTitle title="Free KDP Intro Course" />}
      Body={
        <div className="pt-10">
          <div className="leading-3 flex text-[18px] font-semibold justify-center w-full ">
            Introductory KDP Masterclass Training with Free Downloadable
            Resources
          </div>
          <section className="mt-10">
            <div className="flex flex-col items-center">
              <div className="">
                {/* <SquigglyImageWithTitle
                  title={
                    <span>
                      Overview Of{" "}
                      <span className="text-secCol1-700">
                        {" "}
                        Free KDP Course :
                      </span>
                    </span>
                  }
                /> */}
              </div>
              <div className="relative w-full flex flex-col items-end justify-center md:flex-row px-5 text-white mt-4 mb-10">
                <iframe
                  className="aspect-video w-full md:w-[40vw] rounded-lg h-64 md:h-80"
                  src="https://iframe.mediadelivery.net/embed/75637/0175e715-d564-4357-80af-cddcaa92293b?autoplay=false"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin"
                ></iframe>

                <div className="flex mt-16 px-5 text-black">
                  <div>
                    {overviewTexts.map((text, index) => (
                      <div className="flex items-center font-medium gap-3">
                        <div className="bg-green-500 my-3  text-white rounded-full p-1">
                          <CheckIcon className="w-4 h-4" />{" "}
                        </div>{" "}
                        {text}
                      </div>
                    ))}
                    <div className="flex mt-5 justify-center w-full ">
                      <Link href={"#options"}>
                        <Button
                          size="lg"
                          className="w-full font-semibold  rounded-full"
                        >
                          Get it now for FREE <ArrowRightIcon />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <FreeKDPCoursePopup
                open={showPaymentPopup}
                onChange={() => {
                  setShowPaymentPopup(false);
                }}
                info={info}
              /> */}

              {/* <EmailSubscribeComponentTw /> */}

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

          <section
            className="  mt-10 pb-20 pt-10 px-20 sp-container rounded-3xl w-full border-2 light-border"
            id="options"
          >
            <h1 className="font-bold mx-auto w-full flex justify-center mb-2 text-[40px]">
              Training Options
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-10  text-justify">
              {videoCardWithDetailsObj.map((item, index) => {
                // if (index === 0) {
                //   item.button = {
                //     ...item.button,
                //     onClickButton: () => {
                //       setShowPaymentPopup(true);
                //     },
                //   };
                // }
                return (
                  <div className="">
                    <VideoCardWithDetails
                      info={info}
                      key={index}
                      title={item.title}
                      contentList={item.contentList}
                      url={item.url}
                      button={item.button}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <div className="min-h-[5vh] md:min-h-[10vh]"></div>
        </div>
      }
    />
  );
}

// using next auth
export async function getServerSideProps(context) {
  // context.res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=5900, stale-if-error=5900"
  // );
  const content = await Account.content.home();
  const info = await getProfile(context, {
    pageData: content.simple,
  });

  return info;
}

export default FreeKDPCourse;
