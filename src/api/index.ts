import { RootRespone } from 'types/common'
import {TaroFetch} from './taroFetch'
import {Device} from '@/constants/const.type'
import { DeviceData } from 'types/device'
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

export const refreshToken = async (token) => {
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

  console.log(res)
}

export const createPlace = async() => {
  const res = await taroFetch.request({
    method: 'POST',
    data: {addressName: '锐丰广场'},
    url: `${baseUrl}site-area/create`
  })

  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else if (res && res.statusCode == REFETCH_CODE) {
    createPlace()
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const getPlaces = async() => {
  const res = await taroFetch.request({
    url: `${baseUrl}site-area`
  })
  console.log(res,'res')
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else if (res && res.statusCode == REFETCH_CODE) {
    return getPlaces()
  } else {
    return Promise.resolve(res?.data?.message || '操作失败')
  }
}

export const scanDevice = async (imei:string) => {
  const res = await taroFetch.request({url: `${baseUrl}device/scan?deviceCode=${imei}`})
  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else if (res && res.statusCode == REFETCH_CODE) {
    return scanDevice(imei)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}


export const bindDevice = async (data:Device) => {
  const res = await taroFetch.request({
    method: 'PUT',
    data,
    url: `${baseUrl}device/bind`
  })

  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else if (res && res.statusCode == REFETCH_CODE) {
    bindDevice(data)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

export const startDevice = async (deviceCode:string) => {
  const res = await taroFetch.request({
    method: 'PUT',
    data: {deviceCode},
    url: `${baseUrl}device/start`
  })

  if (res && res.statusCode == ERR_CODE) {
    return Promise.resolve(res.data)
  } else if (res && res.statusCode == REFETCH_CODE) {
    startDevice(deviceCode)
  } else {
    return Promise.reject(res.data && res.data.message || '操作失败')
  }
}

class DeviceApi{
  async list(address_code?:string) {
    return await taroFetch.request({
      method: 'GET',
      data:{size:50,current:1},
      url: `${baseUrl}device/page`
    }).then((res) => {
      if (Array.isArray(res.data?.data?.records)) {
        const status = {
          0: '空闲',
          1: '运行',
          2: '离线',
          3:'下线'
        }
        const bindStatus = {
          0: '未绑定',
          1:'已绑定'
        }
        res.data?.data?.records.map((item) => {
           item['statusDesc']=status[item['status']]
           item['bindStatusDesc']=bindStatus[item['bindStatus']]
        })
      }
      return res.data as RootRespone<DeviceData>
    })
  }
}
export const deviceApi = new DeviceApi()