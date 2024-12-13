import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";

import Image from "next/image";
import AudioBookIcon from "@/public/assets/images/audio_book_banner.png";
import MasterClassImage from "@/public/assets/images/masterclass_banner.png";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import { CheckIcon, PlusIcon, UserIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";

export default function Form({
  paymentIntent,
  email,
  products = null,
  setProducts = null,
  pricesData,
  applyCoupon,
  appliedCoupon,
  initProduct,
  CrossSellItemsAccessCheck,
  setLoading,
  removeCoupon,
  token,
  recaptchaRef,
}) {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [crossSellItems, setCrossSellItems] = useState([]);
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  let AudioBook_id = "AudioBookId";

  const filterCrossSells = (crossSellItems, products) => {
    return Object.entries(crossSellItems).filter(([key, value]) => {
      return !initProduct.find((p) => p === key);
    });
  };

  let CrossSellIndex: any = {
    "65e302172d647e09bd5ac0d8": CrossSellCardTS,
    "63149a704f08614dd053ec3d": CrossSellCardTS2,
  };

  // get product id from the query string
  const product_id = new URLSearchParams(window.location.search).get("product");

  if (product_id) {
    // if product id is any of the cross sell items, then remove cross sell item from the products
    const crossSellProducts = Object.keys(CrossSellIndex);
    if (crossSellProducts.includes(product_id)) {
      // remove all cross sell items from the products
      CrossSellIndex = {};
    }
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (
      products.some(
        (p) =>
          p.paymentType === EPaymentPeriod.Monthly ||
          p.paymentType === EPaymentPeriod.Yearly
      )
    ) {
      setCrossSellItems([]);
      return;
    }

    let crossSellItems = filterCrossSells(CrossSellIndex, products);

    if (CrossSellItemsAccessCheck.isMasterclassOwner) {
      crossSellItems = crossSellItems.filter(
        ([key, value]) => key !== "63149a704f08614dd053ec3d"
      );
    }
    if (CrossSellItemsAccessCheck.isAudioBookOwner) {
      crossSellItems = crossSellItems.filter(([key]) => key !== AudioBook_id);
    }
    setCrossSellItems(crossSellItems);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("not loaded");
      return;
    }

    const token = await recaptchaRef.current.executeAsync();

    debugger;
    if (!token) {
      return;
    }

    // Validate the recaptcha token
    const response = await fetch("/api/g-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    debugger;

    if (!response.ok) {
      console.error("Failed to verify reCaptcha token");
      return;
    }

    debugger;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          window.location.origin +
          `${"/payment-success?payment_intent_client_secret={PAYMENT_INTENT_CLIENT_SECRET}"}`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name: name,
            email: email,
            address: {
              postal_code: zip,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
      window.location.href = "/payment-failed";
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded!");
      console.log("paymentIntent", paymentIntent);
      debugger;
      window.location.href =
        "/payment-success?payment_intent_client_secret=" +
        paymentIntent.client_secret +
        "&payment_intent=" +
        paymentIntent.id +
        "&payment_intent_status=" +
        paymentIntent.status +
        "&payment_intent_amount=" +
        paymentIntent.amount;
    } else if (paymentIntent.status === "processing") {
      setMessage("Your payment is processing.");
    } else {
      setMessage("Something went wrong.");
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => handleSubmit(e)}
      className="lg:w-6/7 w-full px-4 lg:px-0 min-h-screen "
    >
      <div className=" w-full  flex flex-col justify-center ">
        <div className=" w-full ">
          <div className="mb-8 w-full bg-white shadow-extra-xl p-3 mt-8 lg:mt-5 br-16">
            <div className="flex justify-start  gap-2">
              <UserIcon color="primary" />
              <h6 className="font-Inter mb-2 text-[18px] font-semibold">
                Contact Information
              </h6>
            </div>
            <h6 className=" px-1.5 font-Inter">
              <b>Email :</b> {email}
            </h6>
          </div>

          <div className="shadow-extra-xl mb-8 br-16 p-6 bg-white">
            {paymentMethod === "card" && (
              <div className="mb-4">
                <h6 className="font-Inter mb-2 text-[18px] font-semibold">
                  Payment Information
                </h6>
                <div className="flex gap-2">
                  <Input
                    placeholder="Name on Card"
                    required
                    className="w-full"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />

                  {/* zip */}
                  <Input
                    placeholder="Zip Code"
                    className="w-1/2"
                    required
                    onChange={(e) => {
                      setZip(e.target.value);
                    }}
                    value={zip}
                  />
                </div>
              </div>
            )}

            <PaymentElement
              id="payment-element"
              onChange={(e) => {
                setPaymentMethod(e.value.type);
              }}
            />
          </div>

          <CouponsList
            products={products}
            applyCoupon={applyCoupon}
            appliedCoupon={appliedCoupon}
            removeCoupon={removeCoupon}
            token={token}
          />

          <div className="w-full flex-col gap-y-8 justify-center flex">
            {crossSellItems.map(([key, value]) => {
              const CrossSellCard = value;
              return (
                <CrossSellCard
                  key={key}
                  product={{
                    id: key,
                    name: "Audio Book",
                    price: "$9",
                  }}
                  products={products}
                  setProducts={setProducts}
                  addToCart={() => {}}
                />
              );
            })}

            <Button
              size="lg"
              // onClick={handleSubmit}
              className=" mb-16 text-[18px] shadow-extra-xl  w-full"
              disabled={isLoading || !stripe || !elements}
              id="submit"
              type="submit"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Complete Purchase"
                )}
              </span>
            </Button>
          </div>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </div>
      </div>
    </form>
  );
}

const CouponsList = ({
  products,
  applyCoupon,
  appliedCoupon,
  removeCoupon,
  token,
}) => {
  console.log({ appliedCoupon });
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL +
            "/api/stripe/payment/coupons/coupon_list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ products }),
          }
        );
        const data = await response.json();
        if (Array.isArray(data.coupons.data)) {
          setCoupons(data.coupons.data);
        } else {
          setCoupons([]);
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchCoupons();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (couponCode === "") return alert("Please enter a coupon code");
    const coupon = coupons.find(
      (c) => c.name.toLowerCase() === couponCode.toLowerCase()
    );
    if (!coupon) return alert("Invalid coupon code");
    applyCoupon(coupon.id);
  };

  return (
    <div className="flex flex-col  mb-8 bg-white shadow-extra-xl p-2 br-16 ">
      {appliedCoupon ? (
        <div className="flex p-4 items-center justify-between ">
          <div className="flex">
            <h6 className="font-Inter font-semibold">
              {appliedCoupon.name} Applied
            </h6>
            <h6 className="ml-2">
              {appliedCoupon.percent_off &&
                `${appliedCoupon.percent_off} %Discount on cart items`}
              {appliedCoupon.amount_off &&
                `$${appliedCoupon.amount_off / 100} off`}
            </h6>
          </div>
          <XIcon
            onClick={() => removeCoupon(appliedCoupon.id)}
            className="cursor-pointer hover:text-red-500" // Add this line
          />
        </div>
      ) : (
        <div className="flex items-center justify-between ">
          <Input
            placeholder={"Enter Coupon Code"}
            className="w-full pr-4 p-2.5"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            onClick={(e) => handleSubmit(e)}
            style={{ borderRadius: "16px" }}
            className="mr-4"
          >
            {" "}
            Apply{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

const CrossSellCardTS = ({ product, addToCart, setProducts, products }) => {
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
const CrossSellCardTS2 = ({ product, addToCart, setProducts, products }) => {
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
