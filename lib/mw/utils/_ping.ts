import _request from "./_request";

/**
 * Pings the Backend Server if they can communicate or not. Better check this first to see
 * if everything works fine
 * @return  Returns a server response { data : [] }
 */
async function _pm_test() {
  let test = await _request({ url: "/test/utils/ping" });
  if (test) {
    // console.log(` ✔ Middleware for PM Server now working! Communicating with [${SOURCE}]`)
  } else {
    // console.log(` ❌ Can't connect to PM Server through address [${SOURCE}]`)
  }
  return test;
}

export default _pm_test;
