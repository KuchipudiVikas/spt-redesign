import { useEffect, useState } from "react";
import { getProfileWithToken } from "../../../../components/MainPage/MainPage";
import CheckSVG from "/public/assets/svgs/check.svg";

import MasterClassMainTemplate from "../../../../components/MainPage/MasterlClassMainPage";
import DownArrow from "/public/assets/svgs/arrow-down.svg";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Accounts from "../../../../lib/mw/Accounts";
import DoneSVG from "/public/assets/svgs/done.svg";
import { Tooltip } from "flowbite-react";
import { useMediaQuery } from "react-responsive";
import { account_info } from "../../../../lib/mw/Accounts/Account";
import _request from "../../../../lib/mw/utils/_request";
import LoadingBar from "../../../../components/utils/LoadingBar";
import { getSession } from "next-auth/react";

const contentStyle = {
  overflow: "hidden",
  transition: "all 0.3s",
};

const contentExpandedStyle = {
  ...contentStyle,
  padding: "4px 0",

  height: "auto",
  filter: "opacity(1)",
};

const fileType = {
  video: "video",
  driveFolder: "drive-folder",
  driveFile: "drive-file",
  testContent: "text-content",
  gForm: "g-form",
};

const contentCollapsedStyle = {
  ...contentStyle,
  padding: "0 0",
  border: "1px solid transparent",
  height: "0",
  filter: "opacity(0)",
};

const CourseContentComponent = ({
  courseData,
  selectedContent,
  setContentDataFunc,
  isSectionDone,
  markAsDone,
  isOverallSectionDone,
}) => {
  return courseData.sections.map((section, sectionIdx) => {
    return (
      <div
        key={sectionIdx}
        className="mt-3 flex mx-3.5 justify-center  items-center flex-col"
      >
        <Expander
          title={section.title}
          isOverallSectionDone={isOverallSectionDone}
          sectionIdx={sectionIdx}
          content={section.items.map((item, contentIdx) => {
            return (
              <div key={contentIdx}>
                <ul className={`my-2`}>
                  <li
                    className={`flex items-start justify-between p-3 text-base font-bold  rounded-lg hover:bg-secCol1-100 group hover:shadow  dark:text-white ${selectedContent(
                      sectionIdx,
                      contentIdx
                    )}`}
                  >
                    <a
                      onClick={() =>
                        setContentDataFunc(courseData, sectionIdx, contentIdx)
                      }
                      className={`flex items-center cursor-pointer}`}
                    >
                      <span className="flex-1  ml-3">
                        {/* <span className="aspect-h-2 aspect-w-3 rounded-full">
                          {item.type === fileType.video ? (
                            <FontAwesomeIcon
                              icon={"film"}
                              color="bg-secCol1-500"
                            />
                          ) : item.type === fileType.driveFolder ? (
                            <FontAwesomeIcon icon={"folder-open"} />
                          ) : item.type === fileType.driveFile ? (
                            <FontAwesomeIcon icon="file-image" />
                          ) : (
                            <></>
                          )}
                        </span> */}

                        <span className="ml-1">{item.title}</span>
                      </span>
                      {/*<span*/}
                      {/*    className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>*/}
                    </a>

                    <Tooltip
                      content={
                        isSectionDone(sectionIdx, contentIdx)
                          ? "Completed"
                          : "Mark as Done"
                      }
                    >
                      <button
                        className="p-1"
                        onClick={() =>
                          markAsDone(
                            section.items.length,
                            sectionIdx,
                            contentIdx
                          )
                        }
                      >
                        <Image
                          layout="fixed"
                          src={
                            isSectionDone(sectionIdx, contentIdx)
                              ? DoneSVG
                              : CheckSVG
                          }
                          className="fill-blue-400"
                          width={30}
                          height={30}
                          alt="Check svg"
                        />
                      </button>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            );
          })}
        />
      </div>
    );
  });
};

const Expander = ({ title, content, isOverallSectionDone, sectionIdx }) => {
  const [expanded, setExpanded] = useState(false);
  const handleHeaderClick = () => {
    setExpanded((expanded) => !expanded);
  };
  return (
    <div
      className={`flex flex-col cursor-pointer justify-center it block p-6  min-w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
    >
      <div
        onClick={handleHeaderClick}
        className="flex justify-between items-start"
      >
        <h5 className="mb-2 Montserrat font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <div className="flex flex-col justify-center items-center">
          <div className={`${expanded ? "rotate-180" : ""}`}>
            <Image
              src={DownArrow.src}
              alt="Down Array"
              layout="fixed"
              width={10}
              height={10}
            />
          </div>
          {isOverallSectionDone(sectionIdx) ? (
            <Image
              layout="fixed"
              src={DoneSVG}
              className="fill-blue-400"
              width={30}
              height={30}
              alt="Check svg"
            />
          ) : null}
        </div>
      </div>
      <div style={expanded ? contentExpandedStyle : contentCollapsedStyle}>
        {content}
      </div>
    </div>
  );
};

function CoursePage({ info, token, productInfo, comments, purchased }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const router = useRouter();
  const { productId } = router.query;

  const [content, setContent] = useState<any>(false);
  const [courseData, setCourseData] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [sectionIdx, setSectionIdx] = useState<any>(0);
  const [contentIdx, setContentIdx] = useState<any>(0);

  function getPercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  const setContentDataFunc = (data, sectionIdx, contentIdx) => {
    setSectionIdx(sectionIdx);
    setContentIdx(contentIdx);
    const url =
      data.sections[sectionIdx].items[contentIdx].url === "null"
        ? data.sections[sectionIdx].items[contentIdx].id
        : data.sections[sectionIdx].items[contentIdx].url;
    const type = data.sections[sectionIdx].items[contentIdx].type;

    const localContentData = {
      type: type,
      data: url,
    };

    if (
      localContentData.data === content.data &&
      localContentData.type === content.type
    ) {
      return;
    }
    setIsLoading(true);
    setContent(localContentData);
  };

  const [statusSet, setStatusSet] = useState({});

  const markAsDone = (sectionLen, sectionIdx, contentIdx) => {
    const status_set = {};
    let contentStatus;
    contentStatus = {};

    if (
      statusSet[sectionIdx] === undefined ||
      statusSet[sectionIdx][contentIdx] === undefined
    ) {
      contentStatus[contentIdx] = {
        status: "done",
      };

      status_set[sectionIdx] = {
        ...statusSet[sectionIdx],
        ...contentStatus,
      };
    } else {
      delete statusSet[sectionIdx][contentIdx];
    }

    let data_set = {
      ...statusSet,
      ...status_set,
    };

    setStatusSet(data_set);

    let totalContent = 0;

    courseData.sections.forEach((section) => {
      totalContent += section.items.length;
    });

    let totalSelectedContent = 0;
    Object.keys(data_set).forEach((item) => {
      totalSelectedContent += Object.keys(data_set[item]).length;
    });

    const percentage = Math.ceil(
      getPercentage(totalSelectedContent, totalContent)
    );
    const course_status_res = _request({
      token: token,
      url: `/api/courses/course-status/${productId}`,
      method: "POST",
      body: {
        ...data_set,
        completedPercentage: percentage,
      },
    });

    course_status_res
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!token) {
      router.push(`/auth/login?next=/masterclass/courses/${productInfo.id}`);
    }
    if (!purchased) {
      router.back();
      //router.push(`/masterclass/buy/${productId}`);
    }
    const res = _request({ token: token, url: `/api/courses/${productId}` });

    res
      .then((res) => {
        setCourseData(res.data);
        setContentDataFunc(res.data, 0, 0);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      })
      .finally(() => {});

    try {
      const course_status_res = _request({
        token: token,
        url: `/api/courses/course-status/${productId}`,
      });

      course_status_res
        .then((res) => {
          setStatusSet(res.data.status);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onDataLoaded = () => {
    setIsLoading(false);
  };

  const isOverallSectionDone = (sectionIdx) => {
    let totalContent = 0;
    // if (Object.keys(statusSet[sectionIdx] || {})){
    totalContent = Object.keys(statusSet[sectionIdx] || {}).length;
    // }

    return totalContent === courseData.sections[sectionIdx].items.length;
  };

  const selectedContent = (secIdx, conIdx) => {
    if (secIdx === sectionIdx && conIdx === contentIdx) {
      return "text-white bg-secCol1-400";
    } else {
      return "text-gray-900 bg-gray-50";
    }
  };

  const isSectionDone = (sectionIdx, contentIdx) => {
    return (
      statusSet[sectionIdx] &&
      statusSet[sectionIdx][contentIdx] !== undefined &&
      statusSet[sectionIdx][contentIdx].status === "done"
    );
  };

  if (!courseData) {
    return <LoadingBar isLoading={true} title={"Loading Course..."} />;
  }

  return (
    <MasterClassMainTemplate
      info={info}
      transparentNav={false}
      fullscreen={true}
      facebookMessenger={false}
      body={
        <>
          {isTabletOrMobile ? (
            <>
              <div className="h-screen">
                <div className="flex flex-col h-screen justify-between">
                  <div className="h-screen">
                    <div
                      className="

                                          overflow-y-auto
                                        scrollbar-thin scrollbar-thumb-secCol1-500  scrollbar-track-secCol1-200
                                            "
                    >
                      <div>
                        <LoadingBar
                          isLoading={isLoading}
                          title={"Loading..."}
                        />

                        {content && content.type === fileType.video ? (
                          <div
                            className={` aspect-w-4 aspect-h-4 ${
                              isLoading ? "h-0 w-0" : null
                            }`}
                          >
                            <iframe
                              className="object-cover shadow-lg rounded-lg"
                              src={`${content.data}?autoplay=false`}
                              loading="lazy"
                              onLoad={onDataLoaded}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              allow="fullscreen; picture-in-picture"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                          </div>
                        ) : null}

                        <div
                          className={` ${isLoading ? "hidden h-0 w-0" : ""}`}
                        >
                          {content && content.type === fileType.driveFile ? (
                            <div className={`h-[50vh]`}>
                              <iframe
                                onLoad={onDataLoaded}
                                src={`https://docs.google.com/viewer?srcid=${content.data}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin"
                              ></iframe>
                            </div>
                          ) : null}

                          {content && content.type === fileType.driveFolder ? (
                            <div className="h-[50vh]">
                              <iframe
                                onLoad={onDataLoaded}
                                src={`https://drive.google.com/embeddedfolderview?id=${content.data}#list`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin"
                              ></iframe>
                            </div>
                          ) : null}

                          {content && content.type === fileType.gForm ? (
                            <div className="h-full">
                              <iframe
                                onLoad={onDataLoaded}
                                src={`https://docs.google.com/forms/d/e/${content.data}/viewform?embedded=true`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin"
                              ></iframe>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                                    min-h-fit
                                    pb-36
                                    px-1
                                    overflow-y-auto
                        scrollbar-thin scrollbar-thumb-secCol1-500  scrollbar-track-secCol1-200"
                  >
                    {courseData && (
                      <CourseContentComponent
                        courseData={courseData}
                        isOverallSectionDone={isOverallSectionDone}
                        setContentDataFunc={setContentDataFunc}
                        selectedContent={selectedContent}
                        isSectionDone={isSectionDone}
                        markAsDone={markAsDone}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="">
              <div className="grid grid-cols-4 gap-5 ">
                <aside
                  className="h-screen
                        sticky
                        top-0
                        pr-2
                        overflow-auto
                        pb-36
                        scrollbar scrollbar-thumb-secCol1-500  scrollbar-track-secCol1-200"
                >
                  {courseData && (
                    <CourseContentComponent
                      courseData={courseData}
                      setContentDataFunc={setContentDataFunc}
                      isOverallSectionDone={isOverallSectionDone}
                      selectedContent={selectedContent}
                      isSectionDone={isSectionDone}
                      markAsDone={markAsDone}
                    />
                  )}
                </aside>

                <main className="col-span-3 h-screen">
                  <div
                    className="
                            max-h-screen overflow-y-scroll
                            sticky
                            top-0
                            pr-6
                            scrollbar-thin scrollbar-thumb-secCol1-500  scrollbar-track-secCol1-200
                            "
                  >
                    {/*<div*/}
                    {/*    className=" bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed  z-20   border-b border-gray-200 dark:border-gray-600 ">*/}
                    {/*    <h1 className="text-big text-3xl text-primCol1-400">{courseData.course_name}</h1>*/}
                    {/*</div>*/}

                    <div className="my-5">
                      <LoadingBar isLoading={isLoading} title={"Loading..."} />

                      {content && content.type === fileType.video ? (
                        <div
                          className={`${
                            isLoading
                              ? "h-0 w-0 aspect-w-0 aspect-h-0"
                              : "aspect-w-16 aspect-h-9"
                          }`}
                        >
                          <iframe
                            className="object-cover shadow-lg rounded-lg"
                            src={`${content.data}?autoplay=false`}
                            loading="lazy"
                            onLoad={onDataLoaded}
                            frameBorder="0"
                            allow="fullscreen; picture-in-picture"
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin"
                          ></iframe>
                        </div>
                      ) : null}

                      <div className={`${isLoading ? "hidden" : ""}`}>
                        {content && content.type === fileType.driveFile ? (
                          <div className={`h-[89vh]`}>
                            <iframe
                              onLoad={onDataLoaded}
                              src={`https://docs.google.com/viewer?srcid=${content.data}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                          </div>
                        ) : null}

                        {content && content.type === fileType.driveFolder ? (
                          <div className="h-[89vh]">
                            <iframe
                              onLoad={onDataLoaded}
                              src={`https://drive.google.com/embeddedfolderview?id=${content.data}#list`}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                          </div>
                        ) : null}

                        {content && content.type === fileType.gForm ? (
                          <div className="h-[89vh]">
                            <iframe
                              onLoad={onDataLoaded}
                              src={`https://docs.google.com/forms/d/e/${content.data}/viewform?embedded=true`}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin"
                            ></iframe>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          )}
        </>
      }
    />
  );
}

export default CoursePage;

// using next auth
export async function getServerSideProps(context) {
  const session: any = await getSession(context);
  let product: any = { simple: [] };
  try {
    product = await Accounts.features.view(false, context.query.productId);
  } catch (e) {}

  let purchased: any = [];
  let token = false;
  try {
    token = session.token;
    purchased = await Accounts.features.checkByProduct(
      token,
      product.simple.id
    );
    let res = await account_info(token);
  } catch (e) {
    purchased = [];
  }

  const info = await getProfileWithToken(context, {
    productInfo: product.simple,
    purchased: purchased.simple !== null,
    token: token,
  });

  return info;
}
