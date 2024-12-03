import {bulsupips_debug} from "../utils/_vars";

import _request from "../utils/_request";

/**
 * Technically creates a board data
 * @return {Object} Response from the server in format { data: [...], query: <String>, total:<Number> }
 * @param token
 * @param name
 * @param email
 * @param subject
 * @param message
 */
async function account_postMessage(token, name, email, subject, message) {
    let response = await _request({
        token,
        url: "/api/message",
        body: {
            Name: name,
            Email: email,
            Subject: subject,
            Message: message,
        },
        method: "POST",
        content_type: "application/json",
    });
    if (response && response === "OK") {
        return {simple: true, full: response};
    } else {
        bulsupips_debug && console.error(response);
        return {simple: false, full: response};
    }
}

// send error in email

const Message = {
    post: account_postMessage,
};

export default Message;
