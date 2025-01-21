import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

export default apiClient;
export const api = apiClient;
export { axios };
