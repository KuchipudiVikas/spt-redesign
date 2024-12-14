import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const bytesToValue = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export function StorageTab({
  // title,
  // unsubscribeNow,
  // updatePaymentMethod,
  // links,
  // manageBillingCycle,
  // isSubscription,
  // subscription,
  token,
}) {
  const [totalStorage, setTotalStorage] = useState<any>(0);
  const [usedStorage, setUsedStorage] = useState<any>(0);

  const [totalStorageValue, setTotalStorageValue] = useState<any>(0);
  const [usedStorageValue, setUsedStorageValue] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  async function getStorage() {
    try {
      setLoading(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/cloud/usage",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const total = res.data.data.total || 0;
      const used = res.data.data.used || 0;
      setTotalStorageValue(total);
      setUsedStorageValue(used);
      setTotalStorage(bytesToValue(total));
      setUsedStorage(bytesToValue(used));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h6 className="font-bold">Storage</h6>
        <Link href="/cloud-storage/pricing">
          <Button className="btn btn-primary">Buy More Storage</Button>
        </Link>
      </div>

      <div>
        <Progress
          value={
            totalStorage === 0
              ? 0
              : (usedStorageValue / totalStorageValue) * 100
          }
        />

        <h6 className="mt-2">
          {usedStorage} used out of {totalStorage} {loading && "Loading..."}
        </h6>
      </div>

      {/* {isNothingPurchased && (
        <div className="flex  items-center justify-center mt-4">
          <h6>
            No Storage was Purchased.{" "}
            <Link href={"/shop"}>
              <Button>Visit shop </Button>
            </Link>
          </h6>
        </div>
      )} */}

      {/* <div className="flex gap-4 mt-4 justify-start items-start">
        {purchaseList.subscriptions.map((card, index) => (
          <ProductCard
            key={index}
            title={card.feature_shop.title}
            isSubscription={true}
            subscription={card}
            unsubscribeNow={unsubscribeNow}
            updatePaymentMethod={updatePaymentMethod}
            links={card.feature_shop.links}
            manageBillingCycle={manageBillingCycle}
            token={token}
          />
        ))}
      </div> */}
    </div>
  );
}
