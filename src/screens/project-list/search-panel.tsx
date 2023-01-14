import React, { useState } from "react";
interface SearchPanelProps {
  users: Users[];
  param: {
    name: string;
    personId: string;
  };
  setParam:
}
export const SearchPanel = ({ users, param, setParam }) => {
  return (
    <div>
      {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
      {/* 不明白这里为什么要使用...param,这里param数据类型是引用类型，需要先拷贝一份，看写的笔记里面详细写了 */}
      <input
        type="text"
        value={param.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(e) => {
          setParam({
            personId: e.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((item, index) => {
          <option value={item.id}>{item.name}</option>;
        })}
      </select>
    </div>
  );
};
