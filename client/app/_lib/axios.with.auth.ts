import axios from "axios";
import { getSession } from "./session";
import { apiUrl } from "@/constants";

const axiosWithAuth = axios.create({
  baseURL: apiUrl,
});

axiosWithAuth.interceptors.request.use(
  async (cfg) => {
    const access_token = await getSession();

    if (access_token) {
      cfg.headers.Authorization = `Bearer ${access_token}`;
    }

    return cfg;
  },
  (err) => {
    console.log(err);
  }
);

export { axiosWithAuth };
