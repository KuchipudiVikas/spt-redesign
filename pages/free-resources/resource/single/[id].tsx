import Image from "next/image";
// import MainTemplate, { getProfile } from '@/components/MainPage/MainPage';
// import { getResource } from '@/lib/free-resources/get-resource';
// import { useEffect, useState } from 'react';
// import { Button, Chip } from '@mui/material';
import Link from "next/link";

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
      <MainTemplate
        info={info}
        transparentNav={false}
        title={<div></div>}
        body={
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
    <MainTemplate
      info={info}
      transparentNav={false}
      title={<div></div>}
      body={
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
                  <Chip label={tag.tag.name} color="primary" className="m-1" />
                </Link>
              ))}
            </div>

            <div className="w-fit m-auto">
              <Button
                href={resource.fileUrl}
                download
                variant="contained"
                className="m-auto mt-5  p-2 mb-3 w-52"
              >
                Download
              </Button>
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
