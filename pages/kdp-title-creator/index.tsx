import React, { useEffect } from "react";
import { useState, useRef } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import { TryOutFields } from "@/components/BookListingTools/title-creator/Tables";
import { getSession } from "next-auth/react";
import WordCloud from "@/components/BookListingTools/title-creator/word-cloud";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import Loader from "@/components/Common/Loader/Loading";

import GetUsage from "@/lib/api/usage/index";
import { shopIds } from "@/data/shopData";
import Hero from "@/components/BookListingTools/title-creator/Hero";

import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { User } from "@/lib/ts/types/user";
import { Usage } from "@/lib/models/interfaces/authortools";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  TableComp,
  TableComp2,
} from "@/components/BookListingTools/title-creator/Tables";
import { useMediaQuery } from "@/hooks/use-media-query";

import ConfigSection from "@/components/BookListingTools/title-creator/Config";
import { Separator } from "@/components/ui/separator";

interface IndexProps {
  token: string;
  info: User;
  isOwner: boolean;
}

const Index: React.FC<IndexProps> = ({ token, isOwner, info }) => {
  const [mid, setMid] = useState("1");
  const [hostname, setHostname] = useState("amazon.com");
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [relatedTitles, setRelatedTitles] = useState<string[]>([]);

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

  const inputRef = useRef(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleCopy(text: string, index: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000); // Show "Copied" for 2 seconds
  }

  async function HandleSearch() {
    if (!isOwner) {
      return alert("Please purchase a plan to use this feature");
    }

    if (usage && usage.remainingUsage <= 0) {
      const limitString = `You have exhausted your usage for this month. Please try again next month The usage limits will be reset on ${formattedResetDate}`;
      alert(limitString);
      return;
    }

    try {
      setLoading(true);

      const data = {
        keyword: searchedText,
        domain: hostname,
      };
      const response = await axios.post(
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/kdp/title-creator",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      UpdateToolUsage(info._id, shopIds.KDP_TITLE_CREATOR);

      console.log(response.data);
      setTitles(response.data.gpt_titles);
      setRelatedTitles(response.data.related_titles);
      setSuggestions(response.data.suggestions);

      UpdateUsage();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function setSampleData(suggestions, relatedTitles, aiSuggestions, keyword) {
    setLoading(false);
    setSuggestions(suggestions);
    setRelatedTitles(relatedTitles);
    setTitles(aiSuggestions);
    setSearchedText(keyword);
  }

  async function UpdateUsage() {
    const { data, error } = await GetUsage(shopIds.KDP_TITLE_CREATOR, token);
    if (error) {
      console.error("Error fetching usage", error);
    }
    if (data) {
      setUsage(data as Usage);
    }
  }

  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    UpdateUsage();
  }, []);

  const [colsNumber, setColsNumber] = useState(4);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <MainLayout
      meta={{
        title: "KDP Title Creator - Self Publishing Titans",
        description: "KDP Title Creator",
        keywords: "KDP Title Creator",
      }}
      Title={<Hero />}
      info={info}
      Body={
        <div className="min-h-[60vh]  comp-container mx-auto mb-10 mt-10 px-5">
          <ConfigSection
            setMid={setMid}
            setHostname={setHostname}
            setSearchedText={setSearchedText}
            searchedText={searchedText}
            inputRef={inputRef}
            HandleSearch={HandleSearch}
            usage={usage as Usage}
          />
          {/* 
          {true && (
            <div className="w-full flex justify-center">
              <div className="samples-container">
                <h6 className="text-sm mr-3">
                  Here are some free results to checkout:{" "}
                </h6>
                <div className="flex gap-3">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() =>
                      setSampleData(
                        titleCreatorData[0].suggestions,
                        titleCreatorData[0].relatedTitles,
                        titleCreatorData[0].aiSuggestions,
                        titleCreatorData[0].keyword
                      )
                    }
                  >
                    Sample 1
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() =>
                      setSampleData(
                        titleCreatorData[1].suggestions,
                        titleCreatorData[1].relatedTitles,
                        titleCreatorData[1].aiSuggestions,
                        titleCreatorData[1].keyword
                      )
                    }
                  >
                    Sample 2
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() =>
                      setSampleData(
                        titleCreatorData[2].suggestions,
                        titleCreatorData[2].relatedTitles,
                        titleCreatorData[2].aiSuggestions,
                        titleCreatorData[2].keyword
                      )
                    }
                  >
                    Sample 3
                    <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            </div>
          )} */}
          {loading ? (
            <div
              className=" max-w-[50vw] mx-auto min-h-[50vh]"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {/* <BeatLoader color={"#123abc"} loading={loading} /> */}
              <Loader loading={loading} time={120} />
            </div>
          ) : (
            <div className=" mt-6 mb-10">
              <div className="">
                <div className="col-span-2 flex  flex-col gap-5">
                  <TryOutFields />
                </div>

                {isDesktop && (
                  <div className="flex mt-10 items-center gap-2">
                    <span className="text-sm font-medium  flex">
                      Columns Per Row:
                    </span>
                    <div className="">
                      <ToggleGroup
                        value={colsNumber.toString()}
                        onValueChange={(value) =>
                          setColsNumber(parseInt(value))
                        }
                        type="single"
                      >
                        <ToggleGroupItem value="2">2</ToggleGroupItem>
                        <ToggleGroupItem value="4">4</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                )}

                <div
                  className={`grid lg:mt-0 mt-5 grid-cols-${
                    isMobile ? "1" : colsNumber == 4 ? "10" : "2"
                  } mt-2 gap-5`}
                >
                  <div className={`col-span-${colsNumber == 4 ? "3" : "1"}`}>
                    <TableComp2 titles={relatedTitles} />
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #ccc",
                      padding: "16px",
                    }}
                    className={`col-span-${colsNumber == 4 ? "3" : "1"}`}
                  >
                    <h6 className="text-left font-bold pb-3">
                      100 Title Inspirations
                    </h6>
                    <Separator className="mb-3" />
                    <TableComp
                      titles={titles}
                      // @ts-ignore
                      handleCopy={handleCopy}
                      copiedIndex={copiedIndex}
                    />
                  </div>
                  <div
                    className={` w-full col-span-${
                      isMobile ? "3" : colsNumber == 4 ? "4" : "2"
                    } flex ${
                      isMobile
                        ? "grid grid-cols-1"
                        : colsNumber == 2 && "grid grid-cols-2"
                    } gap-5 `}
                  >
                    <div
                      style={{
                        borderRadius: "16px",
                        border: "1px solid #ccc",
                        padding: "16px",
                      }}
                      className={`col-span-1    w-full`}
                    >
                      <h6 className="text-left font-bold pb-3">
                        Related Search Suggestions
                      </h6>
                      <TableComp
                        titles={suggestions}
                        // @ts-ignore
                        handleCopy={handleCopy}
                        copiedIndex={copiedIndex}
                      />
                    </div>
                    <div
                      className={`h-full ${colsNumber == 2 && "col-span-1"} `}
                    >
                      <WordCloud titles={relatedTitles} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

export default Index;

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
      shopIds.KDP_TITLE_CREATOR
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
