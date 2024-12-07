import commonStyles from "@/styles/bsr-and-asin/CommonStyles";
import DataTable from "react-data-table-component";
import {
  RemoveProductTrackingAPI,
  StartProductTrackingAPI,
  retrieveProductDataFromApi,
} from "@/lib/bsr-and-asin/api";
import { titansDeepViewLocalDataClassDB } from "@/db/idb";
import React, { useEffect, type FC, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingBar from "../../utils/LoadingBar";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { deepViewSameple } from "@/data/sample/deep_view";
import { BSR_INDEX, getEstSales } from "@/data/kdpRoyality";

import { numberFormat } from "@/utils/common";
import usage from "@/api/usage";
import { shopIds } from "@/data/shopData";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { CloudDownloadIcon } from "lucide-react";
import ConfigSection from "./Config";
import { RotateCwIcon } from "lucide-react";

interface ICardInfo {
  asin: string;
  onClick: () => void;
  isOwner: boolean;
  info: any;
}

const SearchCardApiInfo: FC<ICardInfo> = (props) => {
  const { asin, onClick, isOwner, info } = props;
  // get token from next auth
  const { data: session } = useSession();
  const token = session?.token ?? "";

  // Initialize state to hold product data
  const [productList, setProductListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track data loading state
  const [isLoadingBar, setIsLoadingBar] = useState(false); // Track data loading state
  const [isAllDataLoading, setIsAllDataLoading] = useState(false); // Track data loading state

  // Initialize the state for average values
  const [avgPrice, setAvgPrice] = useState(0);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [avgRank, setAvgRank] = useState(0);
  const [avgSales, setavgSales] = useState(0);
  //router data
  const router = useRouter();
  const rKeyword = router.query.keyword;
  const rdomain = router.query.domain;

  const [searchedText, setSearchedText] = useState("");
  const [hostname, setHostname] = useState("amazon.com");
  // const [language, setLanguage] = useState("en_US");
  const [mid, setMid] = useState("ATVPDKIKX0DER");
  const [asinTrackingList, setAsinTrackingList] = useState([]);

  async function handleOnTrackButtonClick(row) {
    if (!isOwner) return alert("Please purchase a plan to use this feature");
    setIsLoadingBar(true);
    if (asinTrackingList.includes(row.asin)) {
      // make api call to remove tracking
      const res = await RemoveProductTrackingAPI({
        token: token,
        asins: [row.asin],
        domain: hostname,
      });

      if (res.status === 200) {
        alert("Successfully removed tracking");
        // remove asin from list
        const newAsinTrackingList = [...asinTrackingList];
        const index = newAsinTrackingList.indexOf(row.asin);
        if (index > -1) {
          newAsinTrackingList.splice(index, 1);
        }
        setAsinTrackingList(newAsinTrackingList);
      } else {
        const resJson = await res.json();
        if (resJson.error === "user not paid") {
          alert("Please upgrade your plan to use this feature");
          return router.push("/titans-ultra");
        }
        const errorSnackBar: SnackBarState = {
          isOpen: true,
          title: "Error occurred!",
          message: resJson.error || "Something went wrong!",
          severity: "error",
        };
        dispatch(openSnackBar(errorSnackBar));
      }
      setIsLoadingBar(false);
    } else {
      // make api call to start tracking
      const res = await StartProductTrackingAPI({
        token: token,
        asins: [row.asin],
        domain: hostname,
      });
      if (res.status === 200) {
        alert("Successfully started tracking");
        setAsinTrackingList([...asinTrackingList, row.asin]);
      } else {
        const resJson = await res.json();
        if (resJson.error === "user not paid") {
          alert("Please upgrade your plan to use this feature");
          return router.push("/titans-ultra");
        }
        const errorSnackBar: SnackBarState = {
          isOpen: true,
          title: "Error occurred!",
          message: resJson.error || "Something went wrong!",
          severity: "error",
        };
        dispatch(openSnackBar(errorSnackBar));
      }
      setIsLoadingBar(false);
    }
  }

  const fetchData = async (searchQuery = searchedText, hostName = hostname) => {
    if (!isOwner) return alert("Please purchase a plan to use this feature");
    setIsLoadingBar(true); // Set loading state to true
    setIsAllDataLoading(true); // Set loading state to true
    setIsLoading(true); // Set loading state to true
    try {
      const allProducts: any = await retrieveProductDataFromApi({
        token,
        searchKey: searchQuery,
        domain: hostName,
      });

      let count = 0; // Initialize a counter variable
      const products = [];

      let totalPrices = 0;
      let totalReviews = 0;
      let totalRatings = 0;
      let totalRanks = 0;
      let totalSales = 0;

      for (const productData of allProducts) {
        try {
          const asin = productData.asin ? productData.asin : "";
          const title = productData.title ? productData.title : "";
          const image = productData.thumbStringUrl
            ? productData.thumbStringUrl
            : "";
          const categoryText = productData.salesRankContextName
            ? productData.salesRankContextName
            : "";
          const price = productData.price ? productData.price : 0;
          const review = productData.customerReviewsCount
            ? productData.customerReviewsCount
            : 0;
          const rating = productData.customerReviewsRatingValue
            ? productData.customerReviewsRatingValue
            : 0;
          const rank = productData.salesRank ? productData.salesRank : 0;

          //call the getSalesEstimate func using category and current bsr to get current sales data
          const salesData = parseInt(productData.estSales);

          const domain = productData.domain ? productData.domain : hostname;

          // Update total values for average calculation
          totalPrices += price;
          totalReviews += review;
          totalRatings += rating;
          totalRanks += rank;
          totalSales += salesData;

          // Push the product data into the products array
          products.push({
            asin,
            image,
            title,
            categoryText,
            salesData,
            price,
            review,
            rating,
            rank,
            domain,
          });

          // Set the productList state with the current data
          setProductListData([...products]);
          // Increment the counter
          count++;

          // Calculate average values based on current totals
          const avgPrice = (totalPrices / count).toFixed(2);
          const avgReviewCount = (totalReviews / count).toFixed(2);
          const avgRating = (totalRatings / count).toFixed(2);
          const avgRank = (totalRanks / count).toFixed(2);
          const avgSales = (totalSales / count).toFixed(2);

          // Update the average state variables
          setAvgPrice(parseFloat(avgPrice));
          setAvgReviewCount(parseFloat(avgReviewCount));
          setAvgRating(parseFloat(avgRating));
          setAvgRank(parseFloat(avgRank));
          setavgSales(parseFloat(avgSales));

          // Check if the counter has reached 2
          if (count === 100) {
            break; // Stop the loop
          }

          setIsLoading(false); // Set loading state to false when data is loaded
        } catch (error) {
          console.error(`Error processing ASIN ${asin}:`, error);
        }
      }
      usage.update_usage(info._id, shopIds.DEEP_VIEW_SHOP_ID);
      await syncSearchData({
        searchQuery: searchQuery,
        domain: hostName,
        results: allProducts,
      });

      setIsAllDataLoading(false); // Set loading state to false when data is loaded
    } catch (error) {
      if (error.message === "user not paid") {
        alert("Please subscribe to a plan to use this feature");
        router.push("/titans-ultra");
      }
    }
    setIsAllDataLoading(false); // Set loading state to false when data is loaded
    setIsLoading(false); // Set loading state to false when data is loaded
    setIsLoadingBar(false); // Set loading state to false when data is loaded
  };

  function getResultsHandler(): void {
    event?.preventDefault();
    if (!isOwner) return alert("Please purchase a plan to use this feature.");
    fetchData();
  }
  const downloadCSV = () => {
    if (productList.length === 0) {
      alert("No data to download");
      return;
    }
    const csvData = productList.map((result) => {
      return {
        asin: result.asin,
        title: result.title,
        image: result.image,
        category: result.categoryText,
        price: result.price,
        rank: result.rank,
        rating: result.rating,
        sales: result.salesData,
      };
    });
    convertToCSV(csvData);
  };

  function convertToCSV(
    csvData: {
      asin: any;
      title: any;
      image: any;
      category: any;
      price: any;
      rank: any;
      rating: any;
      sales: any;
    }[]
  ) {
    setIsLoading(true);
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Titans Pro Data.xlsx");
    setIsLoading(false);
  }
  //for routing from other sites
  useEffect(() => {
    if (rKeyword && rdomain && token) {
      setSearchedText(rKeyword.toString());
      // setHostname(rdomain.toString().replace("www.", ""))
      fetchData(rKeyword.toString(), rdomain.toString().replace("www.", ""));
    }
  }, [token]);

  async function SetData(allProducts) {
    try {
      let count = 0;
      const products = [];
      let totalPrices = 0;
      let totalReviews = 0;
      let totalRatings = 0;
      let totalRanks = 0;
      let totalSales = 0;
      let countryIdx = BSR_INDEX[hostname.replace("www.", "")] ?? 1;
      for (const productData of allProducts) {
        try {
          const asin = productData.asin ? productData.asin : "";
          const title = productData.title ? productData.title : "";
          const image = productData.thumbStringUrl
            ? productData.thumbStringUrl
            : "";
          const categoryText = productData.salesRankContextName
            ? productData.salesRankContextName
            : "";
          const price = productData.price ? productData.price : 0;
          const review = productData.customerReviewsCount
            ? productData.customerReviewsCount
            : 0;
          const rating = productData.customerReviewsRatingValue
            ? productData.customerReviewsRatingValue
            : 0;
          const rank = productData.salesRank ? productData.salesRank : 0;

          //call the getSalesEstimate func using category and current bsr to get current sales data
          const salesData = parseInt(productData.estSales);
          const domain = productData.domain ? productData.domain : hostname;

          // Update total values for average calculation
          totalPrices += price;
          totalReviews += review;
          totalRatings += rating;
          totalRanks += rank;
          totalSales += salesData;

          // Push the product data into the products array
          products.push({
            asin,
            image,
            title,
            categoryText,
            salesData,
            price,
            review,
            rating,
            rank,
            domain,
          });

          // Set the productList state with the current data
          setProductListData([...products]);
          // Increment the counter
          count++;

          // Calculate average values based on current totals
          const avgPrice = (totalPrices / count).toFixed(2);
          const avgReviewCount = (totalReviews / count).toFixed(2);
          const avgRating = (totalRatings / count).toFixed(2);
          const avgRank = (totalRanks / count).toFixed(2);
          const avgSales = (totalSales / count).toFixed(2);

          // Update the average state variables
          setAvgPrice(parseFloat(avgPrice));
          setAvgReviewCount(parseFloat(avgReviewCount));
          setAvgRating(parseFloat(avgRating));
          setAvgRank(parseFloat(avgRank));
          setavgSales(parseFloat(avgSales));

          // Check if the counter has reached 2
          if (count === 100) {
            break; // Stop the loop
          }

          setIsLoading(false); // Set loading state to false when data is loaded
        } catch (error) {
          console.error(`Error processing ASIN ${asin}:`, error);
        }
      }
      // await syncSearchData({
      //   searchQuery: searchQuery,
      //   domain: hostName,
      //   results: allProducts,
      // });

      setIsAllDataLoading(false); // Set loading state to false when data is loaded
    } catch (error) {
      if (error.message === "user not paid") {
        alert("Please subscribe to a plan to use this feature");
        router.push("/titans-ultra");
      }
    }
  }

  //if owner set sample data else fetch data from idb
  useEffect(() => {
    const loadData = async () => {
      if (!isOwner && rKeyword == undefined && rdomain == undefined) {
        setSearchedText(deepViewSameple.searchQuery);
        SetData(deepViewSameple.products);
      } else {
        const res = await titansDeepViewLocalDataClassDB.tdvData.get(1);
        if (res) {
          setSearchedText(res.searchQuery);
          SetData(res.results);
        }
      }
    };
    loadData();
  }, []);

  function setSampleData(data) {
    setSearchedText(data.query);
    // SetData(data.products);
    setProductListData(data.productList);
  }

  // adding data to idb
  async function syncSearchData(data: any) {
    const res = await titansDeepViewLocalDataClassDB.tdvData.put({
      id: 1,
      searchQuery: data.searchQuery,
      domain: data.domain,
      results: data.results,
      createdAt: new Date(),
    });
  }

  console.log("product list", productList);

  return (
    <div className="">
      {/* <LoadingBar isLoading={isLoadingBar} title="loading..." /> */}
      <ConfigSection
        mid={mid}
        setMid={setMid}
        downloadCSV={downloadCSV}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        setHostname={setHostname}
        getResultsHandler={getResultsHandler}
        isOwner={isOwner}
        setSampleData={setSampleData}
      />

      <div
        style={{
          overflowX: "hidden",
          alignItems: "flex-start",
        }}
        className=" mx-auto"
      >
        <div className="text-base leading-normal my-8 mb-4">
          {/* stats */}
          <div className="flex justify-center mx-auto flex-col md:flex-row">
            <div className=" statItem">
              <h6>Average Price: {avgPrice}</h6>
            </div>
            <div className=" statItem">
              <h6>Average Sales: {numberFormat(avgSales)}</h6>
            </div>
            <div className=" statItem">
              <h6>Average Review : {numberFormat(avgReviewCount)}</h6>
            </div>
            <div className=" statItem">
              <h6>Average Rating: {avgRating}</h6>
            </div>
            <div className=" statItem">
              <h6>Average Rank: {numberFormat(avgRank)}</h6>
            </div>
          </div>

          {isLoading ? (
            <div
              className="min-h-[50vh]"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <RotateCwIcon color={"#123abc"} className="animate-spin" />
            </div>
          ) : (
            <>
              <h6 className="my-3 mt-8 font-bold">First 100 Search Results</h6>
              <DataTable
                // title="First 100 Search Results"
                className="min-h-[50vh] dv-datatable border p-5 "
                pagination={true}
                paginationPerPage={100}
                paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                fixedHeader={true}
                dense={true}
                striped={true}
                style={{
                  width: "100%",
                  overflowY: "scroll",
                  overflowX: "scroll",
                  position: "sticky",
                }}
                columns={[
                  {
                    name: "Image",
                    selector: (row) => row.image,
                    sortable: true,
                    style: {
                      padding: "0px",
                    },
                    cell: (row) => (
                      // <Image
                      //   src={row.image}
                      //   alt="item"
                      //   width={45}
                      //   height={25}
                      //   className="p-0.5"
                      // />
                      <img
                        src={row.image}
                        alt="item"
                        width={52}
                        className="p-0.5"
                      />
                    ),
                    minWidth: "50px",
                    maxWidth: "80px",
                  },
                  {
                    name: "Asin",
                    selector: (row) => row.asin,
                    sortable: true,
                    cell: (row) => (
                      <a
                        href={`https://www.${row.domain}/dp/${row.asin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", overflow: "hidden" }}
                      >
                        <div
                          title={row.asin}
                          style={{
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <h6 variant="body2" className="text-xxs md:text-base">
                            {row.asin}
                          </h6>
                        </div>
                      </a>
                    ),
                    minWidth: "50px",
                    maxWidth: "120px",
                  },
                  // track asin button
                  {
                    name: "Track Asin",
                    selector: (row) => row.asin,
                    sortable: true,
                    cell: (row) => (
                      <Button
                        variant={
                          asinTrackingList.includes(row.asin)
                            ? "outline"
                            : "default"
                        }
                        size="md"
                        color={
                          asinTrackingList.includes(row.asin)
                            ? "error"
                            : "primary"
                        }
                        endIcon={
                          asinTrackingList.includes(row.asin) ? (
                            <DeleteIcon />
                          ) : null
                        }
                        className={` px-3 py-1.5 ${
                          asinTrackingList.includes(row.asin)
                            ? "bg-red-500"
                            : ""
                        }  `}
                        onClick={(row) => handleOnTrackButtonClick(row)}
                      >
                        {asinTrackingList.includes(row.asin)
                          ? "Remove"
                          : "Track"}
                      </Button>
                    ),
                    minWidth: "100px",
                    maxWidth: "10px",
                  },
                  {
                    name: "Title",
                    selector: (row) => row.title,
                    sortable: true,
                    cell: (row) => (
                      <a
                        href={`https://www.${row.domain}/dp/${row.asin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", overflow: "hidden" }} // optional, to remove the underline
                      >
                        <div
                          title={row.title}
                          style={{
                            cursor: "pointer",
                            whiteSpace: "normal",
                            // width: '80%',
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginTop: "13px",
                            marginRight: "10px",
                            marginBottom: "13px",
                            paddingRight: "10x",
                          }}
                        >
                          <h6 variant="body2">{row.title}</h6>
                        </div>
                      </a>
                    ),
                    minWidth: "200px",
                    maxWidth: "600px",
                  },
                  {
                    name: "Category",
                    selector: (row) => row.categoryText,
                    sortable: true,
                    style: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                    cell: (row) => (
                      // <a
                      //   href={`https://www.amazon.com/dp/${row.categoryText}`}
                      //   target="_blank"
                      //   rel="noopener noreferrer"
                      //   style={{ textDecoration: "none", overflow: "hidden" }} // optional, to remove the underline
                      // >
                      <div
                        title={row.categoryText}
                        style={{
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          // width: '80%',
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100px", // You can adjust the width as needed
                        }}
                      >
                        <h6 variant="body2">{row.categoryText}</h6>
                      </div>
                      // </a>
                    ),
                    minWidth: "100px",
                    maxWidth: "120px",
                  },
                  {
                    name: "Sales",
                    selector: (row) => row.salesData,
                    sortable: true,
                    cell: (row) => (
                      <h6 variant="body2">{numberFormat(row.salesData)}</h6>
                    ),
                    minWidth: "100px",
                    maxWidth: "110px",
                  },

                  {
                    name: "Price",
                    selector: (row) => row.price,
                    cell: (row) => <h6 variant="body2">{row.price}</h6>,
                    sortable: true,
                    minWidth: "70px",
                    maxWidth: "90px",
                  },
                  {
                    name: "Reviews",
                    selector: (row) => row.review,
                    sortable: true,
                    cell: (row) => (
                      <h6 variant="body2">{numberFormat(row.review)}</h6>
                    ),
                    minWidth: "100px",
                    maxWidth: "110px",
                  },
                  {
                    name: "Rating",
                    selector: (row) => row.rating,
                    sortable: true,
                    cell: (row) => <h6 variant="body2">{row.rating}</h6>,
                    minWidth: "100px",
                    maxWidth: "110px",
                  },
                  {
                    name: "Rank",
                    selector: (row) => row.rank,
                    sortable: true,
                    cell: (row) => (
                      <h6 variant="body2">{numberFormat(row.rank)}</h6>
                    ),
                    minWidth: "100px",
                    maxWidth: "110px",
                  },
                ]}
                customStyles={{
                  headCells: {
                    style: {
                      padding: "0px",
                      margin: "0px",
                    },
                  },
                  cells: {
                    style: {
                      padding: "0px",
                      width: "fit-content",
                      margin: "0px",
                      // width:"100px"
                    },
                  },
                }}
                data={productList}
              />
            </>
          )}
        </div>
        <div style={commonStyles.modalFooter}>
          <div
            style={{
              display: "flex",
              justifyContent: "initial",
              // marginTop: "-80px",
              marginRight: "650px",
              height: "100%",
              borderSpacing: 0,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SearchCardApiInfo;
