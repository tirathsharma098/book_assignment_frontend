import axios from "axios";
import { API } from "../config/api/api.config";

async function apiBookAdd(config) {
    return await axios({
        url: API.endpoint + "/book/add-book",
        method: "POST",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}

async function apiBookList(config) {
    return await axios({
        url: API.endpoint + "/book/list-book",
        method: "GET",
        params: {
            ...config.queryParams,
        },
        headers: {
            ...config.headers,
        },
    });
}

async function apiBookDetail(config) {
    return await axios({
        url: API.endpoint + "/book/view-book/" + config.params.id,
        method: "GET",
        headers: {
            ...config.headers,
        },
    });
}

async function apiBookUpdate(config) {
    return await axios({
        url: API.endpoint + "/book/update-book/" + config.params.id,
        method: "PUT",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}
async function apiBookDelete(config) {
    return await axios({
        url: API.endpoint + "/book/delete-book/" + config.params.id,
        method: "DELETE",
        headers: {
            ...config.headers,
        },
    });
}
async function apiBookBuy(config) {
    return await axios({
        url: API.endpoint + "/book/buy-book/" + config.params.id,
        method: "POST",
        headers: {
            ...config.headers,
        },
    });
}
async function apiGetBookSold(config) {
  return await axios({
      url: API.endpoint + "/book/book-sold",
      method: "GET",
      headers: {
          ...config.headers,
      },
  });
}
async function apiBookApprove(config) {
  return await axios({
      url: API.endpoint + "/book/book-approve/" + config.params.id,
      method: "PUT",
      headers: {
          ...config.headers,
      },
  });
}
export {
    apiBookAdd,
    apiBookList,
    apiBookDetail,
    apiBookUpdate,
    apiBookDelete,
    apiBookBuy,
    apiGetBookSold,
    apiBookApprove
};
