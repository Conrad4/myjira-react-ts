
import React, { useState } from 'react';
import { RegisterScreen } from './register';
import { LoginScreen } from './login';
import { Button, Card } from "antd";

/**
 * 这里index应该写什么呢？和login、 regis有关系，没有授权这两者关系？先注册再登录的关系
 *
 */
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (<div style={{ display: "flex", justifyContent: "center" }}>
    <Card>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </Card>
  </div>)
}