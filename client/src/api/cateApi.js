import axiosClient from "./axiosClient";

const cateApi = {
  // neu co params
  //   getAll: (params) => {
  //     const url = "/Product";
  //     return axiosClient.get(url, { params });
  //   },
  getAll: () => {
    const url = "/Category";
    return axiosClient.get(url);
  },
};

export default cateApi;
