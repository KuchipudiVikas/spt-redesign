import React, { useState, useEffect } from "react";
import Question, { TQuestion, ResponseType } from "./question";
import { FaHandSparkles } from "react-icons/fa";
import TUser from "@/models/user";
import request from "@/lib/api/interface";
import GetStarted from "./GetStarted";

// icons
import YoutubeIcon from "@/public/assets/onboarding/youtube.png";
import SearchIcon from "@/public/assets/onboarding/search.png";
import FriendIcon from "@/public/assets/onboarding/groups.png";
import NetworkIcon from "@/public/assets/onboarding/network.png";
import FbIcon from "@/public/assets/onboarding/fb.png";
import OtherIcon from "@/public/assets/onboarding/other.png";

import WavingOwl from "@/public/assets/onboarding/waving_owl.png";
import Image from "next/image";

import ResearchOwl from "@/public/assets/onboarding/owl researching.png";
import OwlPainting from "@/public/assets/onboarding/painting owl.png";
import OwlWriting from "@/public/assets/onboarding/owl with pen.png";

import EtsyIcon from "@/public/assets/onboarding/etsy.png";
import FbaIcon from "@/public/assets/onboarding/fba.png";
import KdpIcon from "@/public/assets/onboarding/kdp.png";
import MerchIcon from "@/public/assets/onboarding/merchbyamazon.png";
import CircularProgress from "@mui/material/CircularProgress";

import { Close } from "@mui/icons-material";

interface IndexProps {
  info: TUser;
}

const Index: React.FC<IndexProps> = ({ info }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [responses, setResponses] = useState<ResponseType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [otherText, setOtherText] = useState<string>("");
  const [isOtherSelected, setIsOtherSelected] = useState<{
    [key: number]: boolean;
  }>({});
  const [otherResponses, setOtherResponses] = useState([]);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const questions: TQuestion[] = [
    {
      question_id: 1,
      question: "How did you first hear about us / find us?",
      options: [
        { text: "Facebook Group", id: 1, icon: FbIcon.src },
        { text: "YouTube", id: 2, icon: YoutubeIcon.src },
        { text: "Social Media", id: 3, icon: NetworkIcon.src },
        { text: "Google Search", id: 4, icon: SearchIcon.src },
        { text: "Friend / Family", id: 21, icon: FriendIcon.src },
        { text: "Other", id: 5, icon: OtherIcon.src },
      ],
      type: "single",
    },
    {
      question_id: 2,
      question: "What are you going to use our tools MOSTLY for?",
      options: [
        { id: 6, text: "Amazon KDP", icon: KdpIcon.src },
        { text: "Merch by Amazon", id: 7, icon: MerchIcon.src },
        { text: "Amazon FBA", id: 8, icon: FbaIcon.src },
        { id: 9, text: "Etsy", icon: EtsyIcon.src },
        { text: "Other", id: 10, icon: OtherIcon.src },
      ],
      type: "single",
    },
    {
      question_id: 3,
      question: "How would you best describe yourself?",
      options: [
        { id: 11, text: "Beginner (No experience or just starting out)" },
        { id: 12, text: "Learner (Have been learning, little experience)" },
        { id: 13, text: "Experienced (Have experience and some results)" },
        { id: 14, text: "Expert (Lot of experience, good results)" },
      ],
      type: "single",
    },
    {
      question_id: 4,
      question: "What type of books are you planning on creating?",
      options: [
        { id: 15, text: "Novels" },
        { id: 16, text: "Children’s Books" },
        { id: 17, text: "Activity & Puzzle Books" },
        { id: 18, text: "Journals & Planners" },
        { id: 19, text: "Educational Books" },
        { id: 20, text: "Other" },
      ],
      type: "multi",
    },
  ];

  async function handleSubmit() {
    if (!isResponseValid()) {
      return alert("Please fill the question");
    }

    try {
      setLoading(true);
      const deduplicatedResponses = responses.map((response) => {
        if (Array.isArray(response.option)) {
          return {
            ...response,
            option: Array.from(new Set(response.option)),
          };
        } else {
          return {};
        }
      });

      const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;
      const url = base + "/api/onboarding/" + info._id;
      const body = {
        status: "submitted",
        responses: deduplicatedResponses,
        user_id: info._id,
      };

      const { data, error } = await request.post(url, body);
      if (error) {
        alert("there was error submitting the response" + error);
        return;
      }
      console.log("response data is", data);
      setOnboardingDone(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const isResponseValid = () => {
    const currentQuestionData = questions.find(
      (question) => question.question_id === currentQuestion
    );
    const currentResponse = responses.find(
      (response) => response.question_id === currentQuestion
    );

    if (!currentQuestionData || !currentResponse) {
      return false;
    }

    if (isOtherSelected[currentQuestion] && !otherResponses[currentQuestion]) {
      return false;
    }

    return true;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const currentImageSrc = (Question: number) => {
    if (Question == 1) {
      return ResearchOwl.src;
    }

    if (Question == 2) {
      return OwlWriting.src;
    }

    if (Question == 3) {
      return WavingOwl.src;
    }

    if (Question == 4) {
      return OwlPainting.src;
    }
  };

  const [imageSrc, setImageSrc] = useState(currentImageSrc(currentQuestion));
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(0);

    const timeoutId = setTimeout(() => {
      setImageSrc(currentImageSrc(currentQuestion));
      setOpacity(1);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [currentQuestion]);

  const isOnboardingSkippable =
    new Date(info.createdAt) < new Date("2024-10-22");

  const [skipLoading, setSkipLoading] = useState(false);

  async function SkipOnboarding() {
    if (!isOnboardingSkippable) {
      return;
    }

    try {
      setSkipLoading(true);
      const base = process.env.NEXT_PUBLIC_TEST_SERVER_URL;
      const url = base + "/api/onboarding/" + info._id;
      const body = {
        status: "skipped",
        user_id: info._id,
      };

      const { data, error } = await request.post(url, body);
      if (error) {
        alert("there was error skipping the onboarding" + error);
        return;
      }
      closeModal();
    } catch (error) {
    } finally {
      setSkipLoading(false);
    }
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      style={{
        zIndex: 999,
      }}
      className="fixed  inset-0 flex items-center p-4 justify-center bg-black bg-opacity-50"
    >
      <div
        className={`w-[850px] ${
          isOnboardingSkippable && !onboardingDone && "relative"
        } rounded-xl p-6 bg-white grid grid-cols-8 h-fit`}
      >
        {onboardingDone ? (
          <GetStarted handleClose={closeModal} />
        ) : (
          <>
            <div className="bg-white flex flex-col justify-between p-2 col-span-5 rounded">
              <div className="">
                <div className="flex w-full justify-between">
                  <h2 className="text-[22.6px] flex items-center gap-2 font-sans mb-4">
                    <FaHandSparkles
                      style={{
                        color: "#7449fb",
                      }}
                    />
                    Welcome! Let’s Get You Ready
                  </h2>
                  {isOnboardingSkippable && (
                    <button
                      className="absolute top-3 right-3 bg-transparent border-none cursor-pointer"
                      onClick={() => SkipOnboarding()}
                    >
                      {skipLoading ? <CircularProgress size={20} /> : <Close />}
                    </button>
                  )}
                </div>

                <div className="">
                  {questions
                    .filter(
                      (question) => question.question_id === currentQuestion
                    )
                    .map((question) => (
                      <Question
                        key={question.question_id}
                        question={question}
                        responses={responses}
                        setResponses={setResponses}
                        isOtherSelected={isOtherSelected}
                        setIsOtherSelected={setIsOtherSelected}
                        otherResponses={otherResponses}
                        setOtherResponses={setOtherResponses}
                        handleMoveNext={handleNextQuestion}
                      />
                    ))}
                </div>
              </div>
              {currentQuestion == 4 && (
                <button
                  className="mt-4 bg-[#7449fb] w-fit text-2xl rounded-xl mx-auto  text-white p-2 px-4 rounded"
                  onClick={() => handleSubmit()}
                >
                  {loading ? "Loading..." : "Finish"}
                </button>
              )}
            </div>
            <div className="col-span-3 flex justify-center items-center">
              <Image
                src={imageSrc}
                alt=""
                width={500}
                height={500}
                className="w-[180px] h-auto"
                style={{
                  opacity: opacity,
                  transition: "opacity 0.2s ease-in-out",
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
