import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon, EyeIcon, Filter, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { allProducts, Product, ProductCategory, Categories } from "@/data/shop";

interface ToolsPageProps {}

type PriceRange = "low_to_high" | "high_to_low";

const ToolsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [query, setQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);
  const [toolType, setToolType] = useState<string>("all"); // New state for tool type

  useEffect(() => {
    let filteredProducts = allProducts;

    // Filter by search query
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by tool type
    if (toolType === "free") {
      filteredProducts = filteredProducts.filter((product) => !product.isPaid);
    } else if (toolType === "paid") {
      filteredProducts = filteredProducts.filter((product) => product.isPaid);
    }

    // Sort by price range
    if (priceRange) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (priceRange === "low_to_high") {
          return a.price - b.price;
        } else if (priceRange === "high_to_low") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setProducts(filteredProducts);
  }, [query, selectedCategories, priceRange, toolType]);

  return (
    <div
      style={{
        gap: "2rem",
        paddingTop: "60px",
      }}
      className="grid grid-cols-4  p-5"
    >
      <div>
        <Filters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setPriceRange={setPriceRange}
          priceRange={priceRange}
        />
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex gap-3">
          {/* Search Input */}
          <div
            style={{
              border: "1px solid #ccc",
            }}
            className="w-full mb-5 rounded-full"
          >
            <Input
              placeholder="Enter keyword to search tool"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: "none",
                padding: "29px",
              }}
              className="rounded-full"
            />
          </div>

          {/* Select Dropdown for Tool Type */}
          <select
            style={{
              padding: "15px",
              borderRadius: "40px",
              height: "60px",
              border: "1px solid #ccc",
              width: "200px",
            }}
            value={toolType}
            onChange={(e) => setToolType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Product List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((product, index) => (
            <SingleProduct key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;

const SingleProduct = ({ product }: { product: Product }) => {
  return (
    <div
      style={{
        borderRadius: "1rem",
      }}
      className="flex p-3 bg-[#f7f7f8] font-jsans rounded-lg flex-col"
    >
      <div className="flex h-full flex-col gap-2">
        <Image
          src={product.thumb_url}
          alt="Product Image"
          width={500}
          style={{
            borderRadius: "1rem",
            height: "200px",
          }}
          className="rounded-lg "
          height={400}
        />
        <div className="flex px-3 justify-between h-full flex-col">
          <div className="flex flex-col">
            <h3 className="font-bold text-[18px]">{product.title}</h3>
            <p
              style={{
                fontSize: "15px",
                marginTop: "15px",
              }}
              className=""
            >
              {product.description}
            </p>
          </div>

          <div
            style={{
              marginTop: "19px",
            }}
            className="flex flex-col gap-2"
          >
            {/* <h6
              style={{
                marginTop: "20px",
                fontSize: "20px",
              }}
              className=" flex items-center text-primary font-bold"
            >
              ${product.price.toFixed(2)}{" "}
              <span
                style={{
                  color: "#ccc",
                  fontSize: "12px",
                  fontWeight: "normal",
                  textDecoration: "line-through",
                }}
                className="ml-2"
              >
                ${product.og_price}
              </span>{" "}
            </h6> */}
            {/* 
            <Button className="rounded-full font-bold">
              <ShoppingCartIcon size={20} className="mr-2  " />
              Buy Now
            </Button> */}
            <Button variant={"outline"} className="rounded-full font-bold">
              {/* <EyeIcon size={20} className="mr-2 " /> */}
              Preview
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FiltersProps {
  selectedCategories: ProductCategory[];
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<ProductCategory[]>
  >;
  setPriceRange: React.Dispatch<React.SetStateAction<PriceRange | null>>;
  priceRange: PriceRange | null;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  setPriceRange,
  priceRange,
}) => {
  const ClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(null);
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "20px",
        position: "sticky",
        top: "100px",
      }}
      className="border "
    >
      <div className="flex items-center justify-between ">
        <h3
          className="font-extrabold"
          style={{
            borderRadius: "16px",
            fontSize: "24px",
          }}
        >
          Filters
        </h3>
        <div onClick={() => ClearFilters()} className="cursor-pointer">
          Clear
        </div>
      </div>
      <hr className="my-3" />
      <div className="">
        <h3
          style={{
            fontSize: "18px",
          }}
          className="font-bold"
        >
          Price Range
        </h3>{" "}
        <div
          style={{
            marginTop: "25px",
            gap: "25px",
          }}
          className="flex flex-col "
        >
          <div
            onClick={() => {
              if (priceRange === "low_to_high") {
                setPriceRange(null);
              } else {
                setPriceRange("low_to_high");
              }
            }}
            className="cursor-pointer flex gap-2 items-center"
          >
            <Checkbox
              checked={priceRange == "low_to_high"}
              style={{ borderRadius: "20%" }}
            />{" "}
            <span
              style={{
                fontSize: "18px",
              }}
            >
              Low to High
            </span>
          </div>
          <div
            onClick={() => {
              if (priceRange === "high_to_low") {
                setPriceRange(null);
              } else {
                setPriceRange("high_to_low");
              }
            }}
            className="cursor-pointer flex gap-2 items-center"
          >
            <Checkbox
              checked={priceRange == "high_to_low"}
              style={{ borderRadius: "20%" }}
            />{" "}
            <span
              style={{
                fontSize: "18px",
              }}
            >
              High to Low
            </span>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="">
        <h3
          style={{
            fontSize: "18px",
          }}
          className="font-bold"
        >
          Features
        </h3>
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
          className=""
        >
          {Categories.map((category, index) => {
            return (
              <div
                onClick={() => {
                  setSelectedCategories((prev) => {
                    if (prev.includes(category)) {
                      return prev.filter((cat) => cat !== category);
                    }
                    return [...prev, category];
                  });
                }}
                key={index}
                style={{}}
                className="flex items-center cursor-pointer gap-2"
              >
                <Checkbox
                  style={{
                    borderRadius: "20%",
                  }}
                  checked={selectedCategories.includes(category)}
                />{" "}
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
