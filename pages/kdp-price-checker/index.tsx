import MainLayout, { getProfile } from "@/components/Layout/index";
import { getSession } from "next-auth/react";

import { domainMidDict } from "@/constants";
import HintWrapper from "@/utils/hint";
import React, { useEffect, useRef, useState } from "react";
import { EScreenSize, useCustomDeviceSize } from "@/utils/useDeviceSize";
import {
  retrieveFristPageProductDataFromApi,
  retrieveProductDataFromApi,
} from "@/lib/bsr-and-asin/api";
import { BSR_INDEX } from "@/data/kdpRoyality";
import { useRouter } from "next/router";
import Loader from "@/components/Common/Loader/Loading";

import GetUsage from "@/lib/api/usage/index";
import { shopIds } from "@/data/shopData";
import { Usage } from "@/lib/models/interfaces/authortools";
import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { BookPriceSampleData, SampleData } from "@/data/sample/book_price";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { TError } from "@/lib/ts/types/booklisting";
import { Button } from "@/components/ui/button";
import { GetServerSidePropsContext } from "next";
import PriceChip from "@/components/BookListingTools/book-price/PriceChip";
import { User } from "@/lib/ts/types/user";
import { SearchIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import CustomInput from "@/components/BookListingTools/CustomInput";
import BySptButton from "@/components/Common/BySptButton";

// Simple tool to help choose book price. We can show prices for top competitors books (paperback, kindle e-book, hardcover, audiobook)
// And then show average price for main niche. A lot of this data is available from Titans Quick View tool. Maybe that can be repurposed.

// USA, Canada, Australia have dollars
const getCurrency = (hostname: string): string => {
  // remove www. from hostname
  hostname = hostname.replace("www.", "");

  // return ["amazon.com", "amazon.ca", "amazon.com.au"].includes(hostname);
  return ["amazon.com", "amazon.ca", "amazon.com.au"].includes(hostname)
    ? "$"
    : "";
};

interface BookPriceProps {
  token: string;
  info: User;
  isOwner: boolean;
}

function BookPrice({ token, info, isOwner }: BookPriceProps) {
  const { size } = useCustomDeviceSize();
  const [hostname, setHostname] = useState("amazon.com");
  const [results, setResults] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [avgSales, setAvgSales] = useState(0);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [avgRank, setAvgRank] = useState(0);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAllDataLoading, setIsAllDataLoading] = useState(false);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [titleErrors, setTitleErrors] = useState<TError[] | undefined>(
    undefined
  );
  const router = useRouter();
  const [topThreePrices, setTopThreePrices] = useState([]);

  const [searchedText, setSearchedText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const currentDate = new Date();
  const nextResetDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1
  );
  const formattedResetDate = nextResetDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function getResultsHandler(): void {
    if (!isOwner) return alert("Please purchase a plan to use this feature.");
    if (usage && usage.remainingUsage <= 0) {
      const limitString = `You have exhausted your usage for this month. Please try again next month The usage limits will be reset on ${formattedResetDate}`;
      alert(limitString);
      return;
    }
    fetchData();
  }

  const fetchData = async (searchQuery = searchedText, hostName = hostname) => {
    if (!isOwner) return alert("Please purchase a plan to use this feature");
    setIsLoadingBar(true); // Set loading state to true
    setIsAllDataLoading(true); // Set loading state to true
    setIsLoading(true); // Set loading state to true
    let count = 0; // Initialize a counter variable
    const products = [];

    let totalPrices = 0;
    let totalReviews = 0;
    let totalRatings = 0;
    let totalRanks = 0;
    let totalSales = 0;
    try {
      const allProducts: any = await retrieveFristPageProductDataFromApi({
        token,
        searchKey: searchQuery,
        domain: hostName,
        endpoint: "book-price",
      });

      console.log("All Products", allProducts);

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
          const price = productData.price ? parseFloat(productData.price) : 0;
          const review = productData.customerReviewsCount
            ? productData.customerReviewsCount
            : 0;
          const rating = productData.customerReviewsRatingValue
            ? productData.customerReviewsRatingValue
            : 0;
          const rank = productData.salesRank ? productData.salesRank : 0;

          const domain = productData.domain ? productData.domain : hostname;

          // Update total values for average calculation
          totalPrices += price;

          totalReviews += review;
          totalRatings += rating;
          totalRanks += rank;
          totalSales += parseInt(productData.estSales);

          // Push the product data into the products array
          products.push({
            asin,
            image,
            title,
            categoryText,
            salesData: productData.estSales,
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

          // Check if the counter has reached 2
          if (count === 100) {
            break; // Stop the loop
          }

          setIsLoading(false); // Set loading state to false when data is loaded
        } catch (error) {
          console.error(`Error processing ASIN:`, error);
        } finally {
          setIsAllDataLoading(false); // Set loading state to false when data is loaded
          // check max category
          const categoryCount = products.reduce((acc, product) => {
            acc[product.categoryText] = (acc[product.categoryText] || 0) + 1;
            return acc;
          }, {});

          const maxCategory = Object.entries(categoryCount).reduce(
            (prev, current) => (current[1] > prev[1] ? current : prev)
          )[0];
          setCategory(maxCategory);

          // check max price
          const maxPrice = Math.max(
            ...products.map((product) => product.price)
          );
          setMaxPrice(maxPrice);
          // check min price except 0
          // price without 0
          const productsWithoutZeroPrice = products.filter(
            (product) => product.price !== 0
          );
          // const minPrice = Math.min(...products.map((product) => product.price));
          const minPrice = Math.min(
            ...productsWithoutZeroPrice.map((product) => product.price)
          );
          setMinPrice(minPrice);

          // Calculate average values based on current totals
          const avgPrice = (totalPrices / count).toFixed(2);

          // Update the average state variables
          setAvgPrice(parseFloat(avgPrice));

          // top three common prices with frquency
          const priceCount = productsWithoutZeroPrice.reduce((acc, product) => {
            acc[product.price] = (acc[product.price] || 0) + 1;
            return acc;
          }, {});

          const topThreePrices = Object.entries(priceCount)
            .map(([price, count]) => [Number(price), count]) // Convert price to number
            .sort((a, b) => (b[1] as number) - (a[1] as number)) // Sort by frequency (count)
            .slice(0, 3); // Get the top three prices

          console.log(topThreePrices);
          setTopThreePrices(topThreePrices);
        }
      }
      // TODO: Implement search data sync
      // await syncSearchData({
      //     searchQuery: searchQuery,
      //     domain: hostName,
      //     results: allProducts
      // });
      UpdateToolUsage(info._id, shopIds.BOOK_PRICE_SUGGESTION_TOOL);
      UpdateUsage();

      setIsAllDataLoading(false); // Set loading state to false when data is loaded
    } catch (error) {
      if (error.message === "user not paid") {
        alert("Please subscribe to a plan to use this feature");
        await router.push("/titans-ultra");
      }
    }
    setIsAllDataLoading(false); // Set loading state to false when data is loaded
    setIsLoading(false); // Set loading state to false when data is loaded
    setIsLoadingBar(false); // Set loading state to false when data is loaded
  };

  async function UpdateUsage() {
    const { data, error } = await GetUsage(
      shopIds.BOOK_PRICE_SUGGESTION_TOOL,
      token
    );
    if (error) {
      console.error("Error fetching usage", error);
    }
    if (data) {
      setUsage(data as Usage);
      console.log("Usage", data);
    }
  }

  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    UpdateUsage();
  }, []);

  function SetSampleResultData(data: SampleData) {
    setSearchedText(data.keyword);

    let count = 0; // Initialize a counter variable
    const products = [];

    let totalPrices = 0;
    let totalReviews = 0;
    let totalRatings = 0;
    let totalRanks = 0;
    let totalSales = 0;
    let allProducts = data.allProducts;
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
        const price = productData.price ? parseFloat(productData.price) : 0;
        const review = productData.customerReviewsCount
          ? productData.customerReviewsCount
          : 0;
        const rating = productData.customerReviewsRatingValue
          ? productData.customerReviewsRatingValue
          : 0;
        const rank = productData.salesRank ? productData.salesRank : 0;

        const domain = productData.domain ? productData.domain : hostname;

        // Update total values for average calculation
        totalPrices += price;

        totalReviews += review;
        totalRatings += rating;
        totalRanks += rank;
        totalSales += parseInt(productData.estSales);

        // Push the product data into the products array
        products.push({
          asin,
          image,
          title,
          categoryText,
          salesData: productData.estSales,
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

        // Check if the counter has reached 2
        if (count === 100) {
          break; // Stop the loop
        }

        setIsLoading(false); // Set loading state to false when data is loaded
      } catch (error) {
        console.error(`Error processing ASIN:`, error);
      } finally {
        setIsAllDataLoading(false); // Set loading state to false when data is loaded
        // check max category
        const categoryCount = products.reduce((acc, product) => {
          acc[product.categoryText] = (acc[product.categoryText] || 0) + 1;
          return acc;
        }, {});

        const maxCategory = Object.entries(categoryCount).reduce(
          (prev, current) => (current[1] > prev[1] ? current : prev)
        )[0];
        setCategory(maxCategory);

        // check max price
        const maxPrice = Math.max(...products.map((product) => product.price));
        setMaxPrice(maxPrice);
        // check min price except 0
        // price without 0
        const productsWithoutZeroPrice = products.filter(
          (product) => product.price !== 0
        );
        // const minPrice = Math.min(...products.map((product) => product.price));
        const minPrice = Math.min(
          ...productsWithoutZeroPrice.map((product) => product.price)
        );
        setMinPrice(minPrice);

        // Calculate average values based on current totals
        const avgPrice = (totalPrices / count).toFixed(2);

        // Update the average state variables
        setAvgPrice(parseFloat(avgPrice));

        // top three common prices with frquency
        const priceCount = productsWithoutZeroPrice.reduce((acc, product) => {
          acc[product.price] = (acc[product.price] || 0) + 1;
          return acc;
        }, {});

        const topThreePrices = Object.entries(priceCount)
          .map(([price, count]) => [Number(price), count]) // Convert price to number
          .sort((a, b) => (b[1] as number) - (a[1] as number)) // Sort by frequency (count)
          .slice(0, 3); // Get the top three prices

        console.log(topThreePrices);
        setTopThreePrices(topThreePrices);
      }
    }
  }

  return (
    <MainLayout
      info={info}
      // title="Book Price Suggestion - Self Publishing Titans"
      // description="Book Price Suggestion Tool by Self Publishing Titans"
      // keywords="Book Price Suggestion Tool, Self Publishing Titans, Book Price Suggestion"
      meta={{
        title: "Book Price Suggestion - Self Publishing Titans",
        description: "Book Price Suggestion Tool by Self Publishing Titans",
        keywords:
          "Book Price Suggestion Tool, Self Publishing Titans, Book Price Suggestion",
      }}
      Title={
        <div
          style={{
            marginBottom: "60px",
          }}
          className="title-container "
        >
          <h1 className="title ">Book Price Suggestion Tool</h1>
          <BySptButton />
        </div>
      }
      Body={
        <div>
          <div className=" comp-container mx-auto min-h-full mb-96">
            <div
              style={{
                marginTop: "-50px",
              }}
              className="py-4"
            >
              <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
                className="config-container "
              >
                <select
                  value={domainMidDict[hostname]}
                  className=""
                  onChange={(e) => {
                    setHostname(e.target.options[e.target.selectedIndex].text);
                  }}
                >
                  {Object.keys(domainMidDict).map((key) => {
                    return (
                      <option value={domainMidDict[key]} key={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>

                <CustomInput
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                  helperText={
                    usage ? `${usage.remainingUsage}/${usage.totalUsage}` : ""
                  }
                  placeholder="enter a keyword"
                  error={titleErrors && titleErrors.length > 0}
                  errorMessage={
                    titleErrors && titleErrors.length > 0
                      ? titleErrors[0]?.severity.toLowerCase() === "red"
                        ? "Error: Something went wrong"
                        : "Warning: Check your input"
                      : ""
                  }
                />

                <div className="">
                  <HintWrapper hint="Click to get the search results">
                    <Button
                      className="search-btn "
                      onClick={() => {
                        if (!searchedText) {
                          alert("Please enter a search term");
                          inputRef.current?.focus();
                          return;
                        } else {
                          getResultsHandler();
                        }
                      }}
                    >
                      {}
                      <SearchIcon size={20} />
                    </Button>
                  </HintWrapper>
                </div>
              </div>
            </div>
            {/* {
            usage &&
          <UsageDisplayComp Usage={usage} />
          } */}

            {/* {!isOwner && (
              <div className="samples-container ">
                <h6>Here are some free results to checkout: </h6>
                <div className="sample-btn-container">
                  <Button
                    className="sample-btn"
                    onClick={() => SetSampleResultData(BookPriceSampleData[0])}
                  >
                    Sample 1
                    <ArrowRightIcon size={16} />
                  </Button>
                  <Button
                    className="sample-btn"
                    onClick={() => SetSampleResultData(BookPriceSampleData[1])}
                  >
                    Sample 2
                    <ArrowRightIcon size={16} />
                  </Button>
                  <Button
                    className="sample-btn"
                    onClick={() => SetSampleResultData(BookPriceSampleData[2])}
                  >
                    Sample 3
                    <ArrowRightIcon size={16} />
                  </Button>
                </div>
              </div>
            )} */}
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
                <Loader loading={isAllDataLoading} time={120} />
              </div>
            ) : (
              <div
                className={"sp-container"}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "16px",
                  padding: "20px 25px",
                  marginTop: "50px",
                }}
              >
                <div className={"flex-col flex "}>
                  <div className="flex justify-start">
                    <h6
                      style={{
                        fontSize: "24px",
                      }}
                      className={"font-bold"}
                    >
                      Most Popular Prices In This Niche:
                    </h6>
                  </div>

                  <div className={"grid gap-5 grid-cols-3"}>
                    <PriceChip
                      title={"Most Popular"}
                      price={
                        topThreePrices.length > 0 ? topThreePrices[0][0] : 0
                      }
                      count={
                        topThreePrices.length > 0 ? topThreePrices[0][1] : 0
                      }
                      currency={getCurrency(hostname)}
                    />
                    <PriceChip
                      title={"Second Most Popular"}
                      price={
                        topThreePrices.length > 1 ? topThreePrices[1][0] : 0
                      }
                      count={
                        topThreePrices.length > 1 ? topThreePrices[1][1] : 0
                      }
                      currency={getCurrency(hostname)}
                    />
                    <PriceChip
                      title={"Third Most Popular"}
                      price={
                        topThreePrices.length > 2 ? topThreePrices[2][0] : 0
                      }
                      count={
                        topThreePrices.length > 2 ? topThreePrices[2][1] : 0
                      }
                      currency={getCurrency(hostname)}
                    />
                  </div>
                </div>
                <div className={"flex-col flex  mt-8"}>
                  <div className="flex justify-start">
                    <h6
                      style={{
                        fontSize: "24px",
                      }}
                      className={"font-bold"}
                    >
                      Additional Price Data:
                    </h6>
                  </div>

                  <div className={"grid grid-cols-3 gap-5"}>
                    <PriceChip
                      title={"Average"}
                      price={avgPrice}
                      currency={getCurrency(hostname)}
                    />

                    <PriceChip
                      title={"Lowest"}
                      price={minPrice}
                      currency={getCurrency(hostname)}
                    />
                    <PriceChip
                      title={"Highest"}
                      price={maxPrice}
                      currency={getCurrency(hostname)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}

export default BookPrice;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  if (session && session.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);
    let isOwner = AccountUtils.checkOwnerShip(
      featuresOwned.simple,
      shopIds.BOOK_PRICE_SUGGESTION_TOOL
    );

    return getProfile(context, {
      token: session.token,
      pageData: null,
      isOwner: isOwner,
    });
  }
  return getProfile(context, {
    token: null,
    pageData: null,
    isOwner: false,
  });
}
