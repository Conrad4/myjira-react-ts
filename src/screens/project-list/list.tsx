import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
interface Project {
  created: number;
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  list: Project[],
  users: User[],
}
export const List = ({ list, users }: ListProps) => {
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
    <Table rowKey={'id'} columns={columns} dataSource={list}>
    </Table>
  );
};
