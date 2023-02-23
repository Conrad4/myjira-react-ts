import _ from "lodash";
import { useEffect, useState } from "react";
// 这里的object函数参数需要使用接口去定义吗？
// 但是 好像又不太知道这里写什么？这是
/**
 * 这个方法的作用是什么？ 如果有val为空，删除属性，保留了非空属性
 * @param object
 * @returns
 */

// @ts-ignore
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

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * useDebounce
 * 怎么使用状态改写？
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    // 这里返回一个函数，闭包，外部才能读取到内部的变量timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 
 * @param arr 这里传入参数的类型T[] 加上[], T 已经不是代表数组类型了，而是数组里面每一项的类型，也就是item，在add方法里面写的item类型   
 * @returns 
 */
export const useArray = <T>(arr: T[]) => {
  const [value, setValue] = useState(arr);

  const handleRemove = (index: number) => {
    // arr是传进来的初始值，这里应该是value
    let arrCopy = [...value];
    arrCopy.splice(index, 1)
    setValue([...arrCopy])
    // 需要返回值吗？先搞清楚这个函数的作用是什么，你返回这个值给谁用？
    // return arrCopy
  } 
  return {
    // 这个value的作用是什么？也是一个数组啊，arr传进来是一个初始值
    value,
    setValue,
    // add: setState([...arr, value]),
    // 从这行代码犯了多少错误？慢慢的去分析，add是什么？函数，函数右边可以这样写吗？不行 ()=>这样，
    // add: (arr) => setState([...arr, value]),
    // 关于setState里面应该去写什么？首先useArray它的函数参数表示是什么？add又是一个单独的函数啊，不要搞乱了,并且这里需要回过头去写arr: T[], 这个时候表示限制住传入的arr的类型，需要满足数组每一项的对象，即{name: string,age:}的类型是一样的
    add: (item: T) => setValue([...arr, item]),
    removeIndex: (index: number) => handleRemove(index),
    clear: () => setValue([]),
  }
};
