import { type FC } from "react";

interface ICardInfo {
  asin: string;
  onClick: () => void;
}

const CardInfo: FC<ICardInfo> = (props) => {
  const { asin, onClick } = props;

  return (
    <div
      style={{
        background: "rgb(248, 248, 248)",
        height: "36px",
        borderBottom: "1px solid rgb(238, 238, 238)",
        borderRadius: "5px 5px 0px 0px",
        display: "flex",
        WebkitBoxAlign: "stretch",
        alignItems: "stretch",
        padding: "5px 5px 0 16px",
        // justifyContent: "center",
      }}
    >
      <div> Amz Product Research CE | ASIN: {asin}</div>
    </div>
  );
};

export default CardInfo;
