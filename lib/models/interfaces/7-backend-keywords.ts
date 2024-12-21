import { EKeywordType } from "@/lib/models/enums/7-backend-keyword";

export interface IKeyword {
  keyword: string;
  type: EKeywordType;
  isSelected: boolean;
}

export interface KeywordsTextFieldCardProps {
  keywords: IKeyword[];
  title: string;
  optionIndex: number;
  subTitle?: string;
  addOrRemove?: (keyword: string, index: number, optionIdx: number) => void;
  removeKeyword?: (keyword: string) => void;
  selectOrRemoveAll?: (optionIdx: number) => void;
}
