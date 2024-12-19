import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import MainLayout, { getProfileWithToken } from "@/components/Layout";
import { getSession } from "next-auth/react";
import Accounts from "@/lib/mw/Accounts";
import LoadingBar from "@/components/utils/LoadingBar";
import { RotateCw } from "lucide-react";

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function PaymentSuccess({ token, session_id, payment_intent }) {
  const router: NextRouter = useRouter();
  const [type, setType] = useState<any>(false);
  const [next, setNext] = useState<any>(false);
  const [customerId, setCustomerId] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState<any>(false);

  async function orderSuccess(sessionId, payment_intent) {
    const response = await Accounts.features.orderSuccess(
      token,
      sessionId,
      payment_intent
    );
    if (response.data) {
      setInvoice(response.data.invoice);
      setCustomerId(response.data.customer.id);
    } else {
      router.push("/payment-failed");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (session_id || payment_intent) {
      setIsLoading(true);
      orderSuccess(session_id, payment_intent).finally(() => {
        setIsLoading(false);
      });

      if (router.query.hasOwnProperty("type")) setType(router.query.type);
      if (router.query.hasOwnProperty("next")) setNext(router.query.next);
    }
  }, []);
  return (
    <MainLayout
      info={false}
      meta={{
        title: "Payment Success",
        description: "Payment Success",
        keywords: "Payment Success ",
      }}
      Title={<></>}
      Body={
        <div>
          <LoadingBar isLoading={isLoading} title={`Loading...`} />
          {customerId !== false ? (
            <div>
              <Head>
                <title>Payment Success</title>
              </Head>

              <div className="bg-gray-100 h-screen">
                <div className="bg-white p-6 h-screen  md:mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                  >
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>
                  <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                      Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                      Thank you for completing your secure online payment.
                    </p>
                    <p> Have a great day! </p>
                    <div className={`flex justify-center gap-2`}>
                      <div className="py-10 text-center">
                        <Link
                          href={
                            next !== false && next !== undefined ? next : "/"
                          }
                          className="px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full"
                        >
                          GO TO CONTENT
                        </Link>
                      </div>
                      <div className="py-10 text-center ">
                        {invoice === false ||
                        invoice === undefined ||
                        invoice === null ||
                        invoice.invoice_pdf === null ||
                        invoice.invoice_pdf === undefined ? null : (
                          <Link
                            href={invoice?.invoice_pdf}
                            className="px-12 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full"
                          >
                            Download Invoice
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <RotateCw className="animate-spin" />
            </div>
          )}
        </div>
      }
    />
  );
}

export default PaymentSuccess;

export async function getServerSideProps(context) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  const { query } = context;

  const info = await getProfileWithToken(context, {
    token: session.token,
    session_id: query.session_id ? query.session_id : null,
    payment_intent: query.payment_intent ? query.payment_intent : null,
  });
  return info;
}
