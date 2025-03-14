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
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            username: credentials.email,
            password: credentials.password,
          }
        );
        const user = response.data;
        console.log("checkusser", response.status);

        if (+response.status === 200 || +response.status === 201) {
          // return user object with their profile data
          return {
            _id: user.user._id,
            name: user.user.name,
            email: user.user.email,
            access_token: user.access_token,
          };
        } else if (+response.status === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+response.status === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
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
        console.log(">>>>>>>>>>>>>>>>>user", user);

        // User is available during sign-in
        (token as any).user = user as any;
      }
      return token;
    },
    session({ session, token }) {
      (session as any).user = token.user;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Thêm secret để tránh lỗi khác
});
