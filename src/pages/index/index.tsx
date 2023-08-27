import { useEffect, useState, useCallback } from 'react';
import { View,Navigator, ScrollView } from '@tarojs/components'
import './index.less'
import '../../app.less'
import { Store } from '@/store/core.store'
import { AtAvatar,AtTag } from 'taro-ui'
import * as api from '@/api/index'
import DropList from '@/components/base/drop-list'
import { customTabBar } from '@/hooks/tabbar'
import { observer } from '@/store/core.store';
import DeviceStore from '@/store/device.store'
import Taro from "@tarojs/taro";
const defaultImg = ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi4%2F400893004%2FO1CN01Hxp7Zt1Y3sSkAhPCg_%21%21400893004.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103865&t=a0af164da3ac8b07f3d4da08f3f91f5f',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01jDPJ7B2M45ZlPGjRg_%21%213174689773-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103920&t=feca675376253504bda517889eda3262',
  'https://img12.360buyimg.com/n0/jfs/t1/24015/26/14026/112798/5ca42c95E8a8e8e0a/4d438883bdfc1fb7.jpg'
]
const status = {
  0: 'online',
  1: 'offline',
  2: 'online',
  3:'offline'
}
const runStatus = {
  0: 'stop',
  1: 'running',
  2: 'online',
  3:'offline'
}
const statu = {
  0: 'check',
  1: 'close',
  2: 'check',
  3:'close'
}
const Index=observer(()=> {
  customTabBar(0);
  const device_store = Store.getStore(DeviceStore)
  const getWechatToken = () => {
    api.getWechatToken()
      .then(res => {
        api.getwxacodeunlimit({ token: res.data.accessToken as string,sence: 'deviceCode_865328068118396' })
      })
  }
  // 绑定loading
  const [loading, setLoading] = useState(false);

  // 绑定onFresh
  const onRefresherPulling =async () => {
    setLoading(true);
    await getList();
    setLoading(false);
  } 

  const onScrollToUpper = async() => {
    setLoading(true);
    await getList();
    setLoading(false);
  }
  const getList = ()=> {
    Taro.showToast({icon: 'loading', title: '加载中...', duration: 15000})
    api.deviceApi.list().then((res) => {
      Taro.hideToast()
      if (Array.isArray(res?.data?.records)) {
        device_store.setDeviceList(res?.data?.records)
       }
    })
  }

  useEffect(() => {
    // api.getPlaces().then(res => {
    //   if (res?.data?.code === '0000') this.props.placeStore.setPlaces(res.data.data)
    // })
    getList()
  },[])

  return (
    <View className='index page'>
      <DropList />
      <View className='m-flex items-center white-text bg-theme p6'>
        <View 
          className='font-size-13 pr-3'
          onClick={()=> {
            Taro.navigateTo({url: '/packagea/pages/places/index'})
          }}
        >锐丰广场</View>
        <View className='at-icon at-icon-chevron-down font-size-13'></View>
        <View className='search-wrap bg-white flex-1 ml-5 at-row at-row__justify--end at-row__align--center'>
          <View className='bg-theme small-btn white-text font-size-12 px-6 mx-3'>搜索</View>
        </View>
      </View>
      <View className='m-flex justify-between mt-6 px-6 items-center'>
        <View className='m-flex items-center'>
          <View className='font-size-15'>设备列表</View>
          <View className='font-size-12 gray-text-400'></View>
        </View>
        <View
          className='at-icon at-icon-bullet-list font-size-20 gray-text-500'
          onClick={getWechatToken}
        >
        </View>
      </View>
      <ScrollView
        className='px-6 scroll-list'
        scrollY
        style={{height:'90vh'}}
        fastDeceleration
        scrollWithAnimation
        refresherTriggered={loading}
	      onScrollToLower={onRefresherPulling}
	      onScrollToUpper={onScrollToUpper}
      >
        {
          device_store.deviceList.length?device_store.deviceList.map((item) => {
            return (
              <Navigator url={ `/packagea/pages/car-detail/index?id=${item.deviceCode}`} hoverClass='navigator-hover'>
                <View
                  className='card m-flex mt-8 items-center'
                >
                  {/* <AtAvatar size="large" image={item.headImg||defaultImg[2]}></AtAvatar> */}
                  <View className='ml-8 flex-1'>
                    <View className='font-size-16'>{item.nickname}</View>

                    <View className='mt-5'>
                      <AtTag
                        size='small'
                        name={item.statusDesc.toString()}
                        type='primary'
                        circle
                        className={runStatus[item.status]}
                      >
                        设备状态: {item.statusDesc}
                      </AtTag>
                    </View>
                    <View className='mt-5'>
                      <AtTag
                        size='small'
                        name={item.bindSort.toString()}
                        type='primary'
                        circle
                      >
                        设备码：{item.deviceCode}
                      </AtTag>
                    </View>
                    <View className='mt-5'>
                      <AtTag
                        size='small'
                        name={item.bindSort.toString()}
                        type='primary'
                        circle
                      >
                        序号: {item.bindSort}
                      </AtTag>
                    </View>
                    
                  </View>
                  <View className={`status ${status[item.status]} m-flex items-center justify-center`}>
                    <View className={`at-icon at-icon-${statu[item.status]} font-size-13`}></View>
                  </View>
                </View>
              </Navigator>
            )
          }):<View style={{textAlign:'center',paddingTop:'20%'}}> 暂无数据</View>
        }
      </ScrollView>
    </View>
  )
})
export default Index
