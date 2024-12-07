import { useState, useEffect, Fragment } from "react";
import Account from "@/lib/mw/Accounts";
import Accounts from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import LoadingBar from "@/components/utils/LoadingBar";
import axios from "axios";
import * as XLSX from "xlsx";
import PageTitle from "@/components/Common/PageTitle";
import { keepaDomainMidDict } from "@/constants";
import { useRef } from "react";
import Graph from "@/components/Keyword-tool/Graph";

import { keywordTrackerSampleData } from "@/data/sample/kwtSample";
import MainLayout, { getProfile } from "@/components/Layout";
import Link from "next/link";

import Image from "next/image";
import * as React from "react";
import HintWrapper from "@/utils/hint";
import { UpdateUsage as UpdateToolUsage } from "@/api/usage";
import { User } from "@/lib/ts/types/user";
import { shopIds } from "@/data/shopData";
import { Button } from "@/components/ui/button";
import { Input as TextField } from "@/components/ui/input";
import {
  ArrowUpIcon,
  Barcode,
  UploadIcon as FileUploadIcon,
} from "lucide-react";
import { TrashIcon } from "lucide-react";
import Bulk from "@/components/Keyword-tool/Bulk";
import EditKeywords from "@/components/Keyword-tool/EditKeywords";
import ConfirmDelete from "@/components/Keyword-tool/ConfirmDelete";
import { GetServerSidePropsContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRightIcon } from "lucide-react";
import { EditIcon } from "lucide-react";
import { BarChart, ArrowUpDown, ArrowDown, EqualIcon } from "lucide-react";

function checkOwnerShip(featuresOwned, productId) {
  if (Array.isArray(featuresOwned)) {
    return featuresOwned.some((feature) => feature.feature_shop === productId);
  } else {
    return false;
  }
}
function FeaturePage({ token, info, pageData, features, isOwner }) {
  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("amazon.com");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowGraph, setIsShowGraph] = useState(false);
  const [graphAsin, setGraphAsin] = useState("");
  const [graphKeywordData, setGraphKeywordData] = useState([]);
  const [selectedData, setSelectedData] = useState<any>({});
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [cnfrmIndex, setCnfrmIndex] = useState(0);
  const [drButtonLoading, setDrButtonLoading] = useState(false);
  const asinRef = useRef<HTMLInputElement | null>(null);
  const keywordsRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState({
    asin: "",
    keywords: "",
    options: {},
  });

  const [resultList, setResultList] = useState([]);
  const [data, setData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function validateData() {
    if (query.asin.length == 0) {
      if (asinRef.current) {
        asinRef.current.focus();
      }
      alert("Please enter asin");
      return false;
    }
    if (query.keywords.length == 0) {
      alert("Please enter keywords");
      return false;
    }
    const isCombinationExist = resultList.some(
      (item) =>
        item.asin === query.asin &&
        item.keywordsData.some((keywordData) =>
          keywordData.tracked_list.some(
            (trackedItem) => trackedItem.keyword === query.keywords
          )
        ) &&
        // and same domain
        item.keywordsData.some((keywordData) =>
          keywordData.tracked_list.some(
            (trackedItem) => trackedItem.domain === domain
          )
        )
    );
    if (isCombinationExist) {
      alert("Asin and Keyword combination already exist");
      return false;
    }
    return true;
  }

  function groupDataByAsin(data) {
    const convertedData = Object.values(
      data.reduce((acc, item) => {
        const { tracking_id, tracked_list } = item;
        if (tracked_list && tracked_list.length > 0) {
          const { asin, title, image_url } = tracked_list[0];
          if (!acc[asin]) {
            acc[asin] = {
              title: title,
              image: image_url,
              asin: asin,
              keywordsData: [],
            };
          }
          acc[asin].keywordsData.push({ tracking_id, tracked_list });
        }
        return acc;
      }, {})
    );
    return convertedData;
  }

  async function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state == "granted") {
              console.log("granted");
            } else if (result.state == "prompt") {
              console.log("prompt");
            } else if (result.state == "denied") {
              console.log("denied");
              resolve({ latitude: 0, longitude: 0 });
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error(`Error: ${error.message}`);
            resolve({ latitude: 0, longitude: 0 });
          }
        );
      } else {
        console.info("Geolocation is not supported by this browser.");
        resolve({ latitude: 0, longitude: 0 });
      }
    });
  }

  async function getTrackingList() {
    try {
      setLoading(true);
      const url =
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
        "/api/v1/keyword-tracker/list";
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.data != null) {
        let convertedData = groupDataByAsin(res.data.data);
        setResultList(convertedData);
      }
    } catch (err) {
      console.error("err", err);
    } finally {
      setLoading(false);
    }
  }

  async function addQuery() {
    if (!isOwner) return alert("please purchase a plan to use this feature");
    setLoading(true);
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/keyword-tracker/add";
    try {
      if (!validateData()) {
        return;
      }
      let coordinates = await getUserLocation();
      let kws = query.keywords.split(",");
      const requestPromises = kws.map(async (keyword) => {
        const body = {
          domain: domain,
          asin: query.asin,
          keyword: keyword,
          location_data: coordinates, // will contain latitude and longitude values
        };
        return axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      });

      UpdateToolUsage(info._id, shopIds.KWT_SHOP_ID);

      const res: any = await Promise.allSettled(requestPromises);
      for (let i = 0; i < res.length; i++) {
        if (res[i].status == "rejected") {
          if (res[i].reason.response.data.error == "user not paid") {
            alert("Please upgrade your plan to use this feature");
            return;
          } else if (res[i].reason.response.data.error) {
            alert(res[i].reason.response.data.error);
            return;
          }
        }
      }
      getTrackingList();
    } catch (err) {
      console.error("error is", err);
      if (err.response.data.error == "user not paid") {
        alert("Please upgrade your plan to use this feature");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  }

  async function getBulkRankings() {
    setLoading(true);
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/keyword-tracker/add";
    try {
      for (let i = 0; i < data.length; i++) {
        const query = {
          asin: data[i].asin,
          keywords: data[i].keywords,
          domain: domain,
        };
        let kws = query.keywords.split(",");
        const requestPromises = kws.map(async (keyword) => {
          const res = await axios.post(
            url,
            {
              domain: domain,
              asin: query.asin,
              keyword: keyword,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });
        await Promise.all(requestPromises);
      }

      getTrackingList();
      setLoading(false);
      setOpenModal(false);
    } catch (err) {
      console.error("Error fetching bulk rankings:", err);
      setOpenModal(false);
      setLoading(false);
      alert(`Error fetching bulk rankings: ${err.message}`);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let excelData = [];
      for (let i = 1; i < data.length; i++) {
        if (
          typeof data[i][0] === "string" &&
          data[i][0].length > 4 && //for asin
          typeof data[i][1] === "string" &&
          data[i][1].length > 0
        ) {
          excelData.push({ asin: data[i][0], keywords: data[i][1] });
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setData(excelData);
      setOpenModal(true);
    };
    reader.readAsBinaryString(file);
  };

  const deleteRow = async (index) => {
    if (!isOwner) return alert("please purchase a plan to use this feature");
    setDrButtonLoading(true);
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
      "/api/v1/keyword-tracker/remove-by-keyword-tracking-id";
    // setLoading(true);
    try {
      const updatedList = [...resultList];
      const requestPromises = updatedList[index].keywordsData.map(
        async (keyword) => {
          const res = await axios.delete(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              id: keyword.tracking_id,
            },
          });
        }
      );

      await Promise.all(requestPromises);
      updatedList.splice(index, 1);
      setSelectedData({});
      getTrackingList();
      setShowConfirmModal(false);
    } catch (err) {
      console.error("err", err);
    } finally {
      // setLoading(false);
      setDrButtonLoading(false);
    }
  };

  const deleteKeyword = async (index) => {
    if (!isOwner) return alert("please purchase a plan to use this feature");
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
      "/api/v1/keyword-tracker/remove-by-keyword-tracking-id";
    setLoading(true);
    try {
      const updatedList = [...selectedData.keywordsData];
      const res = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: updatedList[index].tracking_id,
        },
      });
      if (res.data.status == "success") {
        updatedList.splice(index, 1);
        setSelectedData({ ...selectedData, keywordsData: updatedList });
      }
    } catch (err) {
      console.error("err", err);
    } finally {
      setLoading(false);
      getTrackingList();
    }
  };

  async function setSampleData(data = keywordTrackerSampleData.sample_data1) {
    let convertedData = groupDataByAsin(data);
    setResultList(convertedData);
  }

  useEffect(() => {
    if (!isOwner) {
      setSampleData();
    } else {
      getTrackingList();
    }
  }, []);

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Keyword Tracker",
        description: "Track your keywords",
        keywords: "keyword tracker",
      }}
      Title={
        <PageTitle title="Titans Keyword Tracker" />
        // <></>
      }
      Body={
        <>
          <LoadingBar isLoading={loading} title={"Loading..."} />
          <Graph
            isShowGraph={isShowGraph}
            setIsShowGraph={setIsShowGraph}
            graphAsin={graphAsin}
            graphKeywordData={graphKeywordData}
          />

          <div className=" mt-10 mb-10 flex justify-center   mx-auto ">
            <div className="w-fit">
              <div
                style={{
                  marginTop: "-80px",
                }}
                className="flex flex-col "
              >
                <div className="config-container ">
                  <select
                    className="py-0.5  w-full hidden md:block borderRadiusLeft lightBorder bg-white   h- md:h-auto md:w-60 md:py-3.5 px-0.5  md:px-4 border-2 text-xxs md:text-xl rounded"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                    }}
                  >
                    {Object.keys(keepaDomainMidDict).map((key) => {
                      return (
                        <option value={key} key={key}>
                          {key.replace("www.", "")}
                        </option>
                      );
                    })}
                  </select>
                  <TextField
                    type="text"
                    className="w-full "
                    onChange={(e) => handleChange(e)}
                    name="keywords"
                    placeholder="keyword 1, keyword 2, keyword3, ..."
                    // placeholder="Enter Keywords"
                  />

                  <div className=" gap-2 w-full  flex ">
                    <HintWrapper hint="Click the button to track the keywords.">
                      <Button
                        className="w-full rounded-full md:w-fit"
                        onClick={() => addQuery()}
                      >
                        Track
                      </Button>
                    </HintWrapper>
                    <HintWrapper hint="Click the button to upload a CSV file.">
                      <Button
                        className="w-full rounded-full md:w-fit"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        Upload <FileUploadIcon />
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        />
                      </Button>
                    </HintWrapper>
                  </div>
                </div>

                {true && (
                  <div className="samples-container">
                    <h6>
                      {" "}
                      {!isOwner
                        ? "Want to test and preview our tool?"
                        : ""}{" "}
                      Here are some free ones to check out:
                    </h6>
                    <Button
                      onClick={() =>
                        setSampleData(keywordTrackerSampleData.sample_data1)
                      }
                    >
                      Sample 1
                      <ArrowRightIcon />
                    </Button>
                    <Button
                      onClick={() =>
                        setSampleData(keywordTrackerSampleData.sample_data2)
                      }
                    >
                      Sample 2
                      <ArrowRightIcon />
                    </Button>
                  </div>
                )}
              </div>

              <div className="overflow-auto w-[90vw] md:w-fit max-w-[90vw] md:flex md:justfy-center ml-10 mt-10">
                <table className="h-full kwt-table ">
                  <thead className="">
                    <tr className="">
                      <th>
                        <h6>Image</h6>
                      </th>
                      <th>
                        <h6>Title</h6>
                      </th>
                      <th>
                        <h6>ASIN</h6>
                      </th>
                      <th className=" w-[160px]   md:w-[550px]   ">
                        <div className="flex justify-between ">
                          <div className="flex items-center">
                            <h6>Keywords</h6>
                          </div>
                          <div className="w-[60px]   md:w-[150px]  p-1 py-1 px-5 pl-6   md:py-2">
                            <h6>Rank</h6>
                          </div>
                        </div>
                      </th>
                      {/* <th className="md:w-[150px] p-1 border-1 px-0.5  md:px-4 py-1 md:py-2 border-2 text-sm md:text-xl text-white">
                      Rank
                    </th> */}
                      <th>
                        <h6> Graph</h6>
                      </th>
                      <th>
                        <h6>Action</h6>
                      </th>
                    </tr>
                  </thead>
                  {resultList.length > 0 ? (
                    <tbody className="h-full">
                      {resultList.map((item, index) => {
                        return (
                          <tr className="h-full " key={index}>
                            <td className="    p-1 flex justify-center items-center h-full">
                              <div className="flex w-10 h-auto md:w-fit justify-center">
                                {/* <Image
                              
                                alt="Product Image"
                                // height={100}
                                // width={100}
                                className=""
                                src={`${item.image}`}
                              /> */}
                                <Image
                                  src={item.image}
                                  width={100}
                                  height={100}
                                  className=" w-[50px] md:max-w-[75px] lg:max-w-[130px] h-auto"
                                  alt="Product Image"
                                />
                              </div>
                            </td>
                            <td className="  p-1">
                              <div className="flex text-xxs md:text-base justify-between items-center">
                                <h6>{item.title}</h6>
                              </div>
                            </td>

                            <td className=" p-1.5    ">
                              <div className="flex flex-col justify-around h-full">
                                {item.keywordsData.map((keywordData, key) => {
                                  return (
                                    <div
                                      className="flex justify-start items-start"
                                      key={key}
                                    >
                                      <Link
                                        href={`https://${keywordData.tracked_list[0].domain}/dp/${item.asin}`}
                                        target="_blank"
                                      >
                                        <h6 className="py-1 hover:underline hover:text-blue-700">
                                          {item.asin} (
                                          {
                                            keywordData.tracked_list[0].domain.split(
                                              "."
                                            )[
                                              keywordData.tracked_list[0].domain.split(
                                                "."
                                              ).length - 1
                                            ]
                                          }
                                          )
                                        </h6>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="  p-1 h-full ">
                              <div
                                style={{ height: "100%", width: "100%" }}
                                className="w-full   flex flex-col justify-between"
                              >
                                {item.keywordsData.map((rankObj, index) => {
                                  const latestRank =
                                    rankObj.tracked_list[
                                      rankObj.tracked_list.length - 1
                                    ].rank;
                                  let previousRank =
                                    rankObj.tracked_list.length > 1
                                      ? rankObj.tracked_list[
                                          rankObj.tracked_list.length - 2
                                        ].rank
                                      : null;
                                  let symbol: IconName = "equals";
                                  let symbolColor = "blue";

                                  if (previousRank !== null) {
                                    if (
                                      latestRank === 0 &&
                                      previousRank === 0
                                    ) {
                                      symbol = "equals";
                                      symbolColor = "blue";
                                    } else if (latestRank === 0) {
                                      symbol = "arrow-down";
                                      symbolColor = "red";
                                    } else {
                                      symbol =
                                        latestRank === previousRank
                                          ? "equals"
                                          : latestRank < previousRank
                                          ? "arrow-up"
                                          : "arrow-down";
                                      symbolColor =
                                        latestRank === previousRank
                                          ? "blue"
                                          : latestRank < previousRank
                                          ? "green"
                                          : "red";
                                    }
                                  }
                                  if (previousRank == null) {
                                    previousRank = latestRank;
                                  }

                                  return (
                                    <div
                                      className={`flex justify-between  ${
                                        index != item.keywordsData.length - 1
                                          ? "BGrayBorder"
                                          : ""
                                      }   items-center text-xxs md:text-base cursor-pointer flex-grow`}
                                      key={index}
                                      style={{ flex: "1" }}
                                    >
                                      <Link
                                        href={`https://${
                                          rankObj.tracked_list[0].domain
                                        }/s?k=${rankObj.tracked_list[0].keyword
                                          .split(" ")
                                          .join("+")}`}
                                        target="_blank"
                                        className="w-[100px] md:w-[400px] mx-2  hover:underline hover:text-blue-700 "
                                      >
                                        {
                                          // if domain is not same then show domain

                                          <h6>
                                            {" "}
                                            {rankObj.tracked_list[0].keyword}
                                          </h6>
                                        }
                                      </Link>
                                      {/* ranking coloumn */}
                                      <div
                                        className={`text-xxs   flex justify-center md:text-base px-1 h-full items-center   w-[60px]  md:w-[150px]`}
                                      >
                                        <div className="flex-1 mr-1 flex justify-end">
                                          <h6>{[previousRank]}</h6>
                                        </div>
                                        <div className="flex-1 mx-0 w-4 flex justify-center">
                                          {symbol === "arrow-up" ? (
                                            <ArrowUpIcon
                                              style={{
                                                strokeWidth: 3,
                                              }}
                                              className="text-green-500"
                                            />
                                          ) : symbol === "arrow-down" ? (
                                            <ArrowDown
                                              className="text-red-500"
                                              style={{
                                                strokeWidth: 3,
                                              }}
                                            />
                                          ) : (
                                            <EqualIcon
                                              className="text-blue-500"
                                              style={{
                                                strokeWidth: 3,
                                              }}
                                            />
                                          )}
                                        </div>
                                        <div className="flex-1 ml-1 flex justify-start">
                                          <h6>{latestRank}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="text-center text-xxs md:text-base ">
                              <Button
                                variant={"ghost"}
                                className=" py-0.5 md:py-2 text-xxs md:text-sm px-1 md:px-2 "
                                onClick={() => {
                                  setGraphAsin(item.asin);
                                  setGraphKeywordData(item.keywordsData);
                                  setIsShowGraph(true);
                                }}
                              >
                                <BarChart />
                              </Button>
                            </td>
                            <td className="text-center  text-xxs md:text-base  ">
                              <div className="flex justify-center items-center mx-2 my-2">
                                <Button
                                  variant={"ghost"}
                                  className="ml-1  py-0.5 md:py-2 text-xxs md:text-sm px-1 md:px-2  "
                                  onClick={() => {
                                    setSelectedData(item);
                                    setIsOpenEditModal(true);
                                  }}
                                >
                                  <EditIcon />
                                </Button>
                                <Button
                                  variant={"ghost"}
                                  className="ml-1 md:ml-2 py-0.5 md:py-2 text-xxs md:text-sm px-1 md:px-2  "
                                  onClick={() => {
                                    setShowConfirmModal(true),
                                      setSelectedData(item),
                                      setCnfrmIndex(index);
                                  }}
                                >
                                  <TrashIcon className="text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td className="text-xxs md:text-xl">No data</td>
                        <td className="text-xxs md:text-xl">No data</td>
                        <td className="text-xxs md:text-xl">No </td>
                        <td>No Data</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          <Bulk
            openModal={openModal}
            setOpenModal={setOpenModal}
            getBulkRankings={getBulkRankings}
            data={data}
            fileName={fileName}
          />

          <EditKeywords
            isOpenEditModal={isOpenEditModal}
            setIsOpenEditModal={setIsOpenEditModal}
            selectedData={selectedData}
            deleteKeyword={deleteKeyword}
            domain={domain}
          />

          <ConfirmDelete
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            selectedData={selectedData}
            deleteRow={deleteRow}
            cnfrmIndex={cnfrmIndex}
            drButtonLoading={drButtonLoading}
          />
        </>
      }
    />
  );
}

// use next-auth to check if user is logged in
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const content = await Account.content.home();
  let features = await Accounts.features.list({});

  if (session && session.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);
    let isOwner = checkOwnerShip(
      featuresOwned.simple,
      "655ee6da1727b2465e13079d"
    );
    return getProfile(context, {
      token: session.token,
      pageData: content.simple,
      isEligible: false,
      features: features.simple,
      isOwner: isOwner,
    });
  }

  return getProfile(context, {
    token: null,
    pageData: content.simple,
    isEligible: false,
    features: features.simple,
  });
}

export default FeaturePage;
