import { Component,PropsWithChildren } from 'react'
import { View,Text,Image,Button, CoverImage } from '@tarojs/components'
import './index.less'
import * as api from '@/api/index'
import Taro from '@tarojs/taro';

export default class Scan extends Component<PropsWithChildren>{
  onLoad (query) {
    if (query && query.scene) {
      const arr = query.scene.split('_')
      const imei = arr[1]
      api.scanDevice(imei).then(res => {
        console.log(res)
        if (res && res.data) {
          const deviceData = res.data || {}
          if (!deviceData.bindStatus) {
            // 没有绑定
            Taro.redirectTo({
              url: `/packagea/pages/bind-car/index?imei=${deviceData.deviceCode}`,
            })
          } else {
            Taro.redirectTo({
              url: `/packagea/pages/car-detail/index?detail=${JSON.stringify(deviceData)}`,
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
          <CoverImage className='img' src='../../assets/image/logo.png' />
        </View>
      </View>
    )
  }
}
