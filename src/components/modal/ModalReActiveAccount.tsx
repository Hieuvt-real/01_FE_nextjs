/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useMounted from "@/hooks/useMounted";
import { Button, Form, Input, message, Modal, notification, Steps } from "antd";
import axios from "axios";
import React, { useMemo, useState } from "react";

interface Props {
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
  email: string;
}
const ModalReActiveAccount = (props: Props) => {
  const { onCancel, onOk, open, email } = props;
  const [currenStep, setCurrentStep] = useState(0);
  const [userId, setUserId] = useState("");
  const hasMounted = useMounted();

  const [formActive] = Form.useForm();

  const handleStep0 = async () => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/retry-active`,
        {
          email,
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
      const { status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-code`,
        {
          _id: userId,
          code: v.code,
        }
      );
      if (status === 200 || status === 201) {
        message.info("kích hoạt tài khoản thành công");
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
            <p>Tài khoản chưa được kích hoạt</p>
            <Input value={email} disabled className="!mt-2" />

            <Button className="!mt-2" onClick={handleStep0}>
              Resend code
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <p>Nhập mã code đã được gửi đến email</p>
            <span className="text-lg font-bold text-red-300">{email}</span>
            <Form form={formActive} onFinish={handleStep1}>
              <Form.Item name="code" noStyle>
                <Input />
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
  }, [currenStep, email, userId]);

  if (!hasMounted) return <></>;

  return (
    <>
      <Modal
        title="Basic Modal"
        maskClosable={false}
        open={open}
        onOk={onOk}
        footer={null}
        onCancel={onCancel}
      >
        <div>
          <Steps
            current={currenStep}
            items={[
              {
                title: "Login",
              },
              {
                title: "Verification",
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

export default ModalReActiveAccount;
