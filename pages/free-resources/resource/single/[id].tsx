import Image from "next/image";
// import MainTemplate, { getProfile } from '@/components/MainPage/MainPage';
import { getResource } from "@/lib/free-resources/get-resource";
// import { useEffect, useState } from 'react';
// import { Button, Chip } from '@mui/material';
import Link from "next/link";
import { useState, useEffect } from "react";
import MainLayout, { getProfile } from "@/components/Layout";
import { Button } from "@/components/ui/button";

interface SingleResourceProps {
  params: {
    id: string;
  };
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SingleResource({ info, id }) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    getResource(id).then((data) => {
      setResource(data);
      console.log(data);
    });
  }, []);

  if (!resource) {
    return (
      <MainLayout
        info={info}
        meta={{
          title: "SPT",
          description: "Loading resource...",
          keywords: "Loading resource...",
        }}
        Title={<div></div>}
        Body={
          <div className="max-w-6xl m-auto p-2 min-h-96">
            <h1 className="text-2xl font-bold text-gray-700">
              Loading resource...
            </h1>
          </div>
        }
      />
    );
  }

  return (
    <MainLayout
      info={info}
      Title={<div></div>}
      meta={{
        title: resource.title,
        description: resource.description,
        keywords: resource.ProductTag.map((tag) => tag.tag.name).join(", "),
      }}
      Body={
        <div className="min-h-screen">
          <div className="max-w-6xl m-auto p-2 flex flex-col items-center justify-center shadow-lg my-8 ">
            <div className="mb-3">
              <h1 className="text-2xl font-bold text-gray-700 border-b-2 border-amber-400">
                {resource.title}
              </h1>
            </div>

            <div className="w-fit m-auto mt-3 mb-3">
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                width={600}
                height={500}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="mt-3">
              <h1 className="text-xl font-bold border-b-2 border-amber-400 text-gray-700">
                Descriptions:
              </h1>
              <p className="mt-3 mb-3">{resource.description}</p>
            </div>

            <div className="mt-3">
              {resource.ProductTag.map((tag, index) => (
                <Link href={`/free-resources/tags/${tag.tag.slug}`} key={index}>
                  <div color="primary" className="m-1">
                    {" "}
                    {tag.tag.name}{" "}
                  </div>
                </Link>
              ))}
            </div>

            <div className="w-fit m-auto">
              <Link href={resource.fileUrl}>
                <Button className="m-auto mt-5  p-2 mb-3 w-52">Download</Button>
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  return await getProfile(context, {
    id,
  });
}
