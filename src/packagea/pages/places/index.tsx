import { View,  Navigator, ScrollView, Text } from '@tarojs/components'
import { observer, Store } from '@/store/core.store';
import DeviceStore from '@/store/device.store'
import Taro from "@tarojs/taro";
import * as api from '@/api/index'
import { useEffect, useState, useCallback } from 'react';
import './index.less'
import { AtButton, AtTag } from 'taro-ui';

const Places = observer(() => {
  const device_store = Store.getStore(DeviceStore)
  const [loading, setLoading] = useState(false);
  const [activeAddressCode, setActiveAddressCode] = useState('');

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
    api.getPlaces().then((res) => {
      Taro.hideToast()
      if (Array.isArray(res?.data)) {
        device_store.setPlaces(res?.data)
       }
    })
  }

  const handleSelectPlace = useCallback((code:string) => {
    setActiveAddressCode(code)
  }, [])

  useEffect(() => {
    getList()
  }, [])

  return (
    <View className='index page m-flex flex-direction m-flex' style={{height:'100vh'}}>
      <ScrollView
        className='py-6 scroll-list mt-12 flex-1'
        scrollY
        fastDeceleration
        scrollWithAnimation
        refresherTriggered={loading}
	      onScrollToLower={onRefresherPulling}
	      onScrollToUpper={onScrollToUpper}
      >
        {
          device_store.places.map((item) => {
            return (
              <View hoverClass='navigator-hover' className='item bg-white pr br mb-br m-flex items-center'>
                <View 
                  className={`check-wrap m-flex items-center mr-6 ${activeAddressCode == item.addressCode ? 'm-checked' : ''}`}
                  onClick={()=>{
                    handleSelectPlace(item.addressCode)
                  }}
                >
                  {activeAddressCode === item.addressCode && <View className='at-icon at-icon-check'></View>}
                </View>
                <View>
                  <View className='m-flex items-center'>
                    <Text className='font-size-16'>{item.addressName}</Text>
                    <AtTag className='ml-6' active type="primary" size="small">户外</AtTag>
                  </View>
                  <View className='font-size-13 gray-text-300'>
                    广州省黄埔区锐丰广场1楼大平地
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <View className='px-3 bottom-wrap m-flex p6'>
        <AtButton type='primary' className='mx-10 flex-1'
          onClick={()=> {
            Taro.navigateTo({url: '/packagea/pages/add-place/index'})
          }}
        >
          新建场所
        </AtButton>
        {activeAddressCode && <AtButton type='secondary' className='mx-10 flex-1'
          onClick={()=> {
            Taro.navigateBack()
          }}
        >
          确定选择该场地
        </AtButton>}
      </View>

    </View>
  )
})

export default Places