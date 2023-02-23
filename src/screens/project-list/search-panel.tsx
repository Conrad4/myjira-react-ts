import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  // 一个函数的类型，为空 () => void
  setParam: (param: SearchPanelProps['param']) => void;
}


export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  const handleSelect = (e: any) => {
    setParam({
      ...param,
      personId: e.target.value
    });
  }
  return (
    <div>
      {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
      {/* 不明白这里为什么要使用...param,这里param数据类型是引用类型，需要先拷贝一份，看写的笔记里面详细写了，在笔记前面第三个菜单的位置带了**号地方 */}
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
        onChange={handleSelect}
      >
        <option value={""}>负责人</option>
        {/* 这里map后面不能写大括号，或者写了大括号就要写return，这是map函数的原因  */}
        {/* {users.map((item, index) => {
          return <option value={item.id}>{item.name}</option>
        })} */}

        {users.map((item, index) => 
           <option value={item.id}>{item.name}</option>
        )}
      </select>
    </div>
  );
};
