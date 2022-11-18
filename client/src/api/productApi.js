import axiosClient from "./axiosClient";

const productApi = {
  // neu co params
  //   getAll: (params) => {
  //     const url = "/Product";
  //     return axiosClient.get(url, { params });
  //   },
  getAll: () => {
    const url = "/Product";
    return axiosClient.get(url);
  },
  getDetail: (slug) => {
    const url = `/Product/${slug}`;
    return axiosClient.get(url);
  },
  getProductByCate: (slug) => {
    const url = `/${slug}`;
    return axiosClient.get(url);
  },
};

export default productApi;
