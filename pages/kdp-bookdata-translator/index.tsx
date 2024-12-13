import React, { useEffect, useState } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Loader from "@/components/Common/Loader/Loading";
import axios from "axios";
import {
  aplusContentLimit,
  bookDescriptionLimit,
  bookTitleLimit,
  eachKeywordLimit,
} from "@/constants/guidelines";

import { testData, languageList } from "@/constants/guidelines";
import TranslatedTextComp, {
  TBookData,
  TResponse,
  initialBookData,
} from "@/components/BookListingTools/translator";
import { getSession } from "next-auth/react";

import GetUsage from "@/api/usage/index";
import { shopIds } from "@/data/shopData";
import { Usage } from "@/lib/models/interfaces/authortools";
import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { UpdateUsage as UpdateToolUsage } from "@/api/usage";
import { User } from "@/lib/ts/types/user";
import PageTitle from "@/components/Common/PageTitle";
import { Button } from "@/components/ui/button";
import CustomTextArea from "@/components/BookListingTools/customTextArea";
import { ArrowLeftRightIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";

import {
  TranslatorSampleData,
  SampleBookdata,
} from "@/data/sample/bookdata_translator";
import { Label } from "@/components/ui/label";

interface IndexProps {
  token: string;
  info: User;
  isOwner: boolean;
}

const Index: React.FC<IndexProps> = ({ token, info, isOwner }) => {
  const [bookData, setBookData] = useState<TBookData>({
    title: "",
    description: "",
    author: "",
    keywords: "",
    contributors: "",
    apluscontent: "",
    fromLanguage: "English",
    toLanguage: "German",
  });

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

  const [loading, setLoading] = useState<boolean>(false);

  const [response, setResponse] = useState<TResponse | null>(null);

  const handleBookDataChange = (key: string, value: string) => {
    setBookData((prev) => ({ ...prev, [key]: value }));
  };

  async function handleCheck() {
    setResponse(null);

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
        ...bookData,
        keywords: bookData.keywords
          .split(/[\n,]+/)
          .map((keyword) => keyword.trim()),
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/kdp/translate",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      const res = JSON.parse(result.gpt).response;
      console.log("Response", res);

      setResponse(res);
      UpdateToolUsage(info._id, shopIds.KDP_BOOK_DATA_TRANSLATOR);
      UpdateUsage();
    } catch (error) {
      console.error("Error handling check:", error);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateUsage() {
    const { data, error } = await GetUsage(
      shopIds.KDP_BOOK_DATA_TRANSLATOR,
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

  function SetSampleResultData(bookData: SampleBookdata) {
    // @ts-ignore

    handleBookDataChange("fromLanguage", bookData.fromLanguage);
    handleBookDataChange("toLanguage", bookData.toLanguage);
    handleBookDataChange("title", bookData.originalBookData.title);
    handleBookDataChange("author", bookData.originalBookData.author);
    handleBookDataChange(
      "contributors",
      bookData.originalBookData.contributors
    );
    handleBookDataChange("description", bookData.originalBookData.description);
    handleBookDataChange(
      "apluscontent",
      bookData.originalBookData.apluscontent
    );
    handleBookDataChange("keywords", bookData.originalBookData.keywords);
    // @ts-ignore
    setResponse(bookData.translatedBookData);
  }

  return (
    <MainLayout
      meta={{
        title: "KDP Book Data Translator",
        description: "Translate your KDP book data with ease ",
        keywords: "KDP, Book, Data, Translator",
      }}
      info={info}
      Title={<PageTitle title="KDP Book Data Translator" />}
      Body={
        <div className="min-h-[60vh] max-w-[1400px] mx-auto mb-10 mt-10 px-24">
          <div className="flex flex-col gap-3">
            {!false && (
              <div className="samples-container">
                <h6>Here are some free results to checkout: </h6>
                <div className="sample-btn-container">
                  <Button
                    onClick={() => SetSampleResultData(TranslatorSampleData[0])}
                  >
                    Sample 1
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() => SetSampleResultData(TranslatorSampleData[1])}
                  >
                    Sample 2
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() => SetSampleResultData(TranslatorSampleData[2])}
                  >
                    Sample 3
                    <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            )}

            <div
              style={{
                borderRadius: "20px",
              }}
              className="sp-container flex flex-col gap-5 p-6 "
            >
              <div className="w-full flex-col flex gap-3 mt-3">
                <Label className="text-label">Language</Label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="h-14 px-4  m-0 border w-full border-gray-300 rounded-md"
                    value={bookData.fromLanguage}
                    onChange={(e) =>
                      handleBookDataChange(
                        "fromLanguage",
                        e.target.value as string
                      )
                    }
                  >
                    {languageList.map((lang, index) => {
                      return (
                        <option key={index} value={lang}>
                          {lang}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="h-14 px-4  m-0 border w-full border-gray-300 rounded-md"
                    value={bookData.toLanguage}
                    onChange={(e) =>
                      handleBookDataChange(
                        "toLanguage",
                        e.target.value as string
                      )
                    }
                  >
                    {languageList.map((lang, index) => {
                      return (
                        <option key={index} value={lang}>
                          {lang}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex  flex-col items-cebter gap-3">
                <Label className="text-label">Book Title</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    id="outlined-basic"
                    label="Book Title"
                    variant="outlined"
                    className=""
                    multiline
                    rows={2}
                    fullWidth
                    value={bookData.title}
                    onChange={(e) =>
                      handleBookDataChange("title", e.target.value)
                    }
                    helperText={`${bookData.title.length}/${bookTitleLimit}`}
                    error={bookData.title.length === bookTitleLimit}
                  />
                  <TranslatedTextComp
                    text={response?.title || ""}
                    height={80}
                  />
                </div>
              </div>
              <div className="flex  flex-col  gap-3">
                <Label className="text-label">Author Name</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    id="outlined-basic"
                    label="Author Name"
                    variant="outlined"
                    className="w-full"
                    multiline
                    rows={2}
                    value={bookData.author}
                    onChange={(e) =>
                      handleBookDataChange("author", e.target.value)
                    }
                  />
                  <TranslatedTextComp
                    text={response?.author || ""}
                    height={80}
                  />
                </div>
              </div>
              <div className="flex  flex-col  gap-3">
                <Label className="text-label">Contributors</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    id="outlined-basic"
                    label="Contributors"
                    variant="outlined"
                    className="w-full"
                    multiline
                    rows={2}
                    value={bookData.contributors}
                    onChange={(e) =>
                      handleBookDataChange("contributors", e.target.value)
                    }
                  />
                  <TranslatedTextComp
                    text={response?.contributors || ""}
                    height={80}
                  />
                </div>
              </div>
              <div className="flex  flex-col  gap-3">
                <Label className="text-label">Book Description</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    value={bookData.description}
                    rows={8}
                    onChange={(e) =>
                      handleBookDataChange("description", e.target.value)
                    }
                    helperText={`${bookData.description.length}/${bookDescriptionLimit}`}
                    error={bookData.description.length === bookDescriptionLimit}
                  />
                  <TranslatedTextComp
                    text={response?.description || ""}
                    height={216}
                  />
                </div>
              </div>
              <div className="flex  flex-col  gap-3">
                <Label className="text-label">A+ Content</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    value={bookData.apluscontent}
                    rows={4}
                    onChange={(e) =>
                      handleBookDataChange("apluscontent", e.target.value)
                    }
                    helperText={`${bookData.apluscontent.length}/${aplusContentLimit}`}
                    error={bookData.apluscontent.length > aplusContentLimit}
                  />
                  <TranslatedTextComp
                    text={response?.apluscontent || ""}
                    height={125}
                  />
                </div>
              </div>
              <div className="flex  flex-col  gap-3">
                <Label className="text-label">7 Backend Keywords</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    rows={4}
                    value={bookData.keywords}
                    onChange={(e) =>
                      handleBookDataChange("keywords", e.target.value)
                    }
                    helperText={`Each keyword should be less than ${eachKeywordLimit} characters`}
                    error={
                      bookData.keywords
                        .split(/[\n,]+/)
                        .some((keyword) => keyword.length > eachKeywordLimit) ||
                      bookData.keywords.split(/[\n,]+/).length > 7
                    }
                  />
                  <TranslatedTextComp
                    text={response?.keywords?.join(", ") || ""}
                    height={125}
                  />
                </div>

                <div className="mt-5 mx-auto w-full rounded-full">
                  <Loader
                    loading={loading}
                    ButtonComp={
                      <Button
                        className="mt-4 w-full py-6 rounded-full font-bold"
                        onClick={handleCheck}
                      >
                        {loading ? "Translating..." : "Translate"}
                      </Button>
                    }
                  />
                  <h6 className="mt-1 mx-auto text-center w-full text-[#808080] text-[12px]">
                    {usage && ` ${usage.remainingUsage} / ${usage.totalUsage}`}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Index;

export async function getServerSideProps(context) {
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
      shopIds.KDP_BOOK_DATA_TRANSLATOR
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
