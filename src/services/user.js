import axios from "axios";
import { API } from "../config/api/api.config";

async function apiUserList(config) {
    return await axios({
        url: API.endpoint + "/user/users-list",
        method: "GET",
        params: {
            ...config.queryParams,
        },
        headers: {
            ...config.headers,
        },
    });
}

async function apiUserAdd(config) {
    return await axios({
        url: API.endpoint + "/user/add-user",
        method: "POST",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}

async function apiGetUserDetail(config) {
    return await axios({
        url: API.endpoint + "/user/user-detail/" + config.params.userId,
        method: "GET",
        headers: {
            ...config.headers,
        },
    });
}

async function apiUserUpdate(config) {
    return await axios({
        url: API.endpoint + `/user/update-user/${config.params.userId}`,
        method: "PUT",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}
async function apiUserSignUp(config) {
    return await axios({
        url: API.endpoint + `/user/signup`,
        method: "POST",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}
async function apiGetMyProfile(config) {
    return await axios({
        url: API.endpoint + "/user/my-profile",
        method: "GET",
        headers: {
            ...config.headers,
        },
    });
}
async function apiUserLogOut(config) {
    return await axios({
        url: API.endpoint + "/user/logout",
        method: "PUT",
        headers: {
            ...config.headers,
        },
    });
}
async function apiUserStatusUpdate(config) {
    return await axios({
        url: API.endpoint + `/user/update-user-status/${config.params.userId}`,
        method: "PUT",
        data: {
            ...config.data,
        },
        headers: {
            ...config.headers,
        },
    });
}
export {
    apiUserList,
    apiUserAdd,
    apiGetUserDetail,
    apiUserUpdate,
    apiUserSignUp,
    apiGetMyProfile,
    apiUserLogOut,
    apiUserStatusUpdate
};
