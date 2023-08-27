import { RootRespone } from 'types/common'
import {TaroFetch} from './taroFetch'
import {Device} from '@/constants/const.type'
import { DeviceBindData, DeviceData, DeviceDetail, DeviceRecord } from 'types/device'
import { UserData, AccountInfo, VerifyMailData, ForgetPwdData } from 'types/user'
const baseUrl = 'https://fmh.cabage.cn/fmh/'
const ERR_CODE = 200
const REFETCH_CODE = 800

const taroFetch = new TaroFetch()


type WxCode = {
  token: string,
  sence: string
}

export const login = async (data) => {
  const res = await taroFetch.request({method:'POST', data, url: `${baseUrl}login`})
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const refreshToken = async (token:string) => {
  const res = await taroFetch.request({method:'PUT', url: `${baseUrl}/login/refresh`, header: {'refresh-token': token}})
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const getWechatToken= async () => {
  const res = await taroFetch.request({method:'POST', data: {refresh: false}, url: `${baseUrl}wechat//api/token`})
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const getwxacodeunlimit = async (data: WxCode) => {
  const {token, sence} = data
  const res = await taroFetch.request({
    method:'POST',
    data: {scene: sence, env_version: 'develop', page: 'pages/scan/index', check_path: false},
    url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`
  })
}

export const createPlace = async() => {
  const res = await taroFetch.request({
    method: 'POST',
    data: {addressName: '锐丰广场'},
    url: `${baseUrl}site-area/create`
  })

  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const getPlaces = async() => {
  const res = await taroFetch.request({
    url: `${baseUrl}site-area`
  })
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.resolve(res?.data?.message || '操作失败')
  }
}

export const scanDevice = async (imei:string) => {
  const res = await taroFetch.request({url: `${baseUrl}device/scan?deviceCode=${imei}`})
  return Promise.resolve(res.data as RootRespone<DeviceBindData>)
}


export const bindDevice = async (data:Device) => {
  const res = await taroFetch.request({
    method: 'PUT',
    data,
    url: `${baseUrl}device/bind`
  })

  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}


class DeviceApi{
  dataProcessing(res:DeviceRecord) {
    const status = {
      0: '空闲',
      2: '下线',
      1: '运行中',
      3:'离线'
    }
    const bindStatus = {
      0: '未绑定',
      1:'已绑定'
    }
    res['statusDesc'] = status[res['status']];
    res['bindStatusDesc'] = bindStatus[res['bindStatus']];
    return res;
  }
  async list(address_code?:string) {
    return await taroFetch.request({
      method: 'GET',
      data:{size:300,current:1},
      url: `${baseUrl}device/page`
    }).then((res) => {
      if (Array.isArray(res?.data?.data?.records)) {
        res.data?.data?.records.map((item) => {
          item = this.dataProcessing(item);
        })
      }
      return res?.data as RootRespone<DeviceData>
    })
  }
  async start(device_code:string) {
    const res = await taroFetch.request({
      method: 'PUT',
      data: {deviceCode:device_code,goodsCode:'G1000001'},
      url: `${baseUrl}device/start`
    })
    return Promise.resolve(res.data as RootRespone<boolean>)
  }
  async stop(device_code:string) {
    const res = await taroFetch.request({
      method: 'PUT',
      data: {deviceCode:device_code},
      url: `${baseUrl}device/stop`
    })
    return Promise.resolve(res.data as RootRespone<boolean>)
  }
  async get(code: string) {
    const res = await taroFetch.request({
      method: 'GET',
      url: `${baseUrl}device/${code}`
    })
    return Promise.resolve(res.data as RootRespone<DeviceDetail.Device>)
  }
  async wxacode(deviceCode: string,path:string,width?:string) {
    const res = await taroFetch.request({
      method: 'POST',
      data: {
        deviceCode,
        path,
        width
      },
      url: `${baseUrl}manager/device/wxacode`
    })
    return Promise.resolve(res.data as RootRespone<string>)
  }
  async unbind(deviceCode: string) {
    const res = await taroFetch.request({
      method: 'PUT',
      data: {
        deviceCode,
      },
      url: `${baseUrl}device/unbind`
    })
    return Promise.resolve(res.data as RootRespone<boolean>)
  }
}
export const deviceApi = new DeviceApi()

class UserApi{
  async get() {
    return await taroFetch.request({
      method: 'GET',
      url: `${baseUrl}/user-info`
    }).then((res) => {
      return res?.data as RootRespone<UserData>
    })
  }

  async sign (data:AccountInfo) {
    return await taroFetch.request({
      data,
      method: 'POST',
      url: `${baseUrl}/login/regist`
    }).then((res) => {
      return res?.data as RootRespone<Boolean>
    })
  }

  async verifyMail (data:VerifyMailData) {
    return await taroFetch.request({
      data,
      method: 'POST',
      url: `${baseUrl}login/mail`
    }).then((res) => {
      return res?.data as RootRespone<Boolean>
    })
  }
  
  async forget (data:ForgetPwdData) {
    return await taroFetch.request({
      data,
      method: 'PUT',
      url: `${baseUrl}login/forget`
    }).then((res) => {
      return res?.data as RootRespone<Boolean>
    })
  }
}
export const userApi = new UserApi()

