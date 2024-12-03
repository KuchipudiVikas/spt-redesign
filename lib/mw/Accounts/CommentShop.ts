import { bulsupips_debug, localStorage_tokenloc, SOURCE } from "../utils/_vars";

import _request from "../utils/_request";

/**
 * Get the created boardHistory data
 * @param token
 * @param id
 * @param {List[Number,Number]} range Range of notifications to get
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_getCommentShop(token, id, range = [0, 2]) {
  let response = await _request({
    token: token,
    url: `/api/comment/shop/${id}?${
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
async function account_postCommentShop(token, pid, message) {
  let response = await _request({
    token: token,
    url: "/api/comment/shop",
    body: {
      pid,
      message,
    },
    method: "POST",
    content_type: "application/json",
  });

  if (response && response === "OK") {
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Deletes a board based on the provided id
 * @param token
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_deleteCommentShop(token, id) {
  let response = await _request({
    token: token,
    url: `/api/comment/shop/${id}`,
    method: "DELETE",
  });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}
      return { simple: true, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

const CommentShop = {
  get: account_getCommentShop,
  post: account_postCommentShop,
  delete: account_deleteCommentShop,
};

export default CommentShop;
