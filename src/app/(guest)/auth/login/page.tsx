import { auth } from "@/auth";
import Login from "@/components/auth/Login";
import React from "react";

const LoginPage = async () => {
  const session = await auth();
  console.log("session..........", session);

  return <Login />;
};

export default LoginPage;
