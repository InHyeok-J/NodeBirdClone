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
