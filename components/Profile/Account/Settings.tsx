import { useState } from "react";
import Image from "next/image";
import Account from "@/lib/mw/Accounts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BrandLogo from "@/public/favIcon.png";
import LoadingBar from "@/components/utils/LoadingBar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function AccountTab({
  info,
  loading,
  setLoading,
  setShowError,
  blipNotif,
  token,
  showError,
}) {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function getOrdinalSuffix(date) {
    let j = date % 10,
      k = date % 100;
    if (j == 1 && k != 11) {
      return date + "st";
    }
    if (j == 2 && k != 12) {
      return date + "nd";
    }
    if (j == 3 && k != 13) {
      return date + "rd";
    }
    return date + "th";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = getOrdinalSuffix(date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `Member since ${day} ${month} ${year}`;
  }

  async function changePass() {
    setLoading(true);
    setShowError(false);
    setTimeout(async () => {
      if (loading) {
        return false;
      }
      // await Account.register(false, email, password)
      if (password != passwordConf) {
        setLoading(false);
        blipNotif();
        return setError("Password and Confirm Password does not match");
      }

      let result = await Account.changePassword(token, password);
      if (result) {
        router.reload();
      } else {
        setLoading(false);
        blipNotif();
        return setError("Network Error");
      }
    }, 10);
  }

  async function deleteAccount() {
    try {
      setLoading(true);
      const res = await Account.deleteAccount(token);
      if (res.simple == true) {
        // state.title = action.payload.title;
        // state.message = action.payload.message;
        // state.severity = action.payload.severity;
        // state.timeout = action.payload.timeout;

        await router.push("/api/logoutnow?next=/");

        // openSnackBar({
        //   severity: "success",
        //   timeout: 5000,
        //   title: "Account Deleted",
        //   message: "Your account has been deleted",
        // });
      } else {
        // openSnackBar({
        //   severity: "error",
        //   timeout: 5000,
        //   title: "Unable to delete account",
        //   message: "Please try again later",
        // });
        await router.push("/auth/me");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className=" bg-white mt-4 mb-2 p-3  border-2  light-border sp-container rounded-lg md:p-3 py-5 md:px-10 flex flex-col">
        <div className="flex flex-row items-center">
          <LoadingBar isLoading={loading} title="Loading..." />
          {/* <div className="h-full flex items-center"> */}
          <div className="w-20 h-20 border rounded-full flex justify-center items-center text-5xl text-white uppercase overflow-hidden">
            <Image
              src={info.image || BrandLogo.src}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              alt="brand logo"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <h2 className="mb-1 ml-5 font-bold text-[18px]">
              {info && info.email ? info.email : "SPT"}
            </h2>
            <p className=" ml-5 font-medium text-[16px]">
              {info && info.createdAt && formatDate(info.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-5 bg- justify-start items-center">
          <Button style={{ textTransform: "none" }} className=" ">
            <Link href={`/me/invoices`}>Invoices</Link> <ListIcon />
          </Button>
          <DeleteAccount action={deleteAccount} />
        </div>
      </div>
      <div className="flex w-full justify-center  mt-5">
        <div className="flex flex-col justify-start w-full mb-4 border-2  p-5  rounded-lg">
          <h6 className="pb-3 font-semibold text-[20px] font-sans">
            Change Password
          </h6>

          <div className="flex flex-col mt-2 md:flex-row gap-2 items-center">
            <div className="w-full md:w-1/3 flex flex-col justify-start">
              <Label>Enter New Password</Label>
              <Input
                className="rounded-md mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-start">
              <Label>Confirm new Password</Label>
              <Input
                className="rounded-md mt-2"
                // placeholder="Confirm new Password"
                // label="Confirm new Password"
                type="password"
                // variant="outlined"
                value={passwordConf}
                onChange={(e) => setPasswordConf(e.target.value)}
              />
            </div>

            <div className=" h-12 mt-5 flex justify-center items-center ">
              <Button onClick={() => changePass()} className="rounded-full">
                Change Password
              </Button>
            </div>
          </div>
          {error && (
            <p
              className={`${
                showError ? "block" : "hidden"
              } text-center text-primCol1-700 text-sm`}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export const DeleteAccount = ({ action }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-center py-2">
      <Button
        // color="error"
        variant="outline"
        style={{
          borderColor: "red",
          color: "red",
          textTransform: "none",
        }}
        // endIcon={<DeleteIcon />}
        onClick={() => setShow(true)}
      >
        Delete Account <TrashIcon />
      </Button>

      {show && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className=" w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4">
                      <h1 className="text-2xl">Are you sure?</h1>
                      <p className="text-gray-500">
                        This action cannot be undone. This will permanently
                        delete your account and unsubscribe you from email list.
                      </p>
                      <div className="flex justify-start">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => setShow(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={action}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
