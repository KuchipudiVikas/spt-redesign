import React, { useState } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import Loader from "@/components/Common/Loader/Loading";
import axios from "axios";
import {
  aplusContentLimit,
  bookDescriptionLimit,
  bookTitleLimit,
  eachKeywordLimit,
} from "@/constants/guidelines";
import GetUsage from "@/lib/api/usage/index";
import { shopIds } from "@/data/shopData";
import { User } from "@/lib/ts/types/user";
import { Usage } from "@/lib/models/interfaces/authortools";
import Accounts from "@/lib/mw/Accounts";
import { AccountUtils } from "@/utils/retroVision";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { Button } from "@/components/ui/button";
import CustomTextArea from "@/components/BookListingTools/customTextArea";
import CustomInput from "@/components/BookListingTools/CustomInput";
import CustomSelect from "@/components/BookListingTools/CustomSelect";
import { BookType, TBookData, testData } from "@/constants/guidelines";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import Note from "@/components/BookListingTools/Note";
import PageTitle from "@/components/Common/PageTitle";

import { useEffect } from "react";
import {
  sampleResultDataGuidelines,
  TViolationDetail,
} from "../../constants/guidelines";
import { getSession } from "next-auth/react";

type TResponse = {
  isViolated: boolean;
  violations: TViolationDetail[] | null;
};

type TApiResponseItem = {
  response: TResponse;
};

type TApiResponse = TApiResponseItem[];

type TError = {
  type: any;
  fieldName: string;
  reason: string;
  part: string;
  severity: "Red" | "Yellow";
  violation: string;
};

interface IndexProps {
  info: User;
  token: string;
  isOwner: boolean;
}

const Index: React.FC<IndexProps> = ({ info, token, isOwner }) => {
  const [bookData, setBookData] = useState<TBookData>({
    title: "",
    description: "",
    author: "",
    keywords: "",
    apluscontent: "",
    bookType: "paperback",
    contributors: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<TError[] | null>([]);

  const [gp4Response, setGpt4Response] = useState<TApiResponse | null>(null);
  const handleBookDataChange = (key: string, value: string) => {
    setBookData((prev) => ({ ...prev, [key]: value }));
  };

  const [titleErrors, setTitleErrors] = useState<TError[] | undefined>(
    undefined
  );
  const [authorErrors, setAuthorErrors] = useState<TError[] | undefined>(
    undefined
  );

  const [contributorsErrors, setContributorsErrors] = useState<
    TError[] | undefined
  >(undefined);

  const [descriptionErrors, setDescriptionErrors] = useState<
    TError[] | undefined
  >(undefined);
  const [keywordsErrorss, setKeywordsErrorss] = useState<TError[] | undefined>(
    undefined
  );

  const [aplusContentErrors, setAPlusContentErrors] = useState<
    TError[] | undefined
  >(undefined);

  const [bookTypeErrors, setBookTypeErrors] = useState<TError[] | undefined>(
    undefined
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

  async function handleCheck() {
    if (!isOwner) {
      return alert("Please purchase a plan to use this feature");
    }

    setErrors([]);

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
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/kdp/guidelines",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      // Clear existing errors
      setErrors([]);
      UpdateToolUsage(info._id, shopIds.KDP_GUIDELINES_CHECKER);

      UpdateUsage();
      // Parse and handle responses
      const violations = result
        .map((item: string) => {
          const gpt4Response = JSON.parse(item);

          // Create an array for errors
          if (gpt4Response.isViolated) {
            return gpt4Response.violations.map(
              (violation: {
                fieldname: any;
                reason: any;
                violatedPart: any;
                severity: any;
                violation: any;
                type: any;
              }) => ({
                fieldName: violation.fieldname, // Use 'fieldname' from the violation
                reason: violation.reason,
                violatedPart: violation.violatedPart,
                severity: violation.severity,
                violation: violation.violation,
                type: violation.type,
              })
            );
          }
          return [];
        })
        .flat();

      // Set errors
      if (violations.length) {
        setErrors(violations);
      } else {
        alert("Book is compliant with KDP guidelines");
      }

      // const separatedResponses = separateResponses(result);

      // // Set responses
      // setResponse(separatedResponses.gptResponses);
      // setGpt4Response(separatedResponses.gpt4Responses);
      // setGpt4OgResponse(separatedResponses.gpt4OgResponses);

      // setResult(result); // Store the full result if needed
    } catch (error) {
      console.error("Error handling check:", error);
    } finally {
      setLoading(false);
    }
  }

  const initialBookData: TBookData = {
    title: "",
    description: "",
    author: "",
    keywords: "",
    apluscontent: "",
    bookType: "paperback",
  };

  useEffect(() => {
    // Check if there are any errors
    const findErrors = (fields: string[]) =>
      errors?.filter(
        (error) =>
          // @ts-ignore
          fields.includes(error.fieldName) || fields.includes(error.fieldname)
      );

    setTitleErrors(findErrors(["Book Title"]) || []);
    setAuthorErrors(findErrors(["Author Name"]) || []);
    setDescriptionErrors(findErrors(["Book Description", "Description"]) || []);
    setKeywordsErrorss(findErrors(["Keywords"]) || []);
    setContributorsErrors(findErrors(["Contributors"]) || []);
    setAPlusContentErrors(findErrors(["A+ Content"]) || []);
    setBookTypeErrors(findErrors(["Book Type"]) || []);
  }, [errors]);

  function SetSampleResultData(
    violations: TViolationDetail[],
    BookdData: TBookData
  ) {
    // @ts-ignore
    setErrors(violations);
    setBookData(BookdData);
  }

  async function UpdateUsage() {
    const { data, error } = await GetUsage(
      shopIds.KDP_GUIDELINES_CHECKER,
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

  return (
    <MainLayout
      meta={{
        title: "KDP Guidelines Checker",
        description: "Check if your book is compliant with KDP guidelines",
        keywords:
          "KDP Guidelines Checker, KDP Guidelines, KDP, Guidelines, Checker",
      }}
      info={info}
      Title={<PageTitle title="KDP Guidelines Checker" />}
      Body={
        <div className="comp-container mx-auto pb-10 w-full mb-10 mt-10  lg:px-24">
          <div className="  w-full flex mt-10 justify-center">
            {/* {!false && (
              <div className="samples-container">
                <h6>Here are some free results to checkout: </h6>
                <div className="sample-btn-container">
                  <Button
                    onClick={() =>
                      SetSampleResultData(
                        sampleResultDataGuidelines[0].violations,
                        sampleResultDataGuidelines[0].bookData
                      )
                    }
                  >
                    Sample 1
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() =>
                      SetSampleResultData(
                        sampleResultDataGuidelines[1].violations,
                        sampleResultDataGuidelines[1].bookData
                      )
                    }
                  >
                    Sample 2
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() =>
                      SetSampleResultData(
                        sampleResultDataGuidelines[2].violations,
                        sampleResultDataGuidelines[2].bookData
                      )
                    }
                  >
                    Sample 3
                    <ArrowRightIcon />
                  </Button>
                </div>
              </div>
            )} */}
            <div className="sp-container mx-4 border-2 w-full light-border p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className=" ">
                  <Label className="text-label ">Select Paper</Label>
                  <CustomSelect
                    value={bookData.bookType}
                    onChange={(e) =>
                      handleBookDataChange("bookType", e.target.value)
                    }
                    style={{
                      marginTop: "3px",
                      borderRadius: "300px",
                    }}
                    options={[
                      { value: "ebook", label: "Ebook" },
                      { value: "paperback", label: "Paperback" },
                    ]}
                    error={!!bookTypeErrors && bookTypeErrors.length > 0}
                    helperText={
                      bookTypeErrors && bookTypeErrors.length > 0
                        ? bookTypeErrors
                            .map((error) => `${error.reason}`)
                            .join(", ")
                        : undefined
                    }
                  />
                </div>
                <div className="lg:col-span-2">
                  <Label className="text-label">Write Title</Label>
                  <CustomInput
                    value={bookData.title}
                    onChange={(e) =>
                      handleBookDataChange("title", e.target.value)
                    }
                    helperText={
                      titleErrors && titleErrors.length > 0
                        ? titleErrors
                            .map(
                              // @ts-ignore
                              (error) =>
                                // @ts-ignore
                                `${error.violatedPart} - ${error.reason}`
                            )
                            .join(", ")
                        : `${bookData.title.length}/${bookTitleLimit}` ||
                          undefined
                    }
                    error={
                      bookData.title.length === bookTitleLimit ||
                      (!!titleErrors && titleErrors.length > 0)
                    }
                    severity={
                      titleErrors && titleErrors.length > 0
                        ? (titleErrors[0]?.severity.toLowerCase() as
                            | "red"
                            | "orange"
                            | "gray")
                        : "gray"
                    }
                  />
                </div>
                <div className="lg:w-fit w-full">
                  <Label className="text-label">Author Name</Label>

                  <CustomInput
                    value={bookData.author}
                    onChange={(e) =>
                      handleBookDataChange("author", e.target.value)
                    }
                    helperText={
                      (authorErrors &&
                        authorErrors.length > 0 &&
                        authorErrors
                          .map(
                            // @ts-ignore
                            (error) =>
                              // @ts-ignore
                              `${error.violatedPart} - ${error.type}`
                          )
                          .join(", ")) ||
                      undefined
                    }
                    error={!!authorErrors && authorErrors.length > 0}
                    severity={
                      authorErrors && authorErrors.length > 0
                        ? (authorErrors[0]?.severity.toLowerCase() as
                            | "red"
                            | "orange"
                            | "gray")
                        : "gray"
                    }
                  />
                </div>
                <div className="">
                  <Label className="text-label">Contributors</Label>

                  <CustomInput
                    value={bookData.contributors || ""}
                    onChange={(e) =>
                      handleBookDataChange("contributors", e.target.value)
                    }
                    helperText={
                      (contributorsErrors &&
                        contributorsErrors.length > 0 &&
                        contributorsErrors
                          .map(
                            // @ts-ignore
                            (error) =>
                              // @ts-ignore
                              `${error.violatedPart} - ${error.type}`
                          )
                          .join(", ")) ||
                      undefined
                    }
                    error={
                      !!contributorsErrors && contributorsErrors.length > 0
                    }
                    severity={
                      contributorsErrors && contributorsErrors.length > 0
                        ? (contributorsErrors[0]?.severity.toLowerCase() as
                            | "red"
                            | "orange"
                            | "gray")
                        : "gray"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row mt-9 gap-3">
                <div className="w-full">
                  <Label className="text-label ">Book Description</Label>
                  <CustomTextArea
                    value={bookData.description}
                    rows={4}
                    onChange={(e) =>
                      handleBookDataChange("description", e.target.value)
                    }
                    helperText={
                      descriptionErrors && descriptionErrors.length > 0
                        ? descriptionErrors
                            .map(
                              // @ts-ignore
                              (error) =>
                                // @ts-ignore
                                `${error.violatedPart} - ${error.type}`
                            )
                            .join(", ")
                        : `${bookData.description.length}/${bookDescriptionLimit}`
                    }
                    error={
                      bookData.description.length === bookDescriptionLimit ||
                      (!!descriptionErrors && descriptionErrors.length > 0)
                    }
                    severity={
                      descriptionErrors && descriptionErrors.length > 0
                        ? (descriptionErrors[0]?.severity.toLowerCase() as
                            | "red"
                            | "orange"
                            | "gray")
                        : "gray"
                    }
                  />
                </div>

                <div className="w-full">
                  <Label className="text-label ">A + Content</Label>

                  <CustomTextArea
                    value={bookData.apluscontent}
                    rows={4}
                    onChange={(e) =>
                      handleBookDataChange("apluscontent", e.target.value)
                    }
                    severity={
                      aplusContentErrors && aplusContentErrors.length > 0
                        ? (aplusContentErrors[0]?.severity.toLowerCase() as
                            | "red"
                            | "orange"
                            | "gray")
                        : "gray"
                    }
                    error={
                      bookData.apluscontent.length === aplusContentLimit ||
                      (!!aplusContentErrors && aplusContentErrors.length > 0)
                    }
                    helperText={
                      aplusContentErrors && aplusContentErrors.length > 0
                        ? aplusContentErrors
                            .map(
                              // @ts-ignore
                              (error) =>
                                // @ts-ignore
                                `${error.violatedPart} - ${error.type}`
                            )
                            .join(", ")
                        : `${bookData.apluscontent.length}/${aplusContentLimit}`
                    }
                  />
                </div>
              </div>

              <div className="">
                <Label className="text-label ">Keywords</Label>

                <CustomTextArea
                  rows={4}
                  value={bookData.keywords}
                  onChange={(e) =>
                    handleBookDataChange("keywords", e.target.value)
                  }
                  helperText={
                    keywordsErrorss && keywordsErrorss.length > 0
                      ? keywordsErrorss
                          // @ts-ignore
                          .map(
                            // @ts-ignore
                            (error) => `${error.violatedPart} - ${error.type}`
                          )
                          .join(", ")
                      : `Each keyword should be less than ${eachKeywordLimit} characters`
                  }
                  error={
                    bookData.keywords
                      .split(/[\n,]+/)
                      .some((keyword) => keyword.length > eachKeywordLimit) ||
                    bookData.keywords.split(/[\n,]+/).length > 7 ||
                    (!!keywordsErrorss && keywordsErrorss.length > 0)
                  }
                  severity={
                    keywordsErrorss && keywordsErrorss.length > 0
                      ? (keywordsErrorss[0]?.severity.toLowerCase() as
                          | "red"
                          | "orange"
                          | "gray")
                      : "gray"
                  }
                />
              </div>
              <div className="">
                <Loader
                  loading={loading}
                  ButtonComp={
                    <Button
                      className="mt-4 py-6 rounded-full font-bold w-full"
                      onClick={handleCheck}
                    >
                      {loading ? "Checking..." : "Check Trademark"}
                    </Button>
                  }
                />
                <h6 className="mt-1 mx-auto text-center w-full text-[#808080] text-[12px]">
                  {usage && ` ${usage.remainingUsage} / ${usage.totalUsage}`}
                </h6>
              </div>

              <Note />
            </div>
          </div>
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
      shopIds.KDP_GUIDELINES_CHECKER
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
