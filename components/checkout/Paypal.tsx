import Accounts from "@/lib/mw/Accounts";
import router from "next/router";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from "next/script";
import { useEffect, useState } from "react";

export async function checkCountry() {
  const key = process.env.NEXT_PUBLIC_CF_KEY;
  // https://cf-data.selfpublishingtitans.workers.dev
  const url = "https://cf-data.selfpublishingtitans.workers.dev/";
  return fetch(url, {
    headers: {
      "X-Secret-Code": key,
    },
  }).then((response) => response.json());
}

function PaypalComponent({ token, productInfo }) {
  const [isPaypalAvailable, setIsPaypalAvailable] = useState(false);
  const allowedCountries = ["US", "CA", "GB", "UK", "DE", "AU", "IT", "BD"];
  //{
  //     "longitude": "90.41090",
  //     "httpProtocol": "HTTP/3",
  //     "tlsCipher": "AEAD-AES128-GCM-SHA256",
  //     "continent": "AS",
  //     "asn": 63526,
  //     "clientAcceptEncoding": "gzip, deflate, br, zstd",
  //     "country": "BD",
  //     "verifiedBotCategory": "",
  //     "tlsClientAuth": {
  //         "certIssuerDNLegacy": "",
  //         "certIssuerSKI": "",
  //         "certSubjectDNRFC2253": "",
  //         "certSubjectDNLegacy": "",
  //         "certFingerprintSHA256": "",
  //         "certNotBefore": "",
  //         "certSKI": "",
  //         "certSerial": "",
  //         "certIssuerDN": "",
  //         "certVerified": "NONE",
  //         "certNotAfter": "",
  //         "certSubjectDN": "",
  //         "certPresented": "0",
  //         "certRevoked": "0",
  //         "certIssuerSerial": "",
  //         "certIssuerDNRFC2253": "",
  //         "certFingerprintSHA1": ""
  //     },
  //     "tlsExportedAuthenticator": {
  //         "clientFinished": "5e0f13a58e4661320012fd8af6526135f4500e401f99aeaa2dbe59b266574a4b",
  //         "clientHandshake": "8a0117fddb3cb5136abe9c125cae640190d94d9593d599e4651043e2672cfcb7",
  //         "serverHandshake": "507a286691ec09f84cdf031e8bf90a6ac3e5e0f7c0fc47d6d33ea3a74ff7e5d8",
  //         "serverFinished": "3a470eacac1d2cc3c48b901cd0a263217f388ba5d8d9ecd99eb59af764ad58bc"
  //     },
  //     "tlsVersion": "TLSv1.3",
  //     "city": "Dhaka",
  //     "timezone": "Asia/Dhaka",
  //     "colo": "SIN",
  //     "tlsClientHelloLength": "2026",
  //     "edgeRequestKeepAliveStatus": 1,
  //     "postalCode": "1212",
  //     "region": "Dhaka Division",
  //     "latitude": "23.79080",
  //     "requestPriority": "",
  //     "regionCode": "C",
  //     "asOrganization": "Systems Solutions & Development Technologies Ltd",
  //     "tlsClientExtensionsSha1": "qx4ZFfOHttLzLUcvt5SDjP/6bms=",
  //     "tlsClientRandom": "w1iw8jOm21s3BEmTIWWckGyylhiCyef3Os87k6juooQ="
  // }
  const [customValue, setCustomValue] = useState("");

  // Fetch the IP address or any other custom data for affiliate tracking
  useEffect(() => {
    // Simulate fetching IP or custom affiliate data
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setCustomValue(data.ip); // You can replace this with any affiliate info
      });
  }, []);
  const [cfData, setCfData] = useState(null);

  async function createOrder(data) {
    return Accounts.features
      .createPaypalOrder(token, [productInfo.id], customValue)
      .then((response) => {
        return response;
      })
      .then((order) => order.id);
    // Order is created on the server and the order id is returned
    // return fetch("/my-server/create-paypal-order", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // use the "body" param to optionally pass additional order information
    //   // like product skus and quantities
    //   body: JSON.stringify({
    //     cart: [
    //       {
    //         sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
    //         quantity: "YOUR_PRODUCT_QUANTITY",
    //       },
    //     ],
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((order) => order.id);
  }

  //   {
  //     "id": "2XJ47245B4754472G",
  //     "status": 200,
  //     "payment_source": {
  //         "paypal": {
  //             "email_address": "sb-zpk3k26241739@personal.example.com",
  //             "account_id": "ZB8GH9NAU2RB2",
  //             "account_status": "VERIFIED",
  //             "name": {
  //                 "given_name": "John",
  //                 "surname": "Doe"
  //             },
  //             "address": {
  //                 "country_code": "GT"
  //             }
  //         }
  //     },
  //     "purchase_units": [
  //         {
  //             "reference_id": "default",
  //             "shipping": {
  //                 "name": {
  //                     "full_name": "John Doe"
  //                 },
  //                 "address": {
  //                     "address_line_1": "Free Trade Zone",
  //                     "admin_area_2": "Guatemala City",
  //                     "admin_area_1": "Guatemala City",
  //                     "postal_code": "01001",
  //                     "country_code": "GT"
  //                 }
  //             },
  //             "payments": {
  //                 "captures": [
  //                     {
  //                         "id": "8JY23554NX215824T",
  //                         "status": "COMPLETED",
  //                         "amount": {
  //                             "currency_code": "USD",
  //                             "value": "99.00"
  //                         },
  //                         "final_capture": true,
  //                         "seller_protection": {
  //                             "status": "ELIGIBLE",
  //                             "dispute_categories": [
  //                                 "ITEM_NOT_RECEIVED",
  //                                 "UNAUTHORIZED_TRANSACTION"
  //                             ]
  //                         },
  //                         "seller_receivable_breakdown": {
  //                             "gross_amount": {
  //                                 "currency_code": "USD",
  //                                 "value": "99.00"
  //                             },
  //                             "paypal_fee": {
  //                                 "currency_code": "USD",
  //                                 "value": "5.65"
  //                             },
  //                             "net_amount": {
  //                                 "currency_code": "USD",
  //                                 "value": "93.35"
  //                             }
  //                         },
  //                         "links": [
  //                             {
  //                                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/8JY23554NX215824T",
  //                                 "rel": "self",
  //                                 "method": "GET"
  //                             },
  //                             {
  //                                 "href": "https://api.sandbox.paypal.com/v2/payments/captures/8JY23554NX215824T/refund",
  //                                 "rel": "refund",
  //                                 "method": "POST"
  //                             },
  //                             {
  //                                 "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2XJ47245B4754472G",
  //                                 "rel": "up",
  //                                 "method": "GET"
  //                             }
  //                         ],
  //                         "create_time": "2024-10-03T06:40:47Z",
  //                         "update_time": "2024-10-03T06:40:47Z"
  //                     }
  //                 ]
  //             }
  //         }
  //     ],
  //     "payer": {
  //         "name": {
  //             "given_name": "John",
  //             "surname": "Doe"
  //         },
  //         "email_address": "sb-zpk3k26241739@personal.example.com",
  //         "payer_id": "ZB8GH9NAU2RB2",
  //         "address": {
  //             "country_code": "GT"
  //         }
  //     },
  //     "links": [
  //         {
  //             "href": "https://api.sandbox.paypal.com/v2/checkout/orders/2XJ47245B4754472G",
  //             "rel": "self",
  //             "method": "GET"
  //         }
  //     ],
  //     "name": "OK"
  // }

  async function onApprove(data) {
    // Capture the funds from the transaction
    const res = Accounts.features.capturePaypalOrder(token, data);

    const finalData = await res;
    console.log(finalData);
    // https://affiliates.selfpublishingtitans.com/sale.php?profile=72198&idev_saleamt
    // "http://www.site.com/idevaffiliate/sale.php?profile=72198&idev_saleamt=XXX&idev_ordernum=YYY&ip_address=IPA

    const idev_saleamt =
      finalData.purchase_units[0].payments.captures[0].amount.value;
    const idev_ordernum = finalData.id;
    const ip_address = customValue;
    // const idevTrackingUrl = getIdevTrackingUrl(idev_saleamt, idev_ordernum, ip_address);

    // make a request to the idev tracking url
    // idev_saleamt, idev_ordernum, ip_address are the parameters
    fetch(
      "/api/idev" +
        `?idev_saleamt=${idev_saleamt}&idev_ordernum=${idev_ordernum}&ip_address=${ip_address}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    router.push(`/payment-success?next=${encodeURIComponent(router.asPath)}`);
  }

  function onError(err) {
    console.error(err);
    router.push(`/payment-failed`);
  }

  function onCancel(data) {
    console.log(data);
    router.push(`/payment-failed`);
  }

  useEffect(() => {
    checkCountry().then((data) => {
      setCfData(data);
      if (data && data?.country && allowedCountries.includes(data.country)) {
        setIsPaypalAvailable(true);
      }
    });
  }, []);

  if (!isPaypalAvailable) {
    return null;
  }

  return (
    <div>
      {/* <input
        type="hidden"
        name="notify_url"
        value="https://affiliates.selfpublishingtitans.com/connect/paypal_ipn_buynow.php"
      />

      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" />
      <input type="hidden" className="getip" name="custom" value={customValue} />
      <Script src="https://affiliates.selfpublishingtitans.com/connect/paypal.js" /> */}
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          disableFunding: "card",
        }}
      >
        <PayPalButtons
          style={{
            layout: "horizontal",
            tagline: false,
            shape: "pill",
            label: "buynow",
            height: 44,
          }}
          createOrder={(data, actions) => createOrder(data)}
          onApprove={(data, actions) => onApprove(data)}
          onCancel={(data) => onCancel(data)}
          onError={(err) => onError(err)}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalComponent;
