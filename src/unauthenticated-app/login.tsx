import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React, { FormEvent, useState } from "react";
import { useAsync } from "utils/useAsyncT";

// interface LoginFormProps {
//   onSubmit: (username: string, password: string) => void;
// }
// interface和type区别是什么？
export const LoginScreen = ({ onError }: any) => {
  const { login, user } = useAuth();
  // { username: string; password: string } 这里是antd form.item name设计好的ts类型，直接写values就可以拿到对应的
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      // 这里为什么要使用run？不直接请求？ 因为要用到isLoading，error等状态，而这些状态都是在封装的useAsync hook里面定义的，所以需要使用run
      await run(login(values));
    } catch (e) {
      onError(e);
    }
    
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
        <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
function run(arg0: Promise<void>) {
  throw new Error("Function not implemented.");
}

