import React from "react";
import Image from "next/image";

export type ResponseType = {
  question_id: number;
  option: number[];
};

type Option = {
  id: number;
  text: string;
  icon?: string;
};

export type TQuestion = {
  question_id: number;
  question: string;
  options: Option[];

  type: "single" | "multi";
};

type QuestionProps = {
  question: TQuestion;
  responses: ResponseType[];
  setResponses: React.Dispatch<React.SetStateAction<ResponseType[]>>;
  otherResponses: { [key: number]: string };
  setOtherResponses: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  isOtherSelected: { [key: number]: boolean };
  setIsOtherSelected: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  handleMoveNext: () => void;
};

const Question: React.FC<QuestionProps> = ({
  question,
  responses,
  setResponses,
  otherResponses,
  setOtherResponses,
  isOtherSelected,
  setIsOtherSelected,
  handleMoveNext,
}) => {
  const handleOptionChange = (
    question_id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOption = parseInt(event.target.value, 10);
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (response) => response.question_id === question_id
      );
      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex].option = [newOption];
        return updatedResponses;
      } else {
        return [...prevResponses, { question_id, option: [newOption] }];
      }
    });

    setTimeout(() => {
      handleMoveNext();
    }, 300);

    // if (newOption === "Other") {
    //   setIsOtherSelected((prev) => ({ ...prev, [question_id]: true }));
    // } else {
    //   setIsOtherSelected((prev) => ({ ...prev, [question_id]: false }));
    //   setOtherResponses((prev) => ({ ...prev, [question_id]: "" }));
    // }
  };

  const handleMultiOptionChange = (
    question_id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOption = parseInt(event.target.value, 10);
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (response) => response.question_id === question_id
      );
      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        const currentOptions = updatedResponses[existingResponseIndex].option;
        if (event.target.checked) {
          updatedResponses[existingResponseIndex].option = [
            ...currentOptions,
            newOption,
          ];
        } else {
          updatedResponses[existingResponseIndex].option =
            currentOptions.filter((option) => option !== newOption);
        }
        return updatedResponses;
      } else {
        return [...prevResponses, { question_id, option: [newOption] }];
      }
    });

    // if (newOption === "Other" && event.target.checked) {
    //   setIsOtherSelected((prev) => ({ ...prev, [question_id]: true }));
    // } else if (newOption === "Other" && !event.target.checked) {
    //   setIsOtherSelected((prev) => ({ ...prev, [question_id]: false }));
    //   setOtherResponses((prev) => ({ ...prev, [question_id]: "" }));
    // }
  };

  const isSelected = (optionId: number) => {
    const response = responses.find(
      (response) => response.question_id === question.question_id
    );
    if (question.type === "single") {
      return response?.option[0] === optionId;
    } else {
      return response?.option.includes(optionId);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-sans text-[18px] pb-5">{question.question}</h3>
      <div className="">
        {question.options.map((option, index) => (
          <div
            key={index}
            className="mb-2 flex items-center py-5 h-[65px] cursor-pointer"
            style={{
              border: "1px solid",
              borderColor: isSelected(option.id) ? "#7449fb" : "#ccc",
              borderWidth: isSelected(option.id) ? "2px" : "1px",
              padding: "12px",
              borderRadius: "10px",
            }}
            onClick={() => {
              const isSelectedOption = isSelected(option.id);
              const event = {
                target: {
                  value: option.id.toString(),
                  checked: !isSelectedOption,
                },
                stopPropagation: () => {},
              };
              question.type === "single"
                ? handleOptionChange(question.question_id, event as any)
                : handleMultiOptionChange(question.question_id, event as any);
            }}
          >
            <label
              className="flex font-sans text-[14.6px] gap-3 text-gray-700 cursor-pointer items-center"
              onClick={(e) => e.stopPropagation()} // Prevent click propagation
            >
              <input
                type={question.type === "single" ? "radio" : "checkbox"}
                name={`question_${question.question_id}`}
                value={option.id}
                checked={isSelected(option.id)}
                onChange={(event) => {
                  event.stopPropagation();
                  question.type === "single"
                    ? handleOptionChange(question.question_id, event)
                    : handleMultiOptionChange(question.question_id, event);
                }}
                className={`mr-2 ${question.type === "single" ? "hidden" : ""}`}
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
              {option.icon && (
                <Image
                  alt=""
                  src={option.icon}
                  width={100}
                  height={100}
                  className="w-[40px] h-auto"
                />
              )}
              {option.text}
            </label>
          </div>
        ))}
        {/* {isOtherSelected[question.question_id] && (
          <div className="mt-2">
            <input
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
              type="text"
              value={otherResponses[question.question_id] || ""}
              onChange={(event) =>
                handleOtherTextChange(question.question_id, event)
              }
              placeholder="Please specify"
              className="border border-gray-300 p-3.5 rounded w-full"
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Question;
