import axios, { AxiosResponse, AxiosError } from "axios";

interface IApiResponse<T> {
  data: T | null;
  error: string | null;
  status?: number;
}

interface IApiRequestOptions {
  retries?: number;
  timeout?: number;
  headers?: { Authorization?: string };
  transformResponse?: (data: any) => any;
  signal?: AbortSignal;
}

const debug = process.env.NEXP_PUBLIC_ENV == "dev";

const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: any,
  options?: IApiRequestOptions
): Promise<IApiResponse<T>> => {
  const {
    retries = 3,
    timeout = 5000,
    headers,
    transformResponse,
    signal, // Accept signal from options
  } = options || {};

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers,
        timeout,
        signal, // Attach the signal to the axios request
        transformResponse: transformResponse ? [transformResponse] : undefined,
      });

      if (debug) {
        console.log(`Request to ${url} succeeded on attempt ${attempt + 1}`);
      }

      return { data: response.data, error: null, status: response.status };
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled by AbortController");
        return { data: null, error: "Request canceled", status: undefined };
      }

      if (attempt < retries - 1) {
        if (debug) {
          console.warn(
            `Request to ${url} failed on attempt ${attempt + 1}. Retrying...`
          );
        }
        continue;
      }

      const axiosError = error as AxiosError;
      if (debug) {
        console.error(
          `Request to ${url} failed after ${retries} attempts: ${axiosError.message}`
        );
      }
      return {
        data: null,
        error: axiosError.message,
        status: axiosError.response?.status,
      };
    }
  }
  return { data: null, error: "Unknown error" };
};

export const getRequest = async <T>(
  url: string,
  options?: IApiRequestOptions
): Promise<IApiResponse<T>> => {
  return apiRequest<T>("get", url, undefined, options);
};

export const postRequest = async <T>(
  url: string,
  body: any,
  options?: IApiRequestOptions
): Promise<IApiResponse<T>> => {
  return apiRequest<T>("post", url, body, options);
};

export const putRequest = async <T>(
  url: string,
  body: any,
  options?: IApiRequestOptions
): Promise<IApiResponse<T>> => {
  return apiRequest<T>("put", url, body, options);
};

export const deleteRequest = async <T>(
  url: string,
  options?: IApiRequestOptions
): Promise<IApiResponse<T>> => {
  return apiRequest<T>("delete", url, undefined, options);
};

const request = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default request;
