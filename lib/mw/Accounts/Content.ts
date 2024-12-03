import { bulsupips_debug, localStorage_tokenloc } from "../utils/_vars";

import _request from "../utils/_request";

async function content_home(token?) {
  let response = await _request({ token: token, url: `/api/content/home` });
  if (response.name !== "Error" && response.name !==undefined) {
    if (response) {
      try{
      if(response.testimonials.length > 0){
      response.testimonials = response.testimonials.map(function (item, index) {
        return item.ref;
      });

      response.tutorials = response.tutorials.map(function (item, index) {
        return item.ref;
      });
    }
    }catch(e){
      console.log("error fetching the homepage data",e,"response from the server",response)
    }
      return { simple: response, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function content_yt(token?) {
  let response = await _request({ token: token, url: `/api/content/cards/yt` });
  if (response.name !== "Error") {
    if (response) {
      try{
      response = response.collections.map((item) => item.ref);
      response = response.map((item) => {
        return {
          id: item.id,
          title: item.title,
          links_list: item.links_list.map((e) => e.ref),
        };
      });
    }catch(e){
      console.log("error in fetching the yt content: content.tsx",e,"resonse is",response)
    }

      return { simple: response, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function content_fb(token?) {
  let response = await _request({ token: token, url: `/api/content/cards/fb` });
  if (response.name !== "Error") {
    if (response) {
      try{
      response = response.collections.map((item) => item.ref);
      response = response.map((item) => {
        return {
          id: item.id,
          title: item.title,
          links_list: item.links_list.map((e) => e.ref),
        };
      });
    }catch(e){
      console.log("error in fetching the fb content: content.tsx",e,"resonse is",response)
    }
      return { simple: response, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function content_courses(token?) {
  let response = await _request({
    token: token,
    url: `/api/content/cards/courses`,
  });

  if (response.name !== "Error") {
    if (response) {
      try{
      response = response.collections.map((item) => item.ref);
      response = response.map((item) => {
        return {
          id: item.id,
          title: item.title,
          links_list: item.links_list.map((e) => e.ref),
        };
      });
    }catch(e){
      console.log("error in fetching the courses content: content.tsx",e,"resonse is",response)
    }
      return { simple: response, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function content_howto(token) {
  let response = await _request({
    token: token,
    url: `/api/content/makerhowto`,
  });

  if (response.name !== "Error") {
    if (response) {
      try{
      response = response.collections.map((e) => e.ref);

      return { simple: response, full: response };
      }catch(e){
        console.log("error in fetching the how content: content.tsx",e,"resonse is",response)
      }
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

const Content = {
  home: content_home,
  cards: {
    yt: content_yt,
    fb: content_fb,
    courses: content_courses,
  },
  pagemaker: content_howto,
};

export default Content;
