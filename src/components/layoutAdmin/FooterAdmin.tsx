"use client";

import { Layout } from "antd";
import React from "react";

const { Footer } = Layout;

const FooterAdmin = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant HieuDev
    </Footer>
  );
};

export default FooterAdmin;
