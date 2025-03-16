"use client";

import { Button, Layout } from "antd";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

const { Header } = Layout;

interface Props {
  session: Session | null;
}

const HeaderAdmin = ({ session }: Props) => {
  return (
    <Header style={{ padding: "0px 20px", background: "#ccc" }}>
      <div>
        <div className="bg-amber-500 flex justify-between items-center">
          <div>{session?.user.email}</div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
