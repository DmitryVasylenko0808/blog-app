import axios from "axios";
import { axiosPublic } from "@/app/_lib/axios.public";
import { axiosWithAuth } from "@/app/_lib/axios.with.auth";
import { SignInDto } from "./dto/sign.in.dto";

type SignUpParams = {
  username: string;
  password: string;
  fullname: string;
};

type SignInParams = {
  username: string;
  password: string;
};

export class AuthService {
  static async signUp(data: SignUpParams) {
    try {
      const res = await axiosPublic.post("/auth/sign-up", data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async signIn(data: SignInParams) {
    try {
      const res = await axiosPublic.post<SignInDto>("/auth/sign-in", data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getMe() {
    try {
      const res = await axiosWithAuth.get("/auth/me");

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
