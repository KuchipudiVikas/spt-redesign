import pixabay from "./services/pixabay";
import vecteezy from "./services/vecteezy";
import { TImage } from "@/lib/contexts/coverApp";
import { VecteezyImage } from "./services/vecteezy";

let currentAbortController: AbortController | null = null;

export type ImageType = "photo" | "png" | "svg" | "vector";

const searchImages = async (
  query: string,
  page: number,
  imageType: ImageType
): Promise<string[]> => {
  // Abort the previous request if it exists
  if (currentAbortController) {
    currentAbortController.abort();
  }

  // Create a new AbortController for the current request
  currentAbortController = new AbortController();
  const signal = currentAbortController.signal;

  try {
    if (!query) {
      query = "views";
    }

    // @ts-ignore
    const response = await vecteezy.GetVecteezyImages(query, page, imageType, {
      signal,
    });
    return response.resources.map((hit: VecteezyImage) => ({
      preview: hit.thumbnail_2x_url,
      ogImage: hit.preview_2x_url,
      id: hit.id.toString(),
    }));
  } catch (error) {
    // @ts-ignore
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
      return [];
    } else {
      throw error;
    }
  }
};

// @ts-ignore
// const response = await vecteezy.GetVecteezyImages(query, page, { signal });
// return response.resources.map((hit: VecteezyImage) => ({
//   preview: hit.thumbnail_2x_url,
//   ogImage: hit.preview_2x_url,
//   id: hit.id.toString()
// }));

export type TApiRes = {
  images: TImage[];
  hasMore: boolean;
};

export const searchCoverImages = async (
  query: string,
  page: number,
  type: string = "book covers"
): Promise<TApiRes> => {
  // Abort the previous request if it exists
  if (currentAbortController) {
    currentAbortController.abort();
  }

  // Create a new AbortController for the current request
  currentAbortController = new AbortController();
  const signal = currentAbortController.signal;

  try {
    // @ts-ignore
    const response = await fetch(
      `/api/covers/search?type=${type}&name=${query}&offset=${(page - 1) * 10}`,
      {
        signal,
      }
    );
    const result = await response.json();
    return result;
    // return response.data.hits.map((hit: any) => ({
    //   preview: hit.previewURL,
    //   ogImage: hit.largeImageURL,
    //   id: hit.id.toString()
    // }));
  } catch (error) {
    // @ts-ignore
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
      return { images: [], hasMore: false };
    } else {
      throw error;
    }
  }
};

export const GetImageByReferenceID = async (
  id: string
): Promise<[string | null, string | null]> => {
  try {
    const res = await fetch(`/api/image/ref?id=${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return [data.link, null];
  } catch (error) {
    return [null, error.message];
  }
};

const images = {
  searchImages,
  searchCoverImages,
  GetImageByReferenceID,
};

export default images;
