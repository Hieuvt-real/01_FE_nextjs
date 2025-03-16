/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email/Password invalid";

  constructor(message: string = "Invalid email or password") {
    super(message); // Gọi constructor của AuthError với message
    this.name = "InvalidEmailPasswordError"; // Đặt name để nhận diện lỗi
  }
}

export class InactiveAccountError extends AuthError {
  static type = "Account is not active";

  constructor(message: string = "Account is not active") {
    super(message); // Gọi constructor của AuthError với message
    this.name = "InactiveAccountError"; // Đặt name để nhận diện lỗi
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            }
          );
          const user = response.data;

          console.log("checkusser", response);
          // Kiểm tra dữ liệu trả về từ API
          if (user && user.data && user.data.user) {
            return {
              id: user.data.user._id, // Auth.js yêu cầu 'id'
              name: user.data.user.name,
              email: user.data.user.email,
              access_token: user.data.access_token,
            };
          } else {
            throw new InvalidEmailPasswordError();
          }
        } catch (error: any) {
          console.error("API Error:", error.response?.data || error.message);
          // Kiểm tra mã trạng thái từ lỗi của Axios
          const status = error.response?.status;
          if (status === 401) {
            throw new InvalidEmailPasswordError(
              error.response?.data?.message || "Invalid credentials"
            );
          } else if (status === 400) {
            throw new InactiveAccountError(
              error.response?.data?.message || "Account inactive"
            );
          } else {
            throw new Error(
              error.response?.data?.message || "Internal server error"
            );
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        (token as any).user = user as any;
      }
      return token;
    },
    session({ session, token }) {
      (session as any).user = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  secret: process.env.AUTH_SECRET, // Thêm secret để tránh lỗi khác
});
