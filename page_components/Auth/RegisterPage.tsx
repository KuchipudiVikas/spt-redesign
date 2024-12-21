import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReCAPTCHA } from "react-google-recaptcha";
import Link from "next/link";
import { RotateCcw, RotateCw } from "lucide-react";
import Image from "next/image";
import GoogleIcon from "@/public/assets/google.svg";
import AppleLogo from "@/public/assets/apple.svg";
import { getSession, signIn } from "next-auth/react";
import ga from "../../lib/ga";

function checkError(data, setError, setAlertUser) {
  if (data.Error) {
    setError(Object.values(data.Error).toString());
    setAlertUser({
      show: true,
      message: Object.values(data.Error).toString(),
      type: "error",
      for: "register",
    });
  } else if (data.code == "ECONNREFUSED") {
    setError(
      "A Server Issue Happened. Please Try Again. You're Account may be successfully created, please try to login with your data"
    );
    setAlertUser({
      show: true,
      message:
        "A Server Issue Happened. Please Try Again. You're Account may be successfully created, please try to login with your data",
      type: "error",
      for: "register",
    });
  }
}

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState(router.query.user || "");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertUser, setAlertUser] = useState({
    show: false,
    message: "",
    type: "",
    for: "",
  });

  const [cookies, setCookie, removeCookie] = useCookies(["titansPro"]);

  const [isAgreedToTerms, setIsAgreedToTerms] = useState<boolean>(false);

  async function registerUser() {
    setLoading(true);
    setShowError(false);
    setTimeout(async () => {
      if (loading) {
        return false;
      }
      // await Account.register(false, email, password)
      if (password !== passwordConf) {
        alert("Password and Confirm Password does not match");
        // setLoading(false);
        // blipNotif();
        // setAlertUser({
        //   show: true,
        //   message: "Password and Confirm Password does not match",
        //   type: "error"
        // });
        // return setError("Password and Confirm Password does not match");
      }

      //   if (!isAgreedToTerms) {
      //     setLoading(false);
      //     setAlertUser({
      //       show: true,
      //       message: "Please agree to the terms and conditions",
      //       type: "error",
      //       for: "terms",
      //     });
      //     return setError("Please agree to the terms and conditions");
      //   }

      // create account using

      try {
        //remove whitespaces from email
        const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
        const res = await fetch(API_URL + "/api/account/jsonregister", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: (email as string).trim(),
            password,
          }),
        });
        if (res.ok) {
          setAlertUser({
            show: true,
            message: "Account Created Successfully",
            type: "success",
            for: "register",
          });

          removeCookie("titansPro");
          localStorage.removeItem("setId");
          localStorage.removeItem("bannerv2");
          setTimeout(() => {
            //window.location.href = "/auth/login";
            ga.event({
              action: "accounts_created",
              params: {
                what: "Register",
              },
            });
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/welcome-page",
            });
          }, 1000);
        } else {
          const result = await res.json();
          console.error(result);

          checkError(
            result.Error || "An Error Happened",
            setError,
            setAlertUser
          );
          setLoading(false);

          if (result && result.Error && result.Error.Duplicate) {
            alert(result.Error.Duplicate);
            return setError(result.Error.Duplicate);
          }
          return setError("An Error Happened");
        }
      } catch (error) {
        alert(error.message);
        console.error(error);
        setError(error.message);
      }
    }, 10);
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
          className="flex  font-jsans justify-center bg-[#f7f7f8] py-[20px] h-fit w-full items-center h-[100vh]"
        >
          <div
            className="g-recaptcha"
            data-sitekey="6Lc1o_chAAAAAGcjhYsF3wbyebemeS0CiBQkV87w"
            data-size="invisible"
          ></div>

          <div className="flex  justify-center mx-auto items-center flex-col ">
            <div>
              {alertUser.show && (
                <div className="w-full my-8">{alertUser.message}</div>
              )}
              <div className="">
                <h4
                  className="mx-auto font-extrabold text-center"
                  style={{
                    marginTop: "15px",
                    fontSize: "34px",
                    marginBottom: "15px",
                  }}
                >
                  Sign Up To Self Publishing Titans
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
                    className="pInput h-[50px] md:w-[500px] mt-[16px] bg-white"
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
                    Re Enter Password
                  </Label>
                  <Input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="pInput h-[50px] md:w-[500px] mt-[16px] bg-white"
                    placeholder="Re-Enter Password"
                    onChange={(e: any) => setPasswordConf(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="flex text-[14px] mt-[25px] justify-between mt-2 px-4">
                  <div></div>
                </div>

                <button
                  style={{
                    backgroundColor: "#7249fb",
                    color: "white",
                  }}
                  disabled={loading}
                  className="pButton mt-2 bg-[#7249fb] flex justify-center items-center font-bold"
                  onClick={() => registerUser()}
                >
                  {!loading ? "Sign Up" : <RotateCw className="animate-spin" />}
                </button>
              </form>

              <div
                id="g_id_onload"
                data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              ></div>
            </div>

            <div className="mt-[30px] flex justify-center"></div>
            <div>
              <Link
                href="/login"
                className="relative text-[14px] hover:underline font-bold cursor-pointer"
              >
                {"Already Have an Account? Log In"}
              </Link>
            </div>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </div>
        </div>
      </>
    </div>
  );
};

export default RegisterPage;
