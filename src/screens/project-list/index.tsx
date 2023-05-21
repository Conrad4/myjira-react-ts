import React from "react";
import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from 'qs'
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";

export const ProjectListScreen = () => {
  //   选择框一个state,还用来下面的list的，
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, data: list } = useProjects(debouncedParam);
  // 下面的展示数据
  // 想想如果在useEffect是async 该怎么写？

  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {/* 由于List组件那边的函数参数改变了 list={list} 改成Table 组件 tableProps对应的属性，dataSource就是tableProps里面的属性  */}
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;