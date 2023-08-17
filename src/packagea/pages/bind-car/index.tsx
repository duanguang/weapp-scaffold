// import  React from 'react';
import Taro from '@tarojs/taro'
import { AtList,AtListItem,AtForm,AtInput,AtImagePicker,AtButton } from 'taro-ui'
import { View,Text,Picker } from '@tarojs/components'
import { useState,useEffect } from 'react';
import './index.less'
import { DeviceType,Device,Place } from '@/constants/const.type'
import { AtMessage } from 'taro-ui'
import * as api from '@/api/index'
import * as path from '@/constants/route.config'
import { Store } from '@/store/core.store'
import { File } from 'taro-ui/types/image-picker';
// import '../../../app.less'
function BindCarDetail(props) {
  const deviceTypes = ['游乐车','游乐船'];
  const [places,setPlaces] = useState([
    { addressCode: '0',addressName: '新建' },
    { addressCode: 'A1000009',addressName: '锐丰广场' }
  ] as Array<Place>);
   const [deviceData,setDeviceData] = useState({
      nickname: '超级飞侠乐迪',
      bindSort: 0,
      deviceCode: '',
      siteAreaCode: '',
      deviceType: 0,
    } as Device),
    [files,setFiles] = useState([]),
    [placeName,setPlacName] = useState(''),
    [placeValue,setPlacValue] = useState(1),
    [deviceTypeName,setDeviceTypeName] = useState('游乐车')

  useEffect(() => {
    if (props && props.tid) {
      let deviceCode = props.tid.split('=')[1] as string
      deviceCode = deviceCode.split('&')[0]
      setDeviceData({ ...deviceData,deviceCode } as Device)
    }
  },[props.tid,Store])

  const onPlaceChange = (e) => {
    const value = parseInt(e && e.detail.value) || 0
    setPlacValue(value)
    if (value) {
      const place = places[value]
      setDeviceData({ ...deviceData,siteAreaCode: place.addressCode })
      setPlacName(place && place.addressName || '')
    } else {
      // 还没有场地
    }
  }

  const onDeviceTypeChange = (e) => {
    const deviceType = (parseInt(e && e.detail.value) || 0) as DeviceType
    setDeviceData({ ...deviceData,deviceType })
    setDeviceTypeName(deviceTypes[deviceType])
  }

  const handleNameChange = (e) => {
    setDeviceData({ ...deviceData,nickname: e })
  }
  const handleCodeChange = (e) => {
    setDeviceData({ ...deviceData,bindSort: parseInt(e) })
  }

  const onSubmit = async () => {
    const res = await api.bindDevice(deviceData)
    if (res && res.code === '0000') {
      Taro.navigateTo({
        url: path.HOME
      })
    }

  }

  return (
    <View>
      <AtMessage />
      <AtForm
      >
        <View className='p-13 at-row at-row__justify--between at-row__align--center'>
          <Text className='font-size-16 gray-text-700'>设备编码</Text>
          <Text className='font-size-15 gray-text-500'>{deviceData.deviceCode}</Text>
        </View>
        <View className='page-section m-flex items-center pr'>
          <View className='flex-1'>
            <Picker mode='selector' value={placeValue} rangeKey='addressName' range={places} onChange={onPlaceChange}>
              <AtList>
                <AtListItem
                  title='选择场所'
                  extraText={placeName}
                />
              </AtList>
            </Picker>
          </View>
          <View className='pa right-arrow at-icon at-icon-chevron-right font-size-18 gray-text-400'></View>
        </View>
        <View className='page-section m-flex items-center pr'>
          <View className='flex-1'>
            <Picker mode='selector' value={deviceData.deviceType} range={deviceTypes} onChange={onDeviceTypeChange}>
              <AtList>
                <AtListItem
                  title='选择设备'
                  extraText={deviceTypeName}
                />
              </AtList>
            </Picker>
          </View>
          <View className='pa right-arrow at-icon at-icon-chevron-right font-size-18 gray-text-400'></View>
        </View>
        <View>
          <AtInput
            clear
            name='nickname'
            title='名称'
            type='text'
            placeholder='设备名称'
            value={deviceData.nickname}
            onChange={handleNameChange}
          />
        </View>
        <View>
          <AtInput
            clear
            name='bindSort'
            title='编号'
            type='text'
            placeholder='设备编号'
            value={deviceData.bindSort.toString()}
            onChange={handleCodeChange}
          />
        </View>
        <View className='p-13 at-row at-row__align--center'>
          <View className='image-label font-size-16 gray-text-700 flex-1 at-col-3'>封面</View>
          <View className='flex-1'>
            <AtImagePicker
              multiple={false}
              count={1}
              length={3}
              files={files} onChange={function (files: File[],operationType: 'add' | 'remove',index?: number | undefined): void {
                throw new Error('Function not implemented.');
              } }            />
          </View>
        </View>
        <View className='p-13 bottom-wrap'>
          <AtButton
            className='flex-1'
            type='primary'
            onClick={onSubmit}
          >绑定设备</AtButton>
        </View>
      </AtForm>
    </View>
  )
}

export default BindCarDetail
