import Head from "next/head";
import { Fragment, useState } from "react";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openSnackBar } from "@/slices/snackBarSlice";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Account from "@/lib/mw/Accounts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import BrandIcon from "@/public/favIcon.png";

function Forgot({ baseUrl }) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function resetPass() {
    setIsLoading(true);
    try {
      let result = await Account.reset.reset(false, email, `/auth/forgot`);

      if (result.simple) {
        setIsSuccess(true);
      } else {
        dispatch(
          openSnackBar({
            severity: "error",
            timeout: 2000,
            title: "Error",
            message:
              result?.full?.message || "An error occurred, please try again",
          })
        );
      }
    } catch (e) {
      console.log(e);
      dispatch(
        openSnackBar({
          severity: "error",
          timeout: 2000,
          title: "Error",
          message: "An error occurred",
        })
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Forgot Password - Self Publishing Titans</title>
      </Head>

      <main className="  relative w-screen h-screen p-3 flex flex-col items-center">
        <div className="relative flex flex-col rounded-xl bg-white sp-container border-2 light-border p-5 md:rounded-xl w-full sm:w-1/2 xl:w-1/3 my-auto py-10">
          <div className="text-center p-4 text-2xl flex flex-col items-center gap-5 font-bold mb-10">
            <Image src={BrandIcon} alt="Brand Icon" width={100} height={100} />
            Forgot Password
          </div>
          {isSuccess && (
            <div className="text-center mb-5">
              <div className="text-xl text-gray-600">
                <Alert>
                  Check your email for a link to reset your password.
                </Alert>
              </div>
            </div>
          )}

          {!isSuccess && (
            <Fragment>
              <div className="">
                <Label className="text-label pb-2">Email</Label>
                <Input
                  className="mt-2 bg-white"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <Button onClick={() => resetPass()} className="mt-4">
                Send Reset Link <MessageSquareIcon /> {isLoading && " ..."}
              </Button>
            </Fragment>
          )}

          <br />

          <p className="text-sm text-center mt-auto mb-5">
            All Rights Reserved {new Date().getFullYear().toString()}
          </p>
        </div>
      </main>
    </div>
  );
}

// using next auth
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      baseUrl: context.req.headers.host,
    },
  };
}

export default Forgot;
