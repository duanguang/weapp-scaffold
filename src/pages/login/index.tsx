import { Component,PropsWithChildren } from 'react'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View,Text,Image,Button, Input } from '@tarojs/components'
import './index.less';
import Taro from '@tarojs/taro';
import { bind,observer } from '@/store/core.store';
import UserStore from '@/store/user.store';
import * as api from '@/api/index'
import * as path from '@/constants/route.config'

const baseCls = `legions-login`;
interface IProps{
    store:UserStore
}
@bind({ store: UserStore })
@observer
export default class Index extends Component<PropsWithChildren&IProps> {
    state = {
      phone: '13838382438',
      pwd: '789234kliweo'
    }

    handleUserChange = () => {

    }

    handleLogin = () => {
      api.login({...this.state}).then(res => {
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })

        Taro.setStorage({
          key: 'token',
          data: res.data.accessToken
        })
        Taro.setStorage({
          key: 'refresh-token',
          data: res.data.refreshToken
        })

        this.props.store.setToken(res.data.accessToken)
        this.props.store.setFreshToken(res.data.refreshToken)
        setTimeout(() => {
          Taro.switchTab({
            url: path.HOME
          })
        }, 1000)
      }).catch(err => {
        console.log(err)
        Taro.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000
        })
      })
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className={baseCls}>
                <View className='login-bg'></View>
                <View className='login-content-wrap'>

                  <View className='login-content bg-white'>
                    <View className={`login-item`}>
                      <AtInput
                          name='user'
                          title='账号'
                          type='text'
                          placeholder=''
                          value={this.state.phone}
                          onChange={this.handleUserChange.bind(this)}
                        />
                    </View>
                    <View className={`login-item`}>
                      <AtInput
                          name='password'
                          title='密码'
                          type='password'
                          placeholder=''
                          value={this.state.pwd}
                          onChange={this.handleUserChange.bind(this)}
                        />
                    </View>
                    <View className='submit bg-theme login-item'>
                      <Button onClick={() => {
                        // this.props.store.setName('xiaowang')
                        // Taro.navigateTo({
                        //     url:'/pages/index/index'
                        // })
                        this.handleLogin()
                    }}>登录</Button></View>
                  </View>
                </View>
            </View>

        )
    }
}
