import { AtMessage, AtSwitch, AtInput, AtButton, AtList, AtListItem } from 'taro-ui'
import { View, Text, Switch } from '@tarojs/components'
import Taro from "@tarojs/taro";
import { ROUTERS } from '@/routers';
import { useState, useEffect, useCallback } from 'react';
import MRadio from '@/components/m-radio';

const placeObj = {
  '0': '户外广场',
  '1': '商场内'
}
const placeTypes = [{value: '0', text: '户外广场'}, {text: '商场', value: '1'}]
const AddPlace = () => {
  const [placeType, setPlaceType] = useState('0')
  const [defaultPlace, setDefaultPlace] = useState(false)
  const handleChange = (type, val) => {

  }
  const onPlaceTypeChange = useCallback((e) => {
    console.log(e.detail.value)
    setPlaceType(e.detail.value)
  }, [])

  const handleDefaultPlaceChange = useCallback(() => {

  }, [])

  return (
    <View>
      <View className='bg-white mt-12'>
        <View className='at-input'>
          <View className='at-input__container'>
            <View className='at-input__title'>场所类型</View>
            <MRadio
              data={placeTypes}
              onChange={onPlaceTypeChange}
            />
          </View>
        </View>
        <AtInput
          name='addressName'
          title='场所名'
          clear
          onChange={(val:string) => {
            handleChange('mail', val)
          }}
        />
        <AtInput
          name='addressName'
          title='所在地区'
          placeholder='省市区县,乡镇等'
          clear
          onChange={(val:string) => {
            handleChange('mail', val)
          }}
        >
          <View className='m-flex items-center'>
            <View className='at-icon at-icon-map-pin'></View>
            <Text className='font-size-12'>定位</Text>
          </View>
        </AtInput>

        <AtInput
          name='addressName'
          title='详细地址'
          placeholder='街道楼牌号等'
          clear
          onChange={(val:string) => {
            handleChange('mail', val)
          }}
        >
        </AtInput>
        <AtSwitch title='设为默认场地' checked={defaultPlace} onChange={handleDefaultPlaceChange} />
      </View>
      <View className='p-13'>
        <AtButton type='primary'>
          确定
        </AtButton>
      </View>
    </View>
  )
}

export default AddPlace