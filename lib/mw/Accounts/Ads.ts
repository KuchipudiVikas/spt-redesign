import { bulsupips_debug } from "../utils/_vars";

import _request from "../utils/_request";

async function ads_get(token?) {
  if (sessionStorage.getItem("ads")) {
    return JSON.parse(sessionStorage.getItem("ads"));
  }
  let response = await _request({ token: token, url: `/api/ads` });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}
      response.data.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
      sessionStorage.setItem(
        "ads",
        JSON.stringify({ simple: response.data, full: response })
      );
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

const Ads = {
  get: ads_get,
};

export default Ads;
