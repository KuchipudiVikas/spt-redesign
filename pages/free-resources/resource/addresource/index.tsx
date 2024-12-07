import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { stringToValidFilename } from "@/utils/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  title: string;
  description: string;
  recommendedUse: string;
  image: File | null;
  file: File | null;
}

export default function AddResource() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    recommendedUse: "",
    image: null,
    file: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const r2Client = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ENDPOINT,
    region: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_REGION || "auto",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
  });

  const filesToZip = (files: FileList) => {
    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      zip.file(files[i].name, files[i], { binary: true });
    }
    return zip;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      // const file = e.target.files ? e.target.files[0] : null;
      // if multiple files then create an zip file and upload it
      const files = e.target.files;
      if (files.length > 1) {
        const zip = filesToZip(files);
        zip.generateAsync({ type: "blob" }).then((content) => {
          const file = new File(
            [content],
            stringToValidFilename(formData.title || "archive.zip") ||
              "archive.zip",
            {
              type: "application/zip",
            }
          );
          setFormData((prev) => ({
            ...prev,
            [id]: file,
          }));
        });
      } else {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prev) => ({
          ...prev,
          [id]: file,
        }));
      }
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
      if (!formData.image || !formData.file) {
        throw new Error("Image and File are required to proceed.");
      }

      const imageUrl = await uploadToCloudflareR2(
        formData.image,
        "tree-shop",
        "showcase",
        "image"
      );
      const fileUrl = await uploadToCloudflareR2(
        formData.file,
        "tree-shop",
        "digitalproducts",
        "file"
      );

      const response = await fetch("/api/resource/addresource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          recommendedUse: formData.recommendedUse,
          imageUrl,
          fileUrl,
          tags: selectedTags,
          id: localStorage.getItem("id"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit resource: ${response.statusText}`);
      }

      const responseData = await response.json();
      setSuccessMessage("Resource added successfully!");
      router.push(
        "/free-resources/resource/single/" + responseData.resource.id
      );
      console.log("Successful!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const id = localStorage.getItem("id");
    setIsAuthorized(!!id);

    // Fetch all tags
    const fetchTags = async () => {
      const response = await fetch("/api/resource/tags");
      const data = await response.json();
      setAllTags(data);
      setFilteredTags(data);
    };
    fetchTags();
  }, []);

  if (!isMounted) return null;

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-80 m-auto">
        <div className="text-center mt-3 mb-3">
          <h1 className="font-bold text-xl">Add a resource</h1>
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
    </div>
  );
}

interface TagFieldsProps {
  selectedTags: any[];
  allTags: any[];
  setSelectedTags: any;
  filteredTags: any[];
  setFilteredTags: any;
}

export function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  errorMessage,
  successMessage,
  allTags,
  filteredTags,
  selectedTags,
  setSelectedTags,
  setFilteredTags,
}: any) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter the title of the resource..."
          className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter the description of the resource..."
          className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="file">Folder</label>
        <input
          type="file"
          id="file"
          multiple
          accept="*"
          // @ts-ignore
          webkitdirectory="true"
          directory="true"
          className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
          onChange={handleChange}
        />

        <label htmlFor="file">File (PDF, Excel, Docs, Images)</label>
        <input
          type="file"
          id="file"
          multiple
          accept="*"
          className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
          onChange={handleChange}
        />
      </div>

      {/* {newFunction(selectedTags, allTags, setSelectedTags, handleTagSearch, filteredTags)}
       */}

      <TagFields
        selectedTags={selectedTags}
        allTags={allTags}
        setSelectedTags={setSelectedTags}
        filteredTags={filteredTags}
        setFilteredTags={setFilteredTags}
      />

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 mt-2">{successMessage}</div>
      )}

      <div>
        <Button
          className="mt-5 bg-violet-500 text-white p-2 rounded-md w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add resource"}
        </Button>
      </div>
    </form>
  );
}

interface TagFieldsProps {
  selectedTags: string[];
  allTags: { id: string; name: string }[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  filteredTags: { id: string; name: string }[];
  setFilteredTags: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
}

const Tag = ({
  label,
  onDelete,
  onClick,
  isSelected,
}: {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  return (
    <div
      className={`inline-flex w-full gap-2 items-center px-2 py-1 m-1 rounded-full text-sm my-2 font-medium "
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {" "}
      <Checkbox
        style={{
          borderRadius: "4px",
          marginRight: "8px",
        }}
        checked={isSelected}
      />
      {label}
      {onDelete && (
        <span
          className="ml-2 text-xs cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

export function TagFields({
  selectedTags,
  allTags,
  setSelectedTags,
  filteredTags,
  setFilteredTags,
}: TagFieldsProps) {
  const handleTagSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!allTags) return;
    if (!e.target.value) {
      setFilteredTags(allTags);
      return;
    }
    // Update the search value
    const searchValue = e.target.value.toLowerCase();

    // Sort and filter tags based on the search input
    const filteredAndSortedTags = allTags
      .filter((tag) => tag.name.toLowerCase().includes(searchValue)) // Filter based on the search value
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    setFilteredTags(filteredAndSortedTags);
  };

  return (
    <div className="flex border p-3 rounded-2xl flex-col ">
      <div className="flex justify-between">
        <label htmlFor=" font-bold text-[22px]">
          {" "}
          <span className="font-bold text-[22px] ml-2">Tags </span>{" "}
        </label>
      </div>
      <div className="flex flex-wrap mt-2  overflow-auto">
        {filteredTags.map((tag) => (
          <Tag
            key={tag.id}
            label={tag.name}
            isSelected={selectedTags.includes(tag.id)}
            onClick={() => {
              if (selectedTags.includes(tag.id)) {
                setSelectedTags((prev) =>
                  prev.filter((selectedTag) => selectedTag !== tag.id)
                );
              } else {
                setSelectedTags((prev) => [...prev, tag.id]);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
