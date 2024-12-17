import Link from "next/link";
import MainLayout, {
  getProfile,
  getProfileWithToken,
} from "@/components/Layout";
import Accounts from "../../../lib/mw/Accounts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isImageURL } from "../../../utils/common";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/Common/PageTitle";

function floatToEuro(float) {
  let euroCurrency;
  euroCurrency =
    "$ " +
    float
      .toLocaleString("nl-NL", { minimumFractionDigits: 2 })
      .replace(",", ".");
  return euroCurrency;
}

function ShopViewIndex({
  info,
  token,
  productInfo,
  comments,
  purchased,
  courseLink,
}) {
  const router = useRouter();
  const [isDo, setIsDo] = useState(false);

  async function purchaseNow() {
    try {
      setIsDo(true);

      console.log("V121 ");

      let purchaseFunction =
        productInfo.price > 0
          ? Accounts.features.buyitem
          : Accounts.features.getfreeitem;

      let link = await purchaseFunction(
        token,
        [productInfo.id],
        "/payment-success?type=course&next=/masterclass/courses/" +
          productInfo.id,
        "/payment-failed"
      );

      if (link.simple) {
        if (productInfo.price > 0) {
          router.push(link.simple);
        } else {
          if (router.query.productId === "638c2b8a5b7662c0d7e7fdfc") {
            router.push("/masterclass/courses/638c2b8a5b7662c0d7e7fdfc");
          } else {
            router.reload();
          }
        }
      }
    } catch (e) {
      if (
        e.message ===
        'Invalid action name, may only include "A-Za-z/_". Do not include user-specific information.'
      ) {
        console.error("Error in purchaseNow:", e);
      } else {
        console.error("Error in purchaseNow:", e);
      }
    }
    setIsDo(false);
  }

  const handleLoaded = (_) => {
    (window as any).grecaptcha.ready((_) => {
      (window as any).grecaptcha
        .execute("6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w", {
          action: "masterclass-checkout",
        })
        .then((token) => {
          console.log(token);
          if (!token) {
            alert(
              "Something wrong ... you google recaptcha challenge failed.."
            );
            router.push("/");
          }
        });
    });
  };

  useEffect(() => {
    if (!token) {
      router.push(`/auth/register?next=${router.asPath}`);
    }

    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w";
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  return (
    <MainLayout
      meta={{
        title: `Buy Feature (${productInfo.Title}) - Self Publishing Titans`,
        description: "",
        keywords: "",
      }}
      Title={<PageTitle title={`Course Shop`} showBySptButton={false} />}
      Body={
        <>
          <div
            className="g-recaptcha"
            data-sitekey="6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w"
            data-size="invisible"
          ></div>

          <div className="min-h-[60vh]">
            <div className="container mx-auto px-5 pt-6 pb-24">
              <div className=" mx-auto flex mt-20 items-center flex-col md:flex-row flex-wrap justify-center">
                <div className={`w-full md:w-1/2 `}>
                  {productInfo.displayImage && productInfo.displayImage.url ? (
                    isImageURL(productInfo.displayImage.url) ? (
                      <Image
                        src={productInfo.displayImage.url}
                        width={800}
                        height={800}
                        alt={"Master class Display Image"}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          src={productInfo.displayImage.url}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                      </div>
                    )
                  ) : null}
                </div>

                <div className="w-full md:w-1/2 mx-auto md:px-10 md:py-6 mt-6 md:mt-0 flex flex-col">
                  <h1 className="text-gray-900 text-xl  font-semibold mb-1">
                    {productInfo.Title}
                  </h1>
                  <hr />
                  <div
                    style={{
                      fontSize: "16px",
                    }}
                    className="leading-relaxed  flex-1 mt-4 text-xl"
                    dangerouslySetInnerHTML={{
                      __html: productInfo.Description,
                    }}
                  ></div>

                  <div className="flex items-center mt-8">
                    {purchased ? (
                      <Link href={courseLink} passHref legacyBehavior>
                        <Button className="rounded-full">
                          Go to Course <ArrowRight />
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <div className="">
                          {productInfo.isSale && productInfo.sale_price && (
                            <p className="title-font font-medium text-sm text-gray-500 line-through">
                              {floatToEuro(productInfo.price).replace(",", ".")}
                            </p>
                          )}
                          <span className="title-font font-medium text-2xl text-gray-900">
                            {productInfo.price <= 0 ? (
                              <span className="bg-transparent text-green-500 text-[18px] font-bold">
                                {" "}
                                FREE!{" "}
                              </span>
                            ) : (
                              floatToEuro(
                                productInfo.isSale && productInfo.sale_price
                                  ? productInfo.sale_price
                                  : productInfo.price
                              ).replace(",", ".")
                            )}
                          </span>
                        </div>

                        {isDo ? (
                          <div className="w-5 h-5 animate-pulse bg-secCol1-500 ml-auto mr-6"></div>
                        ) : info ? (
                          <div className="flex justify-end ml-auto flex-col">
                            <Button
                              className={`rounded-full`}
                              onClick={purchaseNow}
                            >
                              {router.query.productId ===
                              "638c2b8a5b7662c0d7e7fdfc"
                                ? "Go To Course"
                                : "Buy Now!"}{" "}
                              <ArrowRight />
                            </Button>
                          </div>
                        ) : (
                          <a
                            className="flex ml-auto  border border-secCol1-500 py-2 px-6 focus:outline-none rounded"
                            href={`/auth/login?next=${router.asPath}`}
                          >
                            Login To Purchase
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      info={info}
    />
  );
}

export default ShopViewIndex;

// using next auth
export async function getServerSideProps(context) {
  const session: any = await getSession(context);
  let product: any = { simple: [] };
  try {
    product = await Accounts.features.view(false, context.query.productId);
  } catch (e) {
    console.log(e);
  }

  let purchased: any = [];
  let token = false;
  try {
    token = session.token;
    purchased = await Accounts.features.checkByProduct(
      token,
      product.simple.id
    );
    // let res = await account_info(token);

    // if (res.full.data !== undefined && res.full.data.type === 3) {
    //   purchased.simple = true;
    // }
  } catch (e) {
    purchased = [];
  }

  const info = await getProfileWithToken(context, {
    productInfo: product.simple,
    purchased: purchased.simple !== null,
    token: token,
    courseLink: "/masterclass/courses/" + product.simple.id,
  }).catch((e) => {
    console.log("error in getProfileWithToken", e);
  });

  return info;
}
