// import  React from 'react';
import { AtList,AtListItem,AtAvatar,AtButton } from 'taro-ui'
import { View,Text } from '@tarojs/components'
import { useState,useEffect } from 'react';
import './index.less'
import * as api from '@/api/index'
import { useLoad } from '@tarojs/taro';
import { Store } from '@/store/core.store'
import DeviceStore from '@/store/device.store';
import Taro from '@tarojs/taro';
import * as dayjs from 'dayjs';
import { observer } from '@/store/core.store';
import { countdownTimer } from '@/hooks/countdownTimer';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const CarDetail = observer(() => {
  const store = Store.getStore(DeviceStore)
  const { timecount,start } = countdownTimer();
  const [seconds,setSeconds] = useState(0);
  useLoad((params: { id: string }) => {
    store.getDetail(params.id).then(() => {
      // const x = dayjs().format('YYYY-MM-DD hh:ss:mm')
      const currTime = dayjs();
      const ruleTime = store?.detail?.runInfo?.ruleTime / 1000/60;
      const endTime = dayjs(dayjs(store?.detail?.runInfo?.startTime)).add(ruleTime,'minute');
      // const endTime = dayjs().add(1,'minute');
      const ss = dayjs.duration(endTime.diff(currTime)).asSeconds().toFixed(0);
      setSeconds(parseFloat(ss));
      start(parseFloat(ss));

    });
  })
  const handleStartDevice = async () => {
    if (store.detail?.bindStatus === 1) {
      const res = await api.deviceApi.start(store.detail?.deviceCode);
      if (res?.data) {
        Taro.showToast({
          title: '启动成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            const timeid = setTimeout(() => {
              store.getDetail(store.detail?.deviceCode).then(() => {
                const currTime = dayjs();
                const ruleTime = store?.detail?.runInfo?.ruleTime / 1000/60;
                const endTime = dayjs(dayjs(store?.detail?.runInfo?.startTime)).add(ruleTime,'minute');
                // const endTime = dayjs().add(1,'minute');
                const ss = dayjs.duration(endTime.diff(currTime)).asSeconds().toFixed(0);
                setSeconds(parseFloat(ss));
                start(parseFloat(ss));
              });
              clearTimeout(timeid);
            },3000)
          }
        });
      }
    }
    else {
      Taro.showToast({
        title: '请先绑定设备',
        icon: 'success',
        duration: 2000,
      });
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
        <AtListItem title='编码' extraText={store.detail?.deviceCode} />
        <AtListItem title='名称' arrow='right' extraText={store.detail?.nickname||''} />
        <AtListItem title='编号' arrow='right' extraText={store.detail?.deviceBind?.bindSort?store.detail?.deviceBind?.bindSort:''} />
        <AtListItem title='场所' arrow='right' extraText={store.detail?.deviceBind?.address?.addressName} />
        <AtListItem title='类型' arrow='right' extraText='游乐车' />
      </AtList>
      <View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>绑定状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${store.detail.bindStatus === 1 ? 'running' : 'stop'}`}>
          <Text className='px-3'>{store.detail['bindStatusDesc']}</Text>
        </View>
      </View>
      {(<View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>运行状态</Text>
        <View className={`m-flex items-center p6 font-size-12 ${store.detail.status ? 'running' : 'stop'}`}>
          <Text className='px-3'>{store.detail?.statusDesc}</Text>
        </View>
      </View>)}

      {seconds > 0 && <View className='detail-item bg-white at-row at-list__item at-row__align--center at-row__justify--between'>
        <Text className='font-size-16'>使用时间</Text>
        <View className={`m-flex items-center p6 font-size-12 ${store.detail.status ? 'running' : 'stop'}`}>
          <Text className='px-3'>{timecount}</Text>
        </View>
      </View>}

      <View className='m-flex items-center px-6 mt-12'>
        <AtButton className='flex-1 mx-6' type='primary' onClick={handleStartDevice}>
          远程启动
        </AtButton>
        <AtButton className='flex-1 mx-6' type='secondary' onClick={async () => {
          const res = await api.deviceApi.wxacode(store.detail?.deviceCode,`pages/index/index?id=${store.detail?.deviceCode}`);
          if (res.code === '204') {
            Taro.showToast({
              title: res.message,
              icon: 'error',
              duration: 2000,
            })
            return
          }
          let fileN = new Date().valueOf();
          let fileP = Taro.env.USER_DATA_PATH + '/' + fileN + '.jpg'
          Taro.downloadFile({
            url: res?.data,
            filePath: fileP,
            success: (opt) => {
              Taro.saveImageToPhotosAlbum({
                filePath: opt.filePath,
                success: () => {
                  Taro.showToast({
                    title: '保存到相册',
                    icon: 'success',
                    duration: 2000,
                  })
                }
              })
            }
          })

        }}>设备码</AtButton>
        <AtButton className='flex-1 mx-6' disabled type='secondary'>编辑设备</AtButton>
        <AtButton className='flex-1 mx-6' type='secondary' onClick={async () => {
          const res = await api.deviceApi.unbind(store.detail?.deviceCode);
          Taro.showToast({
            title: res.message,
            icon: 'success',
            duration: 2000,
          })
        }}>解绑设备</AtButton>
      </View>
    </View>
  )
})

export default CarDetail
