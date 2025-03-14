/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();
    this.type = message;
  }
}
