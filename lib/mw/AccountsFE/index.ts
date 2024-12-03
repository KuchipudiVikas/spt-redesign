import _request from "../../request";

const AccountFE = {
  register: (email, password, lm_data = false) =>
    _request(
      "/api/register",
      { email: email, password: password, lm_data: lm_data },
      "POST"
    ),

  login: (email, password) =>
    _request(`/api/login`, { email: email, password: password }, "POST"),

  authgoogle: (token) => _request(`/api/authgoogle`, { token: token }, "POST"),

  authfacebook: (access_token, id, name, email) =>
    _request(`/api/authfacebook`, { access_token, id, name, email }, "POST"),

  logout: _request.bind(this, `/api/logout`, {}, "POST"),

  getInfo: _request.bind(this, `/api/getInfo`),

  signData: (data) => _request("/api/signData", { data: data }, "POST"),
};

export default AccountFE;
