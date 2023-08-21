import { Component,PropsWithChildren } from 'react'
import { View, CoverImage } from '@tarojs/components'
import './index.less';
import * as api from '@/api/index';
import Taro from '@tarojs/taro';
import scan from '../../assets/image/logo.png';
import { DeviceRecord } from 'types/device';
import { deviceApi } from '../../api';
export default class Scan extends Component<PropsWithChildren>{
  onLoad (query) {
    if (query && query.scene) {
      const arr = query.scene.split('_')
      const imei = arr[1];
      api.scanDevice(imei).then(res => {
        if (res?.data) {
          const deviceData = res.data || {}
          if (deviceData.bindStatus === 0) {
            // 没有绑定
            Taro.redirectTo({
              url: `/packagea/pages/bind-car/index?imei=${deviceData.deviceCode}`,
            })
          } else {
            const { deviceBind,...prop} = deviceData;
            const { bindUser,address,remark,..._prop } = deviceBind;
            //@ts-ignore
            const detail: DeviceRecord = {
              ...prop,
              ..._prop,
              //@ts-ignore
              ...deviceApi.dataProcessing(prop),
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
