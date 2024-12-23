import Image from "next/image";
import checkIcon from "../../public/assets/masterclass/check.svg";

function BubbleTickItem({ text, textSize = "text-2xl md:text-3xl" }) {
  return (
    <div className="flex items-center mt-2 w-fit">
      <Image
        className="w-10 h-10"
        src={checkIcon.src}
        alt="See All Segments"
        width={38}
        height={38}
      />
      <p className={`font-bold ml-3 ${textSize}`}>{text}</p>
    </div>
  );
}
export default BubbleTickItem;
