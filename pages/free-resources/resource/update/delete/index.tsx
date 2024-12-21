import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Linkn } from "@/components/Linkn";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  imageUrl: string;
  fileUrl: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
};

const Update: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const fetchProducts = async (page: number, pageSize: number) => {
    setLoading(true);
    const response = await fetch(
      `/api/resource/updateresources?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    setProducts(data.products);
    setRowCount(data.total);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("id")) {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    fetchProducts(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const handleDelete = async (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));

    try {
      const response = await fetch(`/api/resource/deleteresource?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen p-2">
        <h1 className="text-3xl">You are not authorized to view this page</h1>
      </div>
    );
  }

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPaginationModel({ page: newPage, pageSize: newPageSize });
  };

  return (
    <div className="w-full mx-auto p-5">
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">File</th>
              <th className="px-6 py-3">Added By</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Updated At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">
                    <Linkn
                      href={`/free-resources/resource/single/${product.id}`}
                      // className="underline text-blue-500"
                    >
                      {product.title}
                    </Linkn>
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link href={product.fileUrl} target="_blank">
                      <Button style={{ backgroundColor: "#8b5cf6" }}>
                        Download
                      </Button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">{product.addedBy}</td>
                  <td className="px-6 py-4">{product.createdAt}</td>
                  <td className="px-6 py-4">{product.updatedAt}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Linkn
                      href={`/free-resources/resource/update/${product.id}`}
                    >
                      <Button color="secondary">
                        <EditIcon />
                      </Button>
                    </Linkn>
                    <Button
                      style={{ color: "#ef4444" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() =>
            handlePaginationChange(
              paginationModel.page - 1,
              paginationModel.pageSize
            )
          }
          disabled={paginationModel.page === 0}
        >
          Previous
        </Button>
        <span>
          Page {paginationModel.page + 1} of{" "}
          {Math.ceil(rowCount / paginationModel.pageSize)}
        </span>
        <Button
          onClick={() =>
            handlePaginationChange(
              paginationModel.page + 1,
              paginationModel.pageSize
            )
          }
          disabled={
            (paginationModel.page + 1) * paginationModel.pageSize >= rowCount
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Update;
