interface PriceChipProps {
  title: string;
  price: number;
  currency: string;
  count?: number;
  height?: number;
}

export default function PriceChip({
  title,
  price,
  currency,
  count = 0,
  height = 50,
}: PriceChipProps) {
  return (
    <div
      style={{
        marginTop: "40px",
      }}
      className={"flex flex-col items-start justify-start"}
    >
      {/* <div className="flex justify-start items-start"> */}

      <h6
        style={{
          marginLeft: "25px",
        }}
        className="text-[18px] font-bold"
      >
        {title}
      </h6>
      <div
        style={{
          height: `${height}px`,

          border: "1px  solid #ccc",
          marginTop: "21px",
          marginLeft: "px",
        }}
        className="w-full rounded-full bg-white"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          className=" w-full thin-scrollbar  p-2"
        >
          <h6>
            {count
              ? count > 1
                ? `${currency}${price} (${count})`
                : "---"
              : `${currency}${price}`}
            {/* {currency}{price} {count ? `(${count})` : ""}{" "} */}
          </h6>
        </div>
        <div className="flex justify-end">
          {/* <ContentCopyIcon
            onClick={handleCopy}
            className="cursor-pointer text-[16px]"
          /> */}
        </div>
      </div>
    </div>
  );
}
