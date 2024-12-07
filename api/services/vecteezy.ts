import axios from "axios";

interface Dimensions {
  width: number;
  height: number;
}

export interface VecteezyImage {
  id: number;
  content_type: string;
  tags: string[];
  title: string;
  file_types: string[];
  thumbnail_dimensions: Dimensions;
  thumbnail_url: string;
  thumbnail_2x_url: string;
  preview_dimensions: Dimensions;
  preview_url: string;
  preview_2x_url: string;
}

async function GetVecteezyImages(
  term: string,
  page: number,
  imageType,
  perPage: number
) {
  const url = `https://api.vecteezy.com/v1/resources?term=${encodeURIComponent(term)}&content_type=${imageType}&page=${page}&per_page=20`;
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_VECTEEZY_API_KEY
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching images from Vecteezy:", error);
    throw error;
  }
}

const vecteezy = {
  GetVecteezyImages
};

export default vecteezy;

async function GetVecteezyImageImageDownloadUrl(id: string) {
  const url = `https://api.vecteezy.com/v1/resources/${id}/download`;
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_VECTEEZY_API_KEY
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching image download url from Vecteezy:", error);
    throw error;
  }
}
