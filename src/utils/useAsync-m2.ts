import React, { useState } from "react";
const defaultState = {
  data: null,
  error: null,
  stat: "idle",
};
export const useAsync = (initialState: any) => {
  const [state, setState] = useState({
    ...defaultState,
    ...initialState,
  });

  const setData = (data: any) => {
    setState({ data, error: null, stat: "success" });
  };

  const setError = (error: any) => {
    setState({ data: null, error, stat: "error" });
  };

  const run = (promise: Promise<any>) => {
    // setState({ data, error, stat: "loading" });
    // TODO: 控制loading状态，肯定要通过setState, 那其他的属性写什么？比如上面的data，这个时候就要想到函数参数了，state的默认值？
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error
      });
  };

  // 这里返回值也很重要，四个状态，state，run 更新函数(setState)，
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
