
import React, { useState } from 'react';
import { RegisterScreen } from './register';
import { LoginScreen } from './login';
import { Button, Card, Divider, Typography } from "antd";
import styled from '@emotion/styled';
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
/**
 * 这里index应该写什么呢？和login、 regis有关系，没有授权这两者关系？先注册再登录的关系
 *
 */
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  // 想要把出错的信息显示在页面上面，需要一个状态来存储错误信息
  const [error, setError] = useState<Error | null>(null);
  return (<Container>
    <Header />
    <Background />
    <ShadowCard>
      <Title>{isRegister ? "请注册" : "请登录"}</Title>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      {isRegister ? <RegisterScreen onError={setError}/> : <LoginScreen onError={setError}/>}
      <Divider />
      <a onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
      </a>
    </ShadowCard>
  </Container>)
}

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
// 涉及到emtion的Styled Components知识点，看官网例子，相当于传入参数，否则styled一般后面接的需要是html标签
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
