import { Component,PropsWithChildren } from 'react'
import { View,Text,Image,Button, CoverImage } from '@tarojs/components'
import './index.less'
import * as api from '@/api/index'
import Taro from '@tarojs/taro';
import scan from '../../assets/image/logo.png';
import { Store } from '@/store/core.store'
import DeviceStore from '@/store/device.store';
import { DeviceRecord } from 'types/device';
export default class Scan extends Component<PropsWithChildren>{
  onLoad (query) {
    if (query && query.scene) {
      const arr = query.scene.split('_')
      const imei = arr[1];
      const store = Store.getStore(DeviceStore)
      api.scanDevice(imei).then(res => {
        console.log(res,'扫码')
        if (res && res.data) {
          const deviceData = res.data || {}
          if (deviceData.bindStatus === 0) {
            // 没有绑定
            Taro.redirectTo({
              url: `/packagea/pages/bind-car/index?imei=${deviceData.deviceCode}`,
            })
          } else {
            const { deviceBind,...prop} = deviceData;
            const { bindUser,address,remark,..._prop } = deviceBind;
            const status = {
              0: '空闲',
              1: '运行',
              2: '离线',
              3:'下线'
            }
            //@ts-ignore
            const detail: DeviceRecord = {
              ...prop,
              ..._prop,
              statusDesc: status[prop['status']],
              addressName:address?.addressName
            }
            Taro.redirectTo({
              url: `/packagea/pages/car-detail/index?detail=${JSON.stringify(detail)}`,
            })
          }
        }
      })
    }
  }

  render () {
    return (
      <View className='bg-theme h100 m-flex justify-center items-center'>
        <View className='logo-wrap'>
          <CoverImage className='img' src={scan} />
        </View>
      </View>
    )
  }
}
