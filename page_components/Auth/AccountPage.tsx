import React from "react";
import { User } from "@/lib/ts/types/user";
import Account from "../../lib/mw/Accounts";
import Accounts from "../../lib/mw/Accounts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import {
  CloudDownloadIcon,
  DatabaseIcon,
  PencilIcon,
  VideoIcon,
  SettingsIcon,
} from "lucide-react";
import ToolsTab from "@/components/Profile/Account/Tools";
import { CoursesTab } from "@/components/Profile/Account/Courses";
import { useState, useEffect } from "react";
import formbricks from "@formbricks/js/app";
import $ from "jquery";
import DownloadableTab from "@/components/Profile/Account/Downloadable";
import { StorageTab } from "@/components/Profile/Account/Storage";
import AccountTab from "@/components/Profile/Account/Settings";
import { CircleDollarSign, ReceiptText } from "lucide-react";

export interface AccountPageProps {
  info: User;
  token: string;
  downloadList: any;
  courses: any;
  collectionHistory: any;
  purchaseList: any;
}

type Tabs =
  | "Tools"
  | "Courses"
  | "Downloadable"
  | "Storage"
  | "Settings"
  | "Subscriptions"
  | "Invoices";

const AccountPageComp: React.FC<AccountPageProps> = ({
  info,
  token,
  downloadList,
  courses,
  collectionHistory,
  purchaseList,
}) => {
  const [selecetedTab, setSelectedTab] = React.useState<Tabs>("Tools");
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [unsubscribeID, setUnsubscribeID] = useState(null);

  const [loading, setLoading] = React.useState(false);

  console.log("purchases list", purchaseList);

  async function unsubscribeNow(subs_id) {
    try {
      setLoading(true);
      setShowError(false);

      let unsubscribeFunction = Accounts.features.unsubscribeItem;

      let res = await unsubscribeFunction(token, subs_id);
      toast({
        title: "Unsubscribed",
        description: "unsubscribe successful",
      });
      router.reload();
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to unsubscribe",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  async function updatePaymentMethod(subs_id) {
    try {
      const data = {
        subscription_id: subs_id,
        success_url:
          window.location.origin +
          `/card-update-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: window.location.origin + `/card-update-failed`,
      };
      setLoading(true);
      setShowError(false);

      let res = await Accounts.features.updatePaymentMethod(token, data);

      const link = res.data.session.url;
      if (link) {
        router.push(link);
      } else {
        toast({
          title: "Error",
          description: "Unable to update payment method",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to update payment method",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  function blipNotif() {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 10);
  }

  async function manageBillingCycle(subs_id) {
    setLoading(true);
    setShowError(false);
    const data = {
      subscription_id: subs_id,
    };

    try {
      const res = await Accounts.features.manageBillingCycle(token, data);
      console.log(res);
      if (res.status === 200 && res?.data?.session?.url) {
        window.location.href = res.data.session.url;
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to manage billing cycle",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const handleButtonClick = (e) => {
      if (e.target.innerText === "Cancel Now") {
        unsubscribeNow(unsubscribeID);
      }
    };

    $(document).on("click", "button", handleButtonClick);

    return () => {
      // Cleanup to avoid multiple event listeners
      $(document).off("click", "button", handleButtonClick);
    };
  }, [unsubscribeID]); // The effect will run whenever `unsubscribeID` changes

  const unsubscribe = (subs_id) => {
    // setIsUnsubscribing(true);
    formbricks.track("cancel_subscription");
    setUnsubscribeID(subs_id);
  };

  const hasSubscriptions = purchaseList?.subscriptions?.length > 0;

  return (
    <div>
      <div
        style={{
          padding: "60px",
          position: "relative",
        }}
        className="flex gap-10"
      >
        <div className="tab-container ">
          <div
            className={`tab ${selecetedTab === "Tools" ? "active" : ""}`}
            onClick={() => setSelectedTab("Tools")}
          >
            <PencilIcon size={24} />
            Tools
          </div>
          <div
            className={`tab ${selecetedTab === "Courses" ? "active" : ""}`}
            onClick={() => setSelectedTab("Courses")}
          >
            <VideoIcon size={24} />
            Courses
          </div>
          <div
            className={`tab ${selecetedTab === "Downloadable" ? "active" : ""}`}
            onClick={() => setSelectedTab("Downloadable")}
          >
            <CloudDownloadIcon size={24} />
            Downloadable
          </div>
          <div
            className={`tab ${selecetedTab === "Storage" ? "active" : ""}`}
            onClick={() => setSelectedTab("Storage")}
          >
            <DatabaseIcon size={24} />
            Storage
          </div>
          <div
            className={`tab ${selecetedTab === "Settings" ? "active" : ""}`}
            onClick={() => setSelectedTab("Settings")}
          >
            <SettingsIcon size={24} />
            Settings
          </div>
          <div
            className={`tab ${
              selecetedTab === "Subscriptions" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("Subscriptions")}
          >
            <CircleDollarSign size={24} />
            Manage Subscriptions
          </div>
          <div
            className={`tab ${selecetedTab === "Invoices" ? "active" : ""}`}
            onClick={() => setSelectedTab("Invoices")}
          >
            <ReceiptText size={24} />
            Invoices
          </div>
        </div>
        <div className="tab-content w-full">
          {selecetedTab === "Tools" && (
            <ToolsTab
              purchaseList={purchaseList}
              unsubscribeNow={unsubscribeNow}
              token={token}
              updatePaymentMethod={updatePaymentMethod}
              manageBillingCycle={manageBillingCycle}
            />
          )}
          {selecetedTab === "Courses" && <CoursesTab courses={courses} />}
          {selecetedTab === "Downloadable" && (
            <DownloadableTab downloadList={downloadList} />
          )}
          {selecetedTab === "Storage" && <StorageTab token={token} />}
          {selecetedTab === "Settings" && (
            <AccountTab
              showError={showError}
              setLoading={setLoading}
              setShowError={setShowError}
              blipNotif={blipNotif}
              token={token}
              info={info}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPageComp;
