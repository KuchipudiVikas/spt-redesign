import MainLayout from "@/components/Layout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import PageTitle from "@/components/Common/PageTitle";

function UsePolicy({ info, source }) {
  return (
    <MainLayout
      info={info}
      meta={{
        title: "Use Policy - Self Publishing Titans",
        description: "Use Policy - Self Publishing Titans",
        keywords: "Use Policy, Self Publishing Titans",
      }}
      Title={<PageTitle title="Use Policy" showBySptButton={false} />}
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
  const content: any = await import("/constants/md/use.md");
  const mdxSource = await serialize(content.default);
  return { props: { source: mdxSource } };
}

export default UsePolicy;
