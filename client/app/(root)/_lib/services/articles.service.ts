import { axiosInstance } from "@/app/_lib/axiosInstance";
import axios from "axios";
import { GetFeaturedArticlesDto } from "./dto/get.featured.articles.dto";

export class ArticlesService {
  static async getFeatured() {
    try {
      const res = await axiosInstance.get<GetFeaturedArticlesDto>(
        "/articles/featured"
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
