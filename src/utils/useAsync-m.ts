import { useState } from "react";

// step 1, 从哪里入口？封装loading 和error ，应该想办法抽象他们
// step 2, 封装异步请求

// 确定要封装的hook的功能和作用，以及需要接收哪些参数，是不是要向把loading和error 都传进去？
// TODO: 函数参数需要传递什么 ?
export const useAsync = (data: any) => {
  const [isLoading, setIsLoading] = useState(false);
  // 是后端会返回error这个字段？还是前端自己定义的数据？这个是在前端 自己定义的数据，也不需要管他是什么类型啊，我们定义它作为一个state 状态就行了
  const [error, setError] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     data = await
  //   } catch (err) {}
  // };
  setIsLoading(true);
  // data.then((data) => {
  // }).catch((err)=>{

  // }).finally(()={
  //   // isLoading = false;
  //   setIsLoading(false);
  // })
};
