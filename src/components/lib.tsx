import styled from "@emotion/styled";
import React from "react";
import { Spin, Typography } from "antd";
// import { DevTools } from "jira-dev-tool";
/**
 * 这里泛型，感觉不写也可以，写上ts类型约束是为了更好减少风险和报错  
 * M: 相当于也是类似 将css布局自定义成一个函数式的组件，css in js，可以像函数组件通过props，传入实参 参数等
 * GPT: CSS-in-JS 可以将样式与组件结合起来,基本原则是以可编程的方式生成样式，并将样式直接应用于组件和元素上，使其更加灵活和可重用
 */
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
    typeof props.gap === "number"
      ? props.gap + "rem"
      : props.gap
        ? "2rem"
        : undefined};
  }
`;
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);
