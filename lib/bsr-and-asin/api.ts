// Define a function to fetch data for a given page
const fetchDataForPage = async ({
  url,
  token,
  data,
}: FetchProductDataFromApiProps) => {
  // const data = {
  //   page_offset: page,
  //   search_key: searchKey,
  //   domain: domain,
  // };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, options);
    const resJson = await res.json();
    if (res.status !== 200) {
      const errorMessage = resJson.error;
      throw new Error(errorMessage);
    }

    if (
      resJson &&
      resJson.data.data &&
      resJson.data.data.products &&
      resJson.data.data.products.length > 0
    ) {
      return resJson.data.data.products;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export async function retrieveProductDataFromApi({
  token,
  searchKey,
  domain,
  endpoint = "get-amazon-sell-center-data",
}) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/amazon-sell-center/" +
    endpoint;

  const allProducts = [];

  // Define a function to fetch data for a given page
  // const fetchDataForPage = async (page) => {
  //
  //
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(data),
  //   };
  //
  //   try {
  //     const res = await fetch(url, options);
  //     const resJson = await res.json();
  //     if (res.status !== 200) {
  //       const errorMessage = resJson.error;
  //       throw new Error(errorMessage);
  //     }
  //
  //     if (
  //       resJson &&
  //       resJson.data.data &&
  //       resJson.data.data.products &&
  //       resJson.data.data.products.length > 0
  //     ) {
  //       return resJson.data.data.products;
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // Use Promise.all to fetch data for multiple pages concurrently
  const totalPages = 4;
  const promises = Array.from({ length: totalPages }, (_, page) =>
    fetchDataForPage({
      url,
      token,
      data: { page_offset: page + 1, search_key: searchKey, domain: domain },
    })
  );

  const results = await Promise.allSettled(promises);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      const products = result.value;

      allProducts.push(...products.flat());
    } else {
      if (result.reason.message === "Error: user not paid") {
        throw new Error("user not paid");
      }
    }
  }
  return allProducts;
}

interface FetchProductDataFromApiProps {
  token: string;
  data: RequestData;
  url: string;
}

interface RequestData {
  page_offset: number;
  search_key: string;
  domain: string;
}

export async function retrieveFristPageProductDataFromApi({
  token,
  searchKey,
  domain,
  endpoint = "get-amazon-sell-center-data",
}) {
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/amazon-sell-center/" +
    endpoint;

  const requestData: RequestData = {
    page_offset: 1,
    search_key: searchKey,
    domain: domain,
  };

  // Use Promise.all to fetch data for multiple pages concurrently
  const maxRetries = 3;
  let retries = 0;
  let products = [];
  while (retries < maxRetries) {
    try {
      products = await fetchDataForPage({ url, token, data: requestData });
      break;
    } catch (error) {
      retries++;
    }
  }
  if (retries === maxRetries) {
    throw new Error("Failed to fetch data");
  }

  return products;
}

interface StartProductTrackingAPIProps {
  token: string;
  asins: string[];
  domain: string;
}

function validateAmazonASIN(asin) {
  // ASIN should be a string of length 10
  if (typeof asin !== "string" || asin.length !== 10) {
    return false;
  }

  // ASIN pattern check - Starts with 'B' followed by 9 alphanumeric characters
  const asinRegex = /^[A-Z0-9]{10}$/;

  return asinRegex.test(asin);
}

// start product tracking
export const StartProductTrackingAPI = (
  props: StartProductTrackingAPIProps
) => {
  if (props.token === "" || props.asins.length === 0 || props.domain === "") {
    alert("Please enter valid data");
    return;
  }
  // validate asins
  const asins = props.asins;
  asins.forEach((asin) => {
    if (validateAmazonASIN(asin) === false) {
      alert("Please enter valid ASINs");
      return;
    }
  });
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/amazon-sell-center/track-product";
  const body = {
    asins: props.asins,
    domain: props.domain,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
};

// remove product tracking
export const RemoveProductTrackingAPI = (
  props: StartProductTrackingAPIProps
) => {
  if (props.token === "" || props.asins.length === 0 || props.domain === "") {
    alert("Please enter valid data");
    return;
  }
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL +
    "/api/v1/amazon-sell-center/track-product";
  const body = {
    asins: props.asins,
    domain: props.domain,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${props.token}`,
  };
  return fetch(url, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
};
