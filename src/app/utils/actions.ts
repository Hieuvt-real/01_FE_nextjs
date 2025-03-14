"use server";

import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      email,
      password,
      //   callbackUrl: "/",
      redirect: false,
    });

    return r;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { "error": "Incorrect username or password" };
    // if (error.cause.err instanceof InvalidLoginError) {
    //   return { error: "Incorrect username or password" };
    // } else {
    //   throw new Error("Failed to authenticate");
    // }
  }
}
