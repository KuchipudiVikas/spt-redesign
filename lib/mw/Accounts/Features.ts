import { bulsupips_debug } from "../utils/_vars";

import _request from "../utils/_request";
import axios from "axios";

async function account_featuresView(token, id) {
  let response = await _request({
    token: token,
    url: `/api/features/viewproduct/${id}`,
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

async function account_checkPurchasedAll(token) {
  let response = await _request({
    token: token,
    url: `/api/fc`,
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

// new check all purchased api including past_due status
async function account_checkAllPurchased(token) {
  let response = await _request({
    token: token,
    url: `/api/fc/all`,
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

function account_checkAllPurchasedTools(token: string) {
  // send the request to our new go api
  const url =
    process.env.NEXT_PUBLIC_GO_TITANS_API_URL + "/api/v1/account/access/tools";
  // send request using axios
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function account_checkPurchased(token, id) {
  let response = await _request({ token, url: `/api/fc/${id}` });

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

async function account_checkByName(token, id) {
  let response = await _request({
    token,
    url: `/api/fc/byname/${id}`,
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

async function account_checkPurchasedByProduct(token, id) {
  let response = await _request({
    token,
    url: `/api/fc/byproduct/${id}`,
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

// check lifetime purchased by product id
async function account_checkLifetimePurchasedByProduct(token, id) {
  let response = await _request({
    token,
    url: `/api/fc/lifetime/${id}`,
  });

  if (response.name !== "Error") {
    if (response) {
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

export interface IAccountFeaturesList {
  token?: string;
  allowed_feature_types?: string[];
}

async function account_featuresList({
  token,
  allowed_feature_types = ["feature", "downloadable"],
}: IAccountFeaturesList) {
  let response = await _request({
    token,
    url: `/api/features`,
  });

  if (response.name !== "Error") {
    if (response) {
      //for(let d in response.data){
      //    response.data[d].message = notificationMap[response.data[d].code].create(response.data[d].data)
      //}

      response.data = response.data.map((e) => ({
        ...e,
        index: e.index || 1000,
      }));
      response.data.sort((a, b) =>
        a.index > b.index ? 1 : b.index > a.index ? -1 : 0
      );
      response.data = response.data.filter((item) =>
        allowed_feature_types.includes(item.feature_type)
      );
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function account_featuresbuyitem(
  token,
  itemindex_list,
  success: string | boolean = false,
  fail: string | boolean = false
) {
  const valueX21 = (
    document.getElementById("idev_custom_x21") as HTMLInputElement
  ).value;

  let response = await _request({
    token,
    url: "/api/features/paynow",
    body: JSON.stringify({
      items: itemindex_list.map((e) => ({
        product_id: e,
      })),
      success,
      fail,
      idev_custom_x21: valueX21,
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && "url" in response) {
    console.log("stripe resp  is", response);
    return { simple: response.url, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

async function account_featuresSubscribeItem(
  token,
  product_id,
  success: string | boolean = false,
  fail: string | boolean = false,
  interval: string | boolean = false
) {
  const valueX21 = (
    document.getElementById("idev_custom_x21") as HTMLInputElement
  ).value;

  let response = await _request({
    token,
    url: "/api/features/recurring-payment",
    body: JSON.stringify({
      product_id: product_id,
      success,
      fail,
      interval,
      idev_custom_x21: valueX21,
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

async function account_CheckSubscriptionByFeatureShopId(token, product_id) {
  let response = await _request({
    token,
    url: `/api/shop/subscription/${product_id}`,
    method: "GET",
    content_type: "application/json",
  });

  if (response && "data" in response) {
    return { simple: response.data, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

async function account_featuresUnsubscribeItem(token, subscriptionId) {
  let response = await _request({
    token,
    url: `/api/shop/cancel-subscription/${subscriptionId}`,
    method: "POST",
    content_type: "application/json",
  });

  if (response && "data" in response) {
    return { simple: response.data, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

async function account_createPaypalOrder(
  token,
  itemindex_list,
  ip,
  success: string | boolean = false,
  fail: string | boolean = false
) {
  return _request({
    token,
    url: "/api/paypal/create-paypal-order",
    body: JSON.stringify({
      items: itemindex_list.map((e) => ({
        product_id: e,
      })),
      success,
      fail,
      ip,
    }),
    method: "POST",
    content_type: "application/json",
  });
}

async function account_capturePaypalOrder(token, data) {
  return _request({
    token,
    url: "/api/paypal/capture-paypal-order",
    body: JSON.stringify({
      orderID: data.orderID,
    }),
    method: "POST",
    content_type: "application/json",
  });
}

async function orderSuccess(token, sessionId, payment_intent) {
  if (payment_intent) {
    return await _request({
      token,
      url: "/api/stripecomm/order/success/v2?payment_intent=" + payment_intent,
      content_type: "application/json",
    });
  }
  return await _request({
    token,
    url: "/api/stripecomm/order/success?session_id=" + sessionId,
  });
}

async function account_featuresgetfreeitem(
  token,
  itemindex_list,
  success: string | boolean = false,
  fail: string | boolean = false
) {
  let response = await _request({
    token,
    url: "/api/features/freepaynow",
    body: JSON.stringify({
      items: itemindex_list.map((e) => ({
        product_id: e,
      })),
      success,
      fail,
    }),
    method: "POST",
    content_type: "application/json",
  });

  if (response && response == "OK") {
    return { simple: true, full: response };
  } else {
    bulsupips_debug && console.error(response);
    return { simple: false, full: response };
  }
}

// get FeatureShop by id
async function featureShopById(id) {
  let response = await _request({
    url: `/api/features/shop/${id}`,
  });

  if (response.name !== "Error") {
    if (response) {
      return { simple: response.data, full: response };
    } else {
      bulsupips_debug && console.error(response);
      return { simple: false, full: response };
    }
  }

  return { simple: false, full: response };
}

async function account_updateCard(token, data) {
  return await _request({
    token,
    url: "/api/stripecomm/update-card",
    body: JSON.stringify(data),
    method: "POST",
    content_type: "application/json",
  });
}

async function account_updateBillingCycle(token, data) {
  return await _request({
    token,
    url: "/api/stripecomm/update-billing-cycle",
    body: JSON.stringify(data),
    method: "POST",
    content_type: "application/json",
  });
}

async function account_checkPastDue(token) {
  return await _request({
    token,
    url: "/api/subscription/past-due",
    method: "GET",
    content_type: "application/json",
  });
}

async function account_manageBillingCycle(token, data) {
  return await _request({
    token,
    url: "/api/stripecomm/manage-billing",
    body: JSON.stringify(data),
    method: "POST",
    content_type: "application/json",
  });
}

const Features = {
  check: account_checkPurchased,
  checkAll: account_checkPurchasedAll,
  checkAllNew: account_checkAllPurchased,
  checkByName: account_checkByName,
  checkByProduct: account_checkPurchasedByProduct,
  checkLifetimeByProduct: account_checkLifetimePurchasedByProduct,
  view: account_featuresView,
  list: account_featuresList,
  buyitem: account_featuresbuyitem,
  getfreeitem: account_featuresgetfreeitem,
  orderSuccess: orderSuccess,
  getFeatureShopByID: featureShopById,
  createPaypalOrder: account_createPaypalOrder,
  capturePaypalOrder: account_capturePaypalOrder,
  subscribeItem: account_featuresSubscribeItem,
  unsubscribeItem: account_featuresUnsubscribeItem,
  updatePaymentMethod: account_updateCard,
  updateBillingCycle: account_updateBillingCycle,
  manageBillingCycle: account_manageBillingCycle,
  checkSubscriptionByFeatureShopId: account_CheckSubscriptionByFeatureShopId,
  checkPastDue: account_checkPastDue,

  checkPurchasedTools: account_checkAllPurchasedTools,
};

export default Features;
