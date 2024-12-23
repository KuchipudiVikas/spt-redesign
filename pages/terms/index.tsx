/* eslint-disable @next/next/no-img-element */
import MainLayout from "@/components/Layout";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import PageTitle from "@/components/Common/PageTitle";

function Terms({ info, source }) {
  return (
    <MainLayout
      info={info}
      meta={{
        title: "Terms and Conditions - Self Publishing Titans",
        description: "Terms and Conditions - Self Publishing Titans",
        keywords: "Terms and Conditions, Self Publishing Titans",
      }}
      Title={<PageTitle title="Terms and Conditions" showBySptButton={false} />}
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
  const content: any = await import("/constants/md/terms.md");
  const mdxSource = await serialize(content.default);
  return { props: { source: mdxSource } };
}

export default Terms;
