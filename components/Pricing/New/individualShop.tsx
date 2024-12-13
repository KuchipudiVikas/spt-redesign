import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, roundToNone } from "@/utils/common";
import {
  productsWithPreview,
  shopUrlIndex,
  descriptionIndex,
  shop_bundle_description,
  isOpenNewTab,
} from "@/data/shopData";

export const IndividualShopItems = ({
  features,
  cols = 3,
  size = 1,
  paddingX = " lg:max-w-7xl lg:px-8 px-4",
}) => {
  return (
    <section>
      <div className=" pb-16 sm:pb-24">
        <div
          className={`mt-6 grid grid-cols-1 gap-y-3 gap-x-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cols} xl:gap-x-7 xl:gap-y-7  mx-auto h-full ${paddingX}  sm:px-6 `}
        >
          {features
            .sort((a, b) => a.index - b.index)
            .filter((item) => item.isOnShop === true)
            .map((listing, index2) => {
              console.log(listing);
              if (listing.price <= 0) return null;
              return (
                <div key={`ft_${index2}`} className="flex my-3 h-full w-full">
                  <div
                    key={`ft_${index2}`}
                    className="transform  scale-95 hover:scale-100 transition-transform  shadow-2xl rounded-lg flex flex-col justify-between  w-full h-full relative"
                  >
                    {listing.isSale && listing.sale_price && (
                      <p className="w-fit text-xs themeGradient p-3 px-6 text-center text-white absolute top-0 right-0">
                        {roundToNone(
                          (1 - listing.sale_price / listing.price) * 100
                        )}
                        % OFF
                      </p>
                    )}

                    {listing.video_url !== "false" ? (
                      <div className=" object-center object-cover ">
                        <iframe
                          src={listing.video_url}
                          className="aspect-2  rounded-lg object-contain w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="w-full videoRatioStandard flex items-start">
                        <Image
                          src={listing.displayImage.url}
                          alt={listing.Title}
                          className=" w-full h-auto rounded-lg object-contain aspect-content "
                          width={1000}
                          height={1000}
                          // layout="fill"
                        />
                      </div>
                    )}

                    <h6 className="px-4 mt-2 ">{listing.Title}</h6>
                    {/* {listing.id} */}

                    <div className="px-4 pt-1.5 ml-1">
                      {listing.Description && (
                        <h6 className="text-gray-700">
                          <div
                            className="leading-relaxed  font-sans text-md "
                            dangerouslySetInnerHTML={{
                              __html: listing.Description,
                            }}
                          ></div>
                        </h6>
                      )}
                    </div>
                    {/* {listing.id} */}

                    <div className="p-4 mt-auto flex justify-between items-center flex-wrap py-4">
                      <div className=" w-fit">
                        {/* <Link passHref className="  "> */}
                        {/* @ts-ignore */}
                        <Button
                          passHref
                          href={
                            listing.buy_page === ""
                              ? `/shop/${listing.id}`
                              : listing.buy_page
                          }
                          disabled={listing?.isLifetimeOwned}
                          variant="contained"
                          className={` mr-2 ${
                            listing?.isLifetimeOwned
                              ? "bg-gray-300 cursor-not-allowed"
                              : "themeGradient"
                          }`}
                        >
                          Buy
                        </Button>
                        {/* </Link> */}
                        {productsWithPreview.includes(listing.id) && (
                          <Link
                            href={shopUrlIndex[listing.id]}
                            passHref
                            target={
                              isOpenNewTab(listing.id) ? "_blank" : "_self"
                            }
                            className=" rounded-md"
                          >
                            <Button className="" variant="outline">
                              Preview
                            </Button>
                          </Link>
                        )}
                        {listing.preview_url && (
                          <Link
                            href={listing.preview_url}
                            passHref
                            className=" text-sm "
                          >
                            <Button variant="outline" className=" mr-2">
                              Preview
                            </Button>
                          </Link>
                        )}
                        {listing.review_url && (
                          <Link
                            href={listing.review_url}
                            passHref
                            className=" text-sm "
                          >
                            <Button variant="outline" className=" mr-2">
                              Reviews
                            </Button>
                          </Link>
                        )}
                      </div>
                      <div className="w-fit flex flex-col justify-center">
                        {listing.isSale && listing.sale_price && (
                          <p className="text-md flex-1 text-gray-900 text-right">
                            <span className="font-extrabold">
                              {formatCurrency(listing.sale_price)}
                            </span>
                          </p>
                        )}
                        <p
                          className={`text-md flex-1 font-bold text-right ${
                            listing.isSale && listing.sale_price
                              ? "text-xs line-through transform scale-70 text-right text-gray-500"
                              : ""
                          }`}
                        >
                          {listing.price <= 0
                            ? "FREE!"
                            : formatCurrency(listing.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
