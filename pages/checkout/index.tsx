import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import CheckoutForm from "@/components/checkout/payment_form";
import { Typography, Button, Divider } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import axios from "axios";
import Close from "@mui/icons-material/Close";
import StarsIcon from "@mui/icons-material/Stars";
import BrandLogo from "@/public/assets/logos/brand-logo-purple.png";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Index = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");

  const router = useRouter();
  const email = router.query.email;
  const productId = router.query.product;
  const type = router.query.type || "sub";
  const [products, setProducts] = useState([productId]);
  const [productsInfo, setProductsInfo] = useState(null);

  // const productInfo = JSON.parse(product as string);

  useEffect(() => {
    if (productId) {
      setProducts([productId]);
    }
  }, [productId]);

  const axiosPost = async (url, data) => {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const fetchProductDetails = async (productId) => {
    const store_lookup = await axiosPost("/api/product/info", { productId });
    let s_product_id = store_lookup.stripe_product_id;
    const productRes = await axiosPost("/api/payment/stripe_product", {
      productId: s_product_id,
    });
    return productRes;
  };

  const fetchPrice = async (productData) => {
    const priceRes = await axiosPost("/api/payment/stripe_price", {
      priceId: productData.default_price,
    });
    return priceRes;
  };

  const createPaymentIntent = async (pricesData) => {
    const intentRes = await axiosPost("/api/payment/stripe_intent", {
      products: pricesData,
    });
    return intentRes;
  };

  useEffect(() => {
    const fetchProductsAndCreateIntent = async () => {
      const productsData = await Promise.all(products.map(fetchProductDetails));
      const pricesData = await Promise.all(productsData.map(fetchPrice));
      const intentData = await createPaymentIntent(pricesData);

      const combinedData = productsData.map((product) => {
        const priceData = pricesData.find(
          (price) => price.product === product.id
        );
        return { ...product, priceData };
      });

      setProductsInfo(combinedData);
      console.log({ combinedData });

      setClientSecret(intentData.client_secret);
      setPaymentIntent(intentData.payment_intent);
    };

    if (products.length > 0) {
      fetchProductsAndCreateIntent();
    }
  }, [products]);

  function addCrossSellToCart(id) {
    setProducts((products) => [...products, id]);
  }

  const appearance: Appearance = {
    theme: "stripe",
    labels: "floating",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 h-full min-h-screen">
        <div className="bg-[#c3b3fd] flex items-start justify-end">
          <div className="mr-24 mt-24 w-3/5">
            <div className="flex items-center mb-16 gap-4">
              <Image
                src={BrandLogo.src}
                alt="spt"
                width={100}
                height={100}
                className="w-12 h-auto"
              />
              <Typography variant="h4" className="font-Inter font-semibold">
                Titans LLC
              </Typography>
            </div>
            {/* <Typography variant="h4" className="">
              Pay Titans LLC ${productsInfo[0]?.priceData.unit_amount / 100}
            </Typography> */}
            <Typography variant="h4" className="font-Inter mb-4 font-semibold">
              {/* {type == "sub" ? "Subscribe to" : "Purchase"} {} */}
              Checkout
            </Typography>
            {productsInfo && <BillingTable productsInfo={productsInfo} />}
            <div className="mt-20">
              <div className="flex gap-2 items-center justify-center">
                <StarsIcon color="primary" />
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  className="font-Inter my-4 font-semibold"
                >
                  Add To Your Order
                </Typography>
              </div>
              <CrossSellCard
                product={{}}
                addToCart={addCrossSellToCart}
                setProducts={setProducts}
                products={products}
              />
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm paymentIntent={paymentIntent} email={email} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

const CrossSellCard = ({ product, addToCart, setProducts, products }) => {
  let id = "63149a704f08614dd053ec3d";
  const removeProduct = (id) => {
    setProducts(products.filter((p) => p !== id));
  };

  const addProduct = (id) => {
    setProducts([...products, id]);
  };

  return (
    <div
      className="grid grid-cols-4 gap-5 p-4 br-16"
      style={{ border: "1px solid #5d5d5d", borderRadius: "20px" }}
    >
      <div className="col-span-3">
        <Typography variant="h6" className="">
          KDP Masterclass
        </Typography>
        <Typography variant="body2" className="">
          $149.00
        </Typography>
      </div>
      <div className="h-full flex justify-end items-center">
        {products.includes(id) ? (
          <Button
            onClick={() => removeProduct(id)}
            variant="contained"
            color="error"
            startIcon={<Close />}
          >
            Remove
          </Button>
        ) : (
          <Button
            onClick={() => addProduct(id)}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

const BillingTable = ({ productsInfo }) => {
  const subtotal = productsInfo.reduce(
    (total, product) => total + product.priceData.unit_amount / 100,
    0
  );
  const [discount, setDiscount] = React.useState(0);
  const total = subtotal - discount;
  if (productsInfo.length == 0) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-0 ">
      {productsInfo.map((product, index) => (
        <div key={index} className="grid-cols-4 my-3 grid">
          <div className="col-span-3">
            <Typography variant="body1" className="font-Inter font-medium">
              {product.name}
            </Typography>
            <div className="col-span-1">
              <Typography variant="body2" className="font-Inter pr-7">
                <div dangerouslySetInnerHTML={product.description}></div>
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Typography variant="body1" className="font-Inter ">
              {" "}
              ${(product.priceData.unit_amount / 100).toFixed(2)}{" "}
            </Typography>
          </div>
        </div>
      ))}
      <Divider />
      <div className="grid grid-cols-4 my-4">
        <div className="col-span-3">
          <Typography variant="body1" className="font-Inter ">
            Subtotal
          </Typography>
        </div>
        <div className="flex justify-center items-center">
          <Typography> ${subtotal.toFixed(2)}</Typography>
        </div>
      </div>
      <Divider />
      {/* <div>Discount</div> */}
      {/* <div>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div> */}
      <div className="grid grid-cols-4 my-4">
        <div className="col-span-3">
          {" "}
          <Typography variant="body1" className="font-Inter font-bold">
            {" "}
            Total
          </Typography>
        </div>
        <div className="flex justify-center items-center">
          <Typography variant="body1" className="font-Inter font-bold">
            ${total.toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
