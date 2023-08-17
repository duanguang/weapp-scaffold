import Taro from '@tarojs/taro';
import invariant from "invariant"
import { refreshToken } from './index';
import { USER_ACCESS_TOKEN, USER_REFRESH_ACCESS_TOKEN } from '@/constants/storage.config';

type Error = {
  code: string,
  message: string
}

const DEFAULT_OPTION = {
    'content-type': "application/json"
};

const handleTokenDisable = () => {
  Taro.showToast({
    title: '登录信息已失效',
    icon: 'error',
    duration: 2000
  })
  Taro.removeStorageSync(USER_ACCESS_TOKEN);
  Taro.removeStorageSync(USER_REFRESH_ACCESS_TOKEN);
  setTimeout(() => {
    Taro.redirectTo({url: '/pages/login/index'})
  }, 2000)
}



const handleError = (err: Error) => {
  Taro.showToast({
    title: `errCode:${err.code};${err.message}`,
    icon: 'error',
    duration: 3000
  })
}

const interceptor = function (chain) {
  const requestParams = chain.requestParams
  // const { method, data, url } = requestParams
  return chain.proceed(requestParams)
    .then(async (res) => {
      if (res && res.data.code == '1002') {
        // 登录信息失效
        const freshToken = Taro.getStorageSync(USER_REFRESH_ACCESS_TOKEN)
        if (!freshToken) {
          handleTokenDisable()
          return
        }
        let refreshData = await refreshToken(freshToken)
        if (refreshData.token) {
          Taro.setStorage({
            key: USER_ACCESS_TOKEN,
            data: refreshData.data.accessToken
          })
          Taro.setStorage({
            key: USER_REFRESH_ACCESS_TOKEN,
            data: refreshData.data.refreshToken
          })
          return {statusCode: 800}
        } else {
          handleTokenDisable()
          return
        }
      } else if (res && res.data.code == '1001') {
        //重新登录
        handleTokenDisable()
        return
      } else {
        if (res && res.data.code != '0000') handleError({code: res.data.code, message: res.data.message})
        return res
      }
    })
  }


export class TaroFetch {
    async request<T = any,U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any>(options: Taro.request.Option<T,U>) {
        const token = Taro.getStorageSync(USER_ACCESS_TOKEN)
        options.header = Object.assign(DEFAULT_OPTION,options.header);
        console.log(options.url)
        if (token && !options.url.includes('login')) {
          options.header['access-token'] = token
        }
        options['dataType'] = options.dataType || 'json';

        Taro.addInterceptor(interceptor);
        const result = await Taro.request(options)
        return result
    }
    setHeaders(options) {
        invariant(typeof options === 'object','options: options should be a object');
        options = options || {};
        options.url = options.url || '';
        invariant(options.url,'options.url: options.url should not a empty');
        return {
            'api-target': options.url,
            'api-cookie': Taro.getStorageSync(USER_ACCESS_TOKEN)
        }
    }
}
