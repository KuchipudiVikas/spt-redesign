import { getRequest } from "../interface";

const endPoint = "/api/v1/kdp/usage/";

const GetUsage = async (id: string, token: string) => {
  const url = process.env.NEXT_PUBLIC_GO_TITANS_API_URL + endPoint + id;
  const BearerToken = "Bearer " + token;
  return getRequest(url, {
    headers: {
      Authorization: BearerToken,
    },
  });
};

export default GetUsage;
