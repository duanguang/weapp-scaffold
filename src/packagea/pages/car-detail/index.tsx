// import  React from 'react';
import {  AtList, AtListItem, AtAvatar, AtButton } from 'taro-ui'
import {  View, Text } from '@tarojs/components'
import { useState, useEffect} from 'react';
import './index.less'
import {DeviceType, Device, Place} from '@/constants/const.type'
import * as api from '@/api/index'

interface Data extends Device {
  status?: number,
  deviceImg?: string|null,
  remark?:string|null,
  deviceBind: any,
  addressName: string,
}
const statusObj = {
  0: {
    text: '空闲',
    className: 'stop',
    btnText: '远程启动'
  },
  1: {
    text: '运行中',
    className: 'running',
    btnText: '远程关闭'
  },
  2: {
    text: '离线',
    className: 'offline'
  },
  3: {
    text: '下线',
    className: 'offline'
  }
}

function CarDetail (props) {
  const [deviceData, setDeviceData] = useState({
    nickname: '',
    deviceCode: '',
    bindSort: 0,
    siteAreaCode: '',
    placeName: '',
    deviceType: 0,
    status: 1,
    deviceImg: null,
    remark:null,
    deviceBind: null,
    addressName: ''
  } as Data)

  const onChange = () => {

  }

  const handleStartDevice = () => {
    api.startDevice(deviceData.deviceCode)
  }

  useEffect(() => {
    if (props && props.tid) {
      let device = props.tid.split('=')[1] as string, bindSort:number = 0, addressName:string='', siteAreaCode:string=''
      device = device.split('&')[0]
      const detail = JSON.parse(device) as Data
      const {deviceCode, deviceImg, deviceType,nickname, remark, status, deviceBind} = detail

      if (deviceBind) {
        bindSort = deviceBind.bindSort || 0
        if (deviceBind.address) {
          addressName = deviceBind.address.addressName
          siteAreaCode = deviceBind.address.addressCode
        }
      }
      setDeviceData({deviceCode, bindSort, deviceImg, deviceType,nickname, remark, status, deviceBind, addressName, siteAreaCode})
      console.log(JSON.parse(device))
    }
  }, [props])



  return (
    <View>
      <View className='bg-white at-row px-13 at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>封面</Text>
        <AtAvatar size="large" image='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi4%2F400893004%2FO1CN01Hxp7Zt1Y3sSkAhPCg_%21%21400893004.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103865&t=a0af164da3ac8b07f3d4da08f3f91f5f'></AtAvatar>
        <View className='pa right-arrow at-icon at-icon-chevron-right font-size-18 gray-text-400'></View>
      </View>
      <AtList>
        <AtListItem title='IMEI' extraText={deviceData.deviceCode}/>
        <AtListItem title='名称' arrow='right' extraText={deviceData.nickname}/>
        <AtListItem title='编号' arrow='right' extraText={deviceData.bindSort+''}/>
        <AtListItem title='场所' arrow='right' extraText={deviceData.addressName}/>
        <AtListItem title='类型' arrow='right' extraText='游乐车'/>
      </AtList>
      <View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>在线状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${deviceData.status !== 3 && deviceData.status !== 2 ? 'online' : 'offline'}`}>
          <View className={`at-icon at-icon-${deviceData.status !== 3 && deviceData.status !== 2 ? 'check' : 'close'} font-size-13 white-text`}></View>
          <Text>{deviceData.status !== 3 && deviceData.status !== 2 ?  '在线' : '离线' }</Text>
        </View>
      </View>
      {deviceData.status !== 3 && deviceData.status !== 2 &&(<View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>运行状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${deviceData.status ? 'running' : 'stop'}`}>
          <Text className='px-3'>{statusObj[deviceData.status||0].text}</Text>
        </View>
      </View>)}

      <View className='m-flex items-center px-6 mt-12'>
        <AtButton className='flex-1 mx-6' type='primary' onClick={handleStartDevice}>
          {statusObj[deviceData.status||0].btnText}
        </AtButton>
        <AtButton className='flex-1 mx-6' type='secondary'>编辑设备</AtButton>
        <AtButton className='flex-1 mx-6' type='secondary'>解绑设备</AtButton>
      </View>
    </View>
  )
}

export default CarDetail
