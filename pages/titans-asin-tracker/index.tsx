import { getSession } from "next-auth/react";
import DataTable from "react-data-table-component";
import Image from "next/image";
import Accounts from "@/lib/mw/Accounts";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import LoadingBar from "@/components/utils/LoadingBar";
import Link from "next/link";
import {
  RemoveProductTrackingAPI,
  StartProductTrackingAPI,
} from "@/lib/bsr-and-asin/api";

import { asinTrackerSample } from "@/data/sample/deep_view";
import * as React from "react";
import Account from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { domainToCountryCode } from "@/constants";

import { GetServerSidePropsContext } from "next";
import { User } from "@/lib/ts/types/user";
import { useToast } from "@/hooks/use-toast";
import MainLayout, { getProfile } from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";
import Graph from "@/components/ResearchTools/asin-tracker/Graph";
import { Button } from "@/components/ui/button";
import ConfigSection from "@/components/ResearchTools/asin-tracker/Config";
import { BarChartIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";

function getCountryCodeFromDomain(domain: string): string {
  domain = domain.replace("www.", "");
  // domain is not in the list return suffix
  if (!Object.keys(domainToCountryCode).includes(domain)) {
    return domain.split(".")[domain.split(".").length - 1];
  } else {
    return domainToCountryCode[domain];
  }
}

interface ProductTrackingProps {
  info: User;
  token: string;
  trackedData: any;
  isOwner: boolean;
  query: string;
}

function ProductTracking({
  info,
  token,
  trackedData,
  isOwner,
  query,
}: ProductTrackingProps) {
  console.log("trackedData", trackedData);
  const [productList, setProductListData] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [trackAsin, setTrackAsin] = useState("");
  const [domain, setDomain] = useState("amazon.com");
  const [isShowGraph, setIsShowGraph] = useState(false);
  const [graphAsin, setGraphAsin] = useState("");
  const [graphDomainSuffix, setGraphDomainSuffix] = useState("com");
  const [trackingData, setTrackingData] = useState(trackedData);

  const { toast } = useToast();

  const setQueryData = async () => {
    if (query.asin && query.domain) {
      setTrackAsin(query.asin);
      setDomain(query.domain);
      setIsLoading(true);
      try {
        const res = await StartProductTrackingAPI({
          token: token,
          asins: [query.asin],
          domain: query.domain.replace("www.", ""),
        });
        const jsonData = await res.json();
        if (res.status === 200) {
          setProductListData(jsonData.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          const resJson = await res.json();
          if (resJson.error === "user not paid") {
            alert("Please upgrade your plan to use this feature");
            return router.push("/titans-ultra");
          }
          toast({
            title: "Error occurred!",
            description: resJson.error || "Something went wrong!",
          });
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        toast({
          title: "Error occurred!",
          description: "Something went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    setProductListData(trackedData);
    setQueryData();
  }, []);

  // ?asin=B0CND1SSZF&domain=www.amazon.com&isSponsored=true&index=5&from=extension&keyword=coloring%20books

  function numberFormat(number: number): string {
    const roundedNumber = Math.round(number);
    return roundedNumber.toLocaleString("en-US");
  }
  let isMobile = true;

  function setSampleData(data) {
    console.log("data", data);
    setProductListData(data);
  }

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Titans ASIN Tracker",
        description:
          "Track your Amazon products with Titans ASIN Tracker. Get the latest data on your products and make informed decisions.",
        keywords: "titans, asin tracker, amazon, product tracking",
      }}
      Title={<PageTitle title="Titans ASIN Tracker" />}
      Body={
        <>
          <div
            style={{
              overflowX: "hidden",
              width: isMobile ? "90vw" : "80vw",
              alignItems: "flex-start",
            }}
            className="mt-10 mx-auto"
          >
            <LoadingBar isLoading={isLoading} title="Loading..." />
            {/* show graph popup */}
            <Graph
              isShowGraph={isShowGraph}
              setIsShowGraph={setIsShowGraph}
              graphAsin={graphAsin}
              graphDomainSuffix={graphDomainSuffix}
            />

            <div className="flex justify-center">
              <ConfigSection
                domain={domain}
                setDomain={setDomain}
                setIsLoading={setIsLoading}
                router={router}
                isOwner={isOwner}
                token={token}
                trackAsin={trackAsin}
                setTrackAsin={setTrackAsin}
                setSampleData={setSampleData}
                info={info}
              />
            </div>
            {productList.length === 0 ? (
              <div className="flex justify-center min-h-screen">
                <h1 className="text-2xl">No tracked products</h1>
              </div>
            ) : (
              <div className="p-4 border mb-20 rounded-3xl ">
                <DataTable
                  title="Tracked Products"
                  pagination={true}
                  paginationPerPage={100}
                  paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                  fixedHeader={true}
                  dense={true}
                  // hover={true}
                  striped={true} // Enable striped rows
                  // responsive={true} // Enable striped rows
                  // bordered={true}
                  // style={commonStyles.customDataTableDiv}
                  style={{
                    width: "100%",
                    overflowY: "scroll",
                    overflowX: "scroll",

                    position: "sticky",
                  }}
                  // className="kwt-table"
                  data={productList}
                  columns={[
                    {
                      name: "Image",
                      selector: (row) => row.first_product_details.imageUrl,
                      sortable: true,
                      cell: (row) => (
                        // <Image
                        //   src={row.first_product_details.imageUrl}
                        //   alt="item"
                        //   width={45}
                        //   height={25}
                        //   className="m-0.5"
                        // />
                        <img
                          src={row.first_product_details.imageUrl}
                          alt="item"
                          width={52}
                          className="object-contain my-4 m-0.5"
                        />
                      ), // Adjust width and height as required
                      minWidth: "100px",
                      maxWidth: "110px",
                    },
                    {
                      name: "Asin",
                      selector: (row) => row.first_product_details.asinString,
                      sortable: true,
                      cell: (row) => (
                        <a
                          href={`https://www.${row.first_product_details.domain}/dp/${row.first_product_details.asinString}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", overflow: "hidden" }} // optional, to remove the underline
                        >
                          <div
                            title={row.asin}
                            style={{
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              // width: '80%',
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <h6 variant="body2">
                              {row.first_product_details.asinString}
                            </h6>
                          </div>
                        </a>
                      ),
                      minWidth: "100px",
                      maxWidth: "150px",
                    },
                    {
                      name: "Title",
                      selector: (row) => row.first_product_details.title,
                      sortable: true,
                      cell: (row) => (
                        <a
                          href={`https://www.${row.first_product_details.domain}/dp/${row.first_product_details.asinString}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", overflow: "hidden" }} // optional, to remove the underline
                        >
                          <div
                            title={row.first_product_details.title}
                            style={{
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                              // width: '80%',
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              // maxWidth: '100px'  // You can adjust the width as needed
                            }}
                          >
                            <h6 variant="body2">
                              {row.first_product_details.title}
                            </h6>
                          </div>
                        </a>
                      ),
                      minWidth: "100px",
                      maxWidth: "350px",
                    },
                    {
                      name: "Category",
                      selector: (row) => row.first_product_details.category,
                      sortable: true,
                      cell: (row) => {
                        return (
                          <div>
                            <h6 variant="body2">
                              {row.first_product_details.category}
                            </h6>
                          </div>
                        );
                      },
                      minWidth: "100px",
                      maxWidth: "120px",
                    },
                    {
                      name: "Country",
                      selector: (row) => row.first_product_details.domain,
                      sortable: true,
                      cell: (row) => {
                        return (
                          <div>
                            <h6 variant="body2">
                              {getCountryCodeFromDomain(
                                row.first_product_details.domain
                              )}
                            </h6>
                          </div>
                        );
                      },
                      minWidth: "100px",
                      maxWidth: "110px",
                    },

                    {
                      name: "Price",
                      // @ts-ignore
                      selector: (row) => {
                        return (
                          <div className="flex w-full flex-row items-center ">
                            <div className="w-[40px]">
                              <h6 variant="body2">
                                {row.last_product_details.price.toFixed(2)}
                              </h6>

                              <h6 variant="body2">
                                {row.first_product_details.price.toFixed(2)}
                              </h6>
                            </div>

                            {row.last_product_details.price.toFixed(2) ==
                            row.first_product_details.price.toFixed(2) ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "equals"]}
                                  color="blue"
                                />
                              </div>
                            ) : row.last_product_details.price.toFixed(2) <
                              row.first_product_details.price.toFixed(2) ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-up"]}
                                  color="green"
                                />
                              </div>
                            ) : (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-down"]}
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                      sortable: true,
                      minWidth: "100px",
                      maxWidth: "110px",
                    },
                    {
                      name: "Reviews",
                      selector: (row) => row.first_product_details.reviews,
                      sortable: true,
                      cell: (row) => {
                        return (
                          <div className="flex flex-row w-full items-center">
                            <div className="w-[50px] flex flex-col py-1">
                              <h6 variant="body2">
                                {numberFormat(row.last_product_details.reviews)}
                              </h6>
                              <h6 variant="body2">
                                {numberFormat(
                                  row.first_product_details.reviews
                                )}
                              </h6>
                            </div>

                            {row.last_product_details.reviews ==
                            row.first_product_details.reviews ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "equals"]}
                                  color="blue"
                                />
                              </div>
                            ) : row.last_product_details.reviews <
                              row.first_product_details.reviews ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-up"]}
                                  color="green"
                                />
                              </div>
                            ) : (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-down"]}
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                      minWidth: "100px",
                      maxWidth: "110px",
                    },
                    {
                      name: "Rating",
                      selector: (row) => row.first_product_details.rating,
                      sortable: true,
                      cell: (row) => {
                        return (
                          <div className="flex flex-row w-full items-center">
                            <div className="flex w-[25px] flex-col">
                              <h6 variant="body2">
                                {row.last_product_details.rating.toFixed(1)}
                              </h6>
                              <h6 variant="body2">
                                {row.first_product_details.rating.toFixed(1)}
                              </h6>
                            </div>

                            {row.last_product_details.rating.toFixed(1) ==
                            row.first_product_details.rating.toFixed(1) ? (
                              <div className="ml-2 w-4 flex items-center">
                                <FontAwesomeIcon
                                  icon={["fas", "equals"]}
                                  color="blue"
                                />
                              </div>
                            ) : row.last_product_details.rating.toFixed(1) <
                              row.first_product_details.rating.toFixed(1) ? (
                              <div className="ml-2 w-4 flex items-center">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-up"]}
                                  color="green"
                                />
                              </div>
                            ) : (
                              <div className="ml-2 w-4 flex items-center">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-down"]}
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                      minWidth: "100px",
                      maxWidth: "110px",
                    },
                    {
                      name: "Rank",
                      selector: (row) => row.first_product_details.rank,
                      sortable: true,
                      cell: (row) => {
                        return (
                          <div className="flex flex-row w-full items-center">
                            <div className="w-[50px] flex flex-col">
                              <h6 variant="body2">
                                {numberFormat(row.last_product_details.rank)}
                              </h6>
                              <h6 variant="body2">
                                {numberFormat(row.first_product_details.rank)}
                              </h6>
                            </div>

                            {row.last_product_details.rank ==
                            row.first_product_details.rank ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "equals"]}
                                  color="blue"
                                />
                              </div>
                            ) : row.last_product_details.rank <
                              row.first_product_details.rank ? (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-up"]}
                                  color="green"
                                />
                              </div>
                            ) : (
                              <div className="ml-2 w-4">
                                <FontAwesomeIcon
                                  icon={["fas", "arrow-down"]}
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        );
                      },
                      minWidth: "100px",
                      maxWidth: "110px",
                    },

                    {
                      name: "Graph",
                      selector: (row) => row.first_product_details.asinString,
                      sortable: true,
                      cell: (row) => (
                        <Button
                          variant="text"
                          color="primary"
                          className="ml-1 md:ml-2 py-0.5 md:py-2 text-xxs md:text-sm px-1 md:px-2   font-bold rounded"
                          onClick={() => {
                            // setASIN(row.asin);
                            // setDomainSuffix(row.domainSuffix);
                            // setShowGraph(true);
                            setGraphAsin(row.first_product_details.asinString);
                            setGraphDomainSuffix(
                              row.first_product_details.domain.split(".")[
                                row.first_product_details.domain.split(".")
                                  .length - 1
                              ]
                            );
                            setIsShowGraph(true);
                          }}
                        >
                          <BarChartIcon />
                        </Button>
                      ),
                      minWidth: "100px",
                      maxWidth: "110px",
                    },

                    {
                      name: "Action",
                      selector: (row) => row.first_product_details.date,
                      sortable: true,
                      cell: (row) => (
                        <Button
                          color="primary"
                          className=" py-0.5 md:py-2 text-xxs md:text-sm  font-bold rounded"
                          onClick={() => {
                            if (!isOwner)
                              return alert(
                                "please purchase a plan to use this feature"
                              );
                            // make api call to delete asin
                            setIsLoading(true);
                            RemoveProductTrackingAPI({
                              token: token,
                              asins: [row.first_product_details.asinString],
                              domain: row.first_product_details.domain,
                            })
                              .then((res) => {
                                console.log(res);
                                setIsLoading(false);
                                if (res.status === 200) {
                                  location.reload();
                                }
                              })
                              .finally(() => {
                                setIsLoading(false);
                              });
                          }}
                        >
                          <TrashIcon className="text-gray-500" />
                        </Button>
                      ),
                      minWidth: "100px",
                      maxWidth: "110px",
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </>
      }
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const content = await Account.content.home();

  const { query } = context;

  if (session && session.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);
    let isOwner = AccountUtils.checkOwnerShip(
      featuresOwned.simple,
      "655ee71f1727b2465e13079e"
    );
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
      "/api/v1/amazon-sell-center/get-tracked-products";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    const responseJson = await res.json();

    return getProfile(context, {
      token: session.token,
      trackedData: !isOwner
        ? asinTrackerSample.sampleTrackData
        : responseJson.data == null || responseJson.data == undefined
        ? []
        : responseJson.data,
      isOwner: isOwner,
      query,
    });
  }

  return getProfile(context, {
    token: null,
    trackedData: [],
    isOwner: false,
    query,
  });
}

export default ProductTracking;
