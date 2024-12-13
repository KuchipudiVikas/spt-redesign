import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Check } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Divider, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import StarsIcon from "@mui/icons-material/Stars";
export default function Form({
  paymentIntent,
  email,
  products = null,
  setProducts = null,
}) {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("not loaded");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name: "Billing user",
          },
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="m-auto min-h-screen"
      >
        <div className=" w-full  flex flex-col justify-center items-center">
          <div className=" w-3/5 ">
            <div className="mb-6">Email : {email}</div>
            <div className="">
              <PaymentElement
                id="payment-element"
                className="shadowAround p-6"
              />
            </div>
            <div className="w-full flex-col gap-y-6 justify-center flex">
              <CrossSellCard
                product={{
                  saleHeader: "Special One Time Offer",
                  name: "KDP Masterclass",
                  price: "$149.00",
                }}
                products={products}
                setProducts={setProducts}
                addToCart={() => {}}
              />
              <Button
                variant="contained"
                size="large"
                className="elements-style-background mb-16 text-[18px] w-full"
                disabled={isLoading || !stripe || !elements}
                id="submit"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </Button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

const CrossSellCard = ({ product, addToCart, setProducts, products }) => {
  let id = product.id || "63149a704f08614dd053ec3d";
  const removeProduct = (id) => {
    setProducts(products.filter((p) => p !== id));
  };

  const addProduct = (id) => {
    setProducts([...products, id]);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    open: { opacity: 1, height: "auto", y: 0 },
    closed: { opacity: 0, height: 0, y: "-100%" },
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div className="">
      <Typography
        variant="body2"
        className=" font-Inter flex items-center text-[#5d5d5d] my-1 gap-2 font-semibold"
      >
        <StarsIcon />
        {product.saleHeader}
      </Typography>
      <div
        className="grid grid-cols-4 gap-5 p-4 br-16"
        style={{ border: "1px solid #808080", borderRadius: "20px" }}
      >
        <div className="col-span-3">
          <div className="flex gap-1.5">
            <Typography variant="h6" className="font-Inter font-bold">
              {product.name}
            </Typography>
          </div>
          <div className="flex items-center">
            <Typography
              variant="body1"
              className="font-Inter text-[#353535] font-bold"
            >
              At just{" "}
            </Typography>
            <Typography variant="body1" className="font-Inter  font-semibold ">
              <span className="text-[#7449fb] ml-1.5 font-Inter  font-bold">
                $129.
              </span>
            </Typography>
            <Typography
              variant="body2"
              className="font-Inter flex items-center text-[#000] ml-3 cursor-pointer font-semibold"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              More Info
              <ExpandMoreIcon />
            </Typography>
          </div>
          {isExpanded && (
            <motion.div
              variants={variants}
              initial="closed"
              animate={isExpanded ? "open" : "closed"}
              transition={{ duration: 0.18 }}
            >
              <Divider className="my-3" />
              <div className="">
                {[
                  "80+ videos",
                  "100+ resources",
                  "Private facebook group",
                  "Over 1,300 students trained",
                ].map((item, index) => (
                  <div className="flex gap-2 my-2" key={index}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography variant="body1" className="">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <div className="h-full flex justify-end items-center">
          {products.includes(id) ? (
            <Button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => removeProduct(id)}
              variant="contained"
              color={hovered ? "error" : "success"}
              startIcon={hovered ? <Close /> : <Check />}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={hovered ? "Remove" : "Added"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {hovered ? "Remove" : "Added"}
                </motion.span>
              </AnimatePresence>
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
    </div>
  );
};
