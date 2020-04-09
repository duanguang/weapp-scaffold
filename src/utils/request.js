import Taro from '@tarojs/taro'
import  invariant from "invariant"
import { setStorageSync, getStorageSync } from './storage';

const DefaultOption = {
  processData: false,
  dataType: 'json',
  'content-type': "application/json"
};
export function setHeaders(options) {
  invariant(typeof options === 'object', 'options: options should be a object');
  options = options || {};
  options.url = options.url || '';
  invariant(options.url, 'options.url: options.url should not a empty');
  return {
    'api-target': options.url,
    // 'api-cookie':'CP_JSESSIONID=15a7eec3-7ae7-4adf-bd12-121e2a895727;'
     'api-cookie': getStorageSync('token')
  }
}
export function get(url, prams, options) {
  if (prams) {
    prams._ = Date.parse(new Date()); // 设置请求不缓存
  }
  let headers = Object.assign(DefaultOption, options)
  return Taro.request({
    url: url,
    data: prams,
    method: 'GET',
    header: headers
  }).then(res => {
    if(res.statusCode===403){
      return {
        status:403,
        msg:'没有访问权限',
        data:null
      }
    }

    return res.data;
  }).catch(error => {
    return {
      status:'disconnect',
      msg:'网络异常，请检查网络连接',
      data:null
    }
    // let res = error.response || {}
    // return res.data
  })
}

export function post(url,prams,options){
    let updateToken=options['update-token']
    delete options['update-token']
    let headers=Object.assign(DefaultOption,options)
    return Taro.request({
        url: url,
        data: prams,
        method: 'POST',
        header: headers
      }).then(res => {
        if(res.statusCode===403){
          return {
            status:403,
            msg:'没有访问权限',
            data:null
          }
        }
        let cookie= res.header['set-cookie']||res.header['Set-Cookie'];
        if(cookie){
          cookie = cookie.replace('HttpOnly,','')
          // console.log(getCookie('CP_JSESSIONID',cookie))
          // console.log(getCookie('user_cookie',cookie))
          const CP_JSESSIONID=getCookie('CP_JSESSIONID',cookie)
          const user_cookie = getCookie('user_cookie',cookie)
          if(CP_JSESSIONID&&updateToken){
              setStorageSync('token',`CP_JSESSIONID=${CP_JSESSIONID};`)
          }

        }
        return res.data;
      }).catch(error => {
        return {
          status:'disconnect',
          msg:'网络异常，请检查网络连接',
          data:null
        }
        // let res = error.response || {}
        // return res.data
      })
 }
 function getCookie(name,cookie){
  if(name){
      let arr = cookie.split('; ');
      for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=');
          if (arr2[0] == name) {
              return arr2[1];
          }
      }
  }

  return '';
}
