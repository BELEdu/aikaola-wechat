/**
 * @desc 基于fetch的Ajax请求封装
 * @author huojinzhao
 */

import 'whatwg-fetch';

/**
 * 常量配置
 */
const URL = {
  // 上线时需拼合为完整的接口地址
  HOST: '/',
  // 接口版本号
  VERSION: '',
};

/**
 * 统一接口地址
 */
const makeUrl = uri => `${URL.HOST}${URL.VERSION}${uri}`;

/**
 * 统一处理服务器响应
 *
 * @desc res.json()操作若失败，返回一个空对象
 */
const handleResponse = res => (
  res.ok
    ? res.json().catch(() => ({}))
    : res.json().then((error) => { throw error; })
);

/**
 * 处理配置
 */
const mergeOptions = ({
  headers = {},
  body,
  ...restInit
}) => {
  const headersOption = new Headers({
    credentials: 'include',
    ...headers,
  });

  if (!body) return { headers: headersOption, ...restInit };

  let data = body;

  if (!(body instanceof FormData)) {
    data = JSON.stringify(body);
    headersOption.append('Content-Type', 'application/json');
  }

  return { headers: headersOption, body: data, ...restInit };
};

const request = async ({
  url,
  method = 'GET',
  headers = {},
  body,
}) => {
  const res = await fetch(
    makeUrl(url),
    mergeOptions({ method, headers, body }),
  );

  try {
    return await handleResponse(res);
  } catch (error) {
    throw error;
  }
};

/**
 * GET请求
 */
const get = (
  url,
  headers = {},
) => request({ url, headers });

/**
 * POST请求
 */
const post = (
  url,
  body,
  headers = {},
) => request({ url, method: 'POST', headers, body });

/**
 * PATCH请求
 */
const patch = (
  url,
  body,
  headers = {},
) => request({ url, method: 'PATCH', headers, body });

/**
 * DELETE请求
 */
const remove = (
  url,
  headers = {},
) => request({ url, method: 'DELETE', headers });

export default {
  get,
  post,
  patch,
  delete: remove,
};
