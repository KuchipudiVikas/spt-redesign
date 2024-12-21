import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Account from "../../lib/mw/Accounts";
import image from "../../public/assets/images/bsr.webp";
import ga from "../../lib/ga";
import { priceInfo, toFixed } from "./KDP-Royalty-Calculator";

import { countryList, typeList, BSR_VALUES } from "@/data/kdpRoyality";
import { debounce } from "lodash";
import Image from "next/image";
import { getSession, GetSessionParams } from "next-auth/react";
import numberWithCommas from "@/utils/helper";
import axios from "axios";
import { domainMidDict } from "@/constants";
import { useDispatch } from "react-redux";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { User } from "@/lib/ts/types/user";
import { shopIds } from "@/data/shopData";
import PageTitle from "@/components/Common/PageTitle";
import MainLayout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCwIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const BSR_INDEX = {
  BSR: 0,
  US: 1,
  UK: 2,
  DE: 3,
  FR: 4,
  CA: 5,
  IT: 6,
  ES: 7,
  SE: 8,

  JP: 9,
  PL: 10,
  NL: 11,
  AU: 12,
};

const domainDictToBSR_INDEX = {
  "amazon.com": BSR_INDEX.US,
  "amazon.com.au": BSR_INDEX.AU,
  "amazon.com.mx": BSR_INDEX.US,
  "amazon.com.br": BSR_INDEX.US,
  "amazon.com.tr": BSR_INDEX.US,
  "amazon.co.uk": BSR_INDEX.UK,
  "amazon.de": BSR_INDEX.DE,
  "amazon.fr": BSR_INDEX.FR,
  "amazon.it": BSR_INDEX.IT,
  "amazon.es": BSR_INDEX.ES,
  "amazon.co.jp": BSR_INDEX.JP,
  "amazon.ca": BSR_INDEX.CA,
  "amazon.cn": BSR_INDEX.US, // no data
  "amazon.in": BSR_INDEX.US, // no data
  "amazon.nl": BSR_INDEX.NL,
  "amazon.ae": BSR_INDEX.US, // no data
  "amazon.sg": BSR_INDEX.US, // no data
  "amazon.sa": BSR_INDEX.US, // no data
  "amazon.se": BSR_INDEX.SE,
};

function roundTo(x: number, digits: number) {
  const factor = Math.pow(10, digits);
  return Math.round(x * factor) / factor;
}

async function fetchSalesEstimate(bsr: number, domain: string, token: any) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_GO_TITANS_API_URL}/api/v1/chrome/estimated-sales-free`,
    {
      bsr: bsr,
      domain: domain,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function BSRSalesCalculatorPage({ info, token }) {
  const { toast } = useToast();

  const [inputs, setInputs] = useState<any>({
    country: 1,
    bsr: 0,
  });
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [domain, setDomain] = useState("amazon.com");
  const [isFetching, setIsFetching] = useState(false);
  function calculateBSR() {
    if (!info || !token) {
      setShowAuthPopup(true);
      return;
    }
    ga.event({
      action: "tools_use_BSRCalculator",
      params: {
        what: "BSR Sales Calculated",
      },
    });

    setIsFetching(true);
    UpdateToolUsage(info._id, "bsr-sales");

    fetchSalesEstimate(parseInt(inputs.bsr), domain, token)
      .then((res) => {
        console.log(res.data);
        setResult({
          possible_sales: res.data.data.estimatedSales,
        });
        changeValue2("sales")(res.data.data.estimatedSales);
      })
      .catch((err) => {
        // dispatch(
        //   openSnackBar({
        //     message: err.response?.data?.error || "Something went wrong",
        //     title: "Error",
        //     severity: "error",
        //     timeout: 5000,
        //   })
        // );

        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data?.error || "Something went wrong",
        });
      })
      .finally(() => {
        setIsFetching(false);
      });

    // // reduce 30% from the final value
    // bsr_formula = bsr_formula * 0.7;
    // get bsr calculation value from the backend

    // setResult({
    //   possible_sales: bsr_formula,
    // });
    // changeValue2("sales")(toFixed(bsr_formula, 0));
  }

  const [result, setResult] = useState<any>({
    possible_sales: 0,
  });

  const changeValue = (target: string) => (value: any) => {
    setInputs({ ...inputs, [target]: value });
  };

  const changeValue2 = (target: string) => (value: any) => {
    setInputs2({ ...inputs2, [target]: value });
  };

  const [inputs2, setInputs2] = useState({
    type: "paperback",
    distribution: "us",
    interior: "black",
    pages: 100,
    prices: 10,
    sales: 1,
  });

  const [reference, setReference] = useState(
    priceInfo[inputs2.type][inputs2.distribution]
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [inputs2]
  );

  function changeHandler() {
    const setRef = priceInfo[inputs2.type][inputs2.distribution];
    const curInterior =
      priceInfo[inputs2.type][inputs2.distribution][inputs2.interior];
    setReference(setRef);

    // Printing Cost
    const category = inputs2.pages >= curInterior.small_max ? "big" : "small";
    const print_cost = toFixed(
      curInterior[`${category}_fixed`] +
        (inputs2.pages - curInterior[`${category}_add`]) *
          curInterior[`${category}_add`],
      2
    );

    // Minimum Listing Fee (Regular)
    const std_minimum = toFixed(print_cost / 0.6, 2);
    const std_royalty = toFixed(inputs2.prices * 0.6 - print_cost, 2);
    const sold_royalty = toFixed(std_royalty * inputs2.sales, 2);

    // Minimum Listing Fee (Expanded)
    const exp_minimum = toFixed(print_cost / 0.4, 2);
    const exp_royalty = toFixed(inputs2.prices * 0.4 - print_cost, 2);
    const sold_expanded_royalty = toFixed(exp_royalty * inputs2.sales, 2);

    setResult2({
      print_cost: print_cost,
      standard_minimum_price: std_minimum,
      standard_royalty: std_royalty,
      standard_break_even: toFixed((std_royalty / inputs2.prices) * 100, 2),
      expanded_minimum_price: exp_minimum,
      expanded_royalty: exp_royalty,
      expanded_break_even: toFixed((exp_royalty / inputs2.prices) * 100, 2),
      sold_royalty: sold_royalty,
      sold_expanded_royalty: sold_expanded_royalty,
    });

    // UpdateToolUsage(info._id, "bsr-sales");

    ga.event({
      action: "tools_use_royaltyCalculated",
      params: {
        what: "Royalty Calculated",
      },
    });
  }

  useEffect(() => {
    debouncedChangeHandler();
  }, [inputs2]);

  const [result2, setResult2] = useState<any>({
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

  return (
    <div>
      <MainLayout
        info={info}
        // showSidebar={false}
        // bgGray={false}
        meta={{
          title: "KDP BSR Sales Calculator",
          description:
            "Using my book sales calculator is really simple and easy. 1) Get the best seller rank of the book you want to see a sales estimate for and enter in into the BSR field. 2) Then select the Amazon country. By default it will be on Amazon USA. 3) Click on Calculate Sales button to get the sales estimate.",
          keywords: "",
        }}
        Title={<PageTitle title="KDP BSR Sales Calculator" />}
        Body={
          <div className="min-h-screen ">
            <div className=" mt-10 mx-2 max-w-screen-lg mx-auto  py-4 px-2 ">
              <div className="flex flex-col   md:flex-col">
                <div className="flex flex-col config-container md:flex-row justify-center items-center">
                  <div className=" mx-auto  ">
                    {/* <ComSelect
                      label="Select Country"
                      options={Object.keys(domainMidDict).map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      value={domain}
                      setValue={(value) => {
                        setDomain(value);
                        changeValue("country")(domainDictToBSR_INDEX[value]);
                      }}
                    /> */}

                    <select
                      className=""
                      value={domain}
                      onChange={(e) => {
                        setDomain(e.target.value);
                        changeValue("country")(
                          domainDictToBSR_INDEX[e.target.value]
                        );
                      }}
                    >
                      {Object.keys(domainMidDict).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    {/* <ComInput
                      label="Enter BSR (Best Seller Rank)"
                      value={inputs.bsr}
                      setValue={changeValue("bsr")}
                      type="number"
                      params={{
                        min: 0,
                        max: 3000000,
                      }}
                    /> */}

                    <Input
                      placeholder="Enter BSR (Best Seller Rank)"
                      value={inputs.bsr}
                      // setValue={changeValue("bsr")()}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        changeValue("bsr")(e.target.value);
                      }}
                      type="number"
                      className="py-5 w-full rounded-full"
                    />
                  </div>
                  <Button
                    className="ml-2 ml-auto rounded-full"
                    onClick={calculateBSR}
                  >
                    Calculate Sales
                    {isFetching && (
                      <RotateCwIcon className="animate-spin ml-2" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="px-5">
              <div className="rounded-md mx-4  sp-container flex flex-col light-border border justify-between md:flex-row max-w-screen-lg mx-auto px-4   mt-6 p-5">
                <h6 className="text-xl ">
                  Estimated Sales per Month:{" "}
                  <strong className="ml-2 text-primary">
                    {numberWithCommas(parseInt(result.possible_sales))}
                  </strong>
                </h6>
                <h6 className="text-xl ">
                  Estimated Sales per Day:{" "}
                  <strong className="ml-1 text-primary">
                    {result.possible_sales &&
                      (result.possible_sales / 30 > 1
                        ? numberWithCommas(
                            Math.floor(result.possible_sales / 30)
                          )
                        : "< 1")}
                  </strong>
                </h6>
              </div>
              <div className=" sp-container border light-border rounded-3xl flex flex-col md:flex-row max-w-screen-lg mx-auto p-4  px-5 border mt-6">
                <div className="flex-1">
                  <h6 className="font-semibold text-[22px]  mb-4">
                    Royalty Estimates
                  </h6>
                  {/* <ComSelect
                  label="Book Type"
                  options={[
                    { label: "Paperback", value: "paperback" },
                    { label: "Hardcover", value: "hardcover" },
                  ]}
                  value={inputs2.type}
                  setValue={changeValue2("type")}
                /> */}

                  <div className="mt-4">
                    <Label className="ml-2">Book Type</Label>
                    <select
                      className="form-select mt-1 block w-full"
                      value={inputs2.type}
                      onChange={(e) => {
                        changeValue2("type")(e.target.value);
                      }}
                    >
                      {[
                        { label: "Paperback", value: "paperback" },
                        { label: "Hardcover", value: "hardcover" },
                      ].map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* <ComSelect
                  label="Country"
                  options={countryList.filter((c) => c[inputs2.type])}
                  value={inputs2.distribution}
                  setValue={changeValue2("distribution")}
                /> */}
                  <div className="mt-4">
                    <Label className="ml-2">Distribution</Label>
                    <select
                      className="form-select mt-1 block w-full"
                      value={inputs2.distribution}
                      onChange={(e) => {
                        changeValue2("distribution")(e.target.value);
                      }}
                    >
                      {countryList
                        .filter((c) => c[inputs2.type])
                        .map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* <ComSelect
                  label="Interior Type"
                  options={typeList.filter((item) => item[inputs2.type])}
                  value={inputs2.interior}
                  setValue={changeValue2("interior")}
                /> */}

                  <div className="mt-4">
                    <Label className="ml-2">Interior Type</Label>
                    <select
                      className="form-select mt-1 block w-full"
                      value={inputs2.interior}
                      onChange={(e) => {
                        changeValue2("interior")(e.target.value);
                      }}
                    >
                      {typeList
                        .filter((item) => item[inputs2.type])
                        .map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mt-4">
                    <Label className="ml-2">Interior Type</Label>
                    <Input
                      value={inputs2.pages}
                      onChange={(e) => changeValue2("pages")(e.target.value)}
                      type="number"
                      className="mt-1 bg-white"
                      min={42}
                    />

                    <h6 className="text-xs ml-2 mb-5 text-gray-500">
                      Min Pages: <b>{reference[inputs2.interior].min}</b> - Max
                      Pages: <b>{reference[inputs2.interior].max}</b>
                      {(inputs2.pages > reference[inputs2.interior].max ||
                        inputs2.pages < reference[inputs2.interior].min) && (
                        <span className="text-secCol1-700 ml-4 font-bold">
                          Invalid Page Count
                        </span>
                      )}
                    </h6>
                  </div>

                  {/* <ComInput
                  label="Book Price"
                  value={inputs2.prices}
                  setValue={changeValue2("prices")}
                  type="number"
                /> */}

                  <div className="mt-4">
                    <Label className="ml-2">Book Price</Label>
                    <Input
                      value={inputs2.prices}
                      className="bg-white mt-1"
                      onChange={(e) => changeValue2("prices")(e.target.value)}
                      type="number"
                    />
                  </div>

                  <h6 className="text-xs ml-2 mb-5 text-gray-500">
                    Min Price:{" "}
                    <b>
                      {result2.standard_minimum_price} {reference.currency}
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
                  </h6>
                </div>

                <div className="flex-1">
                  <div className="w-full flex flex-col justify-between pb-24 h-full gap-5 p-4 mt-0 md:mt-12">
                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2] font-medium ">Book Royalty:</h6>
                        <h6
                          className={`flex-1 text-right ml-auto font-bold ${
                            result2.standard_royalty >= 0
                              ? " text-gray-500"
                              : "text-secCol1-600"
                          }`}
                        >
                          {result2.standard_royalty} {reference.currency}
                        </h6>
                      </div>

                      <h6 className="text-xs text-[#545d6a]">
                        Standard Royalty Profit: 60%
                      </h6>
                    </div>

                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2] font-medium ">
                          Printing Cost:{" "}
                        </h6>
                        <h6 className="flex-1 text-right ml-auto font-medium ">
                          {result2.print_cost} {reference.currency}
                        </h6>{" "}
                      </div>
                    </div>

                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2] font-medium">
                          Expanded Distribution Royalty:{" "}
                        </h6>
                        <h6
                          className={`flex-1 text-right ml-auto font-medium ${
                            result2.expanded_royalty >= 0
                              ? " text-gray-500"
                              : "text-secCol1-600"
                          }`}
                        >
                          {result2.expanded_royalty} {reference.currency}
                        </h6>{" "}
                      </div>
                      <h6 className="text-xs text-[#545d6a]">
                        Expanded Distribution Royalty Profit: 40%
                      </h6>
                    </div>

                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2] font-medium ">
                          Standard Minimum List price:{" "}
                        </h6>
                        <h6 className="flex-1 text-right ml-auto font-medium ">
                          {result2.standard_minimum_price} {reference.currency}
                        </h6>{" "}
                      </div>
                    </div>

                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2]  font-medium ">
                          Expanded Distribution Minimum List price:{" "}
                        </h6>
                        <h6 className="flex-1 text-right ml-auto font-medium ">
                          {result2.expanded_minimum_price} {reference.currency}
                        </h6>{" "}
                      </div>
                    </div>

                    <div className="">
                      <div className="flex ">
                        <h6 className="flex-[2] font-medium ">
                          ACOS Breakeven:{" "}
                        </h6>
                        <h6
                          className={`flex-1 text-right ml-auto font-medium ${
                            result2.standard_break_even >= 0
                              ? " text-gray-500"
                              : "text-secCol1-600"
                          }`}
                        >
                          {result2.standard_break_even}%
                        </h6>{" "}
                      </div>
                    </div>
                    {/* <Button
                    variant="contained"
                    className="ml-auto mt-4"
                    onClick={calculateBSR}
                  >
                    Calculate
                  </Button> */}
                  </div>
                </div>
              </div>
              <div className="rounded-md sp-container light-border border flex flex-col justify-between md:flex-row max-w-screen-lg mx-auto px-4  border mt-6">
                <div className="py-2 pt-4">
                  <div className="flex">
                    <h6 className="flex-[2] font-medium ">
                      Total Book Royalty as Sold:
                    </h6>
                    <h6
                      className={`flex-1 text-right ml-auto font-medium ${
                        result2.sold_royalty >= 0
                          ? " text-gray-500"
                          : "text-secCol1-600"
                      }`}
                    >
                      {result2.sold_royalty} {reference.currency}
                    </h6>{" "}
                  </div>
                  <h6 className="text-xs text-[#545d6a]">
                    Standard Royalty Profit: 60%
                  </h6>
                </div>
                <div className="py-2 pb-4">
                  <div className="flex">
                    <h6 className="flex-[2] font-medium ">
                      Total Book Expanded Royalty as Sold:{" "}
                    </h6>
                    <h6
                      className={`flex-1 text-right ml-auto font-medium  ${
                        result.sold_expanded_royalty >= 0
                          ? " text-gray-500"
                          : "text-secCol1-600"
                      }`}
                    >
                      {result2.sold_expanded_royalty} {reference.currency}
                    </h6>
                  </div>
                  <h6 className="text-[#545d6a] text-xs">
                    Expanded Distribution Royalty Profit: 40%
                  </h6>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session: any = await getSession(context);

  // @ts-ignore
  const { resolvedUrl } = context;

  if (!session) {
    return {
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
      token: session.token,
    },
  };
}

export default BSRSalesCalculatorPage;
