import { EPaymentPeriod } from "@/lib/models/enums/common";

interface TimePeriodToggleProps {
  paymentPeriod: EPaymentPeriod;
  setPaymentPeriod: (period: EPaymentPeriod) => void;
  value: string;
  setValue: (value: EPaymentPeriod) => void;
}

const TimePeriodToggle: React.FC<TimePeriodToggleProps> = ({
  value,
  setValue,
}) => {
  return (
    <div
      style={{
        margin: "px 0px",
      }}
      className=" font-jsans rounded-2xl  border light-border  h-full mx-3  px-10 p-5 grid grid-cols-1 md:grid-cols-5"
    >
      <div className=" text-[22px] pt-4 md:pt-3 md:text-[40px] text-center col-span-2 font-bold my-auto">
        Choose Payment Type
      </div>
      <div className=" col-span-3 p-4 flex flex-col w-full items-center ">
        <div className="mx-auto text-xs md:text-base  font-extrabolc text-center flex justify-center pulsing-glow-text mb-1  text-primary font-bold  rounded-full w-full">
          Save upto 40%
        </div>
        <div className="flex w-full gap-2 items-center">
          <button
            onClick={() => setValue(EPaymentPeriod.Monthly)}
            className={` px-2 md:px-[10px]  md:text-[18px] py-2 md:py-[15px]  font-bold rounded-full w-full  ${
              value === EPaymentPeriod.Monthly
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <div className="w-full">
            <button
              onClick={() => setValue(EPaymentPeriod.Yearly)}
              className={` px-2 md:px-[10px]  md:text-[18px] py-2 md:py-[15px] h-full font-bold rounded-full w-full  ${
                value === EPaymentPeriod.Yearly
                  ? "bg-primary text-white"
                  : "bg-gray-200 border"
              }`}
            >
              Yearly
            </button>
          </div>
          <button
            onClick={() => setValue(EPaymentPeriod.Lifetime)}
            className={` px-2 md:px-[10px]  md:text-[18px] py-2 md:py-[15px] font-bold  rounded-full w-full  ${
              value === EPaymentPeriod.Lifetime
                ? "bg-primary text-white"
                : "bg-gray-200 border"
            }`}
          >
            Lifetime
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePeriodToggle;
