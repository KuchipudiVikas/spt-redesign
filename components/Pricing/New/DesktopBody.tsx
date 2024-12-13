import React from "react";
import { XIcon } from "lucide-react";
import { CheckIcon } from "lucide-react";
import { Fragment } from "react";
import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/constants";

import {
  EPaymentPeriod,
  ESubscriptionStatusType,
} from "@/lib/models/enums/common";

interface DesktopBodyProps {
  featuresMobile: any[];
  products: any[];
  paymentPeriod: any;
}

const DesktopBody: React.FC<DesktopBodyProps> = ({
  featuresMobile,
  products,
  paymentPeriod,
}) => {
  return (
    <div className={`hidden  lg:table-header-group  overflow-y-auto`}>
      {featuresMobile.map((featureChild, idx) => {
        return (
          <div key={"p_" + idx} className="rounded-lg ">
            <div
              style={{
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                background: "#ede8ff",
              }}
              className="  dark:bg-gray-800  mt-4 p-2  dark:border-gray-700"
            >
              <div className=" font-medium  text-gray-900 whitespace-nowrap dark:text-white">
                <h6 className="md:ml-2 md:text-xl font-bold md:py-2">
                  {featureChild.title}
                </h6>
              </div>
            </div>
            {featureChild.includes.map((item, idx) => {
              return (
                <div
                  style={{
                    borderBottomLeftRadius:
                      idx == featureChild.includes.length - 1 ? "16px" : "0px",
                    borderBottomRightRadius:
                      idx == featureChild.includes.length - 1 ? "16px" : "0px",
                    borderBottom:
                      idx < featureChild.includes.length - 1
                        ? "1px solid #ede8ff"
                        : "0px",
                    background: "#f9f7ff",
                  }}
                  className={` md:text-lg ${
                    featureChild.includes.length > idx + 1 ? "bottomBorder" : ""
                  }   grid grid-cols-5  dark:bg-gray-800 dark:border-gray-700`}
                  key={"c_" + idx}
                >
                  <div
                    className={`px-6 py-4 ${
                      featureChild.includes.length > idx + 1
                        ? "bottomBorder"
                        : ""
                    } font-medium  text-gray-900 col-span-2  dark:text-white`}
                  >
                    <h6
                      className={`text-[16px] text-[#484343] ${
                        item.subtitle && "font-semibold text-[#000]"
                      }`}
                    >
                      {item.title}
                    </h6>
                    <h6 className="text-[14px] font-normal capitalize">
                      {item.subtitle}
                    </h6>
                  </div>
                  <div className="col-span-3 w-full grid grid-cols-4">
                    {item.isAvailable.map((itemChild, idx2) => {
                      if (
                        paymentPeriod === EPaymentPeriod.Monthly &&
                        featureChild.title === "KDP Masterclass"
                      ) {
                        // return cross only
                        return (
                          <Fragment key={"cc_" + idx + idx2}>
                            <td
                              className={`px-6 py-4     md:mx-auto text-center`}
                            >
                              <XIcon className="" />
                            </td>
                          </Fragment>
                        );
                      }

                      if (
                        paymentPeriod === EPaymentPeriod.Lifetime &&
                        itemChild.availability === Availability.MonthlyOnly
                      ) {
                        return (
                          <Fragment key={"cc_" + idx + idx2}>
                            <td className="px-6 py-4   md:mx-auto text-center">
                              <XIcon className="" />
                            </td>
                          </Fragment>
                        );
                      }

                      if (itemChild.text) {
                        return (
                          <td
                            className="px-6 py-4  md:mx-auto  text-center"
                            key={"ccc_" + idx + idx2}
                          >
                            <h6 className="text-black capitalize">
                              {itemChild.text}
                            </h6>
                          </td>
                        );
                      }
                      return (
                        <Fragment key={"cc_" + idx + idx2}>
                          <td
                            className={`px-6 py-4   ${
                              featureChild.includes.length > idx + 1
                                ? "bottomBorder"
                                : ""
                            }  md:mx-auto my-auto text-center`}
                          >
                            {itemChild.status === AccessTypes.Limited ||
                            itemChild.status === AccessTypes.Max100Entries ||
                            itemChild.status === AccessTypes.Max200Entries ? (
                              <h6 className="text-black capitalize font-bold">
                                {itemChild.status}
                              </h6>
                            ) : (
                              <div className="flex justify-center items-center">
                                {itemChild.status === AccessTypes.Available ? (
                                  <div className="">
                                    {(featureChild.title ===
                                      "Puzzle & Activity Book Tools" ||
                                      featureChild.title ==
                                        "Coloring Book Maker Tool") &&
                                    paymentPeriod == EPaymentPeriod.Lifetime &&
                                    idx == 3 ? (
                                      <div
                                        style={{
                                          strokeWidth: "3px",
                                        }}
                                        className="bg-red-500 rounded-full w-fit text-white p-2 "
                                      >
                                        <XIcon size={24} />
                                      </div>
                                    ) : (
                                      <div className="">
                                        <div
                                          style={{
                                            strokeWidth: "3px",
                                            // width: "35px",
                                            // height: "35px",
                                          }}
                                          className="bg-green-700 rounded-full w-fit text-white p-2 "
                                        >
                                          <CheckIcon size={24} />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      strokeWidth: "3px",
                                    }}
                                    className="bg-red-500 rounded-full w-fit text-white p-2 "
                                  >
                                    <XIcon size={24} />
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </Fragment>
                      );
                      // }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DesktopBody;
