import { useState, useEffect } from "react";
import axios from "axios";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import Image from "next/image";
import BrandLogo from "@/public/assets/logos/brand-logo-purple.png";
import { Separator } from "@/components/ui/separator";

const getProductNameByPeriod = (productsInfo, productName) => {
  if (productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Monthly) {
    return `${productName} Monthly Subscription`;
  } else if (
    productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Yearly
  ) {
    return `${productName} Yearly Subscription`;
  }
  return productName;
};

const getProductTypeSuffix = (productsInfo) => {
  if (productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Monthly) {
    return "/m";
  } else if (
    productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Yearly
  ) {
    return "/y";
  }
  return "";
};

const BillingTable = ({
  productsInfo,
  appliedCoupon,
  paymentIntentData,
  token,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const subtotal = productsInfo.reduce(
    (total, product) => total + product.priceData.unit_amount / 100,
    0
  );

  useEffect(() => {
    const fetchCouponDetails = async () => {
      if (appliedCoupon) {
        const response = await axios.post(
          baseUrl + `/api/stripe/payment/coupons/coupon_info`,
          {
            couponId: appliedCoupon.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = response.data;
        if (data.coupon.amount_off) {
          setDiscountAmount(data.coupon.amount_off / 100);
        } else if (data.coupon.percent_off) {
          setDiscountPercentage(data.coupon.percent_off);
        }
      } else {
        setDiscountAmount(0);
        setDiscountPercentage(0);
      }
    };

    fetchCouponDetails();
  }, [appliedCoupon, subtotal]);

  let total = paymentIntentData.amount / 100;

  if (
    productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Monthly ||
    productsInfo[0].checkout_meta.paymentType === EPaymentPeriod.Yearly
  ) {
    total = paymentIntentData.latest_invoice.amount_due / 100;
  }

  if (productsInfo.length == 0) return <div>loading...</div>;

  return (
    <>
      <div className="flex px-4 lg:px-0  lg:hidden mt-4 mb-4 lg:w-6/7 ">
        <div className="">
          <h6 className=" text-[28px] font-bold">Checkout</h6>
        </div>
        <div className="flex gap-1 items-center">
          <Image src={BrandLogo} alt="brand logo" className="w-12 h-auto" />
        </div>
      </div>
      <div className="flex  border light-border p-3 rounded-3xl justify-center ">
        <div className="grid grid-cols-1  br-16  shadow-extra-xl gap-0 ">
          {productsInfo.map((product, index) => (
            <div key={index} className="grid-cols-4   my-3 grid">
              <div className="col-span-3 px-4">
                <h6 className=" font-semibold">
                  {getProductNameByPeriod(productsInfo, product.name)}
                </h6>
                <div className="col-span-1 mt-2">
                  <h6 className=" pr-7 text-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    ></div>
                  </h6>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <h6 className=" ">
                  {" "}
                  ${(product.priceData.unit_amount / 100).toFixed(2)}{" "}
                </h6>
              </div>
            </div>
          ))}
          <Separator />
          <div className="grid grid-cols-4 my-4">
            <div className="col-span-3 px-4">
              <h6 className=" ">Subtotal</h6>
            </div>
            <div className="flex justify-center items-center">
              <h6>
                {" "}
                ${subtotal.toFixed(2)} {getProductTypeSuffix(productsInfo)}
              </h6>
            </div>
          </div>
          {discountAmount > 0 && (
            <>
              <Separator />
              <div className="grid grid-cols-4 my-4">
                <div className="col-span-3 px-4 flex items-center">
                  <h6 className=" ">Discount</h6>
                </div>
                <div className="flex justify-center items-center">
                  <h6 className=" text-[#00d44a] font-semibold">
                    {" "}
                    -${discountAmount.toFixed(2)}
                  </h6>
                </div>
              </div>
            </>
          )}
          {discountPercentage > 0 && (
            <>
              <Separator />
              <div className="grid grid-cols-4 my-4">
                <div className="col-span-3 px-4 flex items-center">
                  <h6 className=" ">Discount</h6>
                </div>
                <div className="flex justify-center items-center">
                  <h6 className=" text-[#00d44a] font-semibold">
                    {" "}
                    -{discountPercentage}%
                  </h6>
                </div>
              </div>
            </>
          )}
          <Separator />
          <div className="grid grid-cols-4 my-4">
            <div className="col-span-3 px-4">
              {" "}
              <h6 className=" font-bold"> Total</h6>
            </div>
            <div className="flex justify-center items-center">
              <h6 className=" font-bold">
                ${total.toFixed(2)} {getProductTypeSuffix(productsInfo)}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingTable;
