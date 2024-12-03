import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

async function account_productView(token, id) {
  let response = await _request({
    token,
    url: `/api/shop/viewproduct/${id}`,
  });

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

async function account_checkPurchased(token, id) {
  let response = await _request({
    token,
    url: `/api/download/viewbyproduct/${id}`,
  });

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

async function account_productList(token) {
  let response = await _request({
    token,
    url: `/api/shop`,
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

async function account_productCategory(token) {
  let response = await _request({
    token,
    url: `/api/shop/categories`,
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

async function account_productDownload(token, id) {
  let response = await _request({
    token,
    url: `/api/shop/file/${id}`,
  });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}
      return;
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}



const Product = {
  check: account_checkPurchased,
  view: account_productView,
  list: account_productList,
  category: account_productCategory,
  download: account_productDownload
};

export default Product;
