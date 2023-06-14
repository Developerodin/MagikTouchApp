import axios from "axios";

export default {
  // apiEndpointShort: "https://admin.ndfurnituremart.com/api/rest/",
  // apiEndpoint: "https://admin.ndfurnituremart.com/index.php?route=feed/rest_api/",
  // apiEndpointLong: "https://admin.ndfurnituremart.com/index.php?route=",

  // apiEndpointShort: "http://localhost/ndcp27oct/api/rest/",
  // apiEndpoint: "http://localhost/ndcp27oct/index.php?route=feed/rest_api/",
  // apiEndpointLong: "http://localhost/ndcp27oct/index.php?route=",

  apiEndpointShort: "https://mgktch.com/api/rest/",
  apiEndpoint: "https://mgktch.com/index.php?route=feed/rest_api/",
  apiEndpointLong: "https://mgktch.com/index.php?route=",

  headers: {
    "X-Oc-Merchant-Id": "123456",
    Accept: "application/json",
  },
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
