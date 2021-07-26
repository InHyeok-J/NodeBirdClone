import axios from "axios";

export const LoadMyInfoApi = async (data) => {
    return await axios({
        url: "/user",
        method: "get",
    });
};

export const SignUpApi = async (data) => {
    const response = await axios({
        url: "/user",
        method: "post",
        data: data,
    });
    return response;
};

export const LoginApi = async (data) => {
    console.log(data);
    return await axios({
        url: "/user/login",
        method: "post",
        data: data,
    });
};

export const LogOutApi = async () => {
    return await axios({
        url: "/user/logout",
        method: "get",
    });
};

export const changeNicknameApi = async (data) => {
    return await axios({
        url: "/user/nickname",
        method: "patch",
        data: data,
    });
};

export const followApi = async (data) => {
    return await axios({
        url: `/user/${data}/follow`,
        method: "patch",
    });
};
export const unFollowApi = async (data) => {
    return await axios({
        url: `/user/${data}/follow`,
        method: "delete",
    });
};

export const loadFollowersApi = async (data) => {
    return await axios({
        url: "/user/followers",
        method: "get",
    });
};

export const loadFollowingsApi = async (data) => {
    return await axios({
        url: "/user/followings",
        method: "get",
    });
};

export const removeFollowerApi = async (data) => {
    return await axios({
        url: `/user/follower/${data}`,
        method: "delete",
    });
};
