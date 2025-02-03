import { axiosWithAuth } from "@/app/_lib/axios.with.auth";
import { GetTopUsersDto } from "./dto/get.top.users.dto";
import axios from "axios";
import { GetOneUserDto } from "./dto/get.one.user.dto";
import { GetUserArticlesDto } from "./dto/get.user.articles.dto";
import { axiosPublic } from "@/app/_lib/axios.public";

type GetOneUserParams = {
  id: number;
};

type UpdateUserParams = {
  id: number;
  fullname?: string;
  about?: string;
  avatarFile?: File;
};

type GetUserArticlesParams = {
  id: number;
  page: number;
};

export class UsersService {
  static async getOneUser(params: GetOneUserParams) {
    try {
      const res = await axiosPublic.get<GetOneUserDto>(`/users/${params.id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getTop() {
    try {
      const res = await axiosPublic.get<GetTopUsersDto>("/users/top");

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async updateUser({ id, ...data }: UpdateUserParams) {
    console.log(data);

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([k, v]) => formData.append(k, v));

      const res = await axiosWithAuth.patch<GetTopUsersDto>(
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

  static async getUserArticles({ id, page }: GetUserArticlesParams) {
    try {
      const res = await axiosPublic.get<GetUserArticlesDto>(
        `/users/${id}/articles`,
        {
          params: { page },
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
