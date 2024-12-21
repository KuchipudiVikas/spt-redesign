import MainLayout, { getProfile } from "@/components/Layout";
import { getSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  aplusContentLimit,
  bookDescriptionLimit,
  bookTitleLimit,
  eachKeywordLimit,
} from "@/constants/guidelines";
import Loader from "@/components/Common/Loader/Loading";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import GetUsage from "@/lib/api/usage/index";
import { shopIds } from "@/data/shopData";
import { User } from "@/lib/ts/types/user";
import { Usage } from "@/lib/models/interfaces/authortools";
import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import PageTitle from "@/components/Common/PageTitle";
import { ArrowRightIcon } from "lucide-react";
import {
  GrammerCheckSampleData,
  SampleData,
} from "@/data/sample/grammer_check";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { GetServerSidePropsContext } from "next";
import CustomTextArea from "@/components/BookListingTools/customTextArea";
import { Label } from "@/components/ui/label";

export type TGrammarCheckData = {
  title: string;
  description: string;
  author: string;
  keywords: string;
  apluscontent: string;
  language: string;
  contributors: string;
};

interface GrammarCheckProps {
  token: string;
  info: User;
  isOwner: boolean;
}

function GrammarCheck({ token, info, isOwner }: GrammarCheckProps) {
  const [language, setLanguage] = useState("en-US");

  const [response, setResponse] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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

  const [grammarCheckData, setGrammarCheckData] = useState<TGrammarCheckData>({
    title: "",
    description: "",
    author: "",
    keywords: "",
    contributors: "",
    apluscontent: "",
    language: "English",
  });

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
      setIsLoading(true);
      const data = {
        ...grammarCheckData,
        keywords: grammarCheckData.keywords
          .split(/[\n,]+/)
          .map((keyword) => keyword.trim()),
      };

      console.log("book data", data);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/kdp/grammar-check",
        {
          ...data,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;

      const res = JSON.parse(result.gpt).response;
      // console.log(JSON.parse(result.gpt));
      console.log("result", res);

      setResponse(res);
      UpdateToolUsage(info._id, shopIds.GRAMMER_SPELL_CHECKER);
      UpdateUsage();

      // setRawResponse(resultString);
    } catch (error) {
      console.error("Error handling check:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGrammarCheckDataChange = (key: string, value: string) => {
    setGrammarCheckData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  async function UpdateUsage() {
    const { data, error } = await GetUsage(
      shopIds.GRAMMER_SPELL_CHECKER,
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
    // @ts-ignore
    handleGrammarCheckDataChange("title", data.originalData.title || "");
    // @ts-ignore
    handleGrammarCheckDataChange(
      "description",
      data.originalData.description || ""
    );
    // @ts-ignore
    handleGrammarCheckDataChange("author", data.originalData.author || "");
    // @ts-ignore
    handleGrammarCheckDataChange("keywords", data.originalData.keywords);
    // @ts-ignore
    handleGrammarCheckDataChange(
      "apluscontent",
      data.originalData.apluscontent || ""
    );
    // @ts-ignore
    handleGrammarCheckDataChange(
      "contributors",
      data.originalData.contributors || ""
    );

    setResponse(data.correctedData);
  }

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Grammar & Spell Checker",
        description:
          "Grammar and spell checker tool to help you write better and error-free content for your books.",
        keywords: "Grammar, Spell Checker, Grammar Checker, Spell Check",
      }}
      Title={<PageTitle title="Grammar & Spell Checker" />}
      Body={
        <div className="min-h-[60vh] max-w-[1400px] mx-auto mb-10 mt-0 px-5 kg:px-24">
          <div className="flex flex-col gap-3">
            {/* {!false && (
              <div className="samples-container">
                <h6>Here are some free results to checkout: </h6>
                <div className="sample-btn-container">
                  <Button
                    onClick={() =>
                      SetSampleResultData(GrammerCheckSampleData[0])
                    }
                  >
                    Sample 1
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() =>
                      SetSampleResultData(GrammerCheckSampleData[1])
                    }
                  >
                    Sample 2 <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() =>
                      SetSampleResultData(GrammerCheckSampleData[2])
                    }
                  >
                    Sample 3 <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            )} */}

            <div className="sp-container p-3 lg:p-6 mt-10 light-border border-2 rounded-2xl">
              <div className="grid grid-cols-2 mb-8">
                <h6 className="mt-2 text-[18px] md:text-[24px] font-bold w-full">
                  Your Data
                </h6>
                <h6 className="mt-2 text-[18px] md:text-[24px] font-bold w-full">
                  Suggested Changes
                </h6>
              </div>
              <div className="flex flex-col mt-4  gap-3">
                <Label className="text-label">Title</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    rows={2}
                    value={grammarCheckData.title}
                    onChange={(e) =>
                      handleGrammarCheckDataChange("title", e.target.value)
                    }
                    helperText={`${grammarCheckData.title.length}/${bookTitleLimit}`}
                    error={grammarCheckData.title.length === bookTitleLimit}
                  />
                  <TextViewComp
                    text={response?.title || ""}
                    height={80}
                    isChanged={grammarCheckData.title !== response?.title}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-4  gap-3">
                <Label className="text-label">Author Name</Label>

                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    rows={2}
                    value={grammarCheckData.author}
                    onChange={(e) =>
                      handleGrammarCheckDataChange("author", e.target.value)
                    }
                  />
                  <TextViewComp
                    text={response?.author || ""}
                    height={80}
                    isChanged={grammarCheckData.author !== response?.author}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4  gap-3">
                <Label className="text-label">Contributors</Label>
                <div className="grid grid-cols-2 gap-2">
                  <CustomTextArea
                    rows={2}
                    value={grammarCheckData.contributors}
                    onChange={(e) =>
                      handleGrammarCheckDataChange(
                        "contributors",
                        e.target.value
                      )
                    }
                  />
                  <TextViewComp
                    text={response?.contributors || ""}
                    height={80}
                    isChanged={
                      grammarCheckData.contributors !== response?.contributors
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-3">
                <Label className="text-label">Book Description</Label>
                <div className="grid grid grid-cols-2 gap-2 ">
                  <CustomTextArea
                    value={grammarCheckData.description}
                    rows={8}
                    onChange={(e) =>
                      handleGrammarCheckDataChange(
                        "description",
                        e.target.value
                      )
                    }
                    helperText={`${grammarCheckData.description.length}/${bookDescriptionLimit}`}
                    error={
                      grammarCheckData.description.length ===
                      bookDescriptionLimit
                    }
                  />
                  <TextViewComp
                    text={response?.description || ""}
                    height={216}
                    isChanged={
                      grammarCheckData.description !== response?.description
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-3">
                <Label className="text-label">A+ Content</Label>

                <div className="grid grid grid-cols-2 gap-2">
                  <CustomTextArea
                    value={grammarCheckData.apluscontent}
                    rows={4}
                    onChange={(e) =>
                      handleGrammarCheckDataChange(
                        "apluscontent",
                        e.target.value
                      )
                    }
                    helperText={`${grammarCheckData.apluscontent.length}/${aplusContentLimit}`}
                    error={
                      grammarCheckData.apluscontent.length > aplusContentLimit
                    }
                  />
                  <TextViewComp
                    text={response?.apluscontent || ""}
                    height={125}
                    isChanged={
                      grammarCheckData.apluscontent !== response?.apluscontent
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-3">
                <Label className="text-label">7 Backend Keywords</Label>
                <div className="grid  grid-cols-2 gap-2">
                  <CustomTextArea
                    rows={4}
                    value={grammarCheckData.keywords}
                    onChange={(e) =>
                      handleGrammarCheckDataChange("keywords", e.target.value)
                    }
                    helperText={`Each keyword should be less than ${eachKeywordLimit} characters`}
                    error={
                      grammarCheckData.keywords
                        .split(/[\n,]+/)
                        .some((keyword) => keyword.length > eachKeywordLimit) ||
                      grammarCheckData.keywords.split(/[\n,]+/).length > 7
                    }
                  />
                  <TextViewComp
                    text={response?.keywords?.join(", ") || ""}
                    height={125}
                    isChanged={
                      grammarCheckData.keywords !==
                      response?.keywords?.join(", ")
                    }
                  />
                </div>
              </div>

              <div className="w mt-5 mx-auto">
                <Loader
                  loading={isLoading}
                  ButtonComp={
                    <Button
                      className="mt-4 py-6 w-full font-bold"
                      onClick={handleCheck}
                    >
                      {isLoading ? "Checking..." : "Check Grammar"}
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
      }
    />
  );
}

export default GrammarCheck;

interface TextViewCompProps {
  text: string;
  height: number;
  isChanged: boolean;
}
const TextViewComp: React.FC<TextViewCompProps> = ({
  text,
  height,
  isChanged,
}) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="w-full my-2 ">
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "20px",
          background: "#e5daf1",
        }}
        className="w-full  p-1 h-full bg-gray-100 "
      >
        <div
          style={{
            overflowY: "auto",
          }}
          className=" w-full h-[95%] thin-scrollbar  p-2"
        >
          <h6 className="text-[16px]">{text}</h6>
        </div>
        <div className=""></div>
        <CopyIcon onClick={handleCopy} className="cursor-pointer ml-auto w-4" />
        <div className="flex justify-between">
          {!isChanged && (
            <div className="w-full text-left p-2 text-sm ">
              <h6 className="text-green-600 font-bold">
                No suggested changes.
              </h6>
            </div>
          )}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

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
      shopIds.GRAMMER_SPELL_CHECKER
    );

    return getProfile(context, {
      token: session.token,
      pageData: null,
      isOwner: isOwner, // This is a boolean value
    });
  }
  return getProfile(context, {
    token: null,
    pageData: null,
    isOwner: false,
  });
}
