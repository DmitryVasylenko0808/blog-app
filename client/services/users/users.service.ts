import { axiosInstance } from "@/app/_lib/axiosInstance";
import { GetTopUsersDto } from "./dto/get.top.users.dto";
import axios from "axios";

export class UsersService {
  static async getTop() {
    try {
      const res = await axiosInstance.get<GetTopUsersDto>("/users/top");

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
