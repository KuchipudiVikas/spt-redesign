import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { popupKeyAffiliate } from "@/data/constants";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Input } from "@/components/ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import { RotateCcw, RotateCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import GoogleIcon from "@/public/assets/home/google.png";
import AppleLogo from "@/public/assets/home/apple-logo.png";

export const ChromeExtensionLogin = ({ session }: any) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        reject("Timeout");
      }, 2000);
      // send message to chrome extension on successful login
      //   @ts-ignore
      if (chrome && chrome.runtime) {
        const bodyElement = document.body;
        const titansProId = bodyElement.getAttribute(
          "data-titans-pro-extension-id"
        );
        const titansQuickViewId = bodyElement.getAttribute(
          "data-titans-quick-view-extension-id"
        );
        const type = "TITANS_LOGIN";
        if (titansProId) {
          // send message to chrome extension on successful login
          //   @ts-ignore
          chrome.runtime.sendMessage(
            titansProId,
            {
              type: type,
              payload: session,
            },
            // @ts-ignore
            function (response) {
              resolve(response); // Resolve the promise after sending the message
            }
          );
        }

        if (titansQuickViewId) {
          // send message to chrome extension on successful login
          //   @ts-ignore
          chrome.runtime.sendMessage(
            titansQuickViewId,
            {
              type: type,
              payload: session,
            },
            // @ts-ignore
            function (response) {
              resolve(response); // Resolve the promise after sending the message
            }
          );
        }
      } else {
        reject("chrome.runtime not found");
      }
    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise if an error occurs
    }
  });
};

export const NewChromeExtensionLogin = ({ session }: any) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        reject("Timeout");
      }, 2000);
      // send message to chrome extension on successful login
      //   @ts-ignore
      if (chrome && chrome.runtime) {
        const bodyElement = document.body;
        let extensionID = bodyElement.getAttribute(
          "data-self-publishing-titans-ext-id"
        );

        if (!extensionID) {
          extensionID = "ojgjjepllfimojpfpjafhdicldpakpph";
        }

        const action = "CHECK_AUTH";
        if (extensionID) {
          // send message to chrome extension on successful login
          //   @ts-ignore
          chrome.runtime.sendMessage(
            extensionID,
            {
              action: action,
              payload: session,
            },
            function (response: any) {
              console.log(response);
              resolve(response);
            }
          );
        }
      } else {
        reject("chrome.runtime not found");
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

const handleGoogleLogin = async () => {
  const { google } = window as any;

  google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    callback: async (response: any) => {
      // Sign in with the token provided by Google
      await signIn("googleonetap", {
        credential: response.credential,
        redirect: true,
      });
    },
    cancel_on_tap_outside: true,
    itp_support: true,
    ux_mode: "redirect",
    style:
      "position: absolute; top: 100px; right: 30px;width: 0; height: 0; z-index: 1001;",
  });

  google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed()) {
      console.log("Not Displayed", notification.getNotDisplayedReason());
      console.log(notification.getNotDisplayedReason());
    } else if (notification.isSkippedMoment()) {
      console.log("Skipped: ", notification.getSkippedReason());
    } else if (notification.isDismissedMoment()) {
      console.log("isDismissedMoment", notification.getDismissedReason());
    }
  });
};

const LoginPage = () => {
  const recaptchaRef: any = React.createRef();

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");

  const [cookies, setCookie, removeCookie] = useCookies([
    popupKeyAffiliate,
    "titansPro",
  ]);

  function checkError(data: any, setError: any, setAlert: any) {
    const setErrorMessage = (message: string) => {
      setError(message);
      setAlert({ show: true, message, type: "error" });
      console.log("alerted", message);
    };

    if (data.Error) {
      setErrorMessage(data.Error);
    } else if (data.code === "ECONNREFUSED") {
      setErrorMessage("A Server Issue Happened. Please Try Again.");
    } else if (data.error) {
      setErrorMessage(data.error);
    } else if (data.data?.error) {
      setErrorMessage(data.data.error);
    } else {
      setErrorMessage("An Error Occurred. Please Try Again.");
    }
  }

  function onSuccess() {
    setAlert({
      show: true,
      message: "Logged in Successfully",
      type: "success",
    });
    try {
      removeCookie(popupKeyAffiliate, { path: "/" });
      removeCookie("titansPro", { path: "/" });
      localStorage.removeItem("setId");
      localStorage.removeItem("bannerv2");
    } catch (e) {
      console.log(e);
    }

    if (router.query.next) {
      router.push(router.query.next as string);
    } else {
      location.reload();
    }
  }

  async function loginUser() {
    setError(false);
    setAlert({ show: false, message: "", type: "" });

    if (loading) {
      return false;
    }

    console.log("Login User", email, password);

    try {
      setLoading(true);
      let callbackUrl = "/";
      if (router.query.next) {
        callbackUrl = router.query.next as string;
      }
      let result: any = await signIn("credentials", {
        email: (email as string).trim(),
        password,
        redirect: false,
      });

      if (result.ok) {
        const session = await getSession();
        console.log("Login Success");
        setAlert({
          show: true,
          message: "Logged in Successfully",
          type: "success",
        });

        try {
          await NewChromeExtensionLogin({ session });
        } catch (e) {
          console.error(e);
        }

        try {
          await ChromeExtensionLogin({ session });
        } catch (e) {
          console.error(e);
        }

        onSuccess();
      } else {
        console.error("Check error:", result);
        checkError(result, setError, setAlert);
      }
    } catch (e) {
      console.error("Error:", e);
      setError("A Server Issue Happened. Please Try Again.");
      setAlert({
        show: true,
        message: (e as any)?.message || "",
        type: "error",
      });
    }
    setLoading(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    loginUser();
  }

  return (
    <div
      style={{
        minHeight: "80vh",
      }}
      className=" my-10 flex items-center  w-fit min-h-[60vh]  px-10  mx-auto"
    >
      <>
        <div
          style={{
            borderRadius: "20px",
            padding: "20px 30px",
          }}
          className="flex  font-jsans justify-center comp-container  sp-container border-2 light-border  py-[20px] h-fit w-full items-center h-[100vh]"
        >
          <div
            className="g-recaptcha"
            data-sitekey="6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w"
            data-size="invisible"
          ></div>

          <div className="flex  justify-center mx-auto items-center flex-col ">
            <div>
              {alert.show && <div className="w-full my-8">{alert.message}</div>}
              <div className="">
                <h4
                  className="mx-auto font-extrabold text-center"
                  style={{
                    marginTop: "15px",
                    fontSize: "34px",
                    marginBottom: "15px",
                  }}
                >
                  Log In To Self Publishing Titans
                </h4>

                <div className="mt-[20px] text-center mx-auto">
                  To stay connected with us, please log in using your personal
                  details.
                </div>
              </div>

              <form
                style={{
                  marginBottom: "15px",
                  marginTop: "35px",
                }}
                className="w-full flex flex-col "
                action=""
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="font-bold"
                    style={{
                      marginLeft: "18px",
                    }}
                  >
                    Enter Email Address
                  </Label>
                  <Input
                    required
                    id="email"
                    name="email"
                    className="pInput h-[50px]  md:w-[500px] mt-[16px] bg-white"
                    placeholder="Email Address"
                    autoComplete="email"
                    onChange={(e: any) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <div
                  style={{
                    marginTop: "25px",
                  }}
                  className="flex flex-col gap-2"
                >
                  <Label
                    htmlFor="password"
                    className="font-bold"
                    style={{
                      marginLeft: "18px",
                    }}
                  >
                    Enter Password
                  </Label>
                  <Input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="pInput h-[50px] md:w-[500px] mt-[16px] bg-white"
                    placeholder="Password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    autoFocus
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <ReCAPTCHA
                    size="invisible"
                    sitekey="6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w"
                    ref={recaptchaRef}
                  />
                </div>

                <div className="flex text-[14px] mt-[25px] justify-between mt-2 px-4">
                  <div>
                    <Link href="/forgot-password" className="">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  style={{
                    backgroundColor: "#7249fb",
                    color: "white",
                  }}
                  disabled={loading}
                  className="pButton mt-2 bg-[#7249fb] flex items-center justify-center font-bold"
                  onClick={(e) => handleSubmit(e)}
                >
                  {!loading ? "Sign In" : <RotateCw className="animate-spin" />}
                </button>
              </form>

              <div
                style={{
                  marginTop: "25px",
                  marginBottom: "25px",
                }}
                className="text-center text-[14px]"
              >
                Or Continue with
              </div>

              <div
                id="g_id_onload"
                data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              ></div>
              <div className="flex justify-center mx-auto w-full gap-4">
                <div
                  onClick={() => handleGoogleLogin()}
                  style={{
                    paddingLeft: "6px",
                    paddingRight: "16px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    boxShadow:
                      "0px 0px 2px 2px #fff, inset 0px 0px 18px 4px #fff",
                  }}
                  className="font-normal mb-5 bg-transparent w-fit flex text-[14px] items-center rounded-full"
                >
                  <span
                    style={{
                      boxShadow: "0px 0px 8px 2px #ddd",
                    }}
                    className="font-mono w-[30px] p-2 mr-2 font-bold h-[30px] shadow bg-white text-[#c31fe4] p-1 rounded-full flex items-center justify-center"
                  >
                    <Image
                      src={GoogleIcon.src}
                      alt="Brand Logo"
                      width={26}
                      height={26}
                    />
                  </span>
                  Sign in with Google
                </div>
              </div>
            </div>

            <div className="mt-[30px] flex justify-center"></div>
            <div>
              <Link
                href="/register"
                className="relative text-[14px] font-bold cursor-pointer"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LoginPage;
