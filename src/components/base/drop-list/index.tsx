import Taro from '@tarojs/taro';
import {  View, Text, Picker, ScrollView } from '@tarojs/components'
import './index.less'

function DropList () {
  return (
    <View className='bg-white w100 drop-list-wrap pd-13'>
      <Text>我是下拉列表</Text>
    </View>
  )

}

export default DropList
