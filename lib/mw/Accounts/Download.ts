import { bulsupips_debug, localStorage_tokenloc, SOURCE } from "../utils/_vars";
import _request from "../utils/_request";
import axios from "axios";

async function account_Download(
  token,
  file,
  name,
  onDownloadProgress = (progressEvent) => {},
  onFinish = () => {}
) {
  axios({
    url: `${SOURCE}/api/download/filestream/${file}`, //your url
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // important
    onDownloadProgress: onDownloadProgress,
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
      onFinish();
    })
    .catch((error) => {
      // console.log(error)
    });
}

async function account_getDownloadList(token, range = [0, 2]) {
  let response = await _request({
    token: token,
    url: `/api/download/list?${
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

async function account_getCourses(token) {
  let response = await _request({
    token: token,
    url: "/api/courses/by-user",
  });

  if (response.name !== "Error") {
    if (response) {
      for (const obj of response.data) {
        const res = await _request({
          token: token,
          url: `/api/courses/course-status/${obj.feature_shop._id}`,
        });
        obj["course_status"] = res.data;
      }
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function account_getDownloadInfo(token, id) {
  let response = await _request({
    token: token,
    url: `/api/download/view/${id}`,
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

const Download = {
  get: account_getDownloadInfo,
  getList: account_getDownloadList,
  getCourses: account_getCourses,
  down: account_Download,
};

export default Download;
