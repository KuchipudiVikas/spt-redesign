import {bulsupips_debug, SOURCE} from "./_vars";

import axios from "axios";

type HttpMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

interface IRequestPrams {
    token?: string;
    url: string;
    body?: any;
    method?: HttpMethods;
    content_type?: string;
    args?: any;
    extraHeaders?: any;
}

/**
 * A wrapped fetch requester with built-in Authorization Token Header creator
 * and other utility stuffs that should only be used within the confine of the
 * module itself unless you know what you are doing
 * @param token
 * @param  {String} link The REST Link you want to access
 * @param  {String} body The data you want to send to the link. This will not be used if you are doing a GET request
 * @param  {String} method Specifies if you'll use GET, POST, DELETE, PUT or etc.
 * @param args
 * @param extraHeaders
 * @return {Object}      Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
async function _request_axios({
                                  token,
                                  url,
                                  body,
                                  method = "GET",
                                  content_type,
                                  args,
                                  extraHeaders = {},
                              }: IRequestPrams) {
    try {
        bulsupips_debug && console.log(`${SOURCE}${url}`);

        let headers = token
            ? {
                Authorization: `Bearer ${token}`,
                ...extraHeaders,
            }
            : {...extraHeaders};

        if (content_type) {
            headers["Content-Type"] = content_type;
        }

        if (args) {
            args.uploadProgress = args.uploadProgress
                ? args.uploadProgress
                : (progressEvent) =>
                    console.log((progressEvent.loaded / progressEvent.total) * 100);
        } else {
            args = {};
            if (bulsupips_debug)
                args.uploadProgress = (progressEvent) =>
                    console.log((progressEvent.loaded / progressEvent.total) * 100);
        }

        let response: any = false;

        try {
            response = await axios({
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // default
                },
                url: `${SOURCE}${url}`,
                method: method,
                data: method === "GET" ? undefined : body,
                headers,
                onUploadProgress: args.uploadProgress,
            });
        } catch (err) {
            if (bulsupips_debug)
                // console.log(err)
                return err.toJSON();
        }

        try {
            if (response.status >= 400) {
                return await response.data;
            }
            return {...response.data, name: response.statusText, status: response.status};
        } catch (err) {
            if (bulsupips_debug) console.error(err);
            return response.data;
        }
    } catch (err) {
        if (bulsupips_debug) console.error(err);
        return false;
    }
}

let _request = _request_axios;

export default _request;
