import axios from "axios";
import { axiosPublic } from "@/app/_lib/axios.public";
import { ArticleComment, GetArticleCommentsDto } from "./dto/get.comments.dto";
import { axiosWithAuth } from "@/app/_lib/axios.with.auth";

type GetCommentsParams = {
  articleId: number;
  page: number;
  sort: "asc" | "desc";
};

type CreateCommentParams = {
  articleId: number;
  text: string;
};

type EditCommentParams = {
  articleId: number;
  commentId: number;
  text: string;
};

type DeleteCommentParams = {
  articleId: number;
  commentId: number;
};

export type GetRepliesParams = {
  articleId: number;
  commentId: number;
};

type ReplyCommentParams = {
  articleId: number;
  commentId: number;
  text: string;
};

export class CommentsService {
  static async getComments(params: GetCommentsParams) {
    const { articleId, page, sort } = params;

    try {
      const res = await axiosPublic.get<GetArticleCommentsDto>(
        `/articles/${articleId}/comments`,
        {
          params: {
            page,
            sort,
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

  static async createComment(params: CreateCommentParams) {
    const { articleId, ...data } = params;

    try {
      const res = await axiosWithAuth.post(
        `/articles/${articleId}/comments`,
        data
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async editComment(params: EditCommentParams) {
    const { articleId, commentId, ...data } = params;

    try {
      const res = await axiosWithAuth.patch(
        `/articles/${articleId}/comments/${commentId}`,
        data
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async deleteComment(params: DeleteCommentParams) {
    const { articleId, commentId } = params;

    try {
      const res = await axiosWithAuth.delete(
        `/articles/${articleId}/comments/${commentId}`
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getReplies(params: GetRepliesParams) {
    const { articleId, commentId } = params;

    try {
      const res = await axiosPublic.get<ArticleComment[]>(
        `/articles/${articleId}/comments/${commentId}/replies`
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async replyComment(params: ReplyCommentParams) {
    const { articleId, commentId, ...data } = params;

    try {
      const res = await axiosWithAuth.post(
        `/articles/${articleId}/comments/${commentId}/replies`,
        data
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
