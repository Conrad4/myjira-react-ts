import { User } from "screens/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./useAsyncT";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUses = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    // 这里run 函数是个异步请求函数，理论上一般异步请求，我们应该使用async await去接受值，但是因为useAsync这个hook已经返回了resolve 成功状态的data，在 ...result 里面，所以这里不需要再接受返回的值
    run(client("users"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
};
