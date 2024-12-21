import ProjectsComponent from "@/components/DesignTools/CoverCreator/project/index";
import { getSession } from "next-auth/react";
import MainLayout, { getProfile } from "@/components/Layout";
import Create from "@/components/DesignTools/CoverCreator/project/create";
import { useState } from "react";
import type { Project } from "@/components/DesignTools/CoverCreator/project/projectItem";
import { GetServerSidePropsContext } from "next";
import PageTitle from "@/components/Common/PageTitle";

type Etab = "create" | "projects";

export default function Home({ project_id, info }: any) {
  return (
    <main className={`min-h-screen `}>
      <div className="">
        <MainLayout
          Title={<PageTitle title="Book Cover Creator for KDP" />}
          info={info}
          meta={{
            title: "Book Cover Creator for KDP",
            description:
              "Create your book cover for KDP. Choose from a variety of templates and customize it to your liking.",
            keywords:
              "Book Cover Creator, KDP, Book Cover, Create Book Cover, Design Book Cover, Book Cover Design",
          }}
          Body={<Dashboard userID={info._id} />}
        ></MainLayout>
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
    <div className="sp-container border-2 light-border mx-auto p-3 md:p-8 rounded-3xl w-fit mt-10">
      <div className=" w-full flex justify-center mt-0 mb-10">
        <div
          style={{
            border: "1px solid #ccc",
            // borderRadius: "25px",
            background: "white",
          }}
          className="p-1 rounded-full"
        >
          <button
            className={`${
              etab == "create" ? "bg-primary text-white" : "text-black"
            } p-2  rounded-full   font-bold w-[150px] text-[18px]`}
            onClick={() => setEtab("create")}
          >
            Create
          </button>
          <button
            className={`${
              etab == "projects" ? "bg-primary text-white" : "text-black"
            } p-2  rounded-full   font-bold w-[150px] text-[18px]`}
            onClick={() => setEtab("projects")}
          >
            Projects
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        {etab === "create" && <Create userID={userID} />}
        {etab === "projects" && (
          <ProjectsComponent
            projects={projects}
            setProjects={setProjects}
            userID={userID}
          />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
  return getProfile(context, {});
}
