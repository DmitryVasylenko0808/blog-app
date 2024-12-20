import { axiosInstance } from "@/app/_lib/axiosInstance";
import { GetTopUsersDto } from "./dto/get.top.users.dto";
import axios from "axios";
import { GetOneUserDto } from "./dto/get.one.user.dto";

type GetOneUserParams = {
  id: number;
};

type UpdateUserParams = {
  id: number;
  fullname?: string;
  about?: string;
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

  static async updateUser({ id, ...data }: UpdateUserParams) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([k, v]) => formData.append(k, v));

      const res = await axiosInstance.patch<GetTopUsersDto>(
        `/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
