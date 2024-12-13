import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Account from "../../lib/mw/Accounts";
import { debounce } from "lodash";

import ga from "../../lib/ga";
import { getSession } from "next-auth/react";
import {
  priceInfo_paperback,
  priceInfo_hardcover,
  priceInfo_hardcover_big,
  priceInfo_paperback_big,
  countryList,
  trim_sizes,
  typeList,
} from "@/data/kdpRoyality";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import MainLayout from "@/components/Layout";
import { GetServerSidePropsContext } from "next";
import PageTitle from "@/components/Common/PageTitle";
import { User } from "@/lib/ts/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function toFixed(num: number, fixed: number) {
  fixed = fixed || 0;
  return parseFloat(num.toFixed(fixed));
}

// width and height in inch

export const priceInfo = {
  paperback: priceInfo_paperback,
  hardcover: priceInfo_hardcover,
};

export const priceInfo_big = {
  paperback: priceInfo_paperback_big,
  hardcover: priceInfo_hardcover_big,
};

interface RoyaltyCalculatorPageProps {
  info: User;
}

function RoyaltyCalculatorPage({ info }: RoyaltyCalculatorPageProps) {
  const [inputs, setInputs] = useState({
    type: "paperback",
    distribution: "us",
    interior: "black",
    pages: 100,
    prices: 10,
    sales: 1,
    trim_size_label: "5 x 8 in",
    trim_size_value: {
      width: 5,
      height: 8,
    },
  });

  const [reference, setReference] = useState(
    priceInfo[inputs.type][inputs.distribution]
  );
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [inputs]
  );

  function changeHandler() {
    let setRef = priceInfo[inputs.type][inputs.distribution];
    let curInterior =
      priceInfo[inputs.type][inputs.distribution][inputs.interior];
    setReference(setRef);

    if (
      inputs.trim_size_value.width > 6.12 ||
      inputs.trim_size_value.height > 9
    ) {
      setRef = priceInfo_big[inputs.type][inputs.distribution];
      curInterior =
        priceInfo_big[inputs.type][inputs.distribution][inputs.interior];
      setReference(setRef);
    }

    // Printing Cost
    const category = inputs.pages >= curInterior.small_max ? "big" : "small";
    const print_cost = toFixed(
      curInterior[`${category}_fixed`] +
        (inputs.pages - curInterior[`${category}_add`]) *
          curInterior[`${category}_add`],
      2
    );

    // Minimum Listing Fee (Regular)
    const std_minimum = toFixed(print_cost / 0.6, 2);
    const std_royalty = toFixed(inputs.prices * 0.6 - print_cost, 2);
    const sold_royalty = toFixed(std_royalty * inputs.sales, 2);

    // Minimum Listing Fee (Expanded)
    const exp_minimum = toFixed(print_cost / 0.4, 2);
    const exp_royalty = toFixed(inputs.prices * 0.4 - print_cost, 2);
    const sold_expanded_royalty = toFixed(exp_royalty * inputs.sales, 2);

    setResult({
      print_cost: print_cost,
      standard_minimum_price: std_minimum,
      standard_royalty: std_royalty,
      standard_break_even: toFixed((std_royalty / inputs.prices) * 100, 2),
      expanded_minimum_price: exp_minimum,
      expanded_royalty: exp_royalty,
      expanded_break_even: toFixed((exp_royalty / inputs.prices) * 100, 2),
      sold_royalty: sold_royalty,
      sold_expanded_royalty: sold_expanded_royalty,
    });

    UpdateToolUsage(info._id, "acos-calculator");

    ga.event({
      action: "tools_use_royaltyCalculated",
      params: {
        what: "Royalty Calculated",
      },
    });
  }

  // useEffect(() => {
  //   debouncedChangeHandler();
  // }, [inputs]);

  const [result, setResult] = useState<any>({
    print_cost: 0,
    standard_minimum_price: 0,
    standard_royalty: 0,
    standard_break_even: 0,
    expanded_minimum_price: 0,
    expanded_royalty: 0,
    break_even: 0,
    expanded_break_even: 0,
    sold_royalty: 0,
    sold_expanded_royalty: 0,
  });

  const changeValue = (target: string) => (value: string) => {
    if (!info) {
      setShowAuthPopup(true);
      return;
    }
    if (target === "trim_size_label") {
      const trim_size = value.split(" x ");
      setInputs({
        ...inputs,
        trim_size_label: value,
        trim_size_value: {
          width: parseFloat(trim_size[0]),
          height: parseFloat(trim_size[1]),
        },
      });
      return;
    }
    setInputs({ ...inputs, [target]: value });
  };

  return (
    <div>
      {/* {showAuthPopup && <AuthPopupComponent />} */}
      <MainLayout
        info={info}
        // showSidebar={false}
        // bgGray={false}
        // transparentNav={true}
        meta={{
          title: "ACOS Royalty Calculator",
          description: "Calculate Royalty for your KDP Books",
          keywords: "ACOS Royalty Calculator, Self Publishing Titans",
        }}
        Title={<PageTitle title="ACOS Royalty Calculator" />}
        Body={
          <div className="min-h-screen ">
            <div className="m-12 mt-24 mb-10  rounded-3xl max-w-screen-lg mx-auto p-6  ">
              <div className=" flex flex-col  mt-5 md:flex-row gap-10">
                <div className="flex-1 p-5 rounded-3xl sp-container border light-border ">
                  {/* <ComSelect
                    label="Book Type"
                    options={[
                      { label: "Paperback", value: "paperback" },
                      { label: "Hardcover", value: "hardcover" },
                    ]}
                    value={inputs.type}
                    setValue={changeValue("type")}
                  /> */}

                  <h1 className="font-semibold w-fit mx-auto mb-8 text-[30px]">
                    Book Details
                  </h1>

                  <div className="mb-5">
                    <Label className="text-label pb-2">Book Type</Label>
                    <select
                      className="w-full mt-2"
                      value={inputs.type}
                      onChange={(e) => changeValue("type")(e.target.value)}
                    >
                      <option value="paperback">Paperback</option>
                      <option value="hardcover">Hardcover</option>
                    </select>
                  </div>

                  {/* <ComSelect
                    label="Country"
                    options={countryList.filter((c) => c[inputs.type])}
                    value={inputs.distribution}
                    setValue={changeValue("distribution")}
                  /> */}
                  <div className="mb-5">
                    <Label className="text-label pb-2">Country</Label>
                    <select
                      className="w-full mt-2"
                      value={inputs.distribution}
                      onChange={(e) =>
                        changeValue("distribution")(e.target.value)
                      }
                    >
                      {countryList
                        .filter((c) => c[inputs.type])
                        .map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          );
                        })}
                    </select>
                  </div>

                  {/* <ComSelect
                    label="Interior Type"
                    options={typeList.filter((item) => item[inputs.type])}
                    value={inputs.interior}
                    setValue={changeValue("interior")}
                  /> */}

                  <div className="mb-5">
                    <Label className="text-label pb-2">Interior Type</Label>
                    <select
                      className="w-full mt-2"
                      value={inputs.interior}
                      onChange={(e) => changeValue("interior")(e.target.value)}
                    >
                      {typeList
                        .filter((item) => item[inputs.type])
                        .map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          );
                        })}
                    </select>
                  </div>
                  {/* 
                  <ComSelect
                    label="Trim Size"
                    options={trim_sizes.map((size) => {
                      return {
                        label: `${size.width} x ${size.height} in`,
                        value: `${size.width} x ${size.height} in`,
                      };
                    })}
                    value={inputs.trim_size_label}
                    setValue={changeValue("trim_size_label")}
                  /> */}

                  <div className="mb-5">
                    <Label className="text-label pb-2">Trim Size</Label>
                    <select
                      className="w-full mt-2"
                      value={inputs.trim_size_label}
                      onChange={(e) =>
                        changeValue("trim_size_label")(e.target.value)
                      }
                    >
                      {trim_sizes.map((size) => {
                        return (
                          <option value={`${size.width} x ${size.height} in`}>
                            {size.width} x {size.height} in
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-5">
                    <Label className="text-label pb-2">Page Count</Label>
                    <Input
                      value={inputs.pages}
                      // setValue={changeValue("pages")}
                      className="bg-white mt-2"
                      onChange={(e) => changeValue("pages")(e.target.value)}
                      type="number"
                    />
                    <p className="text-xs  mb-5 text-gray-500">
                      Min Pages: <b>{reference[inputs.interior].min}</b> - Max
                      Pages: <b>{reference[inputs.interior].max}</b>
                      {(inputs.pages > reference[inputs.interior].max ||
                        inputs.pages < reference[inputs.interior].min) && (
                        <span className="text-secCol1-700 ml-4 font-bold">
                          Invalid Page Count
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mb-5">
                    <Label className="text-label pb-2">Book Price</Label>
                    <Input
                      value={inputs.prices}
                      // setValue={changeValue("prices")}
                      className="bg-white mt-2"
                      onChange={(e) => changeValue("prices")(e.target.value)}
                      type="number"
                    />
                    <p className="text-xs  mb-5 text-gray-500">
                      Min Price:{" "}
                      <b>
                        {result.standard_minimum_price} {reference.currency}
                      </b>{" "}
                      - Max Price:{" "}
                      <b>
                        {reference.maxPrice} {reference.currency}
                      </b>
                      {inputs.prices > reference.maxPrice && (
                        <span className="text-secCol1-700 ml-4 font-bold">
                          Invalid Price
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex-1  flex items-start flex-col ">
                    <Label className="text-label pb-2">
                      Amount of Books Sold
                    </Label>
                    <Input
                      value={inputs.sales}
                      // setValue={changeValue("sales")}
                      className="bg-white mt-2 mb-5"
                      onChange={(e) => changeValue("sales")(e.target.value)}
                      type="number"
                    />
                    <Button className="w-full" onClick={() => changeHandler()}>
                      Submit
                    </Button>
                  </div>
                </div>
                <div className="flex-1 border rounded-3xl">
                  <h1 className="font-semibold w-fit mt-4  mx-auto mb-8 text-[30px]">
                    Overall Estimation
                  </h1>
                  <div className="w-full p-4 mt-0 md:mt-12">
                    <div className="flex">
                      <h6 className="flex-[2] font-medium  ">Book Royalty: </h6>
                      <h6
                        className={`flex-1 text-right ml-auto font-bold ${
                          result.standard_royalty >= 0
                            ? " text-gray-500"
                            : "text-secCol1-600"
                        }`}
                      >
                        {result.standard_royalty} {reference.currency}
                      </h6>{" "}
                    </div>
                    <h6 className="text-xs text-gray-500">
                      Standard Royalty Profit: 60%
                    </h6>

                    <br />

                    <div className="flex">
                      <h6 className="flex-[2] font-medium">Printing Cost: </h6>
                      <h6 className="flex-1 text-right ml-auto font-bold text-gray-500 ">
                        {result.print_cost} {reference.currency}
                      </h6>{" "}
                    </div>

                    <br />

                    <div className="flex">
                      <h6 className="flex-[2] font-medium">
                        Expanded Distribution Royalty:{" "}
                      </h6>
                      <p
                        className={`flex-1 text-right ml-auto font-bold ${
                          result.expanded_royalty >= 0
                            ? " text-gray-500"
                            : "text-secCol1-600"
                        }`}
                      >
                        {result.expanded_royalty} {reference.currency}
                      </p>{" "}
                    </div>
                    <h6 className="text-xs text-gray-500 ">
                      Expanded Distribution Royalty Profit: 40%
                    </h6>

                    <br />

                    <div className="flex">
                      <h6 className="flex-[2] font-medium">
                        Standard Minimum List price:{" "}
                      </h6>
                      <p className="flex-1 text-right ml-auto ">
                        {result.standard_minimum_price} {reference.currency}
                      </p>{" "}
                    </div>

                    <br />

                    <div className="flex">
                      <h6 className="flex-[2] font-medium">
                        Expanded Distribution Minimum List price:{" "}
                      </h6>
                      <p className="flex-1 text-right ml-auto ">
                        {result.expanded_minimum_price} {reference.currency}
                      </p>{" "}
                    </div>

                    <br />

                    <div className="flex">
                      <h6 className="flex-[2] font-medium ">
                        ACOS Breakeven:{" "}
                      </h6>
                      <p
                        className={`flex-1 text-right ml-auto font-bold ${
                          result.standard_break_even >= 0
                            ? " text-gray-500"
                            : "text-secCol1-600"
                        }`}
                      >
                        {result.standard_break_even}%
                      </p>{" "}
                    </div>
                    <div className=" flex flex-col md:flex-row">
                      <div className="flex-1">
                        <div className="w-full  mt-0 ">
                          <div className="flex">
                            <h6 className="flex-[2] font-medium mt-4">
                              Total Book Royalty as Sold:{" "}
                            </h6>
                            <p
                              className={`flex-1 text-right ml-auto font-bold ${
                                result.sold_royalty >= 0
                                  ? " text-gray-500"
                                  : "text-secCol1-600"
                              }`}
                            >
                              {result.sold_royalty} {reference.currency}
                            </p>{" "}
                          </div>
                          <h6 className="text-xs text-gray-500">
                            Standard Royalty Profit: 60%
                          </h6>

                          <br />

                          <div className="flex">
                            <h6 className="flex-[2] font-medium">
                              Total Book Expanded Royalty as Sold:{" "}
                            </h6>
                            <p
                              className={`flex-1 text-right ml-auto font-bold ${
                                result.sold_expanded_royalty >= 0
                                  ? " text-gray-500"
                                  : "text-secCol1-600"
                              }`}
                            >
                              {result.sold_expanded_royalty}{" "}
                              {reference.currency}
                            </p>{" "}
                          </div>
                          <h6 className="text-xs text-gray-500">
                            Expanded Distribution Royalty Profit: 40%
                          </h6>

                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      // props: {
      //   info: false,
      // },
      redirect: {
        destination: "/auth/login?next=" + resolvedUrl,
        permanent: false,
      },
    };
  }

  let info = await Account.getInfo(session.token);

  return {
    props: {
      info: info.full.data,
    },
  };
}

export default RoyaltyCalculatorPage;
