import Taro from '@tarojs/taro'
export const cookies = {
    get(options: {
        key: string,
        name?: string,
    }) {
        let _value = '';
        let _key = '';
        if (Taro.ENV_TYPE.WEAPP) {
            _value = Taro.getStorageSync(options.key);
            _key = options.name || ''
        }
        if (Taro.ENV_TYPE.WEB) {
            _value = document.cookie;
            _key = options.key;
        }
        let match = _value.match(new RegExp('(^|;\\s*)(' + _key + ')=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : null;
    },
    set(key: string,value: any,iDay?:number) {
        if (Taro.ENV_TYPE.WEAPP) {
            Taro.setStorageSync(key,value)
        }
        if (Taro.ENV_TYPE.WEB) {
            iDay = iDay||0;
            let oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);
            document.cookie = key + '=' + value + ';expires=' + oDate;
        }
    }
}