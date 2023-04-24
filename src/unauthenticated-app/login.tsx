import { useAuth } from "context/auth-context";
import React, { FormEvent, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

// interface LoginFormProps {
//   onSubmit: (username: string, password: string) => void;
// }
// interface和type区别是什么？
export const LoginScreen = () => {
  const { login, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ username, password });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
}
