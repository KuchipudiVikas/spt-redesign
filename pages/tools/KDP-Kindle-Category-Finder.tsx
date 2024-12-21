import { useEffect, useState } from "react";
import Head from "next/head";
import Account from "../../lib/mw/Accounts";
// import MainTemplate from "@/components/MainPage/MainPage";
import TreeMenu from "react-simple-tree-menu";
import MainLayout, { getProfile } from "@/components/Layout";
import Link from "next/link";
import ga from "../../lib/ga";
// import AuthPopupComponent from "../../components/Auth/AuthPopup";
import { getSession } from "next-auth/react";
import { UpdateUsage as UpdateToolUsage } from "@/lib/api/usage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shopIds } from "@/data/shopData";
import {
  ChevronDown,
  ChevronRight,
  CopyIcon,
  ExternalLinkIcon,
  MinusIcon,
} from "lucide-react";
import { PlusIcon } from "lucide-react";
import PageTitle from "@/components/Common/PageTitle";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;

// interface IListItem {
//     level?: any,
//     hasNodes?: any,
//     isOpen?: boolean,
//     label?: any
//     searchTerm?: any,
//     openNodes?: any
//     toggleNode?: any
//     matchSearch?: any
//     focused?: any
//     searching?: any
//
// }

const ListItem = ({
  level = 0,
  hasNodes,
  isOpen,
  label,
  searchTerm,
  openNodes,
  toggleNode,
  matchSearch,
  focused,
  searching,
  link,
  ...props
}: any) => {
  const [justCopied, setJustCopied] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState("");

  return (
    <div
      style={{
        paddingLeft: !searching ? 16 + 8 + level * 16 : 16 + 8 + 2 * 16,
        cursor: "pointer",
        zIndex: focused ? 999 : "unset",
        position: "relative",
      }}
      onClick={(e) => {
        hasNodes && toggleNode && toggleNode();
        e.stopPropagation();
      }}
      className="p-2 flex items-center border-b"
    >
      <span className="font-medium">
        <h6 className="font-Inter gap-5 flex text-[16px]">
          {hasNodes ? (
            <div
              className="mx select-none ml-auto mr"
              onClick={(e) => {
                hasNodes && toggleNode && toggleNode();
                e.stopPropagation();
              }}
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          ) : (
            <div className="inline-block mx-2">&nbsp;</div>
          )}
          {props._label}
        </h6>
      </span>
      {searching && (
        <span className="ml-2 text-xs rounded-md p-0.5">
          <h6 className="font-medium">{label}</h6>
        </span>
      )}
      {props.leaf && (
        <div className="ml-auto flex gap-1 items-center">
          {justCopied && (
            <p className="text-xs text-gray-600 mr-3 animate__animated animate__fadeIn">
              {`Copied: ${copiedLabel}`}
            </p>
          )}
          <Button
            onClick={(e) => {
              setJustCopied(true);
              setCopiedLabel(label); // Save the copied label/path
              navigator.clipboard.writeText(label);
              setTimeout(() => {
                setJustCopied(false);
              }, 2500);
            }}
            className=" "
          >
            Copy To Clipboard <CopyIcon />
          </Button>
          <Link href={link} className="text-xs rounded-md p-">
            <Button variant="outline">
              Go To Site <ExternalLinkIcon className="ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
let debounceTimer: any = false;

function CategoryFinderPage({ info }) {
  const [inputs, setInputs] = useState({
    country: "us",
    category: "paperback",
  });

  const changeValue = (target) => (value) => {
    if (!info) {
      setShowAuthPopup(true);
      return;
    }

    setInputs({ ...inputs, [target]: value });
  };

  const [treeData, setTreeData] = useState<any>(false);
  const [loaded, setLoaded] = useState(false);
  //const [loadingData, setLoadingData] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  async function loadData() {
    try {
      //let _lD = await axios.get(
      //  `/category_data/${inputs.category}_${inputs.country}.json`,
      //  {
      //    onDownloadProgress: (progressEvent) => {
      //      setLoadingData(progressEvent.loaded);
      //    },
      //  }
      //);
      let _lD = import(
        `/constants/category_data/${
          inputs.category
        }_${inputs.country.toUpperCase()}`
      ).then((e) => {
        setTreeData(e.default);
        setLoaded(true);
      });
      //// console.log(`/constants/category_data/${inputs.category}_${inputs.country.toUpperCase()}`)
      //let _lD = await (await import(
      //  `/constants/category_data/${inputs.category}_${inputs.country.toUpperCase()}`)).default();
      //// console.log('done')
      //// console.log(_lD)
      //// console.log(_lD)
      //let _lD = await import(`/public/category_data/${inputs.category}_${inputs.country}.json`);
      //// console.log(_lD);
      //setTreeData(_lD);
      //setLoaded(true);

      UpdateToolUsage(info._id, "category-finder");
    } catch (e) {
      //// console.log(e);
    }
  }

  useEffect(() => {
    setLoaded(false);

    setTimeout(() => {
      loadData();
    }, 10);
  }, [inputs]);

  // @ts-ignore
  return (
    <div>
      <Head>
        <title>Category Finder - Self Publishing Titans</title>
      </Head>
      {/* {showAuthPopup && <AuthPopupComponent />} */}
      <MainLayout
        meta={{
          title: "KDP/Kindle Category Finder",
          description: "Find the best KDP/Kindle categories for your book",
          keywords: "KDP, Kindle, Categories, Finder",
        }}
        info={info}
        // transparentNav={true}
        Title={<PageTitle title={"KDP/Kindle Category Finder"} />}
        Body={
          <div className="min-h-screen ">
            <div className="max-w-screen-xl mx-auto font-Inter container pb-24 flex flex-col">
              <div className="flex-[2]">
                {loaded ? (
                  <TreeMenu
                    data={treeData}
                    //onClickItem={({ key, label, ...props }) => {
                    //  this.navigate(props.url); // user defined prop
                    //}}
                    initialActiveKey="first-level-node-1/second-level-node-1" // the path to the active node
                    debounceTime={125}
                  >
                    {({ search, items }) => (
                      <>
                        <div className="flex config-container shadowAround p-8 m-8">
                          {/* <h6 className="mx-5">KDP/Kindle Category Finder</h6> */}
                          <div className="w-full">
                            <select
                              className="w-full"
                              value={inputs.country}
                              onChange={(e) =>
                                changeValue("country")(e.target.value)
                              }
                            >
                              <option value="us">Amazon US</option>
                              <option value="ca">Amazon CA</option>
                              <option value="uk">Amazon UK</option>
                              <option value="de">Amazon DE</option>
                              <option value="es">Amazon ES</option>
                              <option value="fr">Amazon FR</option>
                              <option value="it">Amazon IT</option>
                            </select>
                          </div>
                          <div className="w-full">
                            {/* <ComSelect
                              label="Paperback/Kindle eBooks"
                              options={[
                                {
                                  label: "Paperback Books",
                                  value: "paperback",
                                },
                                {
                                  label: "Kindle Books",
                                  value: "kindle",
                                },
                              ]}
                              value={inputs.category}
                              setValue={changeValue("category")}
                            /> */}

                            <select
                              value={inputs.category}
                              onChange={(e) =>
                                changeValue("category")(e.target.value)
                              }
                            >
                              <option value="paperback">Paperback Books</option>
                              <option value="kindle">Kindle Books</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <Input
                              onChange={(e) => {
                                if (!info) {
                                  setShowAuthPopup(true);
                                  return;
                                }

                                if (debounceTimer) clearTimeout(debounceTimer);
                                debounceTimer = setTimeout(() => {
                                  search(e.target.value);
                                  setSearching(e.target.value.length > 0);
                                  ga.event({
                                    action: "tools_use_categorySearch",
                                    params: {
                                      what: "Category Finder Searches",
                                    },
                                  });
                                }, 750);
                              }}
                              placeholder="Type and search"
                              className="w-60"
                            />
                          </div>
                        </div>
                        <div className="">
                          <h6 className="font-Inter mb-4 ml-5 font-bold text-xl">
                            Categories
                          </h6>
                        </div>

                        <div className="list-none sp-container p-6 border light-border mx-5 rounded-3xl">
                          {items.map((props) => (
                            <>
                              <ListItem
                                {...props}
                                key={props.key}
                                searching={props.leaf && searching}
                              />
                              {/*props.active && <p>{props.label}</p>*/}
                            </>
                          ))}
                        </div>
                      </>
                    )}
                  </TreeMenu>
                ) : (
                  <div className="w-full h-[50vh] flex justify-center items-center">
                    <div className="w-5 h-5 bg-primCol1-600 animate-spin"></div>
                    <div className="ml-4">Loading Database</div>
                  </div>
                )}
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
    // return {
    //   props: {
    //     info: false,
    //   },
    // };
    return {
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

export default CategoryFinderPage;
