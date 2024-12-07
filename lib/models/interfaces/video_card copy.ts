type ButtonType = "LINK" | "FUNCTION";

export interface IVideoCardWithDetails {
  url: string;
  title: any;
  contentList: string[];
  button: {
    text: string;
    link?: string;
    enabled: boolean;
    type?: ButtonType;
    onClickButton?: () => void;
  };
  info?: any;
}
