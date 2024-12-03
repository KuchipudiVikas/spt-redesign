import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

async function account_blogViewByTitle(token, title) {
  let response = await _request({
    token: token,
    url: `/api/blog/viewblogbytitle/${title}`,
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

async function account_blogView(token, id) {
  let response = await _request({
    token: token,
    url: `/api/blog/viewblog/${id}`,
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

async function account_blogList(token) {
  let response = await _request({ token: token, url: `/api/blog` });

  if (response.name !== "Error") {
    if (response) {
      response.data.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
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

async function account_blogCategory(token) {
  let response = await _request({ token: token, url: `/api/blog/categories` });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}

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

async function account_blogViewCategoryList(token, id) {
  let response = await _request({
    token: token,
    url: `/api/blog/bycategoryid/${id}`,
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

const Blog = {
  view: account_blogView,
  viewByTitle: account_blogViewByTitle,
  list: account_blogList,
  category: account_blogCategory,
  viewCategoryList: account_blogViewCategoryList,
};

export default Blog;
