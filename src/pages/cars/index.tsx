import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import './index.less'
import { customTabBar } from '@/hooks/tabbar'


export default function cars() {
  customTabBar(2)
  useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page
    Taro.getTabBar(pageObj)
  })
  return  <View className='index'>
  <View className='at-row at-row--wrap'>
    <View className='at-col at-col-4'>A</View>
    <View className='at-col at-col-4'>B</View>
    <View className='at-col at-col-4'>C</View>
    <View className='at-col at-col-4'>D</View>
    <View className='at-col at-col-4'>E</View>
  </View>
</View>
}
