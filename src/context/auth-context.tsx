import React, { ReactNode, useContext, useState } from "react";
// 为什么需要重命名auth，因为在这个context组件也有login方法，为了区分在auth-provider里面和这个里面的login方法
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from 'utils';

interface AuthForm {
  username: string;
  password: string;
}
interface IAuthContext {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const bootstrapUser = async () => {
  let user;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
}
// <IAuthContext | undefined>
const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useState这里需要传入一个泛型，会看init值 null，然后把init值赋给泛型，下面的函数参数不希望是null，这里传入的是User | null，要不然null 在下面的then里 user参数类型会报错
  // 感觉这里和useState的泛型有关系，并且下面的函数参数用到了这个user相关
  const [user, setUser] = useState<User | null>(null);

  // const login = (form: AuthForm) => auth.login(form).then(setUser); user参数相同可以消掉，可以只写setUser，但是觉得奇怪
  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));
  // 加载页面的时候去调用，保证登录刷新页面的时候，不会又被登出了，持久化登录
  useMount(() => {
    bootstrapUser().then(setUser);
  })

  return (
    // 如果上面的React.createContext 不写上传递泛型，这里就会出现类型报错，不能分配类型undefined，ts导致多出的部分，当时写React.createContext 可能不会注意到需要写，写到这里的时候回过头去想哪里类型出问题了
    <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
  )
}

/**
 * 自定义hooks，把context返回出去，因为useContext就是用来传递数据，管理数据状态，user类型User，User包括这个user的id name等信息和token信息。
 * 
 * @returns context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  // 这里默认的写了对象，但也不是不可以，接收的时候，就使用const {context} 和 cosnt context的区别
  return context;
}