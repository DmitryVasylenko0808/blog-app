import { axiosInstance } from "@/app/_lib/axiosInstance";
import axios from "axios";
import { GetFeaturedArticlesDto } from "./dto/get.featured.articles.dto";
import { GetPopularArticlesDto } from "./dto/get.popular.articles.dto";
import { GetRecentlyArticlesDto } from "./dto/get.recently.articles.dto";
import { GetSearchedArticlesDto } from "./dto/get.searched.articles.dto";
import { GetOneArticleDto } from "./dto/get.one.article.dto";
import { GetRelatedArticlesDto } from "./dto/get.related.articles.dto";

type GetRecentlyArticlesParams = {
  page?: number;
  categoriesIds?: string;
};

type GetSearchedArticlesParams = {
  page: number;
  title?: string;
};

type GetRelatedArticlesParams = {
  id: number;
};

type GetOneArticleParams = {
  id: number;
};

type DeleteArticleParams = {
  id: number;
};

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

  static async getPopular() {
    try {
      const res = await axiosInstance.get<GetPopularArticlesDto>(
        "/articles/popular"
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getRecently(params: GetRecentlyArticlesParams) {
    try {
      const { page, categoriesIds } = params;
      const res = await axiosInstance.get<GetRecentlyArticlesDto>(
        "/articles/recently",
        {
          params: {
            page,
            categories_ids: categoriesIds,
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

  static async getSearched(params: GetSearchedArticlesParams) {
    try {
      const { page, title } = params;
      const res = await axiosInstance.get<GetSearchedArticlesDto>(
        "/articles/search/by/title",
        {
          params: {
            page,
            title,
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

  static async getRelated(params: GetRelatedArticlesParams) {
    try {
      const { id } = params;
      const res = await axiosInstance.get<GetRelatedArticlesDto>(
        `/articles/${id}/related`
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getOne(params: GetOneArticleParams) {
    try {
      const { id } = params;
      const res = await axiosInstance.get<GetOneArticleDto>(`/articles/${id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async delete(params: DeleteArticleParams) {
    try {
      const { id } = params;
      const res = await axiosInstance.delete(`/articles/${id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
