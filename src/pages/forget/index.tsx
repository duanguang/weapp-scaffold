import { AtMessage,AtInput,AtButton } from 'taro-ui'
import { View,Text } from '@tarojs/components'
import { useEffect,useState,useCallback } from 'react';
import { ForgetPwdData,ForgetPwdPropType,VerfiyForgetPwdData } from 'types/user';
import { userApi } from '@/api/index'
import { VerifyPassword,VerifyTips } from '@/constants/index'
import Taro from "@tarojs/taro";
import { ROUTERS } from '@/routers';
import { COUNTDOWN_SECONDS } from '@/constants/countdown.config';
import './index.less'

type TipType = "info" | "success" | "error" | "warning" | undefined

export interface IValidRes {
  mail: boolean;
  code: boolean;
  passwd: boolean;
  rePwd: boolean;
}
function validateEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
const Sign = () => {

  const [account,setAccount] = useState<ForgetPwdData>({
    code: '',
    mail: '',
    rePwd: '',
    passwd: ''
  })
  const validCopy =  {
    code: false,
    mail: false,
    rePwd: false,
    passwd: false
  };
  const [valid,setValid] = useState<IValidRes>(validCopy)
  const [loading,setLoading] = useState<boolean | undefined>(false)
  const [verify_state,setVerifyState] = useState<boolean | undefined>(false)
  const [countdown,setCountdown] = useState<number>(0)
  const handleChange = useCallback((type: 'mail' | 'passwd' | 'rePwd' | 'code',val: string) => {
    const value = { ...account };
    value[type] = val;
    console.log('change')
    setAccount({ ...value });
  },[account])

  const handleVerifyMail = async () => {
    const validCopy = {code: false,mail: false,rePwd: false,passwd: false}
    const {mail} = account
    if (!mail) {
      Taro.atMessage({
        message: VerifyTips.NO_MAIL,
        type: 'error',
        duration: 2000,
      })
      validCopy.mail = true;
      setValid(validCopy);
      return
    }
    if (!validateEmail(mail)) {
      Taro.atMessage({
        message: VerifyTips.ERR_FMT_MAIL,
        type: 'error',
        duration: 2000,
      })
      validCopy.mail = true;
      setValid(validCopy);
      return
    }
    
    setVerifyState(true)
    const res = await userApi.verifyMail({
      mail: account.mail,
      type: 1,
      pwd: VerifyPassword
    })
    setVerifyState(false)
    if (res?.data) {
      Taro.atMessage({
        'message': '发送成功',
        'type': 'success',
        duration: 2000
      })
      let seconds = COUNTDOWN_SECONDS
      setCountdown(seconds)
      let timer = setInterval(() => {
        seconds = seconds - 1
        setCountdown(seconds)
        if (seconds <= 0) {
          clearInterval(timer)
        }
      },1000)
    }
  }
  const handleSubmit = useCallback(async () => {
    const validCopy = {code: false,mail: false,rePwd: false,passwd: false}
    
    const {mail, code, passwd, rePwd} = account
    if (!mail) {
      Taro.atMessage({
        message: VerifyTips.NO_MAIL,
        type: 'error',
        duration: 2000,
      })
      validCopy.mail = true;
      setValid(validCopy);
      return
    }
    if (!validateEmail(mail)) {
      Taro.atMessage({
        message: VerifyTips.ERR_FMT_MAIL,
        type: 'error',
        duration: 2000,
      })
      validCopy.mail = true;
      setValid(validCopy);
      return
    }
    if (!passwd) {
      Taro.atMessage({
        message: VerifyTips.NO_PWD,
        type: 'error',
        duration: 2000,
      })
      validCopy.passwd = true;
      setValid(validCopy);
      return
    }
    if (passwd.length < 6 || passwd.length > 30) {
      Taro.atMessage({
        message: VerifyTips.ERR_FMT_PWD,
        type: 'error',
        duration: 2000,
      })
      validCopy.passwd = true;
      setValid(validCopy);
      return
    }
    if (!rePwd) {
      Taro.atMessage({
        message: VerifyTips.NO_REPWD,
        type: 'error',
        duration: 2000,
      })
      validCopy.rePwd = true;
      setValid(validCopy);
      return
    }
    if (passwd !== rePwd) {
      Taro.atMessage({
        message: VerifyTips.DIFF_PWD,
        type: 'error',
        duration: 2000,
      })
      validCopy.rePwd = true;
      setValid(validCopy);
      return
    }

    if (!code) {
      Taro.atMessage({
        message: VerifyTips.NO_VERIFY_CODE,
        type: 'error',
        duration: 2000,
      })
      validCopy.code = true;
      setValid(validCopy);
      return
    }

    setLoading(true)
    const res = await userApi.forget(account)
    setLoading(false)
    if (res?.data) {
      Taro.atMessage({
        'message': '密码重置成功',
        'type': 'success',
        duration: 1500
      })
      setTimeout(() => {
        Taro.reLaunch({ url: ROUTERS.login });
      }, 1500)
    }
  },[account])



  return (
    <View>
      <AtMessage />
      <View className='bg-white p6 mt-12'>
        <AtInput
          name='mail'
          title='邮箱'
          clear
          error={valid.mail}
          value={account.mail}
          onChange={(val) => {
            handleChange('mail',val.toString())
          }}
        />
        <AtInput
          name='passwd'
          clear
          title='密码'
          type='password'
          error={valid.passwd}
          placeholder='请输入6-30位字符密码'
          value={account.passwd}
          onChange={(val) => {
            handleChange('passwd',val.toString())
          }}
        />
        <AtInput
          name='rePwd'
          title='确认密码'
          placeholder='请输入6-30位字符密码'
          type='password'
          clear
          error={valid.rePwd}
          value={account.rePwd}
          disabled={!account.passwd}
          onChange={(e) => {
            handleChange('rePwd',e.toString())
          }}
        />
        <AtInput
          name='code'
          title='验证码'
          type='text'
          clear
          error={valid.code}
          value={account.code}
          onChange={(e) => {
            handleChange('code',e.toString())
          }}
        >
          {!countdown ?
            <AtButton size="small" loading={verify_state} className='px-3 verify-btn' onClick={handleVerifyMail}>
              发送邮箱验证码
            </AtButton> :
            (<Text className='gray-text-300 font-size-12'>{countdown}s后再试</Text>)
          }
        </AtInput>
      </View>

      <View className='submit px-13'>
        {loading == true}
        <AtButton
          className='mt-12'
          type='primary'
          loading={loading}
          onClick={() => {
            handleSubmit()
          }}>确定</AtButton>
      </View>
    </View>
  )
}

export default Sign
