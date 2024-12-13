import { useState } from "react";
import Account from "../../lib/mw/Accounts";
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import { getSession } from "next-auth/react";
import { UpdateUsage } from "@/api/usage";
import MainLayout, { getProfile } from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";
import { Button } from "@/components/ui/button";
import { GetServerSidePropsContext } from "next";
import { Label } from "@/components/ui/label";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const dummyName = [
  "Wang",
  "Li",
  "Zhang",
  "Chen",
  "Liu",
  "Devi",
  "Yang",
  "Hung",
  "Singh",
  "Wu",
];

const CountryIndex = {
  USA: 0,
  Australia: 1,
  Brazil: 2,
  Canada: 3,
  England: 4,
  France: 5,
  Germany: 6,
  Italy: 7,
  Japan: 8,
  Netherlands: 9,
  Poland: 10,
  Spain: 11,
  Sweden: 12,
};

function BSRSalesCalculatorPage({ info }) {
  const [inputs, setInputs] = useState({
    country: "USA",
  });
  const [names, setNames] = useState([]);
  const { data, error } = useSWR("/api/staticdata", fetcher);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  function generateNames() {
    if (!info) {
      setShowAuthPopup(true);
      return;
    }
    try {
      let country = inputs.country;

      let rnd = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 1000)
      );

      let names = [];
      if (data) {
        rnd.forEach((i) => {
          names.push(
            data.firstNames[i][country] + " " + data.lastNames[i][country]
          );
        });
      }
      setNames(names);
      UpdateUsage(info._id, "pen-name-gen");
    } catch (e) {
      console.log(e);
    }

    //console.log(rnd)
  }

  const changeValue = (target) => (value) => {
    setInputs({ ...inputs, [target]: value });
  };

  // useEffect(() => {
  //   if (data) {
  //     generateNames();
  //   }
  // }, [data]);

  //Handle the error state
  if (error)
    return (
      <div>
        <h1>Failed to load...</h1>
      </div>
    );
  //Handle the loading state
  if (!data)
    return (
      <div>
        <MainLayout
          info={info}
          // transparentNav={true}
          Title={<PageTitle title="Pen Name Generator" />}
          meta={{
            title: "Pen Name Generator",
            description: "Generate Pen Names for your books",
            keywords: "Pen Name Generator, Self Publishing Titans",
          }}
          Body={
            <div className="min-h-screen  mt-24">
              <div
                style={{ border: "1px solid #808080" }}
                className="m-12 max-w-screen-lg mx-auto  p-4 "
              >
                <h1 className="text-3xl  mb-4 ">
                  <span>Pen Name Generator</span>
                </h1>
                <br />
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1">
                    <select
                      value={inputs.country}
                      onChange={changeValue("country")}
                      name=""
                      id=""
                    >
                      {Object.keys(CountryIndex).map((key) => {
                        return <option value={key}>{key}</option>;
                      })}
                    </select>
                  </div>
                  <div className="flex-1">
                    <div className="pt-4 mt-2 px-4 mx-auto">
                      <Button
                        className="text-xl themeGradient text-white p-2 rounded-md w-full"
                        onClick={generateNames}
                      >
                        Generate Names
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <h1>Loading...</h1>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );

  return (
    <div>
      <MainLayout
        info={info}
        // showSidebar={false}
        // bgGray={false}
        meta={{
          title: "Pen Name Generator",
          description: "Generate Pen Names for your books",
          keywords: "Pen Name Generator, Self Publishing Titans",
        }}
        Title={<PageTitle title="Pen Name Generator" />}
        Body={
          <div className="min-h-[60vh] my-auto mt-0 ">
            <div
              style={{ border: "1px solid #cccccc" }}
              className="m-12 rounded-lg px-5 w-fit max-w-screen-lg mx-auto p-4 sp-container"
            >
              <br />

              <div className="flex flex-col justify-center   md:flex-row">
                <div className="flex w-[500px] justify-center flex-col ">
                  <h6 className="text-[34px] font-extrabold text-center">
                    Select KDP region you want a name for:{" "}
                  </h6>
                  <Label className="text-label mt-5">Country</Label>
                  <select
                    value={inputs.country}
                    onChange={(e) => changeValue("country")(e.target.value)}
                    className="p-3 w-full mt-4 rounded-full px-5"
                  >
                    {Object.keys(CountryIndex).map((key) => {
                      return <option value={key}>{key}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="flex w-full">
                <div className="pt-4 w-full md:mt-4  rounded-full mx-auto">
                  <Button
                    className="  py-5  font-bold w-full rounded-full "
                    onClick={generateNames}
                  >
                    Generate Names
                  </Button>
                </div>
              </div>

              <div className="bg-white p-2 rounded-3xl mt-12">
                <h6 className="font-bold p-3 text-xl w-fit mx-auto text-primary mb-4">
                  Pen Names{" "}
                </h6>
                <div className="flex p-2 pt-0 justify-center gap-20 md:mt-0">
                  <div className="flex flex-col gap-2">
                    {names.slice(0, dummyName.length / 2).map((item, index) => {
                      return (
                        <h6 className="font-medium" key={index}>
                          {index + 1}. &nbsp;{item}
                        </h6>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-2 pb-2">
                    {names
                      .slice(dummyName.length / 2, dummyName.length)
                      .map((item, index) => {
                        return (
                          <h6
                            className="font-medium"
                            key={index + dummyName.length / 2}
                          >
                            {index + 1 + dummyName.length / 2}. &nbsp; {item}
                          </h6>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: any = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      // props: {
      //   info: false,
      // },
      redirect: {
        destination: "/auth/login?next=" + resolvedUrl,
        permanent: false,
      },
    };
  }
  let info = await Account.getInfo(session.token);

  return {
    props: {
      info: info.full.data,
    },
  };
}

export default BSRSalesCalculatorPage;
