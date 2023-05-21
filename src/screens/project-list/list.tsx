import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";
export interface Project {
  created: number;
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
// 因为要进行对Table 组件的属性类型扩展，比如新增加的loading属性，或者以后还要手动的新添加属性
// ListProps 现在是由两部分组成，一部分是自己的ListProps users，一部分是继承 TableProps
interface ListProps extends TableProps<Project> {
  users: User[],
}
// 这种写法... rest运算符，可以看下js笔记，和 拓展运算符是不同的，是和 const obj = {name: 'z',age:13,high:...,low:...}, {name, ...props}
export const List = ({ users, ...props }: ListProps) => {
  const columns: ColumnsType<Project> = [{
    title: "名称",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "负责人",
    render(value, project) {
      return (
        <span>
          {users.find((user) => user.id === project.personId)?.name ||
            "未知"}
        </span>
      );
    },
  }, {
    title: "创建时间",
    render(value, project) {
      return (
        <span>
          {project.created
            ? dayjs(project.created).format("YYYY-MM-DD")
            : "无"}
        </span>
      );
    },
  },]
  return (
    // {...props} 这种写法就是和 const obj = {name: 'z',age:13}, {name, ...props}，原来的dataSouce包括在{...props} 里面
    <Table rowKey={'id'} columns={columns} {...props} />
  );
};
