import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";


// 写这个context/index文件，通过函数参数传递children，为了，比如在src/index.tsx使用的时候，AppProviders可以包括着<App />>子组件，这个知识点涉及到的是官网 props 将 JSX 作为子组件传递
// https://react.jscn.org/learn/passing-props-to-a-component#passing-jsx-as-children 可以先学习 passing-jsx-as-children 这块知识 
export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};