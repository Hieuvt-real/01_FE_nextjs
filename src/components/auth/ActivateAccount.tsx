/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import styles from "./style/activate.module.scss";
import { Button, Form, Input, message, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const ActivateAccount = ({ id }: { id: string }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (v: any) => {
    const { code, _id } = v;

    try {
      const { status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-code`,
        {
          _id,
          code,
        }
      );
      if (status === 200 || status === 201) {
        message.info("kích hoạt tài khoản thành công")
        router.push("/auth/login");
      }
    } catch (error: any) {
      notification.error({
        message: "Verify error",
        description: error?.response?.data?.message,
      });
    }
  };
  return (
    <div className={styles["activate-container"]}>
      <p className={styles["subtitle"]}>
        Vui lòng nhập mã kích hoạt đã được gửi đến email của bạn
      </p>
      <Form form={form} onFinish={handleSubmit} className={styles["code-form"]}>
        <Form.Item name="_id" noStyle initialValue={id}>
          <Input hidden />
        </Form.Item>
        <Form.Item name="code" noStyle>
          <div className={styles["code-inputs"]}>
            <Input className={styles["code"]} />
          </div>
        </Form.Item>
        <Button htmlType="submit" className={styles["activate-btn"]}>
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};

export default ActivateAccount;
