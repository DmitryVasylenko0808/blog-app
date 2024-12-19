import { axiosInstance } from "@/app/_lib/axiosInstance";
import { GetTopUsersDto } from "./dto/get.top.users.dto";
import axios from "axios";
import { GetOneUserDto } from "./dto/get.one.user.dto";

type GetOneUserParams = {
  id: number;
};

export class UsersService {
  static async getOneUser(params: GetOneUserParams) {
    try {
      const res = await axiosInstance.get<GetOneUserDto>(`/users/${params.id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

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
