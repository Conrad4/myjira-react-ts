import { useState } from "react";
// 写到data数据的类型的时候，应该需要写什么？要想到泛型的时候
interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}
export const useAsync = <T>(initialState: State<T>) => {
  const defaultState = {
    data: null,
    error: null,
    stat: "idle",
  };
  const [state, setState] = useState({
    ...defaultState,
    ...initialState,
  });
  const setData = (data: T) => {
    setState({ data, error: null, stat: "success" });
  };
  const setError = (error: Error) => {
    setState({ data: null, error, stat: "error" });
  };
  const run = async (promise: Promise<T>) => {
    // 这样写也可以，但是更加推荐下面这样写， 因为最后我们还需要return出去给别人使用hook
    // setState({ data, error, stat: "loading"})
    setState({ ...state, stat: "loading" });
    try {
      const data = await promise;
      setData(data);
      // 
      return data;
    } catch (error: any) {
      setError(error);
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
