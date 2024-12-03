import { bulsupips_debug } from "../utils/_vars";

import _request from "../utils/_request";

/**
 * Get the created boardHistory data
 * @param token
 * @param {List[Number,Number]} range Range of notifications to get
 * @return {Object} Response from the server in format { data: [...] }
 */
async function accouont_boardList(token, range = [0, 2]) {
  let response = await _request({
    token: token,
    url: `/api/board?${
      range ? `range=[${range[0]},${range[1]}]&` : ""
    }&sort=["datetime","ASC"]`,
  });

  if (response && response.name !== "Error") {
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
 * @param token
 * @param {String} title Title of collection
 * @param boardCollection
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
async function account_boardCollectionCreate(token, title, boardCollection) {
  let response = await _request({
    token: token,
    url: "/api/board/create",
    body: {
      title,
      boardCollection,
    },
    method: "POST",
    content_type: "application/json",
  });

  if (response && !("Error" in response)) {
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Technically creates a board data
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 * @param code
 * @param data
 * @param dataVersion
 */
export function account_boardCreate(code, data, dataVersion) {
  return {
    code,
    data,
    dataVersion,
  };
}

/**
 * Gets board info based on the provided id
 * @param token
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_collectionInfo(token, id) {
  let response = await _request({
    token: token,
    url: `/api/board/collection/${id}`,
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
 * Deletes a board based on the provided id
 * @param token
 * @param {List[Number,Number]} id Board Collection to be Observed
 * @return {Object} Response from the server in format { data: [...] }
 */
async function account_collectionDelete(token, id) {
  let response = await _request({
    token: token,
    url: `/api/board/collection/${id}`,
    method: "DELETE",
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

async function account_collectionHistory(token) {
  let response = await _request({
    token: token,
    url: `/api/board/history`,
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

const Boards = {
  getCollectionList: accouont_boardList,
  createCollection: account_boardCollectionCreate,
  deleteCollection: account_collectionDelete,
  getCollection: account_collectionInfo,
  boardTemplate: account_boardCreate,
  getCollectionHistory: account_collectionHistory,
};

export default Boards;
