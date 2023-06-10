import React, { FormEvent } from "react";
import { cleanObject } from "utils";
import { useAuth } from "context/auth-context";
import { useAsync } from "utils/useAsyncT";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app/index";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)
const apiUrl = process.env.REACT_APP_API_URL;

// prop: { onError: any; }
export const RegisterScreen = ({ onError }: any) => {
  // const { onError } = prop;
  // 这里如果不单独写prop，那么函数参数就需要写成({onError}: { onError: any; })，这样就可以直接使用onError，而不需要再写prop.onError
  const { register, user } = useAuth();
  const { isLoading, run, error } = useAsync();
  // HTMLFormElement extends Element
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // 或者直接.catch(onError)
    try {
      // 这里为什么要使用run？不直接请求？ 因为要用到isLoading，error等状态，而这些状态都是在封装的useAsync hook里面定义的，所以需要使用run
      await run(register({ username, password }));
    } catch (e) {
      onError(e);
    }
    // e => onError(e) 省略写法. e.message /e.errorCode等具体的错误信息 可以在index里面写，这个需要和后端约定好
    // register({ username, password }).catch(onError);

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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};