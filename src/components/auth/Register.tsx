"use client";

import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Modal } from "antd";
import styled from "./style/register.module.scss";
import ActivateAccount from "./ActivateAccount";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  name?: string;
};

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    setIsModalOpen(true);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
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

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={400}
      >
        <ActivateAccount onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Register;
