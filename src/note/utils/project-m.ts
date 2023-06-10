import { useEffect } from "react";
import { useHttp } from "../../utils/http";
import { useAsync } from "../../utils/useAsyncT";

export const useProjects = (param: any) => {
  const { run, ...restResult } = useAsync();
  const http = useHttp();
  useEffect(() => {
    run(http("projects", { data: param }));
  }, [param]);

  // return {
  //   ...restResult,
  // };
  return restResult;
};
