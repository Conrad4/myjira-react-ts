import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./useAsyncT";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
export const useProjects = (param?: Partial<Project>) => {
  // 这个clinet 是这个useHttp hook返回值，可以命名为任意名字
  const client = useHttp();
  const { run, ...result } = useAsync<any>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
