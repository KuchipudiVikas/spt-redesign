import React, { useEffect } from "react";
import { useState, useRef } from "react";
import MainLayout, { getProfile } from "@/components/Layout";

import HintWrapper from "@/utils/hint";
import { getSession } from "next-auth/react";
import WordCloud from "@/components/BookListingTools/title-creator/word-cloud";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import Loader from "@/components/Common/Loader/Loading";

import GetUsage from "@/api/usage/index";
import { shopIds } from "@/data/shopData";
import Hero from "@/components/BookListingTools/title-creator/Hero";

import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { UpdateUsage as UpdateToolUsage } from "@/api/usage";
import { User } from "@/lib/ts/types/user";
import { Button } from "@/components/ui/button";
import { Usage } from "@/lib/models/interfaces/authortools";
import { Input } from "@/components/ui/input";
import { titleCreatorData } from "@/data/guidelines";
import { ArrowRightIcon } from "lucide-react";
import {
  TableComp,
  TableComp2,
} from "@/components/BookListingTools/title-creator/Tables";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  return (
    <MainLayout
      title="KDP Title Creator - Self Publishing Titans"
      description="KDP Title Creator"
      keywords="KDP Title Creator"
      Title={<Hero />}
      info={info}
      Body={
        <div className="min-h-[60vh] lg:max-w-[80vw] xl:max-w-[80vw] mx-auto mb-10 mt-10 px-5">
          <ConfigSection
            setMid={setMid}
            setHostname={setHostname}
            setSearchedText={setSearchedText}
            searchedText={searchedText}
            inputRef={inputRef}
            HandleSearch={HandleSearch}
            usage={usage as Usage}
          />

          {true && (
            <div className="w-full flex justify-center">
              <div className="flex mx-auto items-center">
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
          )}
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
            <div className=" mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2 flex  flex-col gap-5">
                  <TryOutFields />
                  <div className="col-span-3">
                    <TableComp2 titles={relatedTitles} />
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #ccc",
                      padding: "16px",
                      background: "#f7f6f8",
                    }}
                    className=""
                  >
                    <h6 className="text-left font-bold pb-3">
                      100 Title Inspirations
                    </h6>
                    <Separator className="mb-3" />
                    <TableComp
                      titles={titles}
                      handleCopy={handleCopy}
                      copiedIndex={copiedIndex}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  {<WordCloud titles={relatedTitles} />}
                  <div
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #ccc",
                      padding: "16px",
                    }}
                    className="col-span-2 mt-5 bg-[f7f6f8]  w-full"
                  >
                    <h6 className="text-left font-bold pb-3">
                      Related Search Suggestions
                    </h6>
                    <TableComp
                      titles={suggestions}
                      handleCopy={handleCopy}
                      copiedIndex={copiedIndex}
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-8 mt-12 gap-3"></div>
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

function TryOutFields() {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const titleLengthLimit = 200;

  const capitalizeText = (text: string): string => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <div className="flex w-full p-4 border rounded-lg bg-[#f7f6f8]  gap-1 flex-col">
      <div className="flex items-start flex-col">
        <div className="w-full">
          <Label className="font-bold pl-4 pb-1 ">Enter Title #1</Label>
          <div
            style={{
              borderColor: title2.length > titleLengthLimit ? "red" : "",
              border: "1px solid #e2e8f0",
              background: "white",
              borderRadius: "16px",
            }}
            className="flex justify-between items-center"
          >
            <Textarea
              className="w-full "
              value={title1}
              rows={2}
              style={{
                resize: "none",
                border: "none",
              }}
              // helperText={`${title1.length}/${titleLengthLimit} characters used`}
              onChange={(e) => setTitle1(e.target.value)}
            />
            <HintWrapper hint="Capitalized Title 1">
              <svg
                onClick={() => setTitle1(capitalizeText(title1))}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                className="cursor-pointer"
                fill="#000"
              >
                <path d="M440-200v-80h400v80H440Zm160-160v-248l-64 64-56-56 160-160 160 160-56 56-64-64v248h-80Zm-480 0 136-360h64l136 360h-62l-32-92H216l-32 92h-64Zm114-144h108l-52-150h-4l-52 150Z" />
              </svg>
            </HintWrapper>
          </div>
        </div>
        <div className="flex">
          <span className="text-[10px]">
            {title1.length}/{titleLengthLimit} characters used
          </span>
        </div>
      </div>
      <div className="flex mt-3 items-center">
        <div className="w-full">
          <Label className="font-bold pl-4 pb-1 ">Enter Title #2</Label>
          <div
            style={{
              borderColor: title2.length > titleLengthLimit ? "red" : "",
              border: "1px solid #e2e8f0",
              background: "white",
              borderRadius: "16px",
            }}
            className="flex justify-between items-center"
          >
            <Textarea
              className="w-full"
              value={title2}
              style={{
                resize: "none",
                border: "none",
              }}
              onChange={(e) => setTitle2(e.target.value)}
            />
            <HintWrapper hint="Capitalized Title 2">
              <svg
                onClick={() => setTitle2(capitalizeText(title2))}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                className="cursor-pointer"
                fill="#000"
              >
                <path d="M440-200v-80h400v80H440Zm160-160v-248l-64 64-56-56 160-160 160 160-56 56-64-64v248h-80Zm-480 0 136-360h64l136 360h-62l-32-92H216l-32 92h-64Zm114-144h108l-52-150h-4l-52 150Z" />
              </svg>
            </HintWrapper>
          </div>
        </div>
      </div>
      <div className="text-">
        <span className="text-[10px]">
          {title2.length}/{titleLengthLimit} characters used
        </span>
      </div>
    </div>
  );
}
