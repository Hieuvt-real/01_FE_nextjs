"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import styled from "./style/register.module.scss";

import { useRouter } from "next/navigation";
import axios from "axios";
import type { AxiosError } from "axios";

type FieldType = {
  username?: string;
  password?: string;
  name?: string;
};

const Register = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email: values.username,
          password: values.password,
          name: values.name,
        }
      );

      if (data && (status === 201 || status === 200)) {
        router.push(`verify/${data?.data?._id}`);
      }
    } catch (error: AxiosError<unknown, unknown>) {
      notification.error({
        message: "Register error",
        description: error?.response?.data?.message,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styled["register-container"]}>
      <p className={styled.title}>Register</p>
      <Form
        name="basic"
        layout="vertical"
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

        <Form.Item<FieldType> label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className={styled["register-btn"]}
          >
            Submit
          </Button>
        </Form.Item>
        <p
          className="underline text-blue-300 text-center cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          to login
        </p>
      </Form>
    </div>
  );
};

export default Register;
