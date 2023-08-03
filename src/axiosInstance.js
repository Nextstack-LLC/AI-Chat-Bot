import axios from "axios";

const base_url = "https://chat-api.nextstack.org/api/v1";

const instance = axios.create({
  baseURL: base_url,
});

export default instance;
