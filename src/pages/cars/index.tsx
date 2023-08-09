import { Component,PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import UserStore from '@/store/user.store';
import { Store } from '@/store/core.store'
export default class Index extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() {
        // 页面 onShow 时
    const pageObj = Taro.getCurrentInstance().page
    Taro.getTabBar(pageObj)
  }

  componentDidHide() { }

  render() {

    const store = Store.getStore(UserStore)
    console.dir(store)
    return (
      <View className='index'>
        <View className='at-row at-row--wrap'>
          <View className='at-col at-col-4'>A</View>
          <View className='at-col at-col-4'>B</View>
          <View className='at-col at-col-4'>C</View>
          <View className='at-col at-col-4'>D</View>
          <View className='at-col at-col-4'>E</View>
        </View>
      </View>
    )
  }
}
