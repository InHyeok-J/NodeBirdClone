import axios from "axios";

export const postLoadApi = async (data) => {
    return await axios({
        url: "/posts",
        method: "get",
    });
};
export const postPostApi = async (data) => {
    return await axios({
        url: "/post",
        method: "post",
        data: data,
    });
};

export const commentPostApi = async (data) => {
    return await axios({
        url: `/post/${data.postId}/comment`,
        method: "post",
        data: data,
    });
};

export const likePostApi = async (data) => {
    return await axios({
        url: `/post/${data}/like`,
        method: "patch",
    });
};
export const unLikePostApi = async (data) => {
    return await axios({
        url: `/post/${data}/unlike`,
        method: "delete",
    });
};
