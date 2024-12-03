import { bulsupips_debug } from "../utils/_vars";

const serialize = function (obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

import _request from "../utils/_request";

async function research_get(token, searchData) {
  let response = await _request({
    token,
    url: `/api/research?${serialize(searchData)}`,
  });
  console.log(`/api/research?${serialize(searchData)}`);
  if (response.name !== "Error") {
    if (response) {
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

const Research = {
  get: research_get,
};

export default Research;
