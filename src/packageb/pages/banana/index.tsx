import { Component } from 'react'
import { View,Text } from '@tarojs/components'
import Info from '@/components/info/index'
import Label from '@/components/label/index'
export default class Index extends Component {

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='banana'>
                <Text>Banana!</Text>
                <Label text='国产' />
                <Info text='好吃' />
            </View>
        )
    }
}