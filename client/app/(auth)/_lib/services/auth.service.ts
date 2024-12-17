import axios from "axios";
import { axiosInstance } from "../../../_lib/axiosInstance";
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
      const res = await axiosInstance.post("/auth/sign-up", data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async signIn(data: SignInParams) {
    try {
      const res = await axiosInstance.post<SignInDto>("/auth/sign-in", data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getMe() {
    try {
      const res = await axiosInstance.get("/auth/me");

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
