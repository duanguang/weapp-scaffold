import { Component,PropsWithChildren } from 'react'
import { AtMessage, AtInput, AtButton } from 'taro-ui'
import { View, Text, Navigator } from '@tarojs/components'
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
      phone: '',
      pwd: '',
      loading: false,
      pwdVisible: false,
    }
    // state = {
    //   phone: '13838382438',
    //   pwd: '789234kliweo',
    //   loading: false
    // }
    setPwdVisible = () => {
      this.setState({pwdVisible: !this.state.pwdVisible})
    }
    handleUserChange = (e) => {
      console.log(e)
      this.setState({phone: e})
    }
    handlePwdChange = (e) => {
      this.setState({pwd: e})
    }
    handleLogin = async () => {
      if (!this.state.phone) {
        Taro.atMessage({
          'message': '请输入手机号',
          'type': 'warning',
          duration: 1800
        })
        return
      }
      if (!this.state.pwd) {
        Taro.atMessage({
          'message': '请输入密码',
          'type': 'warning',
          duration: 1800
        })
        return
      }

      this.setState({loading: true})
      const res = await api.login({...this.state})
      this.setState({loading: false})
      if (res?.data) {
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
  
        Taro.setStorage({
          key: USER_ACCESS_TOKEN,
          data: res?.data?.accessToken
        })
        Taro.setStorage({
          key: USER_REFRESH_ACCESS_TOKEN,
          data: res?.data?.refreshToken
        })
  
        this.props.store.setToken(res?.data?.accessToken)
        this.props.store.setFreshToken(res?.data?.refreshToken)
        setTimeout(() => {
          Taro.switchTab({
            url: ROUTERS.home
          })
        }, 1000)
      }
    }
    render() {
        return (
            <View className={baseCls}>
              <AtMessage/>
              <View>
                <View className='login-bg'></View>
                <View className='login-content-wrap'>
                  <View className='login-content bg-white'>
                    <View className={`login-item`}>
                      <AtInput
                          name='user'
                          title='账号'
                          type='text'
                          placeholder='输入手机号'
                          value={this.state.phone}
                          onChange={this.handleUserChange}
                        />
                    </View>
                    <View className={`login-item`}>
                      <AtInput
                          name='password'
                          title='密码'
                          type={this.state.pwdVisible ? 'text': 'password'}
                          placeholder='输入密码'
                          value={this.state.pwd}
                          onChange={this.handlePwdChange}
                      >
                        <View className='pr' onClick={this.setPwdVisible}>
                          <View className='at-icon at-icon-eye gray-text-400'></View>
                          {!this.state.pwdVisible && <View className='close-line pa'></View>}
                        </View>
                      </AtInput>
                    </View>
                    <View className='m-flex justify-between login-item'>
                      <View className='flex-1'></View>
                      <Navigator url="/pages/forget/index">
                        <Text className='font-size-14 link-text'>忘记密码</Text>
                      </Navigator>
                    </View>
                    <View className='submit login-item'>
                      <AtButton type='primary' loading={this.state.loading} onClick={() => {
                        this.handleLogin()
                      }}>登录</AtButton>
                    </View>
                    <View className='text-center login-item'>
                      <Navigator url="/pages/sign/index">
                        <Text className='px-6 font-size-14 link-text'>注册新账号</Text>
                      </Navigator>
                    </View>
                </View>

                </View>
              </View>
              <View className='text-center bottom-wrap p-13'>
                <View className='gray-text-500 font-size-13'>服务全球游乐商户    打造专属物联网方案</View>
                <View className='gray-text-300 font-size-12'>深圳市福美慧科技有限公司</View>
              </View>
            </View>

        )
    }
}
