import axios from "axios";

function GetImages(query: string, page: number) {
  return axios.get(
    `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${query}&page=${page}`
  );
}

const pixabay = {
  GetImages
};

export default pixabay;
