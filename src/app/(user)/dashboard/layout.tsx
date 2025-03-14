"use server";

import React from "react";
import { Layout } from "antd";
import FooterAdmin from "@/components/layoutAdmin/FooterAdmin";
import HeaderAdmin from "@/components/layoutAdmin/HeaderAdmin";
import SidebarAdmin from "@/components/layoutAdmin/SidebarAdmin";
import ContentAdmin from "@/components/layoutAdmin/ContentAdmin";
// todo: custom lại layout
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <SidebarAdmin />
      <Layout>
        <HeaderAdmin />
        <ContentAdmin>{children}</ContentAdmin>
        <FooterAdmin />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
