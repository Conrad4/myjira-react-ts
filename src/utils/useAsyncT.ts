import { useState } from "react";
/**
 * 封装 处理错误和loadinng值的异步请求 hook
 */
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(initialState?: State<D>, initialConfig? : typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // run 用来触发异步请求
  // const run = (promise: Promise<D>) => {
  //   if (!promise || !promise.then) {
  //     throw new Error("请传入 Promise 类型数据");
  //   }
  //   setState({ ...state, stat: "loading" });
  //   return promise
  //     .then((data) => {
  //       setData(data);
  //       // return data;
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       return error;
  //     });
  // };
  const config = { ...defaultConfig, ...initialConfig };
  const run = async (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    try {
      const data = await promise;
      setData(data);
      // 这里是需要返回出去的吗，感觉不太需要，setData(data)已经将最新的数据更新到了state中。在函数最外层的return {...state}中，包含了最新的data
      return data;
    } catch (error: any) {
      // 这里是异步操作的catch，如果使用return error，不使用Promise.ject主动抛出，外面调用的catch是接收不到异常的
      setError(error);
      if (config.throwOnError) return Promise.reject(error);
      return error;
    }
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
