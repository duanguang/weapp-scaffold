import { Component,PropsWithChildren } from 'react'
import { View,Text,Image,Button } from '@tarojs/components'
import './index.less';
import descLog from "@/assets/image/desc-bg.png";
// import { bind, observer } from 'brain-store-react';
// import UserInfoStore from '@/store/user.store';
import Taro from '@tarojs/taro';

const baseCls = `legions-login`;
interface IProps{
    // store:UserInfoStore
}
// @bind({ store: UserInfoStore })
// @observer
export default class Index extends Component<PropsWithChildren&IProps> {

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        // console.log(this.props.store)
        return (
            <View className={baseCls}>
                <Text className={`text`}>—&nbsp;&nbsp;&nbsp;登录集成平台&nbsp;&nbsp;&nbsp;—</Text>
                <View className={`desc`}>
                    <Image className='img'  src={ descLog}></Image>
                </View>
                <View className='submit'> <Button onClick={() => {
                    // this.props.store.setName('xiaowang')
                    Taro.navigateTo({
                        url:'/pages/index/index'
                    })
                }}>Gitlab授权登录</Button></View>
            </View>
        )
    }
}
