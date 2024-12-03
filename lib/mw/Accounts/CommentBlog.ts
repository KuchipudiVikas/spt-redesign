import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

/**
 * Get the created boardHistory data
 * @param token
 * @param id
 * @param {List[Number,Number]} range Range of notifications to get
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_getCommentBlog(token, id, range = [0, 2]) {
  let response = await _request({
    token: token,
    url: `/api/comment/blog/${id}?${
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
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 * @param token
 * @param pid
 * @param message
 */
async function account_postCommentBlog(token, pid, message) {
  let response = await _request({
    token: token,
    url: "/api/comment/blog",
    body: {
      pid,
      message,
    },
    method: "POST",
    content_type: "application/json",
  });

  return { simple: true, full: response };
  if (response && response === "OK") {
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
async function acount_deleteCommentBlog(token, id) {
  let response = await _request({
    token: token,
    url: `/api/comment/blog/${id}`,
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

const Commentblog = {
  get: account_getCommentBlog,
  post: account_postCommentBlog,
  delete: account_getCommentBlog,
};

export default Commentblog;
