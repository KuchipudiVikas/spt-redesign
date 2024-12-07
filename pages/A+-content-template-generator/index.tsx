import Image from "next/image";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import ProjectsComponent from "@/components/DesignTools/CoverCreator/project/index";
import { getSession } from "next-auth/react";
import Account from "@/lib/mw/Accounts";
import Accounts from "@/lib/mw/Accounts";
import { useState } from "react";
import { Create } from "@/components/DesignTools/acontent/create";
import type { Project } from "@/components/DesignTools/CoverCreator/project/projectItem";
import MainLayout from "@/components/Layout";
import PageTitle from "@/components/Common/PageTitle";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
type Etab = "create" | "projects";

export default function Home({ project_id, info }: any) {
  const userid = "";
  return (
    <main className={`min-h-screen   ${spaceGrotesk.className}`}>
      <div className="">
        {/* <CanvasProvider> */}
        <MainLayout
          info={info}
          meta={{
            title: "A+ Content Template Designer",
            description:
              "Create your A+ Content Template. Choose from a variety of templates and customize it to your liking.",
            keywords:
              "A+ Content Template Designer, A+ Content, A+ Content Design, A+ Content Template, Design A+ Content",
          }}
          Title={<PageTitle title="A+ Content Template Designer" />}
          Body={<Dashboard userID={info._id} />}
        ></MainLayout>
        {/* </CanvasProvider> */}
      </div>
    </main>
  );
}

interface DashboardProps {
  userID: string;
}

function Dashboard({ userID }: DashboardProps) {
  const [etab, setEtab] = useState<Etab>("create");
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <div className="w-fit mx-auto p-8 rounded-3xl sp-container mt-10">
      <div className=" w-full flex justify-center  mb-10">
        <div className="">
          <button
            style={{ border: "1px solid #ccc" }}
            className={`${
              etab == "create" ? "bg-primary text-white" : "text-black"
            } p-2 mx-1 rounded-full  font-bold w-[150px] text-[18px]`}
            onClick={() => setEtab("create")}
          >
            Create
          </button>
          <button
            style={{ border: "1px solid #ccc" }}
            className={`${
              etab == "projects" ? "bg-primary text-white" : "text-black"
            } p-2  rounded-full  font-bold w-[150px] text-[18px]`}
            onClick={() => setEtab("projects")}
          >
            Projects
          </button>
        </div>
      </div>
      <div className="flex  mb-10 justify-center">
        {etab === "create" && <Create userID={userID} />}
        {etab === "projects" && (
          <ProjectsComponent
            setProjects={setProjects}
            projects={projects}
            templateType={"a+content"}
            userID={userID}
          />
        )}
      </div>
    </div>
  );
}

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

  let info = await Account.getInfo(session.token);

  return {
    props: {
      info: info.full.data,
    },
  };
}
