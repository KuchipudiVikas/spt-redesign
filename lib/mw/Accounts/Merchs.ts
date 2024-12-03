import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

async function account_merchView(token, id) {
  let response = await _request({ token, url: `/api/merch/viewproduct/${id}` });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function account_merchList(token) {
  let response = await _request({
    token,
    url: `/api/merch`,
  });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}

      response.data = response.data.map((e) => ({
        ...e,
        index: e.index || 1000,
      }));
      response.data.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function account_merchCategory(token) {
  let response = await _request({
    token,
    url: `/api/merch/categories`,
  });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}
      response.data = response.data.map((e) => ({
        ...e,
        index: e.index || 1000,
      }));
      response.data.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

const Merch = {
  view: account_merchView,
  list: account_merchList,
  category: account_merchCategory,
};

export default Merch;
