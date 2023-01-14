import React from "react";

export const List2 = ({ lists: , users }) => {
  //   return (
  //   <div>
  //     <table>
  //         {
  //     lists.map((list) =>{
  //         <td>{list.name}</td>
  //             // 根据list的personID，去找user里面的personName,上面已经在遍历lists了
  //             <td>{lists.find(item => {

  //                 let id = users.map((user) => {
  //                     return user.id;
  //                 });

  //                 return item.id == id;
  //             }).name}</td>
  //     })
  //     }
  //     </table>
  //     </div>);
  return (
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((project) => (
          <tr>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const List = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/*undefined.name*/}
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
