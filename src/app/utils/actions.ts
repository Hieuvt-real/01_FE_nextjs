/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn } from "@/auth";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username,
      password,
      //   callbackUrl: undefined,
      redirect: false,
    });
    console.log(">>>>> check r", r);

    return r;
  } catch (error: any) {
    // console.log(">>>>> check err", JSON.stringify(error));
    if (error?.name === "InvalidEmailPasswordError") {
      return {
        error: error.type,
        code: 1,
      };
    } else if (error?.name === "InactiveAccountError") {
      return {
        error: error.type,
        code: 2,
      };
    } else {
      return { error: "internal server error", code: 0 };
    }
  }
}
