export type UserDetails = {
  id: number;
  username: string;
  fullname: string;
  about?: string;
  avatarUrl?: string;
};

export type GetOneUserDto = UserDetails;
