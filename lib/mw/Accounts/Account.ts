import { bulsupips_debug, SOURCE } from "../utils/_vars";
import _request from "../utils/_request";

import { notificationMap } from "../utils/_map";
import axios from "axios";

/**
 * Sends a Login Request to the Backend Server. On success, this will store the token
 * received from the server into localStorage. You can check if login is success through
 * isLoggedIn method in the Account Collection.
 * @param token
 * @param {String} email Email to use for login
 * @param {String} password Password to account
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
export async function account_login(token, email, password) {
  let response = await _request({
    token: token,
    url: "/api/account/login",
    body: JSON.stringify({
      username: email || "",
      password: password || "",
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && "token" in response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    // console.log(response);
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

export async function delete_account(token) {
  let response = await _request({
    token: token,
    url: "/api/account",
    method: "DELETE",
  });
  console.log(response);

  if (response && typeof response == "object" && "data" in response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    // console.log(response);
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Sends a register request to the Server. This will auto login when the account
 * creation is a success.
 * @param token
 * @param {String} email Email to use for register
 * @param {String} password Password to account
 * @param lm_data
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
export async function account_register(token, email, password, lm_data) {
  let response = await _request({
    token: token,
    url: "/api/account/jsonregister",
    body: JSON.stringify({
      email: email || "",
      password: password || "",
      lm_data: lm_data || "",
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && typeof response == "object" && "token" in response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

export async function logout(token) {
  let response = await _request({
    token: token,
    url: "/api/account/logout",
    method: "GET",
  });

  if (response && typeof response == "object" && "data" in response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Gets the account info of the current logged in account form the backend server
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
export async function account_info(token, with_board = false) {
  let response = await _request({ token: token, url: "/api/account" });
  let wb;
  if (with_board) {
    wb = await _request({ token: token, url: "/api/subs" });
  }

  if (response && response.data) {
    if (wb) {
      response = {
        data: {
          ...response.data,
          subscription: wb.data,
        },
      };
    }
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

// check token
export async function account_check(token) {
  let response = await _request({
    token: token,
    url: "/api/account/check-token",
  });

  if (response && response.data) {
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Gets the account info of the current logged in account form the backend server
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
export async function account_changepass(token, new_password) {
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      password: new_password,
    })
  );

  let response = await _request({
    token: token,
    url: "/api/account/edit",
    body: formData,
    method: "PUT",
  });

  if (response && !("Error" in response)) {
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Creates a stripe session to purchase item and expects a url link in return
 * @param token
 * @param {String} item_index Product ID you are trying to purchase
 * @param success
 * @param fail
 * @return {Object} Response from the server in format { url }
 */
export async function account_buyitem(
  token,
  item_index,
  success: string | boolean = false,
  fail: string | boolean = false
) {
  let response = await _request({
    token: token,
    url: "/api/subs/paynow",
    body: JSON.stringify({
      items: [
        {
          id: `subs_${item_index}`,
          quantity: 1,
        },
      ],
      success,
      fail,
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && "url" in response) {
    return { simple: response.url, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

export async function account_unsubscribe(token) {
  let response = await _request({
    token: token,
    url: "/api/subs/endsubs",
    body: JSON.stringify({ dummy: "data" }),
    method: "POST",
    content_type: "application/json",
  });

  if (response) {
    return { simple: response, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Checks token and uses them if scout is true
 * @param token
 * @param {String} amount Amount of token to us
 * @param {Boolean} scout Scout if True will not use token on check
 * @return {Object} Response from the server in format { data: [...] }
 */
// This is an unused function
export async function account_token(token, amount, scout = false) {
  let response = await _request({
    token: token,
    url: "/api/account/token",
    body: JSON.stringify({
      toUse: amount,
      scout: scout,
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && "data" in response) {
    return { simple: response.data.toUse, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

/**
 * Checks token and uses them if scout is true
 * @param token
 * @param {List[Number,Number]} range Range of notifications to get
 * @return {Object} Response from the server in format { data: [...] }
 */
export async function account_getnotif(token, range = [0, 2]) {
  let response = await _request({
    token: token,
    url: `/api/notification?${
      range ? `range=[${range[0]},${range[1]}]&` : ""
    }sort=["datetime","ASC"]`,
  });

  if (response.name !== "Error") {
    if (response) {
      for (let dt of response.data) {
        // console.log(notificationMap);
        if (dt.code) dt.message = notificationMap[dt.code].create(dt.data);
      }
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

// get user meta
export async function get_metadata(token) {
  let response = await _request({
    token: token,
    url: "/api/account/metadata",
  });

  if (response) {
    return { simple: response.data, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

// update user meta
export async function create_or_update_metadata({token, extraHeaders}) {
  if (!token) {
    return { simple: false, full: "No token provided" };
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
  const response = await axios.post(
    `${SOURCE}/api/account/metadata`,
    {},
    {
      headers: headers,
    }
  );

  if (response) {
    return { simple: response.data, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

export async function getInvoices(token) {
  let response = await _request({
    token: token,
    url: "/api/stripecomm/invoices",
  });

  if (response) {
    return { simple: response.data, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}
