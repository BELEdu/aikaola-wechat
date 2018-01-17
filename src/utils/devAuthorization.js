/**
 * @desc 开发环境下存储openid到cookie
 * @author hjz
 */

const devAuthorization = (openid) => {
  if (openid) {
    document.cookie = `fake_openid=${openid};path=/;`;
  } else {
    // eslint-disable-next-line
    alert('请配置openid');
  }
};

// 开发环境下进行授权
const query = {};

const search = window.location.search;

if (search) {
  search.slice(1).split('&')
    .forEach((fragment) => {
      const item = fragment.split('=');
      query[item[0]] = item[1];
    });
}

if (process.env.NODE_ENV === 'development') {
  devAuthorization(query.fake_openid);
}

