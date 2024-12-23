import MainLayout from "@/components/Layout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import PageTitle from "@/components/Common/PageTitle";

function Privacy({ info, source }) {
  return (
    <MainLayout
      info={info}
      // staticPage={true}
      meta={{
        title: "Privacy Policy - Self Publishing Titans",
        description: "Privacy Policy - Self Publishing Titans",
        keywords: "Privacy Policy, Self Publishing Titans",
      }}
      Title={<PageTitle title="Privacy Policy" showBySptButton={false} />}
      Body={
        <>
          <div className="container mx-auto my-6 prose-base">
            <MDXRemote {...source} components={{}} />
          </div>
        </>
      }
    />
  );
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const content: any = await import("/constants/md/privacy.md");
  const mdxSource = await serialize(content.default);
  return { props: { source: mdxSource } };
}

export default Privacy;
