import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

/**
 * Get the created boardHistory data
 * @param token
 * @param {List[Number,Number]} range Range of notifications to get
 * @return {Object} Response from the server in format { data: [...] }
 */
async function accouont_pageList(token, range = [0, 2]) {
  let response = await _request({
    token,
    url: `/api/page?${
      range ? `range=[${range[0]},${range[1]}]&` : ""
    }&sort=["datetime","ASC"]`,
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

/**
 * Technically creates a board data
 * @param {String} title Title of collection
 * @param {List[Object]} boardColleciton List of BoardData
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
async function account_pageCreate(token, data) {
  let response = await _request({
    token,
    url: "/api/page/create",
    body: {
      data,
    },
    method: "POST",
    content_type: "application/json",
  });

  if (response && !("Error" in response)) {
    return { simple: response.success, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Gets board info based on the provided id
 * @param token
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_pageInfo(token, id) {
  let response = await _request({
    token,
    url: `/api/page/${id}`,
  });
  //console.log("response", response);

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

/**
 * Deletes a board based on the provided id
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_pageDelete(token, id) {
  let response = await _request({
    token,
    url: `/api/page/collection/${id}`,
    method: "DELETE",
  });
  // console.log(response);
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

/**
 * Deletes a board based on the provided id
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_pageUpdate(token, id, data) {
  let response = await _request({
    token,
    url: `/api/page/${id}`,
    body: {
      id,
      data,
    },
    method: "PUT",
    content_type: "application/json",
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

const Pages = {
  getPageList: accouont_pageList,
  createPage: account_pageCreate,
  updatePage: account_pageUpdate,
  deletePage: account_pageDelete,
  getPage: account_pageInfo,
};

export default Pages;
