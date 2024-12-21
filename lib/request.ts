import axios, { AxiosResponse } from "axios";

const server_debug = false;
const SOURCE = process.env.NEXT_PUBLIC_CLIENT_URL;

async function _request_axios(link, body, method?, type?, args?) {
  try {
    //console.log(SOURCE);

    method = (method && method.toUpperCase()) || "GET";

    server_debug && console.log(`${SOURCE}${link}`);

    let headers = {};

    if (type) {
      headers["Content-Type"] = type;
    }

    if (args) {
      args.uploadProgress = args.uploadProgress
          ? args.uploadProgress
          : (progressEvent) =>
              console.log((progressEvent.loaded / progressEvent.total) * 100);
    } else {
      args = {};
      if (server_debug)
        args.uploadProgress = (progressEvent) =>
            console.log((progressEvent.loaded / progressEvent.total) * 100);
    }

    let response: AxiosResponse<any> | boolean = false;

    try {
      response = await axios({
        validateStatus: function (status) {
          return status >= 200 && status < 500; // default
        },
        url: `${SOURCE}${link}`,
        method: method,
        data: method === "GET" ? undefined : body,
        headers,
        onUploadProgress: args.uploadProgress,
      });
    } catch (err) {
      server_debug && console.error(err);
      return { ok: false, data: err.toJSON() };
    }

    try {
      if ((response as AxiosResponse).status >= 300) {
        return { ok: false, data: (response as AxiosResponse).data };
      }
      return { ok: true, data: (response as AxiosResponse).data };
    } catch (err) {
      if (server_debug) console.error(err);
      return { ok: false, data: (response as AxiosResponse).data };
    }
  } catch (err) {
    if (server_debug) console.error(err);
    return false;
  }
}

let _request = _request_axios;

export default _request;