// 创建 axios 实例
import axios from "axios";

const service = axios.create({
	baseURL: "http://localhost:9911",
	timeout: 50000,
});

// 导出 axios 实例
export default service;
