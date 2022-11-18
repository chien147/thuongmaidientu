import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => {
    const url = "/Order";
    return axiosClient.get(url);
  },
  getDetail: (id) => {
    const url = "/Order";
    return axiosClient.post(url, id);
  },
  deleteOrder: (id) => {
    const url = "/Order";
    return axiosClient.post(url, id);
  },
};

export default orderApi;
