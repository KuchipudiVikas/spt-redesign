import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { useRouter } from "next/navigation";
import { ProductForm, TagFields } from "../addresource";

interface data {
  id: string;
  title: string;
  description: string;
  recommendedUse: string;
  imageUrl: string;
  fileUrl: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  recommendedUse: string;
  imageUrl: string;
  fileUrl: string;
  image: File | null;
  file: File | null;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SingleResourceProps {
  params: {
    id: string;
  };
}

const previousData = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/resource/getresource/`, {
      method: "POST",
      cache: "no-store",
      next: { revalidate: 10 },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve resource: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resource;
  } catch (error) {
    console.error("Error retrieving resource:", error);
    return null;
  }
};

function Update({ data, tagsByResource, tags }) {
  console.log({ tagsByResource, tags });
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: data.title || "",
    description: data.description || "",
    recommendedUse: data.recommendedUse || "",
    imageUrl: data.imageUrl || "",
    fileUrl: data.fileUrl || "",
    image: null,
    file: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [allTags, setAllTags] = useState(tags);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [selectedTags, setSelectedTags] = useState(
    tagsByResource.map((resourceTag) => resourceTag.tagId)
  );

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("id")) {
      setIsAuthorized(true);
      // Fetch all tags
      const fetchTags = async () => {
        const response = await fetch("/api/resource/tags");
        const data = await response.json();
        setAllTags(data);
        setFilteredTags(data);
      };
      fetchTags();
    }
  }, []);

  const r2Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
    region: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_REGION || "auto",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData((prev) => ({
        ...prev,
        [id]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const uploadToCloudflareR2 = async (
    file: File,
    bucketName: string,
    folder: string,
    type: string
  ) => {
    if (!file) throw new Error(`${type} file is missing`);

    const params = {
      Bucket: bucketName,
      Key: `${folder}/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await r2Client.send(command);
      console.log(`${type} uploaded successfully to R2:`, response);
      return `${process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_BUCKET_URL}/${folder}/${file.name}`;
    } catch (error) {
      throw new Error(`Error uploading ${type} to Cloudflare R2: ${error}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      let fileUrl = formData.fileUrl;

      if (formData.image) {
        imageUrl = await uploadToCloudflareR2(
          formData.image,
          "tree-shop",
          "showcase",
          "image"
        );
      }
      if (formData.file) {
        fileUrl = await uploadToCloudflareR2(
          formData.file,
          "tree-shop",
          "digitalproducts",
          "file"
        );
      }

      const response = await fetch(`/api/resource/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          title: formData.title,
          description: formData.description,
          tags: selectedTags,
          recommendedUse: formData.recommendedUse,
          imageUrl,
          fileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update resource: ${response.statusText}`);
      }

      setSuccessMessage("Resource updated successfully!");
      const responseData = await response.json();
      router.push(
        `/free-resources/resource/single/${responseData.resource.id}`
      ); // Redirect after successful update
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage(
        "There was an error updating the resource. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen p-2">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }

  return (
    <div className="max-w-80 m-auto">
      <div className="text-center mt-3 mb-3">
        <h1 className="font-bold text-xl">Update The Resource</h1>
      </div>
      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        allTags={allTags}
        filteredTags={filteredTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const data = await previousData(id);

  const tagsByResourceRes = await fetch(
    `${baseUrl}/api/resource/tags/by-product-id/${id}`
  );
  const tagsByResource = await tagsByResourceRes.json();

  const tagsRes = await fetch(`${baseUrl}/api/resource/tags`);
  const tags = await tagsRes.json();

  return {
    props: { data, tagsByResource: tagsByResource, tags: tags },
  };
}

export default Update;
