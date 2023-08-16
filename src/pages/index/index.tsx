import { Component,PropsWithChildren } from 'react'
import { View, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'
import '../../app.less'
import UserStore from '@/store/user.store';
import { Store } from '@/store/core.store'
import { AtAvatar, AtTag } from 'taro-ui'
import * as api from '@/api/index'
import DropList from '@/components/base/drop-list'
import { bind,observer } from '@/store/core.store';
import PlaceStore from '@/store/place.store';
import * as path from '@/constants/route.config'


@bind({ store: UserStore })
@bind({ store: PlaceStore })
@observer
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

  getWechatToken () {
    api.getWechatToken()
    .then(res => {
      api.getwxacodeunlimit({token: res.data.accessToken as string, sence: 'deviceCode_865328068118396'})
    })
  }

  componentDidMount() {
    // api.createPlace()
    api.getPlaces().then(res => {
      console.log(res)
      if (res.data.code === '0000') this.props.store.setPlaces(res.data.data)
    })
  }

  componentWillUnmount() { }

  componentDidShow() {

    try {
      var value = Taro.getStorageSync('token')
      if (!value) {
        // Do something with return value
        Taro.navigateTo({
          url: path.LOGIN,
        })
        return
      }
    } catch (e) {
      const store = Store.getStore(UserStore)
      // Do something when catch error
      if (!store.token) {
        Taro.navigateTo({
          url: path.LOGIN,
        })
        return
      }
    }
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
        <DropList/>
        <View className='m-flex items-center white-text bg-theme p6'>
          <View className='font-size-13 pr-3'>锐丰广场</View>
          <View className='at-icon at-icon-chevron-down font-size-13'></View>
          <View className='search-wrap bg-white flex-1 ml-5 at-row at-row__justify--end at-row__align--center'>
              <View className='bg-theme small-btn white-text font-size-12 px-6 mx-3'>搜索</View>
          </View>
        </View>
        <View className='m-flex justify-between mt-6 px-6 items-center'>
          <View className='m-flex items-center'>
            <View className='font-size-15'>设备列表</View>
            <View className='font-size-12 gray-text-400'>/5</View>
          </View>
          <View
            className='at-icon at-icon-bullet-list font-size-20 gray-text-500'
            onClick={this.getWechatToken}
          >
           </View>
        </View>
        <View className='px-6'>
          {
            this.state.carList.map((item) => {
              return (
                <Navigator url='/packagea/pages/car-detail/index' hoverClass='navigator-hover'>
                  <View
                    className='card m-flex mt-8 items-center'
                  >
                    <AtAvatar size="large" image={item.cover}></AtAvatar>
                    <View className='ml-8 flex-1'>
                      <View className='font-size-16'>{item.name}</View>
                      <View className='mt-5'>
                        <AtTag
                          size='small'
                          name={item.carNum}
                          type='primary'
                          circle
                        >
                          编号：{item.carNum}
                        </AtTag>
                      </View>
                    </View>
                    <View className={`status ${item.online ? 'online': 'offline'} m-flex items-center justify-center`}>
                      <View className={`at-icon at-icon-${item.online ? 'check' : 'close'} font-size-13 white-text`}></View>
                    </View>
                  </View>
                </Navigator>
              )
            })
          }
        </View>
      </View>
    )
  }
}
