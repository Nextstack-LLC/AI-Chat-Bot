import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: base_url,
});

export default instance;
