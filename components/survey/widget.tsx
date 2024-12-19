import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormbricksAPI } from "@formbricks/api";

const api = new FormbricksAPI({
  apiHost: "https://survey.selfpublishingtitans.com", // If you have self-hosted Formbricks, change this to your self hosted instance's URL
  environmentId: process.env.NEXT_PUBLIC_SURVEY_API_KEY, // Replace this with your Formbricks environment ID
});

export interface IFormbricksCustomPopupProps {
  surveyId: string;
  userId: string;
}

// get survey by id
// https://app.formbricks.com/api/v1/management/surveys/clusgqpml0000135cxet3y8vh
// HEADERS;
// x - api - key;
// ced9299405415cbaa83ce208a2519278;
const getSurveyById = async (surveyId: string) => {
  const response = await fetch(
    `https://survey.selfpublishingtitans.com/api/v1/management/surveys/${surveyId}`,
    {
      headers: {
        "x-api-key": "dfa05d7b281cfd440595d58239cdbf1c",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const FormbricksCustomPopup = ({
  surveyId,
  userId,
}: IFormbricksCustomPopupProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [responseId, setResponseId] = useState(null);
  const [freeText, setFreeText] = useState("");

  // get the formbricks survey
  // Create a Display

  useEffect(() => {
    api.client.display
      .create({
        surveyId: surveyId, // required
        userId: userId, // optional
        //   responseId: "<your-response-id>", // optional
      })
      .then((result) => {
        if (result.error) {
          console.error(result.error);
        }
        console.log(result.data.id);
        setResponseId(result.data.id);
        setIsOpen(true);
      });

    // get survey by id
    getSurveyById(surveyId).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="mt-6 inline-flex cursor-default items-center rounded-md border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"></div>
  );
};
