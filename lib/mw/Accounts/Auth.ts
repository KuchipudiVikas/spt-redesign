import { bulsupips_debug } from "../utils/_vars";
import _request from "../utils/_request";

/**
 * Sends a Login Request to the Backend Server. On success, this will store the token
 * received from the server into localStorage. You can check if login is success through
 * isLoggedIn method in the Account Collection.
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 * @param token
 * @param googleToken
 */
export async function account_auth_google(token, googleToken) {
  let response = await _request({
    token: token,
    url: "/api/auth/google",
    body: JSON.stringify({ token: googleToken }),
    method: "POST",
    content_type: "application/json",
  });

  if (response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

export async function account_auth_facebook(token, dataBody) {
  let response = await _request({
    token: token,
    url: "/api/auth/facebook",
    body: JSON.stringify({ ...dataBody }),
    method: "POST",
    content_type: "application/json",
  });

  if (response) {
    //await secureStorage.setItem(localStorage_tokenloc, response.token)
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

const Auth = {
  google: account_auth_google,
  facebook: account_auth_facebook,
};

export default Auth;
