import axiosClient from "./axiosClient";

const authApi = {
  postLogin: (user) => {
    const url = "/auth/signin";
    const _user = user;

    return axiosClient.post(url, user);
  },
};

export default authApi;
