import axios from "axios";
import { apiUrl } from "@/constants";

const axiosPublic = axios.create({
  baseURL: apiUrl,
});

export { axiosPublic };
