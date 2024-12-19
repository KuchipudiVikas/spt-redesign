import Link from "next/link";
import XSVG from "../public/assets/svgs/x.svg";
import Image from "next/legacy/image";
import MainLayout from "@/components/Layout";
function PaymentFailed() {
  return (
    <MainLayout
      Title={<></>}
      info={undefined}
      showFooter={false}
      meta={{
        title: "Card Update Failed - Self Publishing Titans",
        description: "",
        keywords: "",
      }}
      Body={
        <div className="bg-gray-100 flex h-screen justify-center items-center ">
          <div className="bg-white p-10 shadowAround  flex flex-col  justify-center items-center md:mx-auto">
            <div className="text-center">
              <Image src={XSVG} height="80" width="80" alt="x svg" />
              <h3 className="md:text-2xl text-base text-red-400 font-semibold text-center">
                Card Update Failed!
              </h3>
              <p className="text-gray-600 my-2">
                Unfortunately we were unable to update your card. Please try
              </p>
              <div className="py-10 text-center">
                <Link
                  href={"/auth/me"}
                  className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-full"
                >
                  Try again
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default PaymentFailed;
