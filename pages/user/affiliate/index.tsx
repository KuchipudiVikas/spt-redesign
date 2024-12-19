import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { checkCountry } from "@/components/checkout/Paypal";

import LoadingBar from "@/components/utils/LoadingBar";
import MainLayout, { getProfile } from "@/components/Layout";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export const createAffiliate = async (token: string) => {
  // /api/v1/affiliate/create
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GO_TITANS_API_URL}/api/v1/affiliate/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

// affiliateData {
//   id: '6719d6fa7e296a8b0bc3092e',
//   user_id: '66dd28092aeddb7bc24b053f',
//   affiliate_id: 792,
//   is_deleted: false,
//   is_blocked: false,
//   is_default_password: false,
//   created_at: '2024-10-24T05:11:22.265Z',
//   updated_at: '2024-10-24T05:11:22.265Z'
// }

function Affiliate({ info, token }) {
  const [isRegionAllowed, setIsRegionAllowed] = useState(false);
  const [affiliateData, setAffiliateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [error, setError] = useState(null);

  const excludedCounties = [
    // "BD",
    "NG",
  ];

  // useEffect(() => {
  //   setIsLoading(true);
  //   checkCountry()
  //     .then(async (data) => {
  //       if (data) {
  //         if (
  //           data &&
  //           data?.country &&
  //           excludedCounties.includes(data.country)
  //         ) {
  //           setIsRegionAllowed(false);
  //         } else {
  //           setIsRegionAllowed(true);

  //           setLoadingText("Creating Affiliate Account...");
  //           const res = await createAffiliate(token);
  //           setAffiliateData(res);
  //           setIsLoading(false);
  //         }
  //       } else {
  //         setIsRegionAllowed(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setError("Failed to check your region. Please try again later.");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  if (!affiliateData) {
    return (
      <MainLayout
        info={info}
        meta={{
          title: "Affiliate - Self Publishing Titans",
          description: "Affiliate page for Self Publishing Titans",
          keywords: "affiliate",
        }}
        Title={
          <div className="pt-28 pb-16 newThemeBg text-white text-center">
            <h1 className="text-center text-3xl font-bold py-2 text-white">
              SELF PUBLISHING TITANS AFFILIATE PROGRAM
            </h1>
            {/* <p className="text-xl py-2">
              My goal is to help you make a meaningful income. To make that even
              easier, I started this affiliate program.
            </p> */}
            <div className="my-6">
              <a
                className="p-3 text-secCol1-400 bg-white rounded-xl shadow-md"
                target="_blank"
                rel="noopener noreferrer"
                href="https://affiliates.selfpublishingtitans.com/signup.php"
              >
                Become An Affiliate
              </a>
            </div>

            <p className="text-xl py-2">
              Perfect for anyone that loves Self Publishing Titans and wants to
              create an additional source of income.
            </p>
          </div>
        }
        Body={
          <div className="min-h-96">
            <LoadingBar isLoading={isLoading} title={loadingText} />
            {error && (
              <div className="text-center text-red-600 font-semibold">
                {error}
              </div>
            )}
          </div>
        }
      />
    );
  }

  type TableData = {
    Field: string;
    Value: string;
  };

  const affiliateTableData: TableData[] = [
    { Field: "Affiliate ID:", Value: affiliateData.affiliate_id },
    { Field: "Username:", Value: affiliateData.username },
    {
      Field: "Affiliate Link:",
      Value: `https://affiliates.selfpublishingtitans.com/${affiliateData.affiliate_id}.html`,
    },
    {
      Field: "Dashboard Link:",
      Value: "https://affiliates.selfpublishingtitans.com/home",
    },
    {
      Field: "Forget Password Link:",
      Value: "https://affiliates.selfpublishingtitans.com/forgot-pass",
    },

    // { Field: "Created At", Value: affiliateData.created_at },
  ];

  if (!isRegionAllowed) {
    return (
      <MainLayout
        meta={{
          title: "Affiliate - Self Publishing Titans",
          description: "Affiliate page for Self Publishing Titans",
          keywords: "affiliate",
        }}
        info={info}
        Title={
          <div className="pt-28 pb-16 newThemeBg text-white text-center">
            <h1 className="text-center text-3xl font-bold py-2 text-white">
              SELF PUBLISHING TITANS AFFILIATE PROGRAM
            </h1>
            <p className="text-xl py-2">
              Perfect for anyone that loves Self Publishing Titans and wants to
              create an additional source of income.
            </p>
          </div>
        }
        Body={
          <div className="min-h-96 text-center">
            <h1 className="mt-24">
              Sorry, this feature is not available in your region.
            </h1>
          </div>
        }
      />
    );
  }

  return (
    <MainLayout
      info={info}
      meta={{
        title: "Affiliate - Self Publishing Titans",
        description: "Affiliate page for Self Publishing Titans",
        keywords: "affiliate",
      }}
      Title={
        <div className="pt-28 pb-16 newThemeBg text-white text-center">
          <h1 className="text-center text-3xl font-bold py-2 text-white">
            SELF PUBLISHING TITANS AFFILIATE PROGRAM
          </h1>
          <p className="text-xl py-2">
            Perfect for anyone that loves Self Publishing Titans and wants to
            create an additional source of income.
          </p>
        </div>
      }
      Body={
        <div className="min-h-96 container mx-auto px-4 py-12">
          <LoadingBar isLoading={isLoading} title={loadingText} />
          {error && (
            <div className="text-center text-red-600 font-semibold">
              {error}
            </div>
          )}
          <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <TableHead>
              <TableRow className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
                <TableCell className="font-semibold text-lg px-6 py-4">
                  Field
                </TableCell>
                <TableCell
                  className="font-semibold text-lg px-6 py-4"
                  align="center"
                >
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {affiliateTableData.map((item: TableData, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <TableCell className="px-6 py-4 text-gray-700 font-medium">
                    {item.Field}
                  </TableCell>
                  <TableCell align="center" className="px-6 py-4">
                    {typeof item.Value === "string" &&
                    item.Value.startsWith("http") ? (
                      <Link
                        href={item.Value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700 transition duration-300"
                      >
                        {item.Value}
                      </Link>
                    ) : (
                      <h6 className="text-gray-800">{item.Value}</h6>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    />
  );
}

// use next auth
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login?next=/affiliate",
        permanent: false,
      },
    };
  }

  const { user } = session;
  if (!user) {
    return {
      redirect: {
        destination: "/login?next=/affiliate",
        permanent: false,
      },
    };
  }

  return getProfile(context, {
    token: session.token,
  });
}

export default Affiliate;
