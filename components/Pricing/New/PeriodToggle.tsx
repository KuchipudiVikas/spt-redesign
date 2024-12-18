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
        margin: "30px 0px",
      }}
      className=" font-jsans  px-2 pb-5 grid grid-cols-5"
    >
      <div className="text-[40px] col-span-2 font-bold my-auto">
        Choose Payment Type
      </div>
      <div className="flex col-span-3 items-end gap-2">
        <button
          onClick={() => setValue(EPaymentPeriod.Monthly)}
          className={`px-[24px] py-[15px] font-bold rounded-full w-full  ${
            value === EPaymentPeriod.Monthly
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <div className="w-full">
          <div className="mx-auto flex justify-center pulsing-glow-text mb-1  text-primary font-bold  rounded-full w-full">
            Save upto 40%
          </div>
          <button
            onClick={() => setValue(EPaymentPeriod.Yearly)}
            className={`px-[24px] py-[15px] h-full font-bold rounded-full w-full  ${
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
          className={`px-[24px] py-[15px] font-bold rounded-full w-full  ${
            value === EPaymentPeriod.Lifetime
              ? "bg-primary text-white"
              : "bg-gray-200 border"
          }`}
        >
          Lifetime Bundles
        </button>
      </div>
    </div>
  );
};

export default TimePeriodToggle;
