import React, { useEffect } from "react";
import { useState, useRef } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import HintWrapper from "@/utils/hint";
import { getSession } from "next-auth/react";
import { retrieveProductDataFromApi } from "@/lib/bsr-and-asin/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Editor, EditorState } from "draft-js";
import DescriptionEditor from "@/components/BookListingTools/editor/DescriptionEditor";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
// import WordCloud, {WordCloudItem, WordCloudView, WordCountData} from "../word-cloud";
import Loader from "@/components/Common/Loader/Loading";

import GetUsage from "@/lib/api/usage/index";
import { shopIds } from "@/data/shopData";
import { Usage } from "@/lib/models/interfaces/authortools";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import PageTitle from "@/components/Common/PageTitle";

import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { User } from "@/lib/ts/types/user";
import ConfigSection from "@/components/BookListingTools/editor/Config";
import { isPhysicalBook } from "@/components/BookListingTools/editor/Config";
import { ArrowRightIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import TableComp from "@/components/BookListingTools/editor/Table";

import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";

import {
  descriptionSamples,
  TDescriptionData,
} from "@/data/sample/description_creator";

interface IndexProps {
  token: string;
  isOwner: boolean;
  info: User;
}

type Suggestion = {
  opportunityScore: number;
  keywordN: string;
  searchVolume: number;
  searchResultT: number;
  demandColor: string;
  opportunityColor: string;
  demandScore: number;
};

type ProductData = {
  asin: string;
  isAsinLimits: boolean;
  imageUrl: string;
  thumbStringUrl: string;
  gl: string;
  title: string;
  binding: string;
  brandName: string;
  weightUnit: string;
  weightUnitStringId: string;
  weight: number;
  dimensionUnit: string;
  dimensionUnitStringId: string;
  width: number;
  length: number;
  height: number;
  currency: string;
  price: number;
  link: string;
  isMyProduct: boolean;
  salesRank: number;
  salesRankContextName: string;
  customerReviewsCount: number;
  customerReviewsRating: string;
  customerReviewsRatingfullStarCount: number;
  customerReviewsRatingValue: number;
  offerCount: number;
  domain: string;
  estSales: number;
};

const getDescriptionSuggestions = async ({
  searchedText,
  hostname,
  token,
  trimSize,
  bookType,
  page,
}): Promise<any> => {
  const _hostname = hostname.replace("www.", "");

  const body = {
    keyword: searchedText,
    domain: _hostname,
    book_type: bookType,
  };
  if (isPhysicalBook(bookType)) {
    // trim_size: trimSize,
    // page_count: page,
    body["trim_size"] = trimSize;
    body["page_count"] = page;
  }
  // const url = "http://localhost:8080/api/v1/chrome/suggestions";
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/kdp/get-description";
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
    throw new Error(resJson.error || "Something went wrong!");
  }

  return resJson;
};

const Index: React.FC<IndexProps> = ({ token, isOwner, info }) => {
  const [mid, setMid] = useState("1");
  const [hostname, setHostname] = useState("amazon.com");
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [relevantProducts, setRelevantProducts] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const [titles, setTitles] = useState<string[]>([]);
  const [trimSize, setTrimSize] = useState<string>(
    '8.5" x 11" (21.59 x 27.94 cm)'
  );
  const [topFiveProducts, setTopFiveProducts] = useState<ProductData[]>([]);
  const [bookType, setBookType] = useState<string>("Paperback");
  const [page, setPage] = useState<number>(120);

  const editor = useRef(null);

  const inputRef = useRef(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleCopy(text: string, index: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000); // Show "Copied" for 2 seconds
  }

  const removeBr = (html) => {
    return html.replace(/<br>/g, "");
  };

  const removeAllSpacesAfterAllTags = (html) => {
    return html.replace(/>\s+</g, "><");
  };

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
      const suggestions = await getDescriptionSuggestions({
        searchedText,
        hostname,
        token,
        trimSize,
        bookType,
        page,
      });

      setRelevantProducts(suggestions.relevant_products);

      if (suggestions.relevant_products.length !== 0) {
        const topFiveProducts = suggestions.relevant_products.slice(0, 5);
        setTopFiveProducts(topFiveProducts);
      }
      // set the loaded html to the editor
      let html = JSON.parse(suggestions.description).description;
      html = removeAllSpacesAfterAllTags(html);
      html = removeBr(html);
      // deep copy the editor state
      const contentState = stateFromHTML(html);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);

      const titles = suggestions.relevant_products.map(
        (product) => product.description
      );
      setTitles(titles);
      UpdateToolUsage(info._id, shopIds.KDP_DESCRIPTION_TOOL);
      UpdateUsage();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateUsage() {
    const { data, error } = await GetUsage(shopIds.KDP_DESCRIPTION_TOOL, token);
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

  function SetSampleResultData(sampleData: TDescriptionData) {
    // @ts-ignore
    setHostname(sampleData.hostname);
    if (sampleData.bookType == "eBook") {
      setBookType("eBook");
      setSearchedText(sampleData.keyword);
    } else {
      setBookType(sampleData.bookType);
      setTrimSize(sampleData.trimSize);
      setSearchedText(sampleData.keyword);
      setPage(sampleData.pageCount);
    }

    setRelevantProducts(sampleData.relevant_products);

    if (sampleData.relevant_products.length !== 0) {
      const topFiveProducts = sampleData.relevant_products.slice(0, 5);
      setTopFiveProducts(topFiveProducts);
    }
    // set the loaded html to the editor
    let html = sampleData.description.description;
    html = removeAllSpacesAfterAllTags(html);
    html = removeBr(html);
    // deep copy the editor state
    const contentState = stateFromHTML(html);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);

    const titles = sampleData.relevant_products.map(
      (product) => product.description
    );
    setTitles(titles);
  }

  return (
    <MainLayout
      info={info}
      meta={{
        title: "KDP Description Generator",
        description: "Generate KDP Book Description",
        keywords: "KDP, Description, Generator",
      }}
      Title={<PageTitle title="KDP Description Generator" />}
      Body={
        <div className="min-h-[60vh]  comp-container mx-auto mb-10 mt-10 px-5">
          <ConfigSection
            setMid={setMid}
            setHostname={setHostname}
            hostname={hostname}
            setSearchedText={setSearchedText}
            searchedText={searchedText}
            inputRef={inputRef}
            HandleSearch={HandleSearch}
            trimSize={trimSize}
            setTrimSize={setTrimSize}
            bookType={bookType}
            setBookType={setBookType}
            page={page}
            setPage={setPage}
            isLoading={loading}
            usage={usage}
          />
          <div></div>
          {/* {!false && (
            <div className="samples-container">
              <h6>Here are some free results to checkout: </h6>
              <div className="sample-btn-container">
                <Button
                  onClick={() => SetSampleResultData(descriptionSamples[0])}
                >
                  Sample 1
                  <ArrowRightIcon />
                </Button>
                <Button
                  onClick={() => SetSampleResultData(descriptionSamples[1])}
                >
                  Sample 2
                  <ArrowRightIcon />
                </Button>
                <Button
                  onClick={() => SetSampleResultData(descriptionSamples[2])}
                >
                  Sample 3
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
          )} */}

          <div className="grid  grid-cols-1 xl:grid-cols-3 gap-3 mt-16">
            <div className="col-span-2 ">
              <DescriptionEditor
                editor={editor}
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </div>
            <div className="col-span-1 ">
              {/*{<WordCloud titles={relatedTitles} />}*/}
              <WordCloud titles={titles} />
            </div>
          </div>
          {loading ? (
            <div
              className="min-h-[50vh] mx-auto max-w-[50%]"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {/* <BeatLoader color={"#123abc"} loading={loading} /> */}
              <Loader time={120} loading={loading} />
            </div>
          ) : titles.length > 0 ? (
            <TableComp
              data={topFiveProducts}
              handleCopy={handleCopy}
              copiedIndex={copiedIndex}
            />
          ) : null}
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
      shopIds.KDP_DESCRIPTION_TOOL
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

interface IWordCloudProps {
  titles: string[];
}

const WordCloud: React.FC<IWordCloudProps> = ({ titles }) => {
  function countWordFrequency(strings: string[]): Record<string, number> {
    const wordFrequency: Record<string, number> = {};

    strings.forEach((str) => {
      const words = str.toLowerCase().split(/\s+/);

      words.forEach((word) => {
        const cleanWord = word.replace(/[^a-z]/g, "");
        if (cleanWord) {
          wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
        }
      });
    });

    return wordFrequency;
  }

  const wordFrequency = countWordFrequency(titles);
  const wordEntries = Object.entries(wordFrequency);

  wordEntries.sort(([, freqA], [, freqB]) => freqB - freqA);

  return (
    <div
      style={{
        height: "242px",
      }}
    >
      <h6 className="text-left font-bold mb-3">
        Top Competitor Description Keywords
      </h6>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
        className="overflow-y-auto p-3 max-h-[80vh] thin-scrollbar"
      >
        <div className="h-[164px]">
          {wordEntries.slice(0, 31).map(([word, frequency], index) => (
            <div key={index} className="inline-block mx-2">
              <h6 className="text-sm ">
                {word} ({frequency})
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
