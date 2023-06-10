
import { useAuth } from 'context/auth-context';
import qs from 'qs';
const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
  data?: object;
  token?: string;
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: IConfig = {}) => {
  const config = {
    // 默认为get，后面customConfig也会传这个
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    // 这里写在后面，method可能为post也会在后面覆盖前面写死的 method: 'GET',
    ...customConfig,
  }
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // 这里刚开始忘记写上return，导致这个then里面 ok都返回不出去，所以会报错
  return fetch(`apiUrl/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        // const { logout } = useAuth();
        // await logout();
        await useAuth().logout();
        window.location.reload()
        return Promise.reject({ message: '请重新登录' })
      }
      if (response.ok) {
        return response.json()
      } else {
        return Promise.reject(data)
      }
    })
}
/**
 * 应该是不能写成 ((endpoint, config): Parameters<typeof http>) ，需要写成元组的形式配合ts的Parameters，用鼠标左键可以点击进去，看api介绍，使用，然后加上...是为了在调用的时候，可以不用写[a,b]，使用了...，可以直接使用(a, b)
 * 为什么它一定要是个hook呢？如果你的函数里需要使用其他的hook的话，那么你的函数本身就必须是一个hook。
 * 
 * @returns * return 返回的函数则是一个封装了用户 token 处理逻辑的 HTTP 请求函数，可以直接传入 endpoint 和 config 参数，方便在组件中调用 API。
 */
export const useHttp = () => {
  const { user } = useAuth();
  /**
   * utility type 的用法：用泛型给它传入一个其他类型，然后utility type Parameters 对这个类型进行某种操作
   * 这里如果只是用了TS 特殊的utility type，目的就是为了不用去上面找http [endpoint, config]的类型，而是通过utility type Parameters 去推断出来，然后直接使用，原本写法可能是 ([endpoint, config]: [string, IConfig]) => http(endpoint, { ...config, token: user?.token });
   * 函数作为返回值，这是不是闭包？ yes
   */
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
}

// 这里是type和 interface 区别， interface没法实现Utility type
type Person = {
  name: string;
  age: number;
};

type PersonOnlyName = Pick<Person, "name">;
type PersonKeys = keyof Person;
// 是一个 'age'字符串 
type Age = Exclude<PersonKeys, 'name'>;
// 这里好像不行，需要PersonKeys 为interface？
type Age1 = Omit<PersonKeys, "name"| "age">;
const shenMiRen: Omit<Person, "name" | "age"> = {};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;
