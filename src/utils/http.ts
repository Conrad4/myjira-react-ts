
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
 * 应该是不能写成 ((endpoint, config): Parameters<typeof http>) ，需要写成元组的形式配合ts的Parameters使用，然后加上...是为了在调用的时候，可以不用写[a,b]，使用了...，可以直接使用(a, b)
 * 
 * @returns 
 */
export const useHttp = () => {
  const { user } = useAuth();
  // TODO 讲解 TS 操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });

}
