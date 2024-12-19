import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import AudioBookIcon from "@/public/assets/images/audio_book_banner.png";
import MasterClassImage from "@/public/assets/images/masterclass_banner.png";
import { CheckIcon, PlusIcon, UserIcon, XIcon } from "lucide-react";

export const CrossSellCardTS = ({
  product,
  addToCart,
  setProducts,
  products,
}) => {
  let id = "65e302172d647e09bd5ac0d8";
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.productId !== id));
    setIsAdded(false);
  };

  const addProduct = (id) => {
    setProducts([
      ...products,
      { productId: id, paymentType: "one-time", isCrossSale: true },
    ]);
    setIsAdded(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // get product id from the query string

  return (
    <div className="">
      <div
        className="grid grid-cols-7  mt-1 bg-[#fdfdfd] br-16 shadow-extra-xl"
        // style={{ border: "1px solid #808080" }}
      >
        <div className="cardBody col-span-7  py-2 flex  items-center">
          <Image
            src={AudioBookIcon.src}
            alt="red arrow"
            width={200}
            height={200}
            className=" w-24 lg:w-36 mb-2  mr-3 mx-2 h-auto"
          />
          <div className="">
            <div className="flex gap-3 flex-col lg:flex-row lg:items-center">
              <h6 className="text-[20px] font-Inter text-[#2f2f2f]">
                Special One Time Offer:
              </h6>
              <h6 className=" text-[#2f2f2f]">
                <span className=" text-[#7449fb] leading-6 font-Inter text-[20px] ">
                  E-Book & Audiobook
                </span>
              </h6>
            </div>
            <div className="grid lg:grid-cols-8">
              <h6 className="text-[15px] mt-1 font-normal col-span-6">
                <span className="font-bold text-[#7449fb] ">$9</span>{" "}
                <del className="ml-0 font-semibold text-[#5d5d5d]">$13</del>{" "}
                <span className="font-normal">
                  Perfect for complete beginners that want to learn all the
                  basics about Amazon KDP. The book is just over 200 pages and
                  the audiobook is about 2 1/2 hours long.
                </span>
              </h6>
              <div className="flex items-center col-span-2   justify-center pr-1">
                <div className="p-1 rounded-md ">
                  <Button
                    onClick={() =>
                      isAdded ? removeProduct(id) : addProduct(id)
                    }
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`p-1 mt-2 lg:mt-0 px-3 ${
                      isAdded ? "bg-green-500 hover:bg-red-500" : ""
                    }`}
                  >
                    {isAdded ? (isHovered ? "Remove" : "Added") : "Add"}{" "}
                    {isAdded ? (
                      isHovered ? (
                        <XIcon />
                      ) : (
                        <CheckIcon />
                      )
                    ) : (
                      <PlusIcon />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const CrossSellCardTS2 = ({
  product,
  addToCart,
  setProducts,
  products,
}) => {
  let id = "63149a704f08614dd053ec3d"; //masterclass
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.productId !== id));
    setIsAdded(false);
  };

  const addProduct = (id) => {
    setProducts([
      ...products,
      { productId: id, paymentType: "one-time", isCrossSale: true },
    ]);
    setIsAdded(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="">
      <div
        className="flex  bg-[#fdfdfd] br-16 shadow-extra-xl"
        // style={{ border: "1px solid #808080" }}
      >
        <div className="cardBody col-span-7  py-2 flex items-center">
          <Image
            src={MasterClassImage.src}
            alt="red arrow"
            width={200}
            height={200}
            className=" w-24 lg:w-36 mb-2  mr-3 mx-2 h-auto"
          />
          <div className="">
            <div className="flex gap-3 flex-col lg:flex-row items-start lg:items-center">
              <h6 className="text-[20px] font-Inter text-[#2f2f2f]">
                Special One Time Offer:
              </h6>
              <h6 className=" text-[#2f2f2f]">
                <span className="text-[#7449fb] leading-6 font-Inter text-[20px] mr-1">
                  KDP Masterclass
                </span>
              </h6>
            </div>
            <div className="grid lg:grid-cols-8">
              <h6 className="text-[16px] mt-1 font-normal  col-span-6">
                <span className="font-bold text-[#7449fb] ">$97</span>{" "}
                <del className="ml-0 font-semibold text-[#5d5d5d]">$149</del>{" "}
                <span
                  onClick={() => setExpanded(!expanded)}
                  className="font-normal "
                >
                  it has 80 videos in a structured sequence to easily learn all
                  the basics of KDP & Amazon Ads. This is our exact step by step
                  of how we sold close to 200,000 books.
                  Includes 100+ resources.
                </span>
              </h6>

              <div className="flex items-center  col-span-2  justify-center pr-1">
                <div className="p-1 rounded-md ">
                  <Button
                    onClick={() =>
                      isAdded ? removeProduct(id) : addProduct(id)
                    }
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`p-1 mt-2 lg:mt-0 px-3 ${
                      isAdded ? "bg-green-500 hover:bg-red-500" : ""
                    }`}
                  >
                    {isAdded ? (isHovered ? "Remove" : "Added") : "Add"}{" "}
                    {isAdded ? (
                      isHovered ? (
                        <XIcon />
                      ) : (
                        <CheckIcon />
                      )
                    ) : (
                      <PlusIcon />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {false && (
        <div
          className="p-5 "
          style={{
            // border: "1px solid #808080",
            borderTop: "none",
            borderRadius: "5px",
          }}
        >
          <h6 className="text-[15px]">
            80 videos in a structured sequence to easily learn all the basics of
            KDP & Amazon Ads. This is our exact step by step of how we sold
            close to 200,000 books. Includes 100+ resources.
          </h6>
        </div>
      )}
    </div>
  );
};
