"use client";

import React, { useState } from "react";
import styles from "./style/activate.module.scss";
import { Button, Form, Input } from "antd";

interface ActivateAccountProps {
  onClose: () => void;
}

const ActivateAccount = ({ onClose }: ActivateAccountProps) => {
  const [inputCode, setinputCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả lập gọi API kích hoạt thành công
    alert("Kích hoạt thành công!");
    onClose();
  };
  return (
    <div className={styles["activate-container"]}>
      <p className={styles["subtitle"]}>
        Vui lòng nhập mã kích hoạt đã được gửi đến email của bạn.
      </p>
      <Form onFinish={handleSubmit} className={styles["code-form"]}>
        <div className={styles["code-inputs"]}>
          <Input
            type="text"
            value={inputCode}
            onChange={(e) => setinputCode(e.target.value)}
            className={styles["code"]}
          />
        </div>
        <Button htmlType="submit" className={styles["activate-btn"]}>
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};

export default ActivateAccount;
