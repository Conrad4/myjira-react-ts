import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React, { FormEvent, useState } from "react";

// interface LoginFormProps {
//   onSubmit: (username: string, password: string) => void;
// }
// interface和type区别是什么？
export const LoginScreen = () => {
  const { login, user } = useAuth();
  // { username: string; password: string } 这里是antd form.item name设计好的ts类型，直接写values就可以拿到对应的
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
