"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import styled from "./style/login.module.scss";
import { authenticate } from "@/app/utils/actions";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    // trigger sign in
    if (username && password) {
      const res = await authenticate(username, password);
      if (res?.error) {
        notification.error({
          message: "Error login",
          description: res?.error,
        });
        if (res?.code === 2) {
          router.push(`/auth/verify/${0}`);
        }
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className={styled["login-container"]}>
      <p className={styled.title}>Login</p>
      <Form
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className={styled["login-btn"]}
          >
            Submit
          </Button>
        </Form.Item>
        <p
          className="underline text-blue-300 text-center cursor-pointer"
          onClick={() => router.push("/auth/register")}
        >
          to register
        </p>
      </Form>
    </div>
  );
};

export default Login;
