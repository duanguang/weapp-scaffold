// import  React from 'react';
import {  AtList, AtListItem, AtAvatar, AtButton } from 'taro-ui'
import {  View, Text } from '@tarojs/components'
import { useState} from 'react';
import './index.less'

type DeviceType = 0 | 1

type Data = {
  name: string,
  placeId: string,
  placeName: string,
  msId: string,
  type: DeviceType,
  imei: string,
  online?: number
}

function CarDetail () {
  const [deviceData] = useState({
    name: '超级飞侠乐迪',
    imei: '6897654479883222345',
    msId: 'M2300897889',
    placeId: '12',
    placeName: '锐丰广场',
    type: 0,
    online: 1
  } as Data)

  const onChange = () => {

  }

  return (
    <View>
      <View className='bg-white at-row px-13 at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>封面</Text>
        <AtAvatar size="large" image='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi4%2F400893004%2FO1CN01Hxp7Zt1Y3sSkAhPCg_%21%21400893004.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103865&t=a0af164da3ac8b07f3d4da08f3f91f5f'></AtAvatar>
        <View className='pa right-arrow at-icon at-icon-chevron-right font-size-18 gray-text-400'></View>
      </View>
      <AtList>
        <AtListItem title='IMEI' extraText={deviceData.imei}/>
        <AtListItem title='名称' arrow='right' extraText={deviceData.name}/>
        <AtListItem title='编号' arrow='right' extraText={deviceData.msId}/>
        <AtListItem title='场所' arrow='right' extraText={deviceData.placeName}/>
        <AtListItem title='类型' arrow='right' extraText='游乐车'/>
      </AtList>
      <View className='detail-item bg-white at-row px-13 at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>在线状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${deviceData.online ? 'online' : 'offline'}`}>
          <View className={`at-icon at-icon-${deviceData.online ? 'check' : 'close'} font-size-13 white-text`}></View>
          <Text>在线</Text>
        </View>
      </View>
      <View className='detail-item bg-white at-row px-13 at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>运行状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${deviceData.online ? 'running' : 'stop'}`}>
          <Text className='px-3'>停止</Text>
        </View>
      </View>

      <View className='m-flex items-center px-6 mt-12'>
        <AtButton className='flex-1 mx-6' type='primary'>远程启动</AtButton>
        <AtButton className='flex-1 mx-6' type='secondary'>编辑设备</AtButton>
      </View>
    </View>
  )
}

export default CarDetail
