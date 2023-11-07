// 创建 axios 实例
import axios, { AxiosResponse } from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PYTHON_API,
  timeout: 50000,
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === "00000") {
      return response.data;
    }
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    ElMessage.error(msg || response.data);
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    if (error.response.data) {
      const { msg } = error.response.data;
      ElMessage.error(msg || "系统出错");
    }
    return Promise.reject(error.message);
  }
);

export const imageBaseURL: string = import.meta.env.VITE_APP_IMG_URL;

// 导出 axios 实例
export default service;
