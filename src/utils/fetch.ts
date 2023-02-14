import Taro from '@tarojs/taro';
import  invariant from "invariant"
const DEFAULT_OPTION = {   
    'content-type': "application/json"
};
export class TaroFetch {
    async request<T = any,U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any>(options: Taro.request.Option<T,U>) {
        options.header = Object.assign(DEFAULT_OPTION,options.header);
        options['dataType'] = options.dataType || 'json';
        return await Taro.request(options)
    }
    setHeaders(options) {
        invariant(typeof options === 'object','options: options should be a object');
        options = options || {};
        options.url = options.url || '';
        invariant(options.url,'options.url: options.url should not a empty');
        return {
            'api-target': options.url,
            'api-cookie': Taro.getStorageSync('token')
        }
    }
}