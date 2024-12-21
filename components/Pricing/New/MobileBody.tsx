import React from "react";
import { Fragment } from "react";
import MobileTableExpander from "@/components/Pricing/New/MobileTableExpander";
import Image from "next/image";
import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/constants";

import crossIcon from "@/public/assets/images/cross-svgrepo-com.svg";
import checkMarkIcon from "@/public/assets/images/tick-svgrepo-com.svg";

import styles from "@/styles/titans-pro/style.module.css";
import {
  EPaymentPeriod,
  ESubscriptionStatusType,
} from "@/lib/models/enums/common";

interface MobileBodyProps {
  featuresMobile: any[];
  paymentPeriod: EPaymentPeriod;
}

const MobileBody: React.FC<MobileBodyProps> = ({
  featuresMobile,
  paymentPeriod,
}) => {
  return (
    <tbody className={` lg:hidden h-96 `}>
      {featuresMobile.map((feature, idx) => {
        // remove the free package from the list

        return (
          <Fragment key={"p_" + idx}>
            <MobileTableExpander title={feature.title}>
              {feature.includes.map((item, idx) => {
                return (
                  <Fragment key={"c_" + idx}>
                    <tr className="w-full">
                      <th
                        scope="row"
                        colSpan={3}
                        className="border text-center py-2 w-full  text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex w-full justify-center">
                          <p className="text-md whitespace-normal max-w-[90vw]">
                            {item.title}
                          </p>{" "}
                        </div>
                      </th>
                    </tr>

                    <tr className="bg-white flex w-full dark:bg-gray-800 dark:border-gray-700">
                      {item.isAvailable.map((itemChild, idx) => {
                        // remove the free package from the list
                        if (
                          itemChild.name === productsType.Free ||
                          itemChild.name == "puzzle bundle"
                        )
                          return null;

                        if (
                          paymentPeriod === EPaymentPeriod.Lifetime &&
                          itemChild.availability === Availability.MonthlyOnly
                        ) {
                          return (
                            <td className=" py-3 border-2 flex-1 text-center">
                              <Image
                                priority
                                height={10}
                                width={10}
                                className={`${styles.iconD} h-4 w-4`}
                                src={crossIcon}
                                alt="#"
                              />
                            </td>
                          );
                        }
                        if (itemChild.text) {
                          return (
                            <td
                              className=" py-3 border-2 flex-1 text-center"
                              key={"ccc_" + idx}
                            >
                              <h6 className="text-black capitalize">
                                {itemChild.text}
                              </h6>
                            </td>
                          );
                        }
                        return (
                          <td className=" ">
                            {itemChild.status === AccessTypes.Limited ||
                            itemChild.status === AccessTypes.Max100Entries ||
                            itemChild.status === AccessTypes.Max200Entries ? (
                              <span className="text-black text-center">
                                {itemChild.status}
                              </span>
                            ) : (
                              <Image
                                priority
                                height={10}
                                width={10}
                                className={`${styles.iconD} h-4 w-4`}
                                src={
                                  feature.title === "KDP Masterclass" &&
                                  paymentPeriod === EPaymentPeriod.Monthly
                                    ? crossIcon
                                    : itemChild.status === AccessTypes.Available
                                    ? (feature.title ==
                                        "Puzzle & Activity Book Tools" ||
                                        feature.title ==
                                          "Coloring Book Maker Tool") &&
                                      paymentPeriod ==
                                        EPaymentPeriod.Lifetime &&
                                      idx == 3
                                      ? crossIcon
                                      : checkMarkIcon
                                    : crossIcon
                                }
                                alt="#"
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </MobileTableExpander>
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default MobileBody;
