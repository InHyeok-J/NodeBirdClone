import axios from "axios";

export const SignUpApi = async (data) => {
    const response = await axios({
        url: "http://localhost:3065/user",
        method: "post",
        data: data,
    });
    return response;
};
