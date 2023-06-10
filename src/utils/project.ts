import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./useAsyncT";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
export const useProjects = (param?: Partial<Project>) => {
  // 这个clinet 是这个useHttp hook返回值，可以命名为任意名字
  const client = useHttp();
  // Project[] : useAsync<Project>() 返回的是一个Project类型的值，即一个单独的项目对象;而useAsync<Project[]>() 返回的是一个Project类型的数组，即多个项目对象的数组。
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    // 这里run 函数是个异步请求函数，理论上一般异步请求，我们应该使用async await去接受值，但是因为useAsync这个hook已经返回了resolve 成功状态的data，在 ...result 里面，所以这里不需要再接受返回的值
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
