// import  React from 'react';
import { AtList,AtListItem,AtAvatar,AtButton } from 'taro-ui'
import { View,Text } from '@tarojs/components'
import { useState,useEffect } from 'react';
import './index.less'
import * as api from '@/api/index'
import { useLoad } from '@tarojs/taro';
import { Store } from '@/store/core.store'
import DeviceStore from '@/store/device.store';
import { DeviceRecord } from 'types/device';
import Taro from '@tarojs/taro';
import { ROUTERS } from '@/routers';
const statusObj = {
  0: {
    className: 'stop',
    btnText: '远程启动'
  },
  1: {
    className: 'running',
    btnText: '远程关闭'
  },
  2: {
    className: 'offline'
  },
  3: {
    className: 'offline'
  }
}

function CarDetail() {
  //@ts-ignore
  const [detail,setDetail] = useState<DeviceRecord>({})
  const store = Store.getStore(DeviceStore)
  useLoad((params: { id: string;detail: string}) => {
    
    const res = store.deviceList.find((item) => item.deviceCode === params.id)
    if (res) {
      setDetail({ ...res })
    }
    else if (params.detail) {
      setDetail({ ...JSON.parse(params.detail) })
    }
  })
  const handleStartDevice =async () => {
    if (detail.status === 0) {
      const res = await api.deviceApi.start(detail?.deviceCode);
      if (res?.data) {
        Taro.showToast({
          title: '启动成功',
          icon: 'success',
          duration: 2000,
        });
        const timeid= setTimeout(() => {
          Taro.redirectTo({ url: ROUTERS.home });
          clearTimeout(timeid);
         },3000)
      } else {
        Taro.showToast({
          title: '启动失败',
          icon: 'error',
          duration: 2000
        })
      }
    }
    else if (detail.status === 1) {
      const res = await api.deviceApi.stop(detail?.deviceCode);
      if (res?.data) {
        Taro.showToast({
          title: '暂停成功',
          icon: 'success',
          duration: 2000,
        })
       const timeid= setTimeout(() => {
         Taro.redirectTo({ url: ROUTERS.home });
         clearTimeout(timeid);
        },3000)
      } else {
        Taro.showToast({
          title: '暂停失败',
          icon: 'error',
          duration: 2000
        })
      }
    }
  }
  return (
    <View>
      <View className='bg-white at-row px-13 at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>封面</Text>
        <AtAvatar size="large" image='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi4%2F400893004%2FO1CN01Hxp7Zt1Y3sSkAhPCg_%21%21400893004.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103865&t=a0af164da3ac8b07f3d4da08f3f91f5f'></AtAvatar>
        <View className='pa right-arrow at-icon at-icon-chevron-right font-size-18 gray-text-400'></View>
      </View>
      <AtList>
        <AtListItem title='编码' extraText={detail?.deviceCode} />
        <AtListItem title='名称' arrow='right' extraText={detail?.nickname} />
        <AtListItem title='编号' arrow='right' extraText={detail.bindSort + ''} />
        <AtListItem title='场所' arrow='right' extraText={detail.addressName} />
        <AtListItem title='类型' arrow='right' extraText='游乐车' />
      </AtList>
      <View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>在线状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${detail.status !== 3 && detail.status !== 2 ? 'online' : 'offline'}`}>
          <View className={`at-icon at-icon-${detail.status !== 3 && detail.status !== 2 ? 'check' : 'close'} font-size-13 white-text`}></View>
          <Text>{detail.status !== 3 && detail.status !== 2 ? '在线' : '离线'}</Text>
        </View>
      </View>
      {detail.status !== 3 && detail.status !== 2 && (<View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>运行状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${detail.status ? 'running' : 'stop'}`}>
          <Text className='px-3'>{detail.statusDesc}</Text>
        </View>
      </View>)}

      <View className='m-flex items-center px-6 mt-12'>
        <AtButton className='flex-1 mx-6' type='primary' onClick={handleStartDevice}>
          {statusObj[detail.status || 0].btnText}
        </AtButton>
        <AtButton className='flex-1 mx-6' disabled type='secondary'>编辑设备</AtButton>
        <AtButton className='flex-1 mx-6' type='secondary'>解绑设备</AtButton>
      </View>
    </View>
  )
}

export default CarDetail
