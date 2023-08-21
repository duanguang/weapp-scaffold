import Taro,{ useDidShow } from '@tarojs/taro'
import './index.less'
import { customTabBar } from '@/hooks/tabbar'
import { View,Text } from '@tarojs/components'
import { AtList,AtListItem, AtButton } from 'taro-ui'
import { Store, observer } from '@/store/core.store';
import UserStore from '@/store/user.store'
import { ROUTERS } from '@/routers'
const Member = observer(() => {
  customTabBar(2);
  const store = Store.getStore(UserStore);
  useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page
    Taro.getTabBar(pageObj)
    store.setUser();
  })
  return <View>
    <View className='bg-white at-row px-13 at-row__align--center at-row__justify--between'>
    </View>
    <AtList>
      <AtListItem title='昵称' note={store.user.userNick} />
      <AtListItem title='角色' note={store.user.userRole?.roleName} />
      <AtListItem title='状态' note={store.user.status===0?'正常':'封禁'} />
      <AtListItem title='手机号' note={store.user.phone} />
      <AtListItem title='注册时间' note={store.user.registTime}  />
    </AtList>
    <View className='p-13'>
      <AtButton type='secondary' onClick={() => {
        store.loginout();
        Taro.redirectTo({url: ROUTERS.login})
      }} className='detail-item'>
        <Text className='font-size-16'>退出登录</Text>
      </AtButton>
    </View>
  </View>
})
export default Member
