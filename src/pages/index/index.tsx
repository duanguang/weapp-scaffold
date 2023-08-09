import { Component,PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import UserStore from '@/store/user.store';
import { Store } from '@/store/core.store'
import { AtAvatar } from 'taro-ui'

export default class Index extends Component<PropsWithChildren> {
  state = {
    carList: [
      {
        cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi4%2F400893004%2FO1CN01Hxp7Zt1Y3sSkAhPCg_%21%21400893004.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103865&t=a0af164da3ac8b07f3d4da08f3f91f5f',
        carNum: '267678',
        name: '挖掘机',
        online: 1
      },
      {
        cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01jDPJ7B2M45ZlPGjRg_%21%213174689773-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694103920&t=feca675376253504bda517889eda3262',
        carNum: '677899',
        name: '警车',
        online: 0
      },
      {
        cover: 'https://img12.360buyimg.com/n0/jfs/t1/24015/26/14026/112798/5ca42c95E8a8e8e0a/4d438883bdfc1fb7.jpg',
        carNum: '334234',
        name: '超级飞侠乐迪',
        online: 0
      },
    ]
  }

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
      <View className='index page'>
        <View className='m-flex items-center'>
          <View className='at-icon at-icon-map-pin gray-text-400 font-size-13'></View>
          <View className='at-col at-col-5 gray-text-400 font-size-12'>锐丰广场</View>
        </View>
        <View className='m-flex justify-between mt-6'>
          <View className='m-flex items-center'>
            <View className='font-size-15'>设备列表</View>
            <View className='font-size-12 gray-text-400'>/5</View>
          </View>
          <View className='at-icon at-icon-bullet-list font-size-16 gray-text-500'></View>
        </View>
        <View className=''>
          {
            this.state.carList.map((item) => {
              return (
                <View className='card m-flex'>
                  <AtAvatar image={item.cover}></AtAvatar>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
