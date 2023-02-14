import { Component,PropsWithChildren } from 'react'
import { View,Text,Navigator } from '@tarojs/components'
import './index.less'
import UserStore from '@/store/user.store';
import { Store } from '@/store/core.store'
export default class Index extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() {
    
  }

  componentWillUnmount() { }

  componentDidShow() { 
  }

  componentDidHide() { }

  render() {
    
    const store = Store.getStore(UserStore)
    console.dir(store)
    return (
      <View className='index'>
        <Navigator url='/packagea/pages/dog/index' hoverClass='navigator-hover'>狗</Navigator>
        <Navigator url='/packageb/pages/banana/index' hoverClass='navigator-hover'>香蕉</Navigator>
        <Text onClick={() => {
          
        }}>Hello world!</Text>
      </View>
    )
  }
}
