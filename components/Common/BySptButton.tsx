import BrandIcon from "@/public/favIcon.png";
import Image from "next/image";

function BySptButton() {
  return (
    <div
      style={{
        paddingLeft: "6px",
        paddingRight: "16px",
        paddingTop: "6px",
        paddingBottom: "6px",
        boxShadow: "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
      }}
      className="font-normal flex gap-2 mt-[30px] mb-5 bg-transparent w-fit flex text-[14px] items-center rounded-full"
    >
      By <Image src={BrandIcon.src} width={30} height={30} alt="" /> Self
      Publishing Titans
    </div>
  );
}

export default BySptButton;
