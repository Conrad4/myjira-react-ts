import React from "react";
import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from 'qs'
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  //   选择框一个state,还用来下面的list的，
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000)
  // 下面的展示数据
  const [list, setList] = useState([]);
  const client = useHttp();
  // useEffect(async () => {
  //   const res = await client('projects', { data: cleanObject(debouncedParam) })
  //   setList(res);
  // })
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) })
      .then((response) => {
        setList(response);
      });
  }, [debouncedParam]);


  // // const [param, setParam] = useDebounce()
  // useEffect(() => {
  //   fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
  //     async (response) => {
  //       if (response.ok) {
  //         setList(await response.json()  );
  //       }
  //     }
  //   );
  // }, [debouncedParam]);

  useMount(() => {
    client('users')
      .then((res) => {
        return setUsers(res);
      })
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
