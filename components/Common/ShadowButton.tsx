import BrandIcon from "@/public/favIcon.png";
import Image from "next/image";

interface ShadowButtonProps {
  text: string;
  imageSrc: string;
}

function ShadowButton({ text, imageSrc }: ShadowButtonProps) {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className=" flex gap-2  mb-5 bg-transparent w-fit flex text-[14px] items-center rounded-full"
    >
      <span
        style={{
          boxShadow: "0px 0px 8px 2px #ddd",
        }}
        className="font-mono w-[26px] mr-2 font-bold h-[26px] shadow bg-white text-[#c31fe4] p-1 rounded-full flex items-center justify-center"
      >
        <Image src={imageSrc} width={30} height={30} alt="" />
      </span>
      {text}
    </div>
  );
}

export default ShadowButton;
