import Image from "next/image";
import BookImage from "@/public/assets/images/sptBookCover.jpg";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingBar from "../utils/LoadingBar";
import { useCustomDeviceSize, EScreenSize } from "@/utils/useDeviceSize";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft, ShoppingCartIcon } from "lucide-react";

export const AudioPlayer = ({ metaData, hasAccess }) => {
  let defaultSrc =
    "https://iframe.mediadelivery.net/embed/208139/f0cb164e-5949-4bb5-8832-653bf02fb8fe";
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({ title: "1. Opening.mp3" });
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [data, setData] = useState([]);
  const [Src, setSrc] = useState(defaultSrc);
  const [loading, setLoading] = useState(false);
  const previewTracks = 5;
  const { size } = useCustomDeviceSize();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getAudioMeta");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let data;
        try {
          data = await res.json();
        } catch (error) {
          throw new Error("Response is not valid JSON");
        }
        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }
        data.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { numeric: true })
        );

        data = data.map((item, index) => {
          if (typeof item !== "object" || item === null) {
            throw new Error("Item is not an object");
          }
          return {
            ...item,
            id: index + 1,
          };
        });
        if (data.length > 0) {
          if (typeof data[0].embedUrl !== "string") {
            throw new Error("First item's embedUrl is not a string");
          }
          setSrc(data[0].embedUrl);
        } else {
          throw new Error("No data received from API");
        }
        setData(data);
      } catch (error) {
        console.error(
          "An error occurred while fetching or processing the data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTrack) {
      if (!hasAccess && selectedTrack >= previewTracks) {
        setShowPurchaseAlert(true);
        // @ts-ignore
        // setSelectedTrack(4);
        console.log("Please purchase the audio book to continue");
        alert("Please purchase the audio book to continue");
      } else {
        setShowPurchaseAlert(false);

        let item = data.find((item) => item.id === selectedTrack);
        if (item) {
          setCurrentTrack(item);

          setSrc(item.embedUrl);
          setLoading(true);
        } else {
          console.log(`No item found with id: ${selectedTrack}`);
        }
      }
    }
  }, [selectedTrack]);

  const moveNext = () => {
    let id = selectedTrack;
    if (id < data.length) {
      setSelectedTrack(id + 1);
    }
  };
  const movePrevious = () => {
    let id = selectedTrack;
    if (id >= 1) {
      setSelectedTrack(id - 1);
    }
  };

  return (
    <>
      <LoadingBar isLoading={loading} title="Loading..." />
      <div className="flex justify-center">
        <div className="shadowAround flex flex-col-reverse md:flex-row items-center justify-center w-[97vw] lg:max-w-[1200px]  p-2 md:p-5 lg:w-[1200px]">
          <Image
            src={BookImage.src}
            alt="Book Cover"
            width={1000}
            height={1000}
            className="w-[300px] h-auto br-16"
          />
          <div className="w-full flex flex-col mt-3 md:mt-0  md:ml-5 md:px-5">
            <div className="">
              <div className="">
                <h6 className="font-Inter font-semibold">{metaData.title}</h6>
                <h6 className="font-Inter font-medium">By {metaData.artist}</h6>
              </div>
              <div className="flex justify-center mt-3 md:mt-0">
                <h6 className="font-Inter my-3  font-medium">
                  {currentTrack?.title}
                </h6>
              </div>
            </div>
            <div className="w-[90vw] md:w-full flex justify-center">
              <iframe
                className="w-full shadow-lg h-[300px] rounded-lg bg-[#000000]"
                src={`${Src}`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                frameBorder="0"
                allow="autoplay; picture-in-picture"
                allowFullScreen
                sandbox="allow-scripts  allow-same-origin"
              ></iframe>
            </div>
            <div className=" mt-5">
              <div className="flex gap-2 ">
                <div className="col-span-3 pr-3">
                  <select
                    value={selectedTrack}
                    onChange={(e) => {
                      let val = parseInt(e.target.value);
                      setSelectedTrack(val);
                    }}
                    name=""
                    id=""
                  >
                    {data.map((item, index) => {
                      return (
                        <option
                          className="font-Inter"
                          key={index}
                          value={item.id}
                        >
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  onClick={() => movePrevious()}
                  className="mt-2 md:mt-0 "
                >
                  <ChevronLeft />
                  <h6 className="font-Inter font-medium">{"Prev"}</h6>
                </Button>
                <Button className="mt-2 md:mt-0 " onClick={() => moveNext()}>
                  <h6 className="font-Inter font-medium">{"Next"}</h6>
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div
              className={`flex items-center mt-4  gap-4 ${
                showPurchaseAlert ? "opacity-100" : "opacity-0"
              }`}
            >
              <Alert>Please Purchase the audio book to continue</Alert>{" "}
              <Link href={"/shop/65e302172d647e09bd5ac0d8"}>
                <Button>
                  Buy Now <ShoppingCartIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
