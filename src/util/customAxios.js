import axios from "axios";

const URL_BASE = import.meta.env.VITE_API_URL;

const customAxios = axios.create({
  baseURL: URL_BASE,
  responseType: "json",
});

export default customAxios;