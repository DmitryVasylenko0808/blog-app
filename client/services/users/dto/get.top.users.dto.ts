export type TopUser = {
  id: number;
  username: string;
  fullname: string;
  articlesSummaryViews: number;
  avatarUrl?: string;
};

export type GetTopUsersDto = TopUser[];
