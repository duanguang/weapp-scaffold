import { Component,PropsWithChildren } from 'react'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View,Button } from '@tarojs/components'
import './index.less';
import Taro from '@tarojs/taro';
import { bind,observer } from '@/store/core.store';
import UserStore from '@/store/user.store';
import * as api from '@/api/index'
import { USER_ACCESS_TOKEN, USER_REFRESH_ACCESS_TOKEN } from '@/constants/storage.config';
import { ROUTERS } from '@/routers';

const baseCls = `legions-login`;
interface IProps{
    store:UserStore
}
@bind({ store: UserStore })
@observer
export default class Index extends Component<IProps> {
    state = {
      phone: '13838382438',
      pwd: '789234kliweo',
      loading: false
    }
    handleUserChange = () => {
    }
    handleLogin = () => {
      this.setState({loading: true})
      api.login({...this.state}).then(res => {
        this.setState({loading: true})
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })

        Taro.setStorage({
          key: USER_ACCESS_TOKEN,
          data: res.data.accessToken
        })
        Taro.setStorage({
          key: USER_REFRESH_ACCESS_TOKEN,
          data: res.data.refreshToken
        })

        this.props.store.setToken(res.data.accessToken)
        this.props.store.setFreshToken(res.data.refreshToken)
        setTimeout(() => {
          Taro.switchTab({
            url: ROUTERS.home
          })
        }, 1000)
      }).catch(err => {
        console.log(err)
        this.setState({loading: true})
        Taro.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000
        })
      })
    }
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
                          placeholder='账号'
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
                      <Button loading={this.state.loading} onClick={() => {
                        this.handleLogin()
                      }}>登录</Button>
                    </View>
                </View>

                </View>
            </View>

        )
    }
}
