/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useMounted from "@/hooks/useMounted";
import { isEmail } from "@/utils/helpers";
import { Button, Form, Input, message, Modal, notification, Steps } from "antd";
import axios from "axios";
import React, { useMemo, useState } from "react";

interface Props {
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
}
const ModalForgotChangePassword = (props: Props) => {
  const { onCancel, onOk, open } = props;
  const [currenStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState("");
  const hasMounted = useMounted();
  const [emailChangePassword, setEmailChangePassword] = useState("");

  const [formActive] = Form.useForm();

  const handleStep0 = async () => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/retry-password`,
        {
          email: emailChangePassword,
        }
      );

      if (status === 201) {
        setUserId(data?.data?._id);
        setCurrentStep(1);
      }
    } catch (error: any) {
      notification.error({
        message: "Send email error",
        description: error?.response?.data?.message,
      });
    }
  };

  const handleStep1 = async (v: any) => {
    try {
      const { code, password, confirmPassword } = v;
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          code,
          password,
          confirmPassword,
          email: emailChangePassword,
        }
      );

      if (status === 200 || status === 201) {
        message.info("thay đổi mật khẩu thành công");
        setCurrentStep(2);
      }
    } catch (error: any) {
      notification.error({
        message: "Verify error",
        description: error?.response?.data?.message,
      });
    }
  };

  const handleStep2 = () => {
    onCancel();
  };

  const renderContentStep = useMemo(() => {
    switch (currenStep) {
      case 0:
        return (
          <>
            <p>nhập email của bạn</p>
            <Input
              value={emailChangePassword}
              className="!mt-2"
              onChange={(e) => setEmailChangePassword(e.target.value)}
            />

            <Button
              className="!mt-2"
              disabled={!isEmail(emailChangePassword)}
              onClick={handleStep0}
            >
              Resend code
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <p>Thay đổi mật khẩu</p>
            <Form form={formActive} onFinish={handleStep1} layout="vertical">
              <Form.Item label="code" name="code" required>
                <Input />
              </Form.Item>

              <Form.Item
                required
                label="password"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input placeholder="Enter password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input placeholder="EnterConfirmPassword" />
              </Form.Item>

              <Button htmlType="submit" className="!mt-2">
                Xác nhận
              </Button>
            </Form>
          </>
        );
      case 2:
        return (
          <>
            <p>Done</p>
            <Button onClick={handleStep2}>Close</Button>
          </>
        );
    }
  }, [currenStep, emailChangePassword, userId]);

  if (!hasMounted) return <></>;

  return (
    <>
      <Modal
        title="Basic Modal"
        maskClosable={false}
        open={open}
        onOk={onOk}
        footer={null}
        onCancel={() => {
          onCancel();
          setEmailChangePassword("");
          setUserId("");
          setCurrentStep(0);
          formActive.resetFields();
        }}
      >
        <div>
          <Steps
            current={currenStep}
            items={[
              {
                title: "Email",
              },
              {
                title: "ChangePassword",
              },
              {
                title: "Done",
              },
            ]}
          />
          <div className="border border-gray-200 rounded-lg !p-5 min-h-9 !mt-[20px]">
            {renderContentStep}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalForgotChangePassword;
