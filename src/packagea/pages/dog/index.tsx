import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import '../../common/index.less'
import Info from '@/components/info/index'

export default class Index extends Component {

  componentWillMount () {
   }

  componentDidMount () {

   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='dog detail'>
        <Text>Dog!</Text>
        <Text>编号</Text>
        <Info text='吃饭' />
      </View>
    )
  }
}