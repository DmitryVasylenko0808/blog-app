type Author = {
  id: number;
  username: string;
  fullname: string;
  avatarUrl?: string;
};

export type ArticleComment = {
  id: number;
  text: string;
  createdAt: Date;
  userId: number;
  articleId: number;
  user: Author;
  _count: {
    children: number;
  };
  parentId?: number | null;
};

export type GetArticleCommentsDto = {
  data: ArticleComment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
