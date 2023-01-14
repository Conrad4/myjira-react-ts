import _ from "lodash";
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (_.isEmpty(value)) {
      delete result[key];
    }
  });

  return result;
};

/**
 * useDebounce
 * 怎么使用状态改写？
 */
