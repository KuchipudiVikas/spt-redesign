import axios from "axios";
let currentSurvey = "mandatoryUserSurveyFeb2024";
let postUrl = "https://go.selfpublishingtitans.com/api/v1/survey/create";
let checkUrl = `https://go.selfpublishingtitans.com/api/v1/survey/is-filled?name=${currentSurvey}`;

export const surveyService = {
  submitSurvey: async (responses, token) => {
    let responsesData = Object.keys(responses).map((key) => ({
      question: key,
      answer: responses[key],
    }));
    try {
      const res = await axios.post(
        postUrl,
        { survey_name: currentSurvey, responses: responsesData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      return true; // just to make sure the popup will close for now -- we can show the popup again later
    }
  },
  getIsAlreadySubmitted: async (token) => {
    try {
      const response = await axios.get(checkUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
      return true; // just to make sure the popup doesn't show up again if an error happens
    }
  },
};
