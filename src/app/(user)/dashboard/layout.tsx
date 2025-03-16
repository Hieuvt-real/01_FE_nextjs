"use server";

import React from "react";
import { Layout } from "antd";
import FooterAdmin from "@/components/layoutAdmin/FooterAdmin";
import HeaderAdmin from "@/components/layoutAdmin/HeaderAdmin";
import SidebarAdmin from "@/components/layoutAdmin/SidebarAdmin";
import ContentAdmin from "@/components/layoutAdmin/ContentAdmin";
import { auth } from "@/auth";
// todo: custom lại layout
const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <Layout style={{ height: "100vh" }}>
      <SidebarAdmin />
      <Layout>
        <HeaderAdmin session={session} />
        <ContentAdmin>{children}</ContentAdmin>
        <FooterAdmin />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
