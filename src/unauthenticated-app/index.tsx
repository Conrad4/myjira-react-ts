
import React, { useState } from 'react';
import { RegisterScreen } from './register';
import { LoginScreen } from './login';
/**
 * 这里index应该写什么呢？和login、 regis有关系，没有授权这两者关系？先注册再登录的关系
 *
 */
export const UnauthenticatedApp = () => {
  const [isRegister, setisRegister] = useState(false);

  return <div>
    {isRegister ? <RegisterScreen /> : <LoginScreen />}
    <button onClick={() => setisRegister(!isRegister)}>
      切换到{isRegister ? '登录' : '注册'}
    </button>
  </div>;
}