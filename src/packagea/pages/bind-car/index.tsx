// import  React from 'react';
import {  AtList, AtListItem, AtForm, AtInput, AtImagePicker, AtButton } from 'taro-ui'
import {  View, Text, Picker } from '@tarojs/components'
import { useState, useEffect} from 'react';
import './index.less'
import '../../../app.less'


type DeviceType = 0 | 1
type Data = {
  name: string,
  placeId: string,
  msId: string,
  type: DeviceType,
  code: string
}

function CarDetail () {
  const deviceTypes = ['游乐车', '游乐船'],
  [places] = useState([
    {id: 'new', name: '新建'},
    {id: '0',name: '锐丰广场'},
    {id: '1',name: '敏捷广场'},
    {id: '2',name: '御溪谷'},
  ]),
  [deviceData, setDeviceData] = useState({
    name: '',
    code: '',
    msId: '23008978',
    placeId: '',
    type: 0,
  } as Data),
  [files, setFiles] = useState([]),
  [placeName, setPlacName] = useState(''),
  [placeValue, setPlacValue] = useState(1),
  [deviceTypeName, setDeviceTypeName] = useState('游乐车')

  useEffect(() => {

  },[deviceData])

  const onPlaceChange = (e) => {
    const value = parseInt(e && e.detail.value) || 0
    console.log(value)
    setPlacValue(value)
    if (value) {
      const place = places[value]
      setDeviceData({...deviceData, placeId: place.id})
      setPlacName(place && place.name || '')
    } else {
      // 还没有场地
    }
  }

  const onDeviceTypeChange = (e) => {
    const type = (parseInt(e && e.detail.value) || 0) as DeviceType
    setDeviceData({...deviceData, type})
    setDeviceTypeName(deviceTypes[type])
  }

  const handleNameChange = (e) => {
    setDeviceData({...deviceData, name: e})
  }
  const handleCodeChange = (e) => {
    setDeviceData({...deviceData, code: e})
  }

  return (
    <View>
      <AtForm>
        <View className='p-13 at-row at-row__justify--between at-row__align--center'>
          <Text className='font-size-16 gray-text-700'>设备唯一码</Text>
          <Text className='font-size-15 gray-text-500'>{deviceData.msId}</Text>
        </View>
        <View className='page-section m-flex items-center pr'>
            <View className='flex-1'>
              <Picker mode='selector' value={placeValue}  rangeKey='name' range={places} onChange={onPlaceChange}>
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
              <Picker mode='selector' value={deviceData.type}  range={deviceTypes} onChange={onDeviceTypeChange}>
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
              name='name'
              title='名称'
              type='text'
              placeholder='设备名称'
              value={deviceData.name}
              onChange={handleNameChange}
            />
          </View>
          <View>
            <AtInput
              clear
              name='code'
              title='编码'
              type='text'
              placeholder='设备编码'
              value={deviceData.code}
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
                files={files}
              />
            </View>
          </View>
          <View className='p-13 bottom-wrap'>
            <AtButton className='flex-1' type='primary'>绑定设备</AtButton>
          </View>
      </AtForm>
    </View>
  )
}

export default CarDetail
