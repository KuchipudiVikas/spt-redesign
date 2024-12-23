import { getSession } from "next-auth/react";
import MainLayout, { getProfile } from "@/components/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  convertToCSV,
  colorIndex,
  AccountUtils,
  ArrayUtils,
} from "@/utils/retroVision";
import router from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import ProgressBar from "@/components/utils/ProgressBar";
import Accounts from "@/lib/mw/Accounts";
import * as React from "react";
import { RetroViewSampleData } from "@/data/sample/retroVision";

import { UpdateUsage } from "@/lib/api/usage";
import { shopIds } from "@/data/shopData";
import Hero from "@/components/RetroVision/Hero";
import FiltersComponenet from "@/components/RetroVision/Filters";
import { GetServerSidePropsContext } from "next";
import EnhancedTable from "@/components/RetroVision/Table";
import Config from "@/components/RetroVision/Config";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// const (
// 	PingMsg                  = "ping"
// 	RetroViewNoRankedDataMsg = "no_ranked_data"
// 	RetroViewRankedDataMsg   = "ranked_data"
// 	RetroViewFinalDataMsg    = "final_data"
// 	RetroViewErrorDataMsg    = "error_data"
// )

enum RetroViewMessageType {
  PingMsg = "ping",
  RetroViewNoRankedDataMsg = "no_ranked_data",
  RetroViewRankedDataMsg = "ranked_data",
  RetroViewFinalDataMsg = "final_data",
  RetroViewErrorDataMsg = "error_data",
  RetroViewData = "data",
}

async function getBatchRanks({
  token,
  asin,
  domain,
  suggestions,
  headless = "false",
}) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/retro-vision/rank";
  let promises = suggestions.map((suggestion) => {
    return axios.get(url, {
      params: {
        domain: domain,
        asin: asin,
        keyword: suggestion,
        headless: headless,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });
  return await Promise.all(promises);
}

async function getRanks({
  token,
  asin,
  domain,
  suggestions,
  setProgressCount = undefined,
}) {
  // get all keywords ranks try to get 50 ranks keep fetching until you get 50 ranks
  // send 10 keywords at a time
  // after getting keywords sort them by rank
  // make api call to get search rank
  let chunkSize = 10;
  let chunkedSuggestion = ArrayUtils.chunkArray(suggestions, chunkSize);
  let results = [];
  let completedCount = 0;

  // 1 batch at a time
  for (const element of chunkedSuggestion) {
    try {
      let batchResults = await getBatchRanks({
        token: token,
        asin: asin,
        domain: domain,
        suggestions: element,
      });
      results.push(...batchResults);
      completedCount++;
      if (setProgressCount) {
        setProgressCount(
          Math.floor(((completedCount + 1) / chunkedSuggestion.length) * 100)
        );
      }
    } catch (error) {
      if (error.message !== "Enough results") {
        throw error;
      }
    }
  }

  return results;
}

// Get Product Title and Description
async function getProductTitleAndDescription({ token, asin, domain }) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/retro-vision/product-title-and-description";
  const result = await axios.get(url, {
    params: {
      domain: domain,
      asin: asin,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
}

// Get Chat GPT Suggestion
// type GetChatGPTSuggestionsRequest struct {
// 	Title       string `json:"title"`
// 	Description string `json:"description"`
// 	Domain      string `json:"domain"`
// }
async function getChatGPTSuggestion({ token, title, description, domain }) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/retro-vision/chat-gpt-suggestions";
  const result = await axios.get(url, {
    params: {
      domain: domain,
      title: title,
      description: description,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
}
// Asin       string            `json:"asin"`
// Domain     string            `json:"domain"`
// RequestID  string            `json:"request_id"`
// Pagination models.Pagination `json:"pagination"`
async function initRetroVision({ token, domain, asin, request_id }) {
  // /api/v1/retro-vision/init
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/retro-vision/init";
  const result = await axios.post(
    url,
    {
      request_id: request_id,
      domain: domain,
      asin: asin,
      pagination: {
        limit: 20,
        page: 0,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}
// Get Retro Vision Data [POST]
// type GetRetroVisionDataRequest struct {
// 	Domain         string          `json:"domain"`
// 	Asin           string          `json:"asin"`
// 	Title          string          `json:"title"`
// 	ChromeRequests []ChromeRequest `json:"chrome_requests"`
// }
// /api/v1/retro-vision/data
async function getRetroVisionDataWithPagination({
  token,
  domain,
  asin,
  page,
  limit,
}) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/retro-vision/data";

  try {
    const result = await axios.post(
      url,
      {
        domain: domain,
        asin: asin,
        pagination: {
          page: page,
          limit: limit,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    throw error; // Re-throw the error to let the caller handle it
  }
}

async function getRetroVisionData({
  token,
  domain,
  asin,
  title,
  chromeRequests,
}) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/retro-vision/get-retro-vision-data";
  const result = await axios.post(
    url,
    {
      domain: domain,
      asin: asin,
      title: title,
      chrome_requests: chromeRequests,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

async function getRankAndSetResults({
  token,
  asin,
  domain,
  suggestions,
  prevResults,
  setResults,
  setIsLoading,
  setLoadingStatus,
}) {
  setIsLoading(true);
  setLoadingStatus("Getting ranks...");
  const ranks = await getRanks({
    token,
    asin,
    domain,
    suggestions,
  });
  // set rank to result state
  prevResults.forEach((result) => {
    let rank = ranks.find((rank) => {
      return rank.data.keyword === result.keywordN;
    });
    if (rank) {
      result.rank = rank.data.rank;
    } else {
      result.rank = 0;
    }
  });
  setResults(prevResults);
  setIsLoading(false);
}

// const (
// 	RetroViewDone       = "done"
// 	RetroViewInProgress = "in_progress"
// 	RetroViewError      = "error"
// 	RetroViewTimeout    = "timeout"
// )
const RetroViewStatus = {
  Done: "done",
  InProgress: "in_progress",
  Error: "error",
  Timeout: "timeout",
};

// revalidate data each 2 seconds until status is done
async function revalidateData({
  token,
  domain,
  asin,
  page,
  limit,
  setData,
  maxDuration = 10 * 60 * 1000,
  setIsLoading,
}) {
  const startTime = Date.now();

  async function checkStatus() {
    let result;
    try {
      result = await getRetroVisionDataWithPagination({
        token,
        domain,
        asin,
        page,
        limit,
      });
    } catch (error) {
      setIsLoading(false);
      throw new Error("Error fetching data: " + error.message);
    }
    if (result?.data?.results?.length) {
      setIsLoading(false);
    }

    if (result.data.status === RetroViewStatus.Done) {
      setData(result.data);
      return result;
    }
    if (result.data.status === RetroViewStatus.Error) {
      throw new Error(result.error);
    }
    if (result.data.status === RetroViewStatus.Timeout) {
      setData(result.data);
      // TODO: fix me
      // throw new Error("Timeout occurred");
    }
    if (result.data && result.data.status === RetroViewStatus.InProgress) {
      setData(result.data);
    }

    // Check if maximum duration has been exceeded
    if (Date.now() - startTime >= maxDuration) {
      throw new Error("Maximum duration exceeded");
    }

    await new Promise((r) => setTimeout(r, 2000));
    return checkStatus();
  }

  return checkStatus();
}

function TitansRetroVision({
  token,
  info,
  pageData,
  features,
  query,
  isOwner,
}) {
  const [trackAsin, setTrackAsin] = useState("");
  const [domain, setDomain] = useState("amazon.com");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Loading...");
  const [error, setError] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [showProgressBar, setShowProgressbar] = useState(false);
  const [rankResults, setRankResults] = useState({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [data, setData] = useState(null);
  const [currentDataStateProxy, setCurrentDataStateProxy] = useState([]);

  const recordsPerPage = 20;
  const [isMobile, setIsMobile] = useState(false);

  function detectWindowSize() {
    const _isMobile = window.matchMedia("(max-width: 570px)").matches;
    setIsMobile(_isMobile);
  }

  const { toast } = useToast();

  const setQueryData = async () => {
    if (query.asin && query.domain) {
      setTrackAsin(query.asin);
      setDomain(query.domain);
      try {
        await getResultsHandler(query.asin, query.domain);
      } catch (error) {
        console.error(error);
        // dispatch(
        //   openSnackBar({
        //     isOpen: true,
        //     title: "Error occurred!",
        //     message: "Something went wrong!",
        //     severity: "error",
        //   })
        // );

        toast({
          title: "Error occurred!",
          description: "Something went wrong!",
        });
      }
    }
  };

  useEffect(() => {
    detectWindowSize();
    window.onresize = detectWindowSize;
    setQueryData();
    return () => {
      window.onresize = null;
    };
  }, []);

  const downloadCSV = async () => {
    setProgressCount(0);
    setShowProgressbar(true);
    let csvResults = [];
    let noRankData = [];
    let filteredResultsLocal = filteredResults?.length
      ? filteredResults
      : results;

    for (const element of filteredResultsLocal) {
      let currRank = rankResults[element.keywordN];

      if (currRank < 9999 && currRank > 0) {
        if (currRank || currRank == 0) {
          let curr = {
            ...element,
            rank: currRank,
          };
          csvResults.push(curr);
        } else {
          noRankData.push(element);
        }
      } else {
        noRankData.push(element);
      }
    }

    let keywords = [];
    noRankData.forEach((rec) => keywords.push(rec.keywordN));

    let ranks = await getRanks({
      token,
      asin: trackAsin,
      domain,
      suggestions: keywords,
      setProgressCount,
    });
    let fetchedRanksData = [];

    noRankData.forEach((result) => {
      let rank = ranks.find((rank) => {
        return rank.data.keyword === result.keywordN;
      });
      if (rank) {
        result.rank = rank.data.rank;
      } else {
        result.rank = 0;
      }
    });
    csvResults = [...csvResults, ...noRankData];
    csvResults = [...csvResults, ...fetchedRanksData];
    const csvData = csvResults.map((result) => {
      return {
        keyword: result.keywordN,
        searchRank: result.rank,
        searchVolume: result.searchVolume,
        searchResult: result.searchResultT,
        demand: result.demandScore,
        opportunity: result.opportunityScore,
      };
    });
    setShowProgressbar(false);
    convertToCSV(csvData, trackAsin);
  };

  const getResultsHandler = async (trackAsin: string, domain: string) => {
    if (!isOwner) return alert("Please subscribe a plan to use this to tool");
    // reset filters
    // resetFilters();
    setIsLoading(true);
    setError(null);
    setLoadingStatus("Loading...");
    setFilteredResults(undefined);

    try {
      // get-product-title-and-description
      // get-chat-gpt-suggestion
      // get-retro-vision-data

      UpdateUsage(info._id, shopIds.RETRO_VIEW_SHOP_ID);

      // get product title and description
      const productTitleAndDescription = await getProductTitleAndDescription({
        token: token,
        asin: trackAsin,
        domain: domain.replace("www.", ""),
      });

      // if found cached data return imidiatly.
      if (productTitleAndDescription.data.is_cached) {
        const cachedResults =
          productTitleAndDescription.data.retro_vision_response.results;

        setData(productTitleAndDescription.data.retro_vision_response);
        setIsLoading(false);
        // first page suggestions
        // const firstPageSuggestions = cachedResults
        //   .slice(0, recordsPerPage)
        //   .map((result) => {
        //     return result.data.keywordN;
        //   });

        // // get ranks
        // await getRankAndSetResults({
        //   token,
        //   asin: trackAsin,
        //   domain: domain.replace("www.", ""),
        //   suggestions: firstPageSuggestions,
        //   prevResults: cachedResults,
        //   setResults,
        //   setIsLoading,
        //   setLoadingStatus,
        // });
        return;
      }

      setLoadingStatus("Analyzing data...");
      // get chat gpt suggestion
      const chatGPTSuggestion = await getChatGPTSuggestion({
        token: token,
        title: productTitleAndDescription.data.title,
        description: productTitleAndDescription.data.description,
        domain: domain.replace("www.", ""),
      });

      setLoadingStatus("Generating Suggestions...");

      // use event source first if it is available

      // retro view init
      const retroVisionInitData = await initRetroVision({
        token: token,
        domain: domain.replace("www.", ""),
        asin: trackAsin,
        request_id: chatGPTSuggestion.data.request_id,
      });

      // if status is done then get data
      if (retroVisionInitData.status === RetroViewStatus.Done) {
        const retroVisionData: any = await getRetroVisionDataWithPagination({
          token: token,
          domain: domain.replace("www.", ""),
          asin: trackAsin,
          page: 1,
          limit: recordsPerPage,
        });

        const retroVisionResults = retroVisionData.data.results;
        setData(retroVisionData.data);
        // first page suggestions
        const suggestions = retroVisionResults.map((result) => {
          return result.data.keywordN;
        });

        console.log("suggestions", suggestions);

        // get ranks
        await getRankAndSetResults({
          token,
          asin: trackAsin,
          domain: domain.replace("www.", ""),
          suggestions,
          prevResults: retroVisionResults,
          setResults,
          setIsLoading,
          setLoadingStatus,
        });
        return;
      } else {
        // if status is in progress then revalidate data
        const retroVisionData = await revalidateData({
          token: token,
          domain: domain.replace("www.", ""),
          asin: trackAsin,
          page: 1,
          limit: recordsPerPage,
          setData,
          setIsLoading,
        });

        setIsLoading(false);
      }

      return;
    } catch (error) {
      if (error?.response?.data?.error === "user not paid") {
        alert(
          "Only available for the paid users, Please buy to use this feature!"
        );
        // get free data
        return router.push("/titans-ultra");
      }
      // const errorSnackBar: SnackBarState = {
      //   isOpen: true,
      //   title: "Error occurred!",
      //   message:
      //     error?.response?.data?.error ||
      //     error.message ||
      //     "Something went wrong!",
      //   severity: "error",
      // };

      toast({
        variant: "destructive",
        title: "Error occurred!",
        description:
          error?.response?.data?.error ||
          error.message ||
          "Something went wrong!",
      });

      setIsLoading(false);
      setError(error);
    }
  };

  // send api call to generate suggestions
  //table controls

  function setSampleData(data = RetroViewSampleData.sample_data1) {
    setFilteredResults(undefined);
    setTrackAsin(data.asin);
    setResults(data.data);
    setRankResults(data.rankResults);
    setProxyData(data.data);
    setData(data);
  }

  useEffect(() => {
    if (!isOwner) {
      setSampleData();
    }
  }, []);

  const [proxyData, setProxyData] = useState(results);
  useEffect(() => {
    let res = filteredResults !== undefined ? filteredResults : results;
    setProxyData(res);
  }, [filteredResults, results]);

  useEffect(() => {
    if (data?.results) {
      const retroVisionResults = data.results;
      let tableData = retroVisionResults.map((result) => {
        if (result?.is_rank_checked) {
          result.rank = result.search_rank;
          setRankResults((prev) => {
            return {
              ...prev,
              [result.data.keywordN]: result.search_rank,
            };
          });
        }
        return result.data;
      });
      setProxyData(tableData);
      setResults(tableData);
    }
  }, [data]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <MainLayout
      info={info}
      // title="Titans Retro View"
      // description="Titans Retro View"
      // keywords=""
      meta={{
        title: "Titans Retro View",
        description: "Titans Retro View",
        keywords: "",
      }}
      Title={<Hero />}
      Body={
        <div className="comp-container">
          {/* <LoadingBar isLoading={isLoading} title={loadingStatus} /> */}

          <Config
            trackAsin={trackAsin}
            setTrackAsin={setTrackAsin}
            getResultsHandler={getResultsHandler}
            downloadCSV={downloadCSV}
            setSampleData={setSampleData}
            isOwner={isOwner}
            token={token}
            domain={domain}
            setDomain={setDomain}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setFilteredResults={setFilteredResults}
            results={results}
            recordsPerPage={recordsPerPage}
            setLoadingStatus={setLoadingStatus}
            getRankAndSetResults={getRankAndSetResults}
          />

          {/* <FiltersComponenet
            domain={domain}
            setFilteredResults={setFilteredResults}
            results={results}
            recordsPerPage={recordsPerPage}
            isOwner={isOwner}
            token={token}
            trackAsin={trackAsin}
            setIsLoading={setIsLoading}
            setLoadingStatus={setLoadingStatus}
          /> */}

          {data &&
            data.status &&
            data.status === RetroViewStatus.InProgress && (
              <Alert className="mt-5 container mx-auto flex flex-row">
                <h6 className="text-sm">
                  Please wait while we are fetching the data in the background
                  and updating the results. This may take a few minutes. We got{" "}
                  {data.pagination.total} keywords to fetch ranks.
                </h6>
              </Alert>
            )}

          {
            // show error message
            error && (
              <Alert className="mt-5 container mx-auto">
                <h6 className="text-sm">
                  {error?.response?.data?.error ||
                    error.message ||
                    "Something went wrong!"}
                </h6>
              </Alert>
            )
          }

          <section className=" mt-10  h-full   ">
            {/* create two table on desktop view and one table on mobile view here with
              Amazon Search Suggestions, Est. Search Volume, Search Results, Demand, Opportunity */}
            <ProgressBar
              isShowProgressBar={showProgressBar}
              title={"Getting Ranks"}
              progressCount={progressCount}
            />
            <div className="">
              {data && (
                <EnhancedTable
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  results={proxyData}
                  setResults={setResults}
                  getRankAndSetResults={getRankAndSetResults}
                  token={token}
                  asin={trackAsin}
                  domain={domain}
                  getRanks={getRanks}
                  rankResults={rankResults}
                  setRankResults={setRankResults}
                  setCurrentDataStateProxy={setCurrentDataStateProxy}
                  isOwner={isOwner}
                  data={data}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </div>
          </section>
        </div>
      }
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const content = await Accounts.content.home();
  let features = await Accounts.features.list({});

  const { query } = context;

  if (session?.token) {
    const featuresOwned = await Accounts.features.checkAll(session.token);
    let isOwner = AccountUtils.checkOwnerShip(
      featuresOwned.simple,
      "655ee7681727b2465e13079f"
    );
    return getProfile(context, {
      token: session.token,
      pageData: content.simple,
      isEligible: false,
      features: features.simple,
      isOwner: isOwner,
      query,
    });
  }

  return getProfile(context, {
    token: null,
    pageData: content.simple,
    isEligible: false,
    features: features.simple,
    isOwner: false,
    query,
  });
}

export default TitansRetroVision;
