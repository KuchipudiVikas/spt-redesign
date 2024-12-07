import axios from "axios";

export async function getResults({domain, keyword, title, filters, token}) {
    const url =
      process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/s-b-k/keywords";
    const body = {
        domain,
        keyword,
        title,
        filters
    };
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
    return axios.post(
        url,
        body,
        {
            headers: headers,
        }
    );
}