import React from "react";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { UpdateUsage } from "@/api/usage";
import { shopIds } from "@/data/shopData";
import { domainMidDict, languages } from "@/constants";
import { useDispatch } from "react-redux";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { Fragment } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";
import numberWithCommas from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { User } from "@/lib/ts/types/user";
import { Search } from "lucide-react";
import { DownloadCloudIcon } from "lucide-react";

const getResults = async ({
  searchedText,
  mid,
  hostname,
  language,
  cookies,
  token,
}) => {
  const body = {
    searchedText: searchedText,
    mid: mid,
    hostname: hostname,
    language: language,
    cookies: cookies,
  };
  // const url = "http://localhost:8080/api/v1/chrome/suggestions";
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/chrome/on-site-suggestions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const resJson = await res.json();

  if (!res.ok) {
    // state.isOpen = true;
    // state.title = action.payload.title;
    // state.message = action.payload.message;
    // state.severity = action.payload.severity;
    // state.timeout = action.payload.timeout;

    throw new Error(resJson.error || "Something went wrong!");
  }
  return resJson;
};

interface TitansProOnsiteProps {
  info: User;
  token: string;
}

const TitansProOnsite: React.FC<TitansProOnsiteProps> = ({ token, info }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // check query params and set the state
  let hostnameQ = searchParams.get("domain");
  let searchedTextQ = searchParams.get("keyword");
  // const [includedWords, setIncludedWords] = useState([]);
  const [includedWordsSentence, setIncludedWordsSentence] = useState("");
  const [excludedWordsSentence, setExcludedWordsSentence] = useState("");

  if (hostnameQ && searchParams) {
    hostnameQ = hostnameQ.replace("www.", "");
    searchedTextQ = searchedTextQ.replace("www.", "");
  }
  const [searchedText, setSearchedText] = useState(searchedTextQ || "");
  const [hostname, setHostname] = useState(hostnameQ || "amazon.com");
  // const [language, setLanguage] = useState("en_US");
  const [mid, setMid] = useState(domainMidDict[hostnameQ] || "ATVPDKIKX0DER");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  function detectWindowSize() {
    const _isMobile = window.matchMedia("(max-width: 570px)").matches;
    setIsMobile(_isMobile);
  }

  useEffect(() => {
    detectWindowSize();

    window.onresize = detectWindowSize;

    return () => {
      window.onresize = null;
    };
  }, []);

  const getFilteredResults = () => {
    // Trim and split sentences into arrays of words, ignoring empty strings
    const includedWords = includedWordsSentence
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word); // Remove empty strings

    const excludedWords = excludedWordsSentence
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word); // Remove empty strings

    // If both are empty, return all results
    if (includedWords.length === 0 && excludedWords.length === 0) {
      return results;
    }

    const filteredResults = results.filter((result) => {
      const keyword = result.keywordN.toLowerCase();

      // Check if all included words are present in the keyword
      const isKeywordIncluded =
        includedWords.length === 0 ||
        includedWords.every((word) => keyword.split(" ").includes(word));

      // Check if none of the excluded words are present in the keyword
      const isKeywordExcluded =
        excludedWords.length === 0 ||
        excludedWords.every((word) => !keyword.split(" ").includes(word));

      return isKeywordIncluded && isKeywordExcluded;
    });

    return filteredResults;
  };

  const [ascSortedBy, setAscSortedBy] = useState({
    keyword: false,
    searchVolume: false,
    searchResult: false,
    demand: false,
    opportunity: false,
  });

  function convertToCSV(
    csvData: {
      searchResult: any;
      searchVolume: any;
      opportunity: any;
      keyword: any;
      demand: any;
    }[]
  ) {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Titans Pro Data.xlsx");
  }

  const downloadCSV = () => {
    const csvData = results.map((result) => {
      return {
        keyword: result.keywordN,
        searchVolume: result.searchVolume === -1 ? 0 : result.searchVolume,
        searchResult: result.searchResultT === -1 ? 0 : result.searchResultT,
        demand: result.demandScore === -1 ? 0 : result.demandScore,
        opportunity:
          result.opportunityScore === -1 ? 0 : result.opportunityScore,
      };
    });
    convertToCSV(csvData);
  };

  const getResultsHandler = async () => {
    setLoading(true);
    try {
      const results = await getResults({
        searchedText,
        mid,
        hostname,
        language: languages[hostname],
        cookies: "",
        token,
      });
      UpdateUsage(info._id, shopIds.TITANS_PRO);

      if (results.status && results.status === "success") {
        setResults(results && results.data && results.data);
      }
    } catch (error) {
      if (error.message === "user not paid") {
        alert(
          "Currently only available for the pro users, Please buy titans pro to use this feature!"
        );
        // get free data
        return router.push("/titans-pro");
      }
      const errorSnackBar: SnackBarState = {
        isOpen: true,
        title: "Error occurred!",
        message: error.message || "Something went wrong!",
        severity: "error",
      };
      setError(error);
    }
    setLoading(false);
  };

  const sortResults = (sortBy) => {
    switch (sortBy) {
      case "keyword":
        if (ascSortedBy.keyword) {
          setAscSortedBy({
            ...ascSortedBy,
            keyword: false,
          });
          const resultsCopy = [...results];
          const sortedResults = resultsCopy.sort((a, b) => {
            return a.keywordN.localeCompare(b.keywordN);
          });

          setResults(sortedResults);
        } else {
          setAscSortedBy({
            ...ascSortedBy,
            keyword: true,
          });
          const resultsCopy = [...results];
          const sortedResults = resultsCopy.sort((a, b) => {
            return b.keywordN.localeCompare(a.keywordN);
          });

          setResults(sortedResults);
        }

        break;
      case "searchVolume":
        if (ascSortedBy.searchVolume) {
          setAscSortedBy({
            ...ascSortedBy,
            searchVolume: false,
          });
          setResults(
            results.sort((a, b) => {
              return a.searchVolume - b.searchVolume;
            })
          );
        } else {
          setAscSortedBy({
            ...ascSortedBy,
            searchVolume: true,
          });
          setResults(
            results.sort((a, b) => {
              return b.searchVolume - a.searchVolume;
            })
          );
        }

        break;
      case "searchResult":
        if (ascSortedBy.searchResult) {
          setAscSortedBy({
            ...ascSortedBy,
            searchResult: false,
          });
          setResults(
            results.sort((a, b) => {
              return a.searchResultT - b.searchResultT;
            })
          );
        } else {
          setAscSortedBy({
            ...ascSortedBy,
            searchResult: true,
          });
          setResults(
            results.sort((a, b) => {
              return b.searchResultT - a.searchResultT;
            })
          );
        }

        break;

      case "demand":
        if (ascSortedBy.demand) {
          setAscSortedBy({
            ...ascSortedBy,
            demand: false,
          });
          setResults(
            results.sort((a, b) => {
              return a.demandScore - b.demandScore;
            })
          );
        } else {
          setAscSortedBy({
            ...ascSortedBy,
            demand: true,
          });
          setResults(
            results.sort((a, b) => {
              return b.demandScore - a.demandScore;
            })
          );
        }

        break;
      case "opportunity":
        if (ascSortedBy.opportunity) {
          setAscSortedBy({
            ...ascSortedBy,
            opportunity: false,
          });
          setResults(
            results.sort((a, b) => {
              return a.opportunityScore - b.opportunityScore;
            })
          );
        } else {
          setAscSortedBy({
            ...ascSortedBy,
            opportunity: true,
          });
          setResults(
            results.sort((a, b) => {
              return b.opportunityScore - a.opportunityScore;
            })
          );
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (searchedTextQ && hostnameQ) {
      getResultsHandler();
    }
  }, []);

  const isFreeUser = !results
    ? false
    : results.length === 0
    ? false
    : results[0]?.keywordN == "No Suggestions Found"
    ? false
    : results.every((result) => result.opportunityScore === -1);

  const { size } = useCustomDeviceSize();

  const textFieldRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {" "}
      <Fragment>
        <main className="min-h-screen">
          <section
            style={{
              marginTop: "-30px",
              borderRadius: "30px",
            }}
            className=" mt-10 mx-auto  flex items-center w-fit"
          >
            <div className="config-container">
              <select
                value={domainMidDict[hostname]}
                className={`select-lg`}
                onChange={(e) => {
                  setMid(e.target.value);
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
              <Input
                className="w-[88vw] md:w-full  border-2 borderRadiusRight text-xxs md:text-xl border-purple-600 "
                placeholder="coloring books"
                type="text"
                value={searchedText}
                // ref={textFieldRef}
                onChange={(e) => {
                  setSearchedText(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getResultsHandler();
                  }
                }}
              />
              {/* excludedWordsSentence */}
              <Input
                className="w-[88vw] md:w-1/2  border-2 borderRadiusRight text-xxs md:text-xl border-purple-600 "
                placeholder="coloring books"
                type="text"
                value={excludedWordsSentence}
                onChange={(e) => {
                  setExcludedWordsSentence(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getResultsHandler();
                  }
                }}
              />
              {/* includedWordsSentence */}
              <Input
                className="w-[88vw] md:w-1/2  border-2 borderRadiusRight text-xxs md:text-xl border-purple-600 "
                placeholder="coloring books"
                type="text"
                value={includedWordsSentence}
                onChange={(e) => {
                  setIncludedWordsSentence(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getResultsHandler();
                  }
                }}
              />
              <div className="">
                <button
                  className="rounded-full bg-primary text-white p-2"
                  onClick={() => {
                    if (!searchedText) {
                      textFieldRef.current?.focus();
                    } else {
                      getResultsHandler();
                    }
                  }}
                >
                  <Search />
                </button>
              </div>
            </div>
            <button
              className="bg-primary p-4 text-white rounded-full ml-2 "
              onClick={downloadCSV}
            >
              <DownloadCloudIcon />
            </button>
          </section>
          <section
            style={{
              marginTop: "70px",
            }}
            className="flex  justify-center  max-w-[100vw]"
          >
            <div className="flex mt-10  overflow-auto w-full justify-center">
              <table className="table-auto my-12">
                <thead className="sticky top-16">
                  <tr className={` `}>
                    <th className={``}>
                      <div className="twa-th">
                        <h6
                          style={{
                            border: "none",
                            fontSize: "15px",
                          }}
                          className="font-bold"
                        >
                          {" "}
                          Amazon Search Suggestions
                        </h6>
                        {/*add sort by search volume*/}
                        <button
                          className={`hover:cursor-pointer ml-2 `}
                          style={{ border: "none" }}
                          onClick={() => sortResults("keyword")}
                        >
                          <ArrowUpDownIcon
                            style={{
                              border: "none",
                              width: "20px",
                              height: "20px",
                            }}
                            className={`inline-block   `}
                          />
                        </button>
                      </div>
                    </th>
                    <th className={``}>
                      <div className="twa-th">
                        <h6 className="text-xs md:text-xl">
                          Est. Search Volume
                        </h6>
                        <button
                          className={`hover:cursor-pointer ml-2 bg-white`}
                          style={{ border: "none" }}
                          onClick={() => sortResults("searchVolume")}
                        >
                          <ArrowUpDownIcon
                            style={{
                              border: "none",
                              width: "20px",
                              height: "20px",
                            }}
                            className={`inline-block   `}
                          />
                        </button>
                      </div>
                    </th>

                    <th className={``}>
                      <div className="twa-th">
                        <h6 className="text-xs md:text-xl"> Search Results</h6>
                        <button
                          className={`hover:cursor-pointer ml-2`}
                          onClick={() => sortResults("searchResult")}
                          style={{ border: "none" }}
                        >
                          <span
                            className={`${
                              isMobile
                                ? "block absolute bottom-1 left-0 w-full text-center"
                                : ""
                            }`}
                          >
                            <ArrowUpDownIcon
                              style={{
                                border: "none",
                                width: "20px",
                                height: "20px",
                              }}
                              className={`inline-block   `}
                            />
                          </span>
                        </button>
                      </div>
                    </th>

                    <th className={``}>
                      <div className="twa-th">
                        <h6 className="text-xs md:text-xl">Demand</h6>
                        <button
                          className={`hover:cursor-pointer ml-2`}
                          onClick={() => sortResults("demand")}
                          style={{ border: "none" }}
                        >
                          <span
                            className={`${
                              isMobile
                                ? "block absolute bottom-1 left-0 w-full text-center"
                                : ""
                            }`}
                          >
                            <ArrowUpDownIcon
                              style={{
                                border: "none",
                                width: "20px",
                                height: "20px",
                              }}
                              className={`inline-block   `}
                            />
                          </span>
                        </button>
                      </div>
                    </th>
                    <th className={``}>
                      <div className="twa-th">
                        <h6 className="text-xs md:text-xl"> Opportunity</h6>
                        <button
                          className={`hover:cursor-pointer ml-2`}
                          onClick={() => sortResults("opportunity")}
                          style={{ border: "none" }}
                        >
                          <span
                            className={`${
                              isMobile
                                ? "block absolute bottom-1 left-0 w-full text-center"
                                : ""
                            }`}
                          >
                            <ArrowUpDownIcon
                              style={{
                                border: "none",
                                width: "20px",
                                height: "20px",
                              }}
                              className={`inline-block   `}
                            />
                          </span>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isFreeUser && results.length ? (
                    <tr>
                      <td></td>

                      <td
                        colSpan={4}
                        style={{ border: "1px solid #cccccc" }}
                        className="text-center font-sans mt-2 br-16"
                      >
                        To see these metrics,
                        <Link href={`/titans-pro`}>
                          <Button>Upgrade to titans pro</Button>
                        </Link>
                      </td>
                    </tr>
                  ) : null}
                  {getFilteredResults() && getFilteredResults().length ? (
                    getFilteredResults().map((result, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="">
                            <div
                              style={{
                                color: "#0073ff",
                              }}
                              className="twa-td"
                            >
                              <Link
                                className={`text-blue-500 hover:text-blue-800`}
                                target={"_blank"}
                                href={`https://${hostname}/s?k=${encodeURIComponent(
                                  result.keywordN
                                )}`}
                              >
                                <h6>{result.keywordN}</h6>
                              </Link>
                            </div>
                          </td>
                          <td className="">
                            <div
                              style={{
                                color: "",
                              }}
                              className="twa-td font-bold flex justify-center"
                            >
                              <h6
                                style={{
                                  filter:
                                    result.searchVolume === -1
                                      ? "blur(3px)"
                                      : "none",
                                }}
                              >
                                {numberWithCommas(result.searchVolume)}
                              </h6>
                            </div>
                          </td>
                          <td className="">
                            <div
                              style={{
                                color: "",
                              }}
                              className="twa-td font-bold flex justify-center"
                            >
                              <h6
                                style={{
                                  filter:
                                    result.searchResultT === -1
                                      ? "blur(3px)"
                                      : "none",
                                }}
                              >
                                {numberWithCommas(result.searchResultT)}
                              </h6>
                            </div>
                          </td>
                          <td className="">
                            <div className="twa-td flex justify-center">
                              <p
                                className={`rounded-full w-fit text-black px-2 `}
                                style={{
                                  backgroundColor: result.demandColor,
                                  filter:
                                    result.demandScore === -1
                                      ? "blur(3px)"
                                      : "none",
                                }}
                              >
                                <h6
                                  style={{
                                    filter:
                                      result.demandScore === -1
                                        ? "blur(3px)"
                                        : "none",
                                  }}
                                >
                                  {result.demandScore}
                                </h6>
                              </p>
                            </div>
                          </td>
                          <td className={``}>
                            <div className="twa-td font justify-center items-center">
                              <p
                                className={`rounded-full mx-auto w-fit text-black px-3 py-1 text-center text-xxs md:text-xl `}
                                style={{
                                  backgroundColor: result.opportunityColor,
                                  filter:
                                    result.opportunityScore === -1
                                      ? "blur(3px)"
                                      : "none",
                                }}
                              >
                                <h6> {result.opportunityScore}</h6>
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="border px-2 md:px-4 py-1 md:py-2 text-xxs md:text-xl">
                        <h6>No Data</h6>
                      </td>
                      <td className="border px-2 md:px-4 py-1 md:py-2 text-xxs md:text-xl text-center">
                        <h6>No Data</h6>
                      </td>
                      <td className="border px-2 md:px-4 py-1 md:py-2 text-xxs md:text-xl text-center">
                        <h6>No Data</h6>
                      </td>
                      <td className="border px-2 md:px-4 py-1 md:py-2 text-xxs md:text-xl text-center">
                        <h6>No Data</h6>
                      </td>
                      <td className="border px-2 md:px-4 py-1 md:py-2 text-xxs md:text-xl text-center">
                        <h6>No Data</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </Fragment>
    </div>
  );
};

export default TitansProOnsite;

// const ConfigSection
