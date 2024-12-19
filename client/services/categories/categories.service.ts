import { axiosInstance } from "@/app/_lib/axiosInstance";
import { GetCategoriesDto } from "./dto/get.categories.dto";
import axios from "axios";
import { GetCategoryArticlesDto } from "./dto/get.category.articles.dto";

type GetArticlesByCategoryParams = {
  id: number;
  page: number;
};

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

  static async getArticlesByCategory({
    id,
    page,
  }: GetArticlesByCategoryParams) {
    try {
      const res = await axiosInstance.get<GetCategoryArticlesDto>(
        `/categories/${id}/articles`,
        {
          params: {
            page,
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
