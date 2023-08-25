import { AtMessage, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { useEffect, useState, useCallback } from 'react';
import { ForgetPwdData, ForgetPwdPropType, VerfiyForgetPwdData } from 'types/user';
import { userApi } from '@/api/index'
import { VerifyPassword, VerifyTips, mailReg } from '@/constants/index'
import Taro from "@tarojs/taro";
import { ROUTERS } from '@/routers';
import { COUNTDOWN_SECONDS } from '@/constants/countdown.config';

type TipType =  "info" | "success" | "error" | "warning" | undefined
interface InfoData {
  text?: string,
  type: ForgetPwdPropType,
  valid?: boolean,
  tipType?: TipType
}

const Sign = () => {
  const verifyDataCopy:VerfiyForgetPwdData = {} as VerfiyForgetPwdData
  const [accountInfo, setAccountInfo] = useState<ForgetPwdData>({} as ForgetPwdData)
  const [verfiyForgetPwdData, setVerfiyForgetPwdData] = useState<VerfiyForgetPwdData>({} as VerfiyForgetPwdData)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [verifyLoading, setVerifyLoading] = useState<boolean|undefined>(false)

  const handleChange = useCallback((type, e) => {
    let _accountInfo = {...accountInfo}
    _accountInfo[type] = e
    if (verfiyForgetPwdData[type]?.valid) handleVerifyData({type, valid: false, text: ''})
    setAccountInfo(_accountInfo)
  }, [accountInfo, setAccountInfo])

  const handleVerifyMail =  async() => {
    setVerifyLoading(true)
    const res = await userApi.verifyMail({
      mail: accountInfo.mail,
      type: 1,
      pwd: VerifyPassword
    })
    setVerifyLoading(false)

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
        if (seconds<=0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
  const handleSubmit = async () => {
    resetVerifyData()
    
    // 验证表单
    const hasErr = ['mail', 'code', 'passwd', 'rePwd'].some((key:ForgetPwdPropType) => {
      return handleVerify(key)
    })
    if (hasErr) return
    setLoading(true)
    const res = await userApi.forget(accountInfo)
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
  }

  const resetVerifyData = () => {
    ['mail', 'passwd', 'rePwd', 'code',].forEach((type:ForgetPwdPropType) => {
      handleVerifyData({type, valid: false, text: ''})
    })
  }

  const handleVerifyData = (data:InfoData) => {
    const {type, text, valid = true, tipType} = data

    verifyDataCopy[type]= {
      text: text || '', valid
    }
    setVerfiyForgetPwdData(verifyDataCopy)

    if (valid) {
      Taro.atMessage({
        'message': text || '',
        'type': tipType,
        duration: 1800
      })
    }
  }

  const handleVerify = (type:ForgetPwdPropType) => {
    let text:string = '', tipType = "warning" as TipType, valid:boolean = false
    const { mail, passwd, rePwd, code } = accountInfo
    const verifyFns = {
      mail: () => {
        console.log('正则值',mailReg, mailReg.test(mail), mail)
        console.log('正则值',mailReg, mailReg.test(mail), mail)
        console.log('正则值',mailReg, mailReg.test(mail), mail)
        const testVal = mailReg.test(mail)
        if (!mail) {
          text = VerifyTips.NO_MAIL
          tipType = "warning"
          valid = true
        } else if (!testVal) {
          console.log('邮箱不正确了', testVal)
          text = VerifyTips.ERR_FMT_MAIL
          tipType = 'error'
          valid = true
        }
      },
      code: () => {
        if (!code) {
          text = VerifyTips.NO_VERIFY_CODE
          tipType = "warning"
          valid = true
        }
      },
      passwd: () => {
        if (!passwd) {
          text = VerifyTips.NO_PWD
          tipType = "warning"
          valid = true
        } else if (passwd.length < 6 || passwd.length > 30) {
          text = VerifyTips.ERR_FMT_PWD
          tipType = 'error'
          valid = true
        }
      },
      rePwd: () => {
        if (!rePwd) {
          text = VerifyTips.NO_REPWD
          tipType = "warning"
          valid = true
        } else if (passwd !== rePwd) {
          text = VerifyTips.DIFF_PWD
          tipType = 'error'
          valid = true
        }
      }
    }
    verifyFns[type]()
    //处理提示数据
    handleVerifyData({type, valid, text, tipType })
    return valid
  }

  return (
    <View>
      <AtMessage/>
      <View className='bg-white p6 mt-12'>
      <AtInput
          name='mail'
          title='邮箱'
          clear
          error={verfiyForgetPwdData.mail?.valid}
          value={accountInfo.mail}
          onChange={(e) => {
            handleChange('mail', e)
          }}
        />
        <AtInput
          name='passwd'
          clear
          title='密码'
          type='password'
          error={verfiyForgetPwdData.passwd?.valid}
          value={accountInfo.passwd}
          onChange={(e) => {
            handleChange('passwd', e)
          }}
        />
        <AtInput
          name='rePwd'
          title='确认密码'
          type='password'
          clear
          error={verfiyForgetPwdData.rePwd?.valid}
          value={accountInfo.rePwd}
          disabled={!accountInfo.passwd}
          onChange={(e) => {
            handleChange('rePwd', e)
          }}
        />
        <AtInput
          name='code'
          title='验证码'
          type='text'
          clear
          error={verfiyForgetPwdData.code?.valid}
          value={accountInfo.code}
          onChange={(e) => {
            handleChange('code', e)
          }}
        >
          {!countdown ? 
            <AtButton size="small" loading={verifyLoading} className='px-3' onClick={handleVerifyMail}>
              发送邮箱验证码
            </AtButton> :
            (<Text className='gray-text-300 font-size-12'>{countdown}s后再试</Text>)
          }
        </AtInput>
      </View>

      <View className='submit px-13'>
        {loading==true}
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
