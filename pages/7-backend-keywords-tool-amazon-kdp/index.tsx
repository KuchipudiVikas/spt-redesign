import MainLayout, { getProfile } from "@/components/Layout";
import { getSession, GetSessionParams } from "next-auth/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { EScreenSize, useCustomDeviceSize } from "@/utils/useDeviceSize";
import { useSearchParams } from "next/navigation";
import { getResults } from "@/lib/7-backend-keywords/api";
import { useDispatch } from "react-redux";
import KeywordsTextFieldCard from "@/components/7-backend-keywords/KeywordsTextFieldCard";
import ScrollableKeywordList from "@/components/7-backend-keywords/ScrollableKeywordList";
import SelectedKeywords from "@/components/7-backend-keywords/SelectedKeywords";
import { EKeywordType } from "@/lib/models/enums/7-backend-keyword";
import { IKeyword } from "@/lib/models/interfaces/7-backend-keywords";
import { useRouter } from "next/router";
import { UpdateUsage } from "@/lib/api/usage";
import { shopIds } from "@/data/shopData";
import { useToast } from "@/hooks/use-toast";
import { GetServerSidePropsContext } from "next";
import Config from "@/components/7-backend-keywords/Config";
import BySptButton from "@/components/Common/BySptButton";
import ShadowButton from "@/components/Common/ShadowButton";
import YoutubeRoundedIcon from "@/public/assets/social/youtube_rounded.png";
import DocumentIcon from "@/public/assets/social/documents.png";
import BugIcon from "@/public/assets/social/virus.png";

const BackendFilters = {
  ExcludedList: "excluded_list",
};

export default function SevenBackendKeyword({ token, info, pageData }) {
  const searchParams = useSearchParams();
  const { size } = useCustomDeviceSize();
  const router = useRouter();
  // check query params and set the state
  let hostnameQ = searchParams.get("domain");
  let searchedTextQ = searchParams.get("keyword");
  let productTitleQ = searchParams.get("title");
  if (hostnameQ && searchParams) {
    hostnameQ = hostnameQ.replace("www.", "");
    searchedTextQ = searchedTextQ.replace("www.", "");
  }
  const [searchedText, setSearchedText] = useState(searchedTextQ || "");
  const [excludedWordsSentence, setExcludedWordsSentence] = useState(
    productTitleQ || ""
  );
  const [hostname, setHostname] = useState(hostnameQ || "amazon.com");
  const [mainKeywords, setMainKeywords] = useState([]);
  const [withoutMainKeywords, setWithoutMainKeywords] = useState([]);
  const [phraseNotUsedInTitle, setPhraseNotUsedInTitle] = useState([]);
  const [singleWordsNotUsedInTitle, setSingleWordsNotUsedInTitle] = useState(
    []
  );

  const { toast } = useToast();

  const [responseData, setResponseData] = useState(null);
  const [selectedKeyword1, setSelectedKeyword1] = useState(null);
  const [selectedKeyword2, setSelectedKeyword2] = useState(null);
  const [selectedKeyword3, setSelectedKeyword3] = useState(null);
  const [selectedKeyword4, setSelectedKeyword4] = useState(null);
  const [selectedKeyword5, setSelectedKeyword5] = useState(null);
  const [selectedKeyword6, setSelectedKeyword6] = useState(null);
  const [selectedKeyword7, setSelectedKeyword7] = useState(null);

  const [filters, setFilters] = useState([]);
  const [backendFilters, setBackendFilters] = useState<string[]>([
    BackendFilters.ExcludedList,
  ]);
  const [backendKeyword2, setBackendKeyword2] = useState([]);
  const [backendKeyword3, setBackendKeyword3] = useState([]);
  const [chatGPTKeywords1, setChatGPTKeywords1] = useState([]);
  const [chatGPTKeywords2, setChatGPTKeywords2] = useState([]);
  const [chatGPTKeywords4, setChatGPTKeywords4] = useState([]);
  const [chatGPTKeywords5, setChatGPTKeywords5] = useState([]);
  const [chatGPTKeywords7, setChatGPTKeywords7] = useState([]);
  // single_words_1, single_words_2
  const [singleWords1, setSingleWords1] = useState([]);

  // titans_pro_single_words_1
  const [titansProSingleWords1, setTitansProSingleWords1] = useState([]);

  // restSingleWords
  const [restSingleWords, setRestSingleWords] = useState([]);
  const [extendedWords, setExtendedWords] = useState([]);

  const [isDuplicate, setIsDuplicate] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const optionsStateList = [
    { option: chatGPTKeywords1, setOption: setChatGPTKeywords1 },
    { option: chatGPTKeywords2, setOption: setChatGPTKeywords2 },
    { option: singleWords1, setOption: setSingleWords1 },
    { option: backendKeyword2, setOption: setBackendKeyword2 },
    { option: backendKeyword3, setOption: setBackendKeyword3 },
    { option: chatGPTKeywords4, setOption: setChatGPTKeywords4 },
    { option: chatGPTKeywords5, setOption: setChatGPTKeywords5 },
  ];

  function detectWindowSize() {
    const _isMobile = window.matchMedia("(max-width: 570px)").matches;
    setIsMobile(_isMobile);
  }

  function updateEqualKeyword(singleWord: IKeyword, newKeyword: IKeyword) {
    if (singleWord.keyword === selectedKeyword1.keyword) {
      setSelectedKeyword1(newKeyword);
    } else if (singleWord.keyword === selectedKeyword2.keyword) {
      setSelectedKeyword2(newKeyword);
    } else if (singleWord.keyword === selectedKeyword3.keyword) {
      setSelectedKeyword3(newKeyword);
    } else if (singleWord.keyword === selectedKeyword4.keyword) {
      setSelectedKeyword4(newKeyword);
    } else if (singleWord.keyword === selectedKeyword5.keyword) {
      setSelectedKeyword5(newKeyword);
    } else if (singleWord.keyword === selectedKeyword6.keyword) {
      setSelectedKeyword6(newKeyword);
    } else if (singleWord.keyword === selectedKeyword7.keyword) {
      setSelectedKeyword7(newKeyword);
    }
  }

  // add single words upto 50 characters
  const addSingleWord = (keyword: string, index: number, optionIdx: number) => {
    // check if there is any empty slot
    const singleWords = [
      selectedKeyword1,
      selectedKeyword2,
      selectedKeyword3,
      selectedKeyword4,
      selectedKeyword5,
      selectedKeyword6,
      selectedKeyword7,
    ];

    // check if there is any keyword type single and character length is less than 50
    const singleWord = singleWords.find(
      (k) => k && k.type === "single" && k.keyword.length + keyword.length < 50
    );

    if (singleWord) {
      // if the keyword is existing in the single word then remove it
      if (singleWord.keyword.includes(keyword)) {
        const newKeyword: IKeyword = {
          keyword: singleWord.keyword.replace(keyword, "").trim(),
          type: EKeywordType.Single,
          isSelected: true,
        };
        if (newKeyword.keyword === "") {
          updateEqualKeyword(singleWord, null);
        } else {
          updateEqualKeyword(singleWord, newKeyword);
        }
        updateSelectedKeywordStatus(optionIdx, false, index);
        return;
      }
      // add word to single word
      const newKeyword: IKeyword = {
        keyword: singleWord.keyword + " " + keyword,
        type: EKeywordType.Single,
        isSelected: true,
      };
      updateEqualKeyword(singleWord, newKeyword);
      updateSelectedKeywordStatus(optionIdx, true, index);
      return;
    }

    const emptySlot = singleWords.findIndex((k) => k === null);

    // TODO:: ADD THIS 19077-404
    if (emptySlot === -1) {
      toast({
        title: "Limit reached",
        description: "You can only select 7 keywords",
      });

      return;
    }

    const keywordObj: IKeyword = {
      keyword: keyword,
      type: EKeywordType.Single,
      isSelected: true,
    };

    // add single word to empty slot
    if (emptySlot === 0) {
      setSelectedKeyword1(keywordObj);
    } else if (emptySlot === 1) {
      setSelectedKeyword2(keywordObj);
    } else if (emptySlot === 2) {
      setSelectedKeyword3(keywordObj);
    } else if (emptySlot === 3) {
      setSelectedKeyword4(keywordObj);
    } else if (emptySlot === 4) {
      setSelectedKeyword5(keywordObj);
    } else if (emptySlot === 5) {
      setSelectedKeyword6(keywordObj);
    } else if (emptySlot === 6) {
      setSelectedKeyword7(keywordObj);
    }
    updateSelectedKeywordStatus(optionIdx, true, index);
  };

  const optionIdxDict = {
    backendKeyword2: 2,
    backendKeyword3: 3,
    chatGPTKeywords1: 4,
    chatGPTKeywords2: 5,
    chatGPTKeywords5: 8,
    chatGPTKeywords4: 7,
    chatGPTKeywords7: 9,
    singleWords1: 10,
    titansProSingleWords1: 12,
    mainKeywords: 14,

    withoutMainKeywords: 15,
    singleWordsNotUsedInTitle: 16,
    restSingleWords: 17,
  };

  const setDataByOptionIndex = (optionIdx: number, data: IKeyword[]) => {
    switch (optionIdx) {
      case 2:
        setBackendKeyword2(data);
        break;
      case 3:
        setBackendKeyword3(data);
        break;
      case 4:
        setChatGPTKeywords1(data);
        break;
      case 5:
        setChatGPTKeywords2(data);
        break;
      case 8:
        setChatGPTKeywords5(data);
        break;
      case 7:
        setChatGPTKeywords4(data);
        break;
      case 9:
        setChatGPTKeywords7(data);
        break;
      case 10:
        setSingleWords1(data);
        break;
      case 12:
        setTitansProSingleWords1(data);
        break;
      case 14:
        setMainKeywords(data);
        break;
      case 15:
        setWithoutMainKeywords(data);
        break;
      case 16:
        setSingleWordsNotUsedInTitle(data);
        break;
      case 17:
        setRestSingleWords(data);
        break;
      default:
        break;
    }
  };

  const getDataByOptionIndex = (optionIdx: number) => {
    switch (optionIdx) {
      case 2:
        return backendKeyword2;
      case 3:
        return backendKeyword3;
      case 4:
        return chatGPTKeywords1;
      case 5:
        return chatGPTKeywords2;
      case 8:
        return chatGPTKeywords5;
      case 7:
        return chatGPTKeywords4;
      case 9:
        return chatGPTKeywords7;
      case 10:
        return singleWords1;
      case 12:
        return titansProSingleWords1;
      case 14:
        return mainKeywords;
      case 15:
        return withoutMainKeywords;
      case 16:
        return singleWordsNotUsedInTitle;
      case 17:
        return restSingleWords;
      default:
        break;
    }
  };

  const updateSelectedKeywordStatus = (
    optionIdx: number,
    isSelected: boolean,
    index: number
  ) => {
    const data = getDataByOptionIndex(optionIdx);
    const newData = data.map((k, i) => {
      if (i === index) {
        return {
          ...k,
          isSelected: isSelected,
        };
      }
      return k;
    });
    setDataByOptionIndex(optionIdx, newData);
  };

  const updateAllSelectedKeywordStatus = (
    optionIdx: number,
    isSelected: boolean
  ) => {
    const data = getDataByOptionIndex(optionIdx);
    const newData = data.map((k) => {
      return {
        ...k,
        isSelected: isSelected,
      };
    });
    setDataByOptionIndex(optionIdx, newData);
  };

  // add keywords to selected keywords upto 7 and no duplicates
  const addOrRemove = (keyword: string, index: number, optionIdx: number) => {
    // is already selected
    const keywords = [
      selectedKeyword1,
      selectedKeyword2,
      selectedKeyword3,
      selectedKeyword4,
      selectedKeyword5,
      selectedKeyword6,
      selectedKeyword7,
    ];
    const isAllFilled = keywords.every((k) => k !== null);
    if (isAllFilled && !keywords.find((k) => k?.keyword === keyword)) {
      toast({
        variant: "destructive",
        title: "Limit reached",
        description: "You can only select 7 keywords",
      });

      return;
    }

    if (keywords.find((k) => k?.keyword === keyword)) {
      // remove keyword
      if (selectedKeyword1?.keyword === keyword) {
        setSelectedKeyword1(null);
      } else if (selectedKeyword2?.keyword === keyword) {
        setSelectedKeyword2(null);
      } else if (selectedKeyword3?.keyword === keyword) {
        setSelectedKeyword3(null);
      } else if (selectedKeyword4?.keyword === keyword) {
        setSelectedKeyword4(null);
      } else if (selectedKeyword5?.keyword === keyword) {
        setSelectedKeyword5(null);
      } else if (selectedKeyword6?.keyword === keyword) {
        setSelectedKeyword6(null);
      } else if (selectedKeyword7?.keyword === keyword) {
        setSelectedKeyword7(null);
      }
      updateSelectedKeywordStatus(optionIdx, false, index);
      return;
    }

    if (selectedKeyword1 === null) {
      setSelectedKeyword1({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword2 === null) {
      setSelectedKeyword2({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword3 === null) {
      setSelectedKeyword3({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword4 === null) {
      setSelectedKeyword4({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword5 === null) {
      setSelectedKeyword5({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword6 === null) {
      setSelectedKeyword6({
        keyword: keyword,
        type: "multiple",
      });
    } else if (selectedKeyword7 === null) {
      setSelectedKeyword7({
        keyword: keyword,
        type: "multiple",
      });
    }

    updateSelectedKeywordStatus(optionIdx, true, index);
  };

  // remove keyword from selected keywords
  const removeKeyword = (keyword) => {
    // setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));

    // // add placeholders
    // let placeholders = [];
    // // fill with placeholders
    // for (let i = selectedKeywords.length; i < 7; i++) {
    //   placeholders.push("");
    // }
    // setSelectedKeywords([...selectedKeywords, ...placeholders]);

    // remove keyword
    if (selectedKeyword1 === keyword) {
      setSelectedKeyword1(null);
    } else if (selectedKeyword2 === keyword) {
      setSelectedKeyword2(null);
    } else if (selectedKeyword3 === keyword) {
      setSelectedKeyword3(null);
    } else if (selectedKeyword4 === keyword) {
      setSelectedKeyword4(null);
    } else if (selectedKeyword5 === keyword) {
      setSelectedKeyword5(null);
    } else if (selectedKeyword6 === keyword) {
      setSelectedKeyword6(null);
    } else if (selectedKeyword7 === keyword) {
      setSelectedKeyword7(null);
    }
  };

  useEffect(() => {
    detectWindowSize();

    window.onresize = detectWindowSize;

    return () => {
      window.onresize = null;
    };
  }, []);

  const resetSelectedKeywords = () => {
    setSelectedKeyword1(null);
    setSelectedKeyword2(null);
    setSelectedKeyword3(null);
    setSelectedKeyword4(null);
    setSelectedKeyword5(null);
    setSelectedKeyword6(null);
    setSelectedKeyword7(null);

    setResponseData(null);
    setMainKeywords([]);
    setWithoutMainKeywords([]);
    setPhraseNotUsedInTitle([]);
    setSingleWordsNotUsedInTitle([]);
    setBackendKeyword2([]);
    setBackendKeyword3([]);
    setSingleWords1([]);
    setChatGPTKeywords1([]);
    setChatGPTKeywords2([]);
    setChatGPTKeywords4([]);
    setChatGPTKeywords5([]);
    setChatGPTKeywords7([]);
    setTitansProSingleWords1([]);
    setRestSingleWords([]);
    setExtendedWords([]);
  };

  const setSelectedKeywordByIndex = (index: number, keyword: IKeyword) => {
    switch (index) {
      case 0:
        setSelectedKeyword1(keyword);
        break;
      case 1:
        setSelectedKeyword2(keyword);
        break;
      case 2:
        setSelectedKeyword3(keyword);
        break;
      case 3:
        setSelectedKeyword4(keyword);
        break;
      case 4:
        setSelectedKeyword5(keyword);
        break;
      case 5:
        setSelectedKeyword6(keyword);
        break;
      case 6:
        setSelectedKeyword7(keyword);
        break;
      default:
        break;
    }
  };

  const keywordsToObj = (
    keywords: string[],
    keywordType: EKeywordType
  ): IKeyword[] => {
    return keywords.map((keyword: string) => {
      return {
        keyword: keyword,
        isSelected: false,
        type: keywordType,
      };
    });
  };

  const updatedKeywordsToObj = (
    keywords: string[],
    existingState
  ): IKeyword[] => {
    return keywords.map((keyword: string, index) => {
      return {
        keyword: keyword,
        isSelected: existingState[index]?.isSelected || false,
        type: existingState[index]?.type || EKeywordType.Multiple,
      };
    });
  };

  const selectOrRemoveAll = (optionIdx: number) => {
    const data = getDataByOptionIndex(optionIdx);
    const isAllSelected = data.every((k) => k.isSelected);
    if (isAllSelected) {
      data.forEach((k, i) => {
        setSelectedKeywordByIndex(i, null);
      });
      updateAllSelectedKeywordStatus(optionIdx, false);
      return;
    }

    data.forEach((k, i) => {
      setSelectedKeywordByIndex(i, k);
    });
    updateAllSelectedKeywordStatus(optionIdx, true);
  };

  interface IGetWordListToSentence {
    existingSentence: string;
    wordList: string[];
    staringIdx: number;
    numberOfChars: number;
  }

  const getWordListToSentence = ({
    existingSentence,
    wordList,
    staringIdx,
    numberOfChars,
  }: IGetWordListToSentence) => {
    let sentence = "";
    for (let i = staringIdx; i < wordList.length; i++) {
      if (sentence.length + wordList[i].length + 1 > numberOfChars) {
        break;
      }
      // ignore the word if it is already in the sentence
      if (
        existingSentence.split(" ").includes(wordList[i]) ||
        wordList[i] === "" ||
        wordList[i] === " "
      ) {
        continue;
      }
      sentence += wordList[i] + " ";
    }
    return sentence.trim();
  };

  const getExcludeWords = (options: IOptions): IOptions => {
    let data: IOptions = {
      chatGPTKeywords1: [],
      chatGPTKeywords2: [],
      singleWords1: [],
      backendKeyword2: [],
      backendKeyword3: [],
      chatGPTKeywords4: [],
      chatGPTKeywords5: [],
      mainKeywords: [],
      withoutMainKeywords: [],
      singleWordsNotUsedInTitle: [],
      restSingleWords: [],
    };

    for (let key in options) {
      let newOption = options[key].map((k) => {
        // split the keyword into words
        let words = k.keyword.split(" ");
        // remove the excluded words
        words = words.filter(
          (w) => !excludedWordsSentence.split(" ").includes(w)
        );
        // join the words
        return {
          keyword: words.join(" "),
          isSelected: k.isSelected,
          type: k.type,
        };
      });
      data[key] = newOption;
    }

    return data;
  };

  const excludeWords = (excludedWords) => {
    optionsStateList.forEach((opt) => {
      let newOption = opt.option.map((k) => {
        // split the keyword into words
        let words = k.keyword.split(" ");
        // remove the excluded words
        words = words.filter((w) => !excludedWords.includes(w));
        // join the words
        return {
          keyword: words.join(" "),
          isSelected: k.isSelected,
          type: k.type,
        };
      });
      opt.setOption(newOption);
    });
  };

  interface IOptions {
    chatGPTKeywords1: IKeyword[];
    chatGPTKeywords2: IKeyword[];
    singleWords1: IKeyword[];
    backendKeyword2: IKeyword[];
    backendKeyword3: IKeyword[];
    chatGPTKeywords4: IKeyword[];
    chatGPTKeywords5: IKeyword[];
    mainKeywords: IKeyword[];
    withoutMainKeywords: IKeyword[];
    singleWordsNotUsedInTitle: IKeyword[];
    restSingleWords: IKeyword[];
  }

  const getExtendedKeywords = (optionsList: IOptions): IOptions => {
    let data: IOptions = {
      chatGPTKeywords1: [],
      chatGPTKeywords2: [],
      singleWords1: [],
      backendKeyword2: [],
      backendKeyword3: [],
      chatGPTKeywords4: [],
      chatGPTKeywords5: [],
      mainKeywords: [],
      withoutMainKeywords: [],
      singleWordsNotUsedInTitle: [],
      restSingleWords: [],
    };

    for (let key in optionsList) {
      let extendedWordsCounter = 0;
      let newOption = optionsList[key].map((k) => {
        if (k.keyword.length >= 50) {
          return k;
        }
        const extendedSentence = getWordListToSentence({
          existingSentence: k.keyword,
          wordList: extendedWords,
          staringIdx: extendedWordsCounter,
          numberOfChars: 50 - k.keyword.length,
        });
        extendedWordsCounter += extendedSentence.split(" ").length;
        return {
          keyword: k.keyword + " " + extendedSentence,
          isSelected: k.isSelected,
          type: k.type,
        };
      });
      data[key] = newOption;
    }

    return data;
  };

  const removeDuplicateWords = (optionsList: IOptions): IOptions => {
    let data: IOptions = {
      chatGPTKeywords1: [],
      chatGPTKeywords2: [],
      singleWords1: [],
      backendKeyword2: [],
      backendKeyword3: [],
      chatGPTKeywords4: [],
      chatGPTKeywords5: [],
      mainKeywords: [],
      withoutMainKeywords: [],
      singleWordsNotUsedInTitle: [],
      restSingleWords: [],
    };

    // let allKeywords = [];

    for (let key in optionsList) {
      let newOption = optionsList[key].map((k) => {
        let words = k.keyword.split(" ");
        let uniqueWords = [...new Set(words)];

        // let finalWords = [];
        // for(let word of uniqueWords) {
        //   if (!allKeywords.includes(word)) {
        //     finalWords.push(word);
        //   }
        // }
        // allKeywords = [...allKeywords, ...finalWords];

        return {
          keyword: uniqueWords.join(" "),
          isSelected: k.isSelected,
          type: k.type,
        };
      });
      data[key] = newOption;
    }

    return data;
  };

  const setData = (data) => {
    if (!data) {
      return;
    }
    const processedData = data.processed_data;
    if (processedData.main_keywords) {
      setMainKeywords(
        keywordsToObj(processedData.main_keywords, EKeywordType.Multiple)
      );
    }
    if (processedData.without_main_keywords) {
      setWithoutMainKeywords(
        keywordsToObj(
          processedData.without_main_keywords,
          EKeywordType.Multiple
        )
      );
    }
    if (processedData.phrase_not_used_in_title) {
      setPhraseNotUsedInTitle(
        keywordsToObj(
          processedData.phrase_not_used_in_title,
          EKeywordType.Multiple
        )
      );
    }
    if (processedData.single_words_not_used_in_title) {
      setSingleWordsNotUsedInTitle(
        keywordsToObj(
          processedData.single_words_not_used_in_title,
          EKeywordType.Single
        )
      );
    }

    if (processedData.backend_keywords_2) {
      setBackendKeyword2(
        keywordsToObj(processedData.backend_keywords_2, EKeywordType.Multiple)
      );
    }

    if (processedData.backend_keywords_3) {
      setBackendKeyword3(
        keywordsToObj(processedData.backend_keywords_3, EKeywordType.Multiple)
      );
    }
    if (processedData.single_words_1) {
      setSingleWords1(
        keywordsToObj(processedData.single_words_1, EKeywordType.Multiple)
      );
    }

    if (data.chat_gpt_response_1) {
      setChatGPTKeywords1(
        keywordsToObj(data.chat_gpt_response_1, EKeywordType.Multiple)
      );
    }
    if (data.chat_gpt_response_2) {
      setChatGPTKeywords2(
        keywordsToObj(data.chat_gpt_response_2, EKeywordType.Multiple)
      );
    }

    if (data.chat_gpt_response_4) {
      setChatGPTKeywords4(
        keywordsToObj(data.chat_gpt_response_4, EKeywordType.Multiple)
      );
    }
    if (data.chat_gpt_response_5) {
      setChatGPTKeywords5(
        keywordsToObj(data.chat_gpt_response_5, EKeywordType.Multiple)
      );
    }

    if (data.chat_gpt_response_7) {
      setChatGPTKeywords7(
        keywordsToObj(data.chat_gpt_response_7, EKeywordType.Multiple)
      );
    }
    if (data.titans_pro_single_words_1) {
      setTitansProSingleWords1(
        keywordsToObj(data.titans_pro_single_words_1, EKeywordType.Multiple)
      );
    }
    if (data.rest_single_words) {
      setRestSingleWords(
        keywordsToObj(data.rest_single_words, EKeywordType.Single)
      );
    }
    if (data.extended_words) {
      setExtendedWords(data.extended_words);
    }
  };

  const getAndSetResults = async () => {
    setLoading(true);
    resetSelectedKeywords();

    try {
      const res = await getResults({
        domain: hostname,
        keyword: searchedText,
        title: excludedWordsSentence,
        filters: backendFilters,
        token: token,
      });
      UpdateUsage(info._id, shopIds.BACKEND_KW_TOOL);
      if (res.data) {
        setResponseData(res.data);
        setData(res.data);
        if (filters.includes("exclude_keyword_search_term")) {
          excludeWords(excludedWordsSentence.split(" "));
        }
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data) {
        // dispatch(
        //   openSnackBar({
        //     severity: "error",
        //     timeout: 2000,
        //     title: "Error",
        //     message: error.response.data.error,
        //   })
        // );

        toast({
          title: "Error",
          description: error.response.data.error,
        });

        if (error.response.data.error === "user not paid") {
          alert("Please pay to use this tool.");
          // redirect to payment page
          router.push("/shop/7-backend-keywords-tool-amazon-kdp");
        }
      } else {
        // dispatch(
        //   openSnackBar({
        //     severity: "error",
        //     timeout: 2000,
        //     title: "Error",
        //     message: "Something went wrong",
        //   })
        // );

        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchedText && hostname) {
      getAndSetResults();
    }
  }, [hostname, backendFilters]);

  const filteredOptions = (): IOptions => {
    let data: IOptions = {
      chatGPTKeywords1: chatGPTKeywords1,
      chatGPTKeywords2: chatGPTKeywords2,
      singleWords1: singleWords1,
      backendKeyword2: backendKeyword2,
      backendKeyword3: backendKeyword3,
      chatGPTKeywords4: chatGPTKeywords4,
      chatGPTKeywords5: chatGPTKeywords5,
      mainKeywords: mainKeywords,
      withoutMainKeywords: withoutMainKeywords,
      singleWordsNotUsedInTitle: singleWordsNotUsedInTitle,
      restSingleWords: restSingleWords,
    };

    if (filters.includes("extended")) {
      data = getExtendedKeywords(data);
    }

    if (filters.includes("exclude_keyword_search_term")) {
      data = getExcludeWords(data);
    }

    if (isDuplicate) {
      data = removeDuplicateWords(data);
    }

    return data;
  };

  return (
    <MainLayout
      info={info}
      meta={{
        title: "7 Backend Keywords Tool for KDP",
        description: "7 Backend Keywords Tool for KDP",
        keywords: "7 Backend Keywords Tool for KDP",
      }}
      Title={
        <>
          <div className="flex my-10   flex-col items-center">
            <h1 className="text-[45px] mt-[20px] font-jsans flex justify-center items-center gap-3 mx-auto  font-extrabold text-center text-gray-900 sm:text-4xl">
              7 Backend Keywords Tool for KDP{" "}
            </h1>
            <BySptButton />

            <div className="flex mt-3 font-bold mb-7 gap-4">
              <ShadowButton
                imageSrc={YoutubeRoundedIcon.src}
                text="Watch Tutorial"
              />
              <ShadowButton imageSrc={DocumentIcon.src} text="KDP Guidelines" />
              <ShadowButton
                imageSrc={BugIcon.src}
                text="Feature Requests / Bug Report"
              />
            </div>
          </div>
        </>
      }
      Body={
        <Fragment>
          <main className="min-h-screen comp-container">
            <section className=" mt-10  mx-4">
              <Config
                filters={filters}
                setExcludedWordsSentence={setExcludedWordsSentence}
                excludedWordsSentence={excludedWordsSentence}
                hostname={hostname}
                setHostname={setHostname}
                searchedText={searchedText}
                setSearchedText={setSearchedText}
                getAndSetResults={getAndSetResults}
                setFilters={setFilters}
                IsDuplicate={isDuplicate}
                setIsDuplicate={setIsDuplicate}
                loading={loading}
              />
            </section>

            <section className="m-4 mt-16">
              <SelectedKeywords
                selectedKeyword1={selectedKeyword1}
                selectedKeyword2={selectedKeyword2}
                selectedKeyword3={selectedKeyword3}
                selectedKeyword4={selectedKeyword4}
                selectedKeyword5={selectedKeyword5}
                selectedKeyword6={selectedKeyword6}
                selectedKeyword7={selectedKeyword7}
                setSelectedKeyword1={setSelectedKeyword1}
                setSelectedKeyword2={setSelectedKeyword2}
                setSelectedKeyword3={setSelectedKeyword3}
                setSelectedKeyword4={setSelectedKeyword4}
                setSelectedKeyword5={setSelectedKeyword5}
                setSelectedKeyword6={setSelectedKeyword6}
                setSelectedKeyword7={setSelectedKeyword7}
                title="Selected Keywords"
                reset={resetSelectedKeywords}
                removeKeyword={removeKeyword}
              />
              <div className="h-2 " />

              <div className="flex flex-col gap-2 mt-2">
                <KeywordsTextFieldCard
                  keywords={filteredOptions().chatGPTKeywords1}
                  subTitle={
                    'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ]. I am working on filling in the seven allowed keyword slots for my Amazon listing. Each slot can be 50 characters long maximum. Based on the keywords and competitor titles I give you, generate seven keywords or short phrases to go into each of the 7 keyword slots with the following criteria: “Combine keywords in the most logical order.” Keep an eye on the character limit for each slot. \n amazon suggestions: %s \n titles: %s'
                  }
                  title="Option 1" // option 4
                  addOrRemove={addOrRemove}
                  optionIndex={4}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().chatGPTKeywords2}
                  subTitle={
                    'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ], Use up to seven keywords or short phrases. Keep an eye on the character limit in the text field \n amazon suggestions: %s \n titles: %s'
                  }
                  title="Option 2" // option 5
                  addOrRemove={addOrRemove}
                  optionIndex={5}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().singleWords1}
                  subTitle={"Single Words 1"}
                  title="Option 3" // option 10
                  addOrRemove={addOrRemove}
                  optionIndex={10}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().backendKeyword2}
                  subTitle={"New Non-Chat gpt 1 (Suggestions + Titles)"}
                  title="Option 4" // option 3  (new temp)
                  addOrRemove={addOrRemove}
                  optionIndex={3}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().backendKeyword3}
                  subTitle={"New Non-Chat gpt 2 (Titles + Suggestions)"}
                  title="Option 5" // option 3
                  addOrRemove={addOrRemove}
                  optionIndex={3}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().chatGPTKeywords4}
                  subTitle={
                    'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ], Use up to seven keywords or short phrases. Keep an eye on the character limit in the text field \n amazon suggestions: %s \n titles: %s'
                  }
                  title="Option 6" // option 7
                  addOrRemove={addOrRemove}
                  optionIndex={7}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                <KeywordsTextFieldCard
                  keywords={filteredOptions().chatGPTKeywords5}
                  subTitle={
                    'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ], What else can someone type in to Amazon search bar and still get the same results as if he searched for “%s”, but without using those words \n amazon suggestions: %s \n titles: %s'
                  }
                  title="Option 7" // option 8
                  addOrRemove={addOrRemove}
                  optionIndex={8}
                  selectOrRemoveAll={selectOrRemoveAll}
                />

                {/*<KeywordsTextFieldCard*/}
                {/*    keywords={chatGPTKeywords7}*/}
                {/*    title={"Option 7"} // option 9 (new)*/}
                {/*    optionIndex={9}*/}
                {/*    addOrRemove={addOrRemove}*/}
                {/*    selectOrRemoveAll={selectOrRemoveAll}*/}
                {/*/>*/}
                {/* <KeywordsTextFieldCard
                keywords={currentKeywords}
                subTitle={"Chrome extension implementation"}
                title="Option 1"
                addKeyword={addKeyword}
              />
              <div className="h-4" />
              <KeywordsTextFieldCard
                keywords={backendKeyword2}
                subTitle={"New Non-Chat gpt 1"}
                title="Option 2"
                addKeyword={addKeyword}
              /> */}

                {/* <div className="h-4" /> */}
                {/* <KeywordsTextFieldCard
                keywords={chatGPTKeywords3}
                subTitle={
                  'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ]. Based on these product titles, give me 7 keyword phrases a shopper might type into Amazon search to find these products. These 7 keyword suggestions should all be as different as possible and by using as little of the same repeating words as possible. These 7 varied keyword phrases should be no longer than 50 characters long. \n amazon suggestions: %s \n titles: %s'
                }
                title="Option 6"
                addKeyword={addKeyword}
              />
              <div className="h-4" />


                {/* <div className="h-4" /> */}
                {/* <KeywordsTextFieldCard
                keywords={chatGPTKeywords6}
                subTitle={
                  'Give me a JSON list of 7 keywords ex: ["coloring books", "puzzle books", "kdp books" ], What else can someone type into the Amazon search bar and still get the same results as if he searched for “%s”, but without using those words. Make the search terms at least 3 words or longer. \n amazon suggestions: %s \n titles: %s'
                }
                title="Option 9"
                addKeyword={addKeyword}
              /> */}

                {/* <div className="h-4" /> */}
                {/* <KeywordsTextFieldCard
                keywords={singleWords2}
                subTitle={"Single Words 2"}
                title="Option 11"
                addKeyword={addKeyword}
              /> */}

                {/**/}
                {/*<KeywordsTextFieldCard*/}
                {/*  keywords={titansProSingleWords1}*/}
                {/*  subTitle={"Titans Pro Single Words 1 (by using Option 7)"}*/}
                {/*  title="Option 12"*/}
                {/*  addOrRemove={addOrRemove}*/}
                {/*  optionIndex={12}*/}
                {/*/>*/}
              </div>
              {/* <div className="h-4" />
              <KeywordsTextFieldCard
                keywords={titansProSingleWords2}
                subTitle={"Titans Pro Single Words 2 (by using Option 7)"}
                title="Option 13"
                addKeyword={addKeyword}
              /> */}
            </section>

            <section className="mx-auto ">
              <div className="flex flex-col md:flex-row mt-10 flex-wrap  overflow-auto w-full justify-center">
                <div className="flex justify-center">
                  <h4 className="text-[50px] font-extrabold">
                    More <span className="text-[#c317e4]">Keyword</span>{" "}
                    Suggestions
                  </h4>
                </div>

                <div className="flex w-full mt-8 pb-8">
                  <div className="flex flex-col md:flex-row justify-evenly w-full gap-5">
                    <ScrollableKeywordList
                      keywords={filteredOptions().mainKeywords}
                      title="Main Keywords"
                      addOrRemove={addOrRemove}
                      optionIndex={14}
                    />
                    <ScrollableKeywordList
                      keywords={filteredOptions().withoutMainKeywords}
                      title="Without Main Keyword"
                      addOrRemove={addOrRemove}
                      optionIndex={15}
                    />
                    {/* <ScrollableKeywordList
                      keywords={phraseNotUsedInTitle}
                      title="Phrase Not Used In Title"
                    /> */}
                    <ScrollableKeywordList
                      keywords={filteredOptions().singleWordsNotUsedInTitle}
                      title="Single Words Not Used In Title"
                      addOrRemove={addSingleWord}
                      optionIndex={16}
                    />

                    <ScrollableKeywordList
                      keywords={filteredOptions().restSingleWords}
                      title="Single Words 2"
                      optionIndex={17}
                      addOrRemove={addSingleWord}
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="h-20" />
          </main>
        </Fragment>
      }
    />
  );
}

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
    return getProfile(context, {
      token: session.token,
      pageData: null,
    });
  }
  return getProfile(context, {
    token: null,
    pageData: null,
  });
}
