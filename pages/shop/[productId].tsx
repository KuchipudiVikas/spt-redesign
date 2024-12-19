import MainLayout, {
  getProfile,
  getProfileWithToken,
} from "@/components/Layout";

import Accounts from "../../lib/mw/Accounts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaypalComponent from "@/components/checkout/Paypal";
import { account_info } from "@/lib/mw/Accounts/Account";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaqSection, IFaq } from "@/components/Common/FaqItem";
import { ShoppingCartIcon } from "lucide-react";
import Account from "../../lib/mw/Accounts";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";

function floatToEuro(float) {
  var euroCurrency;
  euroCurrency =
    "$ " +
    float
      .toLocaleString("nl-NL", { minimumFractionDigits: 2 })
      .replace(",", ".");
  return euroCurrency;
}

export const defaultFaqs: IFaq[] = [
  {
    question: "What is refund policy on your items?",
    answer: `
    <ul>
  <li>7-day money-back guarantee for our tools.</li>
  <li>No refunds on services, but you can ask for up to 3 revisions or changes to ensure you are happy.</li>
  <li>No refunds on digital downloads (e.g., cover templates, coloring pages, other templates, etc.).</li>
</ul>

    `,
  },
  {
    question: "Do we get commercials rights with your digital downloads?",
    answer:
      "Yes you have full commercial rights to use for your own projects with KDP or elsewhere. You just cannot re-sell items as is to another.",
  },
  {
    question: "Are all your designs created by an illustrator?",
    answer: `
      <ul>
  <li>All of our 9,000+ coloring elements in our Coloring Book Maker tool were hand-drawn over the years by our 2 in-house illustrators.</li>
  <li>Cover design graphics: Some were created by our illustrators, some with different AI tools, and some were created by AI tools and then edited by our illustrators.</li>
</ul>

    `,
  },

  {
    question: "Can you ask for new features to be added to tools?",
    answer: `
    Yes, we have an entire full-time in-house development team that is constantly working on updating, upgrading and creating new tools. If you find any features you think are missing or would be a great addition, we would love to hear your ideas and requests. Same goes with any bugs. If you encounter any, please let us know through our support chat on website. Also, if you have any wishes for new tools, also let us know. Our only goal is to create the best possible tools for you guys.

    `,
  },
];

function ShopViewIndex({ info, token, productInfo, comments, purchased }) {
  const router = useRouter();

  const [isDo, setIsDo] = useState(false);
  if (productInfo.Title == undefined) {
    productInfo.Title = "Product Title";
  }

  console.log(productInfo);

  async function purchaseNow(token, productId) {
    localStorage.setItem("referrer", window.location.href);

    router.replace(`/checkout/v3?product=${productId}`);
    setIsDo(false);
  }

  async function subscribeNow() {
    try {
      setIsDo(true);

      let subscribeFunction = Accounts.features.subscribeItem;

      let link = await subscribeFunction(
        token,
        productInfo.id,
        `https://www.selfpublishingtitans.com/payment-success?feature-id=${productInfo.id}&type=tools&next=${router.asPath}`,
        "https://www.selfpublishingtitans.com/payment-failed"
      );

      if (link.simple) {
        if (productInfo.price > 0) {
          router.push(link.simple);
        } else {
          router.reload();
        }
      }
    } catch (e) {}
    setIsDo(false);
  }

  let faqItems: IFaq[] = [];

  if (productInfo?.faq) {
    const faq = productInfo.faq.map((item) => {
      return {
        question: item.question,
        answer: item.answer,
      };
    });

    faqItems = [...faqItems, ...faq];
  }

  // return console.log("info is ", info);

  return (
    <MainLayout
      meta={{
        title: "Shop - Self Publishing Titans",
        description:
          "Self Publishing Titans offers a variety of features to help you publish your book. From book cover design to editing, we have you covered.",
        keywords: "self publishing",
      }}
      info={info}
      Title={<PageTitle title={"Shop - Self Publishing Titans"} />}
      Body={
        <div className="min-h-screen">
          <div className="container mx-auto sp-container  border-2 light-border mt-10 rounded-3xl p-8 ">
            <div className="lg:w-4/4 mx-auto grid grid-cols-1 shadowAround  p-5  flex-col md:grid-cols-3 md:flex-row flex-wrap justify-center">
              {productInfo.video_url !== "false" ? (
                <div className={`w-full col-span-2  forceFlexImportant`}>
                  <iframe
                    className="aspect-video videoRatioStandard w-full md:max-w-[600px] rounded-lg h-64 md:h-80"
                    src={productInfo.video_url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin"
                  ></iframe>
                </div>
              ) : (
                <div className="col-span-2">
                  <Image
                    src={productInfo.displayImage.url}
                    width={1000}
                    height={1000}
                    className="w-full br-16 rounded-3xl wh h-auto "
                    alt="image"
                  />
                </div>
              )}

              <div className="col-span-1 w-full mx-auto md:pl-10 md:pb-2 pt-2 mt-0 md:mt-0 flex flex-col">
                <div
                  className="leading-relaxed flex-1 mt-0 font-semibold   text-md "
                  dangerouslySetInnerHTML={{
                    __html: productInfo.Description,
                  }}
                ></div>

                <div className="flex flex-col mt-4">
                  <div className="mb-4">
                    {productInfo.isSale && productInfo.sale_price && (
                      <p className="title-font font-medium text-sm text-gray-500 line-through">
                        {floatToEuro(productInfo.price).replace(",", ".")}
                      </p>
                    )}
                    <span className="title-font  font-medium text-2xl text-gray-900">
                      {productInfo.price <= 0
                        ? "FREE!"
                        : floatToEuro(
                            productInfo.isSale && productInfo.sale_price
                              ? productInfo.sale_price
                              : productInfo.price
                          ).replace(",", ".")}
                    </span>
                  </div>
                  {token === false || info === false ? (
                    <a
                      className="flex ml-auto text-white bg-secCol1-500 border-0 py-2 px-6 focus:outline-none  rounded"
                      href={`/login?next=${router.asPath}`}
                    >
                      Login To Purchase
                    </a>
                  ) : purchased ? (
                    <a className="flex  cursor-not-allowed text-white  border-0 py-2  disabled rounded">
                      {productInfo.mode === "subscription" ? (
                        <Button>Already Subscribed</Button>
                      ) : (
                        <Button color="success">Already Purchased</Button>
                      )}
                    </a>
                  ) : isDo ? (
                    <div className="w-5 h-5 animate-pulse bg-secCol1-500 ml-auto mr-6"></div>
                  ) : (
                    <div>
                      {productInfo.mode === "subscription" ? (
                        <div>
                          <Button
                            className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none  hover:cursor-pointer rounded"
                            onClick={() => subscribeNow()}
                          >
                            Subscribe Now
                          </Button>
                          <hr />
                          <div className="mt-4" />
                          {/* <PaypalComponent
                              productInfo={productInfo}
                              token={token}
                            /> */}
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row">
                          <Button
                            className="rounded-full"
                            onClick={() => purchaseNow(token, productInfo.id)}
                            style={{ minWidth: "120px" }}
                          >
                            Buy Now <ShoppingCartIcon size={16} />
                          </Button>

                          <div className="mt-2 md:mt-0 md:ml-2" />

                          <PaypalComponent
                            productInfo={productInfo}
                            token={token}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {faqItems.length !== 0 && (
              <section>
                <div className="flex flex-col-reverse md:flex-row container mt-20 ">
                  <div className="flex flex-col  ">
                    <FaqSection faq={faqItems} />
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      }
    />
  );
}

export default ShopViewIndex;

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
    if (context.query.productId === "66bc919c54230590086dd6f4") {
      const masterclass = await Accounts.features.checkLifetimeByProduct(
        token,
        "63149a704f08614dd053ec3d"
      );
      const res = await account_info(token);
      if (!masterclass.simple && res.full.data.type !== 3) {
        // return to the masterclass page
        return {
          redirect: {
            destination: "/masterclass",
            permanent: false,
          },
        };
      }
    }
  } catch (e) {
    purchased = [];
  }
  try {
    token = session.token;
    purchased = await Accounts.features.checkLifetimeByProduct(
      token,
      product.simple.id
    );

    const res = await account_info(token);

    if (
      res.full.data !== undefined &&
      res.full.data.type === 3 &&
      context.query.productId === "63149a704f08614dd053ec3d"
    ) {
      purchased.simple = true;
    }
  } catch (e) {
    purchased = [];
  }

  if (product?.simple && product?.simple?.feature_type === "service") {
    purchased.simple = null;
  }

  const info = await Account.getInfo(token);

  const profile = await getProfileWithToken(context, {
    productInfo: product.simple,
    purchased: purchased.simple !== null,
    token: token,
    info: info.full.data,
  });

  return profile;
}
