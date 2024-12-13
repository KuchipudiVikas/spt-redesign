import React from "react";
import { keepaDomainMidDict } from "@/constants";
import { UpdateUsage as UpdateToolUsage } from "@/api/usage";
import HintWrapper from "@/utils/hint";
import { toast, useToast } from "@/hooks/use-toast";
import { shopIds } from "@/data/shopData";
import { asinTrackerSampleData } from "@/data/sample/asinTracker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import {
  RemoveProductTrackingAPI,
  StartProductTrackingAPI,
} from "@/lib/bsr-and-asin/api";

export default function ConfigComponent({
  domain,
  setDomain,
  trackAsin,
  setTrackAsin,
  setIsLoading,
  isOwner,
  token,
  dispatch,
  router,
  setSampleData,
  info,
}) {
  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (trackAsin.length < 4) {
        alert("Please enter a valid ASIN");
        return;
      }
      setIsLoading(true);
      // make api call to add asin
      if (!isOwner) return alert("Please purchase a plan to use this feature");
      const res = await StartProductTrackingAPI({
        token: token,
        asins: [trackAsin],
        domain: domain.replace("www.", ""),
      });
      UpdateToolUsage(info._id, shopIds.ASIN_TRACKER_SHOP_ID);
      setIsLoading(false);
      if (res.status === 200) {
        setTrackAsin("");
        location.reload();
      } else {
        const resJson = await res.json();
        if (resJson.error === "user not paid") {
          alert("Please upgrade your plan to use this feature");
          return router.push("/titans-ultra");
        }
        toast({
          title: "Error occurred!",
          description: resJson.error || "Something went wrong!",
        });
      }
    }
  }

  async function handleButtonClick() {
    if (!isOwner) return alert("please purchase a plan to use this feature");
    if (trackAsin.length < 4) {
      alert("Please enter a valid ASIN");
      return;
    }
    // make api call to add asin

    setIsLoading(true);
    // make api call to add asin
    const res = await StartProductTrackingAPI({
      token: token,
      asins: [trackAsin],
      domain: domain.replace("www.", ""),
    });

    UpdateToolUsage(info._id, shopIds.ASIN_TRACKER_SHOP_ID);

    setIsLoading(false);
    if (res.status === 200) {
      setTrackAsin("");
      location.reload();
    } else {
      const resJson = await res.json();
      if (resJson.error === "user not paid") {
        alert("Please upgrade your plan to use this feature");
        return router.push("/titans-ultra");
      }
      toast({
        title: "Error occurred!",
        description: resJson.error || "Something went wrong!",
      });
    }
  }

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <section
    //   style={{
    //     marginTop: "-50px",
    //   }}
    >
      <div className=" ">
        {/* vertical scrollable bar with fixed header and add asin input field */}
        <div className="flex flex-col">
          <div className="config-container">
            <select
              className=""
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
              }}
            >
              {Object.keys(keepaDomainMidDict).map((key) => {
                return (
                  <option value={key} key={key} className="font-mono">
                    {key.replace("www.", "")}
                  </option>
                );
              })}
            </select>

            <Input
              className="font-bold hidden md:block "
              ref={inputRef}
              value={trackAsin}
              placeholder="Enter ASIN to track"
              onChange={(e) => {
                setTrackAsin(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />

            <HintWrapper hint="Click to track product">
              <Button
                className="mt-5 md:mt-0 md:ml-0 w-full rounded-full md:w-fit"
                color="primary"
                // disabled={trackAsin.length < 4}
                onClick={() => {
                  if (!trackAsin) {
                    inputRef?.current?.focus();
                    alert("Please enter a valid ASIN");
                    return;
                  } else {
                    handleButtonClick();
                  }
                }}
              >
                Track Product
              </Button>
            </HintWrapper>
          </div>
          {true && (
            <div className="samples-container ">
              <h6>
                {" "}
                {!isOwner ? "Want to test and preview our tool?" : ""} Here are
                some free ones to check out
              </h6>
              <div className="sample-btn-container">
                <Button
                  onClick={() =>
                    setSampleData(asinTrackerSampleData.sample_data1)
                  }
                >
                  sample 1
                  <ArrowRight size={20} />
                </Button>
                <Button
                  onClick={() =>
                    setSampleData(asinTrackerSampleData.sample_data2)
                  }
                >
                  sample 2
                  <ArrowRight size={20} />
                </Button>
                <Button
                  onClick={() =>
                    setSampleData(asinTrackerSampleData.sample_data3)
                  }
                >
                  sample 3
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
