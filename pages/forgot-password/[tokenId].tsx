import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Account from "@/lib/mw/Accounts";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ForgotID({ tokenId }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function resetPass() {
    setLoading(true);
    setError(false);

    if (password !== confpassword) {
      setError("Password and Confirm Password not Equal");
      setLoading(false);
      blipNotif();
      return false;
    }

    setTimeout(async () => {
      if (loading) {
        return false;
      }
      try {
        let result = await Account.reset.confirm(tokenId, password);
        // console.log(result.data.error.full)
        if (result.simple) {
          await router.replace(`/auth/login`);
        } else {
          // todo: implement
          setError(result.simple);
          console.error(result.simple);
        }
      } catch (e) {}
      setLoading(false);
      blipNotif();
    }, 10);
  }

  function blipNotif() {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 10);
  }

  return (
    <div>
      <Head>
        <title>Forgot Password - Self Publishing Titans</title>
        <meta name="description" content="Login with PuzzBud" />
      </Head>
      <main className="BG_Box relative w-screen h-screen flex flex-col items-center bg-gradient-to-br from-slate-200">
        <div className="relative shadowAround flex flex-col rounded-xl bg-white border border-gray-500 p-5 md:rounded-xl w-full sm:w-1/2 xl:w-1/3 my-auto py-14">
          {/* <div className=" rounded-xl absolute top-2 left-2 -right-2 -bottom-2 bg-black -z-10">
            &nbps;
          </div> */}
          <div className="text-center p-4">
            <h6>Reset Password</h6>
          </div>

          {/* <ComInput
            icon={"key"}
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          /> */}
          <label htmlFor="">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <ComInput
            icon={"key"}
            label="Confirm Password"
            value={confpassword}
            setValue={setConfPassword}
            onEnter={resetPass}
            type="password"
          /> */}
          <label htmlFor="">Confirm Password</label>
          <Input
            type="password"
            value={confpassword}
            className="mt-4"
            onChange={(e) => setConfPassword(e.target.value)}
          />
          {/* 
          <ComButton
            text=
            action={resetPass}
          /> */}

          <Button onClick={() => resetPass()} className="w-full mt-4">
            {loading ? (
              <div className="h-3 w-3 bg-primCol1-100 animate-bounce mx-auto m-1" />
            ) : (
              <div>Reset Password</div>
            )}
          </Button>
          {error && (
            <p
              className={`${
                showError ? "block" : "hidden"
              } text-center text-primCol1-700 text-sm`}
            >
              <div>{error}</div>
            </p>
          )}
          <br />

          <h6 className=" mt-auto mb-5">
            All Rights Reserved {new Date().getFullYear().toString()}
          </h6>
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

  let isValid = await Account.reset.check(false, context.query.tokenId);

  if (!isValid.simple) {
    return {
      redirect: {
        destination: "/tools/pagemake/forgot",
        permanent: false,
      },
    };
  }

  return {
    props: {
      tokenId: context.query.tokenId,
    },
  };
}

export default ForgotID;
