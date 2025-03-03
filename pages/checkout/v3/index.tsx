import { getProfile } from "@/components/Layout";
import Account from "@/lib/mw/Accounts";
import React, { useEffect, useState } from "react";
import CheckoutForm from "@/components/checkout/payment_form_v3";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useRouter } from "next/router";
import axios from "axios";
import BrandLogo from "@/public/assets/logos/brand-logo-purple.png";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js";
import { AccountUtils } from "@/lib/utils";
import { getSession } from "next-auth/react";
import LoadingBar from "@/components/utils/LoadingBar";
import { EPaymentPeriod } from "@/lib/models/enums/common";
import ReCAPTCHA from "react-google-recaptcha";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";
import BillingTable from "@/components/checkout/BillingTable";
import { checkCountry } from "@/components/checkout/Paypal";
import VerifiedIcon from "@/public/assets/social/verified.png";

type Product = {
  productId: string;
  paymentType: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Index = ({ info, CrossSellItemsAccessCheck, token }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const recaptchaRef: any = React.createRef();
  const router = useRouter();
  const email = info.full.data.email;
  const productId = router.query.product;
  const type = router.query.type || "one-time";
  const [products, setProducts] = useState<Product[]>([]);
  const [productsInfo, setProductsInfo] = useState(null);
  const [initProduct, setInitProduct] = useState(null);
  const [paymentIntentData, setPaymentIntentData] = useState(null);
  const [loading, setLoading] = useState({
    isLoading: false,
    title: "Loading...",
  });

  const excludedCounties = ["SO"];

  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    const storedReferrer = localStorage.getItem("referrer");
    console.log("referrer", storedReferrer);
    setReferrer(storedReferrer);
    checkCountry()
      .then((data) => {
        if (data) {
          if (
            data &&
            data?.country &&
            excludedCounties.includes(data.country)
          ) {
            window.location.href = "/";
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleBack = () => {
    if (referrer) {
      router.push(referrer);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      handleBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [referrer]);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  function applyCoupon(id: string) {
    const applyCouponRequest = async () => {
      setLoading({ isLoading: true, title: "Applying coupon..." });
      // if monthly subscription, then add coupon code to the url query and reload the page
      if (
        products[0].paymentType === EPaymentPeriod.Monthly ||
        products[0].paymentType === EPaymentPeriod.Yearly
      ) {
        const { pathname, search } = window.location;

        // Construct the new search query with the updated coupon parameter
        const searchParams = new URLSearchParams(search);
        searchParams.set("coupon", id);

        // Construct the new URL with the updated query parameters
        // Navigate to the new URL
        window.location.href = `${pathname}?${searchParams.toString()}`;
        return;
      }
      try {
        const response = await axios.post(
          baseUrl + "/api/stripe/payment/coupons/apply_coupon",
          {
            couponId: id,
            paymentIntentId: paymentIntent,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setPaymentIntentData(response.data.updatedPaymentIntent);
        setPaymentIntent(response.data.updatedPaymentIntent.id);
        setAppliedCoupon(response.data.coupon);
      } catch (error) {
        console.error(error.response);
        alert(error.response.data.error);
      } finally {
        setLoading({ isLoading: false, title: "Loading..." });
      }
    };

    if (appliedCoupon) {
      axios
        .post(
          baseUrl + "/api/stripe/payment/coupons/remove",
          {
            couponId: appliedCoupon,
            paymentIntentId: paymentIntent,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          applyCouponRequest();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      applyCouponRequest();
    }
  }
  async function removeCoupon() {
    try {
      setLoading({ isLoading: true, title: "Removing coupon..." });

      if (type === EPaymentPeriod.Monthly || type === EPaymentPeriod.Yearly) {
        const urlParams = new URLSearchParams(window.location.search);

        // Delete the "coupon" parameter from the URL
        urlParams.delete("coupon");

        // Construct the new query string without the "coupon" parameter
        const queryString = urlParams.toString();

        // Construct the new URL with the updated query parameters
        // Perform the navigation to the new URL
        window.location.href = `${window.location.pathname}?${queryString}`;
      }
      const response = await axios.post(
        baseUrl + "/api/stripe/payment/coupons/remove",
        {
          paymentIntentId: paymentIntent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAppliedCoupon(null);
      setPaymentIntentData(response.data.updatedIntent);
      setPaymentIntent(response.data.updatedIntent.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ isLoading: false, title: "Loading..." });
    }
  }

  useEffect(() => {
    if (productId) {
      // @ts-ignore
      setProducts([{ productId: productId, paymentType: type }]);
      setInitProduct([productId]);
    }
  }, [productId]);

  const axiosPost = async (url, data) => {
    return await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  const fetchProductDetails = async (productId) => {
    const store_lookup = await axiosPost(baseUrl + "/api/stripe/product/info", {
      productId: productId.productId,
    });

    let s_product_id = store_lookup.data.id;
    const productRes = await axiosPost(
      baseUrl + "/api/stripe/payment/stripe_product",
      {
        productId: s_product_id,
      }
    );

    const data = {
      ...productRes.data,
      checkout_meta: productId,
      isCrossSale: productId.isCrossSale,
    };

    return data;
  };

  const fetchPrice = async (productData) => {
    const priceRes = await axiosPost(
      baseUrl + "/api/stripe/payment/stripe_price",
      {
        product: productData,
      }
    );
    return priceRes.data;
  };

  const createPaymentIntent = async (pricesData) => {
    if (type === "subscription" && paymentIntent) {
      await axios.post(
        baseUrl + "/api/stripe/payment/stripe_cancel_intent",
        {
          paymentIntentId: paymentIntent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    }

    // const valueX21 = (
    //   document.getElementById("idev_custom_x21") as HTMLInputElement
    // ).value;

    // if query string has coupon, apply it
    const urlParams = new URLSearchParams(window.location.search);
    const coupon = urlParams.get("coupon") || appliedCoupon?.id || null;
    try {
      const intentRes = await axiosPost(
        baseUrl + "/api/stripe/payment/stripe_intent",
        {
          products: pricesData,
          paymentIntentId: paymentIntent,
          email: email,
          idev_custom_x21: "",
          coupon: coupon,
        }
      );

      if (intentRes.data.action === "subscription-update") {
        alert("Subscription updated successfully");
        window.location.href = "/";
        return;
      }
      return intentRes.data;
    } catch (error) {
      if (error) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else if (error.response.statusText) {
          alert(error.response.statusText);
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }
      // return to the previous page
      window.location.href = "/";
      return null;
    }
  };

  useEffect(() => {
    const fetchProductsAndCreateIntent = async () => {
      try {
        setLoading({ isLoading: true, title: "Loading..." });
        const productsData = await Promise.all(
          products.map(fetchProductDetails)
        );

        const pricesData = await Promise.all(productsData.map(fetchPrice));

        const intentData = await createPaymentIntent(pricesData);

        if (!intentData) {
          return;
        }
        const combinedData = productsData.map((product) => {
          const priceData = pricesData.find(
            (price) => price.product === product.id
          );
          return { ...product, priceData };
        });

        setProductsInfo(combinedData);
        setClientSecret(intentData.client_secret);
        setPaymentIntent(intentData.id);
        setPaymentIntentData(intentData);

        // if monthly subscription, then add coupon code to the url query and reload the page
        if (
          products[0].paymentType === EPaymentPeriod.Monthly ||
          products[0].paymentType === EPaymentPeriod.Yearly
        ) {
          const urlParams = new URLSearchParams(window.location.search);
          const coupon = urlParams.get("coupon");
          if (coupon) {
            setAppliedCoupon(intentData.coupon);
          }
        }
      } catch (error) {
      } finally {
        setLoading({ isLoading: false, title: "Loading..." });
      }
    };

    if (products.length > 0 && products[0] !== undefined) {
      fetchProductsAndCreateIntent();
    }
  }, [products]);

  const appearance: Appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <LoadingBar isLoading={loading.isLoading} title={loading.title} />
      <div className="bg-white min-h-screen flex justify-center w-full">
        <div className="lg:w-[1150px] flex flex-col-reverse lg:grid lg:grid-cols-11 ">
          <div className="lg:col-span-7  lg:pr-16">
            <div className="hidden lg:flex mt-14 lg:w-6/7 justify-start gap-5">
              {process.env.NEXT_PUBLIC_RECPATCHA_SITEKEY && (
                <ReCAPTCHA
                  size="invisible"
                  sitekey={process.env.NEXT_PUBLIC_RECPATCHA_SITEKEY}
                  ref={recaptchaRef}
                />
              )}

              <div className="flex gap-1 items-center">
                <Image
                  src={BrandLogo}
                  alt="brand logo"
                  className="w-12 h-auto"
                />
              </div>
              <div className="px-4 lg:px-0">
                <h6 className="font-Inter text-[28px] font-bold">Checkout </h6>
              </div>
            </div>
            {clientSecret && (
              <Elements
                options={options}
                // key={clientSecret}
                stripe={stripePromise}
              >
                <CheckoutForm
                  paymentIntent={paymentIntent}
                  email={email}
                  products={products}
                  setProducts={setProducts}
                  pricesData={productsInfo}
                  applyCoupon={applyCoupon}
                  appliedCoupon={appliedCoupon}
                  initProduct={initProduct}
                  CrossSellItemsAccessCheck={CrossSellItemsAccessCheck}
                  setLoading={setLoading}
                  removeCoupon={removeCoupon}
                  token={token}
                  recaptchaRef={recaptchaRef}
                />
              </Elements>
            )}
          </div>
          <div className="col-span-4  px-4 lg:px-0   flex-grow-0">
            <div className="bg-white  mt-8 lg:mt-28 br-16">
              {productsInfo && (
                <BillingTable
                  productsInfo={productsInfo}
                  appliedCoupon={appliedCoupon}
                  paymentIntentData={paymentIntentData}
                  token={token}
                />
              )}
            </div>
            <div className="bg-white border light-border p-4 rounded-2xl  mt-8 br-16">
              <div className="flex gap-1 items-center">
                <Image src={VerifiedIcon.src} width={40} height={40} alt="" />
                <h6 color={"primary"} className="font-Inter font-bold">
                  7 days Refund Policy
                </h6>
              </div>
              <div className="w-full mt-2">
                <h6 className=" font-medium text-sm text-[#5d5d5d]">
                  Unsure if our products and services are the right fit? Try it
                  risk-free for 7 days! Full refund guaranteed if not completely
                  satisfied.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session: any = await getSession(context);

  if (session && session.token) {
    const featuresOwned = await Account.features.checkAll(session.token);
    let info = await Account.getInfo(session.token);
    let CrossSellItemsAccessCheck = {
      isMasterclassOwner: AccountUtils.checkOwnerShip(
        featuresOwned,
        "63149a704f08614dd053ec3d"
      ),
      isAudioBookOwner: AccountUtils.checkOwnerShip(
        featuresOwned,
        "AudioBookIdHere"
      ),
    };

    return getProfile(context, {
      token: session.token,
      info,
      CrossSellItemsAccessCheck,
    });
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
