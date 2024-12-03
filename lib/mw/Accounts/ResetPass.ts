import {bulsupips_debug} from "../utils/_vars";
import _request from "../utils/_request";

/**
 * Sends a Login Request to the Backend Server. On success, this will store the token
 * received from the server into localStorage. You can check if login is success through
 * isLoggedIn method in the Account Collection.
 * @param token
 * @param {String} email Email to use for login
 * @param endpoint
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 */
export async function account_reset(token, email, endpoint) {
    if (!endpoint || !email) {
        throw new Error("Email and Endpoint is required");
    }
    let response = await _request({
        token,
        url: "/api/resetpass",
        body: JSON.stringify({
            email: email,
            endpointurl: endpoint,
        }),
        method: "POST",
        content_type: "application/json",
    });
    console.log(response);

    if (response.status === 200) {
        //await secureStorage.setItem(localStorage_tokenloc, response.token)
        return {simple: true, full: response};
    } else {
        bulsupips_debug && console.error(response);
        return {simple: false, full: response};
    }
}

export async function account_resetCheck(token, resetToken) {
    let response = await _request({
        token,
        url: "/api/resetpass/check",
        body: JSON.stringify({
            token: resetToken,
        }),
        method: "POST",
        content_type: "application/json",
    });

    if (response.status) {
        //await secureStorage.setItem(localStorage_tokenloc, response.token)
        return {simple: true, full: response};
    } else {
        bulsupips_debug && console.error(response);
        return {simple: false, full: response};
    }
}

export async function account_resetConfirm(resetToken, newPassword) {
    if (!resetToken || !newPassword) {
        throw new Error("New Password and Reset Token is required");
    }
    let response = await _request({
        url: "/api/resetpass/reset",
        body: JSON.stringify({
            token: resetToken,
            password: newPassword,
        }),
        method: "POST",
        content_type: "application/json",
    });
    console.log(response);

    if (response.status === 200) {
        //await secureStorage.setItem(localStorage_tokenloc, response.token)
        return {simple: true, full: response};
    } else {
        bulsupips_debug && console.error(response);
        return {simple: false, full: response};
    }
}
