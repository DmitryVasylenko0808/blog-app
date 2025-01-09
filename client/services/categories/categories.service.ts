import axios from "axios";
import { axiosPublic } from "@/app/_lib/axios.public";
import { GetCategoriesDto } from "./dto/get.categories.dto";
import { GetCategoryArticlesDto } from "./dto/get.category.articles.dto";

type GetArticlesByCategoryParams = {
  id: number;
  page: number;
};

export class CategoriesService {
  static async getCategories() {
    try {
      const res = await axiosPublic.get<GetCategoriesDto>("/categories");

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
      const res = await axiosPublic.get<GetCategoryArticlesDto>(
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
