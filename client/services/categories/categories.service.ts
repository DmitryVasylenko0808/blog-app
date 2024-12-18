import { axiosInstance } from "@/app/_lib/axiosInstance";
import { GetCategoriesDto } from "./dto/get.categories.dto";
import axios from "axios";

export class CategoriesService {
  static async getCategories() {
    try {
      const res = await axiosInstance.get<GetCategoriesDto>("/categories");

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
