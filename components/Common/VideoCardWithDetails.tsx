import Image from "next/image";
import Link from "next/link";
import { IVideoCardWithDetails } from "@/lib/models/interfaces/video_card";
import checkMarkIcon from "../../public/assets/masterclass/checkMark.svg";
import { useRouter } from "next/router";
import { ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function VideoCardWithDetails({
  info,
  url,
  title,
  contentList,
  button,
}: IVideoCardWithDetails) {
  const router = useRouter();

  return (
    <div
      style={{ border: "1px solid #cccccc" }}
      className="flex flex-col justify-between w-full  h-full rounded-lg mx-auto  bg-white pb-4 my-4"
    >
      <div>
        <div className=" w-full">
          <iframe
            className="videoRatioStandard rounded-t-lg w-full"
            width="100%"
            height="100%"
            src={url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h6 className={` font-semibold mt-6 mx-4 text-2xl`}>{title}</h6>
      </div>

      <div className="pl-4 md:ml-0">
        {contentList.map((item, i) => {
          return (
            <div key={i} className="flex flex-row  mt-2">
              <CheckIcon strokeWidth={3} className="text-primary" />
              <h6 className={` ml-2`}>{item}</h6>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        {button.type === "FUNCTION" ? (
          <Button
            onClick={button.onClickButton}
            className={`mt-2 twButton themeGradient w-fit  ${
              button.enabled ? "" : "opacity-30"
            } cursor-pointer text-center rounded-full mx-4 xl:mx-16`}
          >
            {button.text} <ArrowRight />
          </Button>
        ) : (
          <Button
            style={{ textTransform: "none" }}
            className="md:px-10 xl:mx-16 rounded-full"
            onClick={() => {
              router.replace(button.link + "?email=" + info.email);
            }}
          >
            <Link
              data-cy={`video-card-button-${title}`}
              href={button.link + "?email=" + info.email}
              className={`  w-full ${
                button.enabled ? "" : "opacity-30"
              } cursor-pointer  text-center `}
            >
              <p className="">{button.text} </p>
            </Link>
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
