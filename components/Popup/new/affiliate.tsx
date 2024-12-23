import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { Button } from "@/components/ui/button";

const AffiliatePopUp = ({}) => {
  let heading = "Join our affiliate program";

  let buttonConfig = {
    url: "https://affiliates.selfpublishingtitans.com/signup.php",
    text: "More Information",
    textColor: "#000000",
    bgColor: "#fff500",
  };

  let themeColor = "ffa800";

  const [isOpen, setIsOpen] = useState(true);

  const close = () => setIsOpen(false);

  const { isMobile, isDesktop, isTablet } = useCustomDeviceSize();
  const trackingClassName = "affilliate- popup";

  useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: "popup_impression",
      popup_id: trackingClassName,
    });
  }, []);

  return (
    <Popup
      contentStyle={{
        padding: 0,
        width: isMobile ? "90%" : isTablet ? "85%" : "50%",
        borderRadius: "16px 16px 16px 16px",
        maxWidth: "1200px",
        maxHeight: "90vh",
      }}
      open={isOpen}
      modal
      nested
    >
      <div className="absolute top-0 right-0 p-3">
        <div onClick={close} className="cursor-pointer">
          <XIcon />
        </div>
      </div>
      <div className="">
        <div className="flex flex-col-reverse md:grid grid-cols-2  gap-3 ">
          <div className=" col-span-1 mt-9 mx-9  ">
            <h4
              style={{
                fontSize: "27px",
                lineHeight: "0.99",
                fontWeight: 800,
              }}
            >
              {heading}
            </h4>
            <div className="">
              <h4 className="font-Inter font-bold mt-7 text-[#5d5d5d]">
                Refer your friends or family to earn 40% commission
              </h4>
              <h4 className="font-Inter font-bold mt-3 text-[#5d5d5d]">
                Watch your account balance grow as your visitors become our
                customers
              </h4>
            </div>
            <div className="flex justify-center mt-14  ">
              <Link
                href={buttonConfig.url}
                id={trackingClassName}
                className={`no-outline  pb-3 mt-3 mb-3 `}
              >
                <Button
                  className={`no-outline text-[#fff500] px-10  font-extrabold font-Inter text-[20px] mt-4`}
                  size="lg"
                  style={{
                    backgroundColor: buttonConfig.bgColor,
                    color: buttonConfig.textColor,
                  }}
                >
                  {buttonConfig.text}
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-1 flex justify-center flex-col items-center bg-[#ec82ff]">
            <div className="my-4">
              <h4 className=" font-extrabold font-Inter font-bold text-shadow text-[#fff500]">
                EARN
              </h4>
              <h4 className=" font-extrabold text-shadow  font-bold font-Inter text-[#fff500]">
                40%
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default AffiliatePopUp;
