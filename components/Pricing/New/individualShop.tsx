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
import { ImageLinkIndex } from "@/data/ImageLinkIndex";

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
                    className="sp-container p-3 border light-border   rounded-lg flex flex-col justify-between  w-full h-full relative"
                  >
                    {listing.isSale && listing.sale_price && (
                      <p className="w-fit text-xs themeGradient p-3 px-6 text-center text-white absolute top-0 right-0">
                        {roundToNone(
                          (1 - listing.sale_price / listing.price) * 100
                        )}
                        % OFF
                      </p>
                    )}

                    <div className="relative w-full aspect-w-16 aspect-h-9">
                      {ImageLinkIndex[listing.id] ? (
                        <Image
                          src={ImageLinkIndex[listing.id]}
                          alt={listing.Title}
                          className="w-full h-[206px] object-cover rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      ) : listing.video_url !== "false" ? (
                        <iframe
                          src={listing.video_url}
                          className=" w-full h-[206px] rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                      ) : (
                        <Image
                          src={listing.displayImage.url}
                          alt={listing.Title}
                          className="w-full h-full rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      )}
                    </div>

                    <h6 className="px-4 mt-2 font-semibold ">
                      {listing.Title}
                    </h6>
                    {/* {listing.id} */}

                    <div className="px-3 pt-1.5 ml-1">
                      {listing.Description && (
                        <h6 className="text-gray-700">
                          <div
                            className="leading-relaxed  font-sans text-sm "
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
                        <Button
                          disabled={listing?.isLifetimeOwned}
                          style={{
                            cursor: listing?.isLifetimeOwned ? "" : "pointer",
                          }}
                          className={` mr-2 rounded-full ${
                            listing?.isLifetimeOwned
                              ? "bg-gray-500 "
                              : "themeGradient"
                          }`}
                        >
                          <Link
                            href={
                              listing.buy_page === ""
                                ? `/shop/${listing.id}`
                                : listing.buy_page
                            }
                            passHref
                            className="  "
                          >
                            Buy
                          </Link>
                        </Button>
                        {productsWithPreview.includes(listing.id) && (
                          <Link
                            href={shopUrlIndex[listing.id]}
                            passHref
                            target={
                              isOpenNewTab(listing.id) ? "_blank" : "_self"
                            }
                            className=" rounded-md"
                          >
                            <Button className="rounded-full" variant="outline">
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
