import { AtMessage, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { useEffect, useState, useCallback } from 'react';
import { AccountInfo, SignPropType, VerfiyAccountInfo } from 'types/user';
import { userApi } from '@/api/index'
import { VerifyPassword, VerifyTips, phoneReg, mailReg } from '@/constants/index'
import Taro, { getCurrentInstance, useDidShow, useLoad } from "@tarojs/taro";
import { ROUTERS } from '@/routers';

type TipType =  "info" | "success" | "error" | "warning" | undefined
interface InfoData {
  text?: string,
  type: SignPropType,
  valid?: boolean,
  tipType?: TipType
}

const Sign = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({phone: '15802685782'} as AccountInfo)
  const [verfiyAccountInfo, setVerfiyAccountInfo] = useState<VerfiyAccountInfo>({} as VerfiyAccountInfo)
  const [loading] = useState<boolean|undefined>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [btnDisable, setBtnDisable] = useState<boolean>(true)
  const [verifyLoading, setVerifyLoading] = useState<boolean|undefined>(false)
  const handleChange = useCallback((type, e) => {
    let _accountInfo = {...accountInfo}
    _accountInfo[type] = e
    setAccountInfo(_accountInfo)
  }, [accountInfo, setAccountInfo])

  const handleVerifyMail =  async() => {
   setVerifyLoading(true)
   const res = await userApi.verifyMail({
      mail: accountInfo.mail,
      type: 0,
      pwd: VerifyPassword
    })
    setVerifyLoading(false)
    if (res?.data) {
      Taro.atMessage({
        'message': '发送成功',
        'type': 'success',
        duration: 2000
      })
      let seconds = 20
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
  const handleSign = async () => {
    const res = await userApi.sign(accountInfo)
    console.log(res)
    if (res?.data) {
      Taro.atMessage({
        'message': '注册成功',
        'type': 'success',
        duration: 1500
      })
      setTimeout(() => {
        Taro.reLaunch({ url: ROUTERS.login });
      }, 1500)
    }
  }

  const handleVerifyData = (data:InfoData) => {
    const {type, text, valid = true, tipType} = data
    const info = {...verfiyAccountInfo}

    info[type]= {
      text: text || '', valid
    }
    setVerfiyAccountInfo(info)

    if (valid) {
      Taro.atMessage({
        'message': text || '',
        'type': tipType,
        duration: 1800
      })
    }
  }

  const handleVerify = (type:SignPropType) => {
    let text:string = '', tipType = "warning" as TipType, valid:boolean = false
    const { phone, mail, passwd, rePwd, code } = accountInfo
    const verifyFns = {
      phone: () => {
        if (!phone) {
          text = VerifyTips.NO_PHONE
          tipType = "warning"
          valid = true
        } else if (!phoneReg.test(phone)) {
          text = VerifyTips.ERR_FMT_PHONE
          tipType = 'error'
          valid = true
        }
        // handleVerifyData({type: 'phone', valid: false, text, tipType })
      },
      mail: () => {
        if (!mail) {
          text = VerifyTips.NO_MAIL
          tipType = "warning"
          valid = true
        } else if (!mailReg.test(mail)) {
          text = VerifyTips.ERR_FMT_MAIL
          tipType = 'error'
          valid = true
        }
      },
      code: () => {

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
    handleVerifyData({type, valid, text, tipType })
    
  }
  
  useEffect(() => {
    const avaliable = ['phone', 'mail', 'code', 'passwd', 'rePwd'].every(key => {
      return !verfiyAccountInfo[key]?.valid && accountInfo[key]
    })

    console.log(avaliable)
  
    setBtnDisable(!avaliable)

  }, [setBtnDisable, verfiyAccountInfo, accountInfo])

  return (
    <View>
      <AtMessage/>
      <View className='bg-white p6 form-content-wrap mt-12'>
        <AtInput
          error={verfiyAccountInfo.phone?.valid}
          name='phone'
          title='手机号码'
          type='phone'
          clear
          value={accountInfo.phone}
          onChange={(e) => {
            handleChange('phone', e)
          }}
          onBlur={()=> {
            handleVerify('phone')
          }}
        />
        <AtInput
          name='mail'
          title='邮箱'
          clear
          error={verfiyAccountInfo.mail?.valid}
          value={accountInfo.mail}
          onChange={(e) => {
            handleChange('mail', e)
          }}
          onBlur={()=> {
            handleVerify('mail')
          }}
        />
        <AtInput
          name='passwd'
          clear
          title='密码'
          type='password'
          error={verfiyAccountInfo.passwd?.valid}
          value={accountInfo.passwd}
          onChange={(e) => {
            handleChange('passwd', e)
          }}
          onBlur={()=> {
            handleVerify('passwd')
          }}
        />
        <AtInput
          name='rePwd'
          title='确认密码'
          type='password'
          clear
          error={verfiyAccountInfo.rePwd?.valid}
          value={accountInfo.rePwd}
          disabled={!accountInfo.passwd}
          onChange={(e) => {
            handleChange('rePwd', e)
          }}
          onBlur={()=> {
            handleVerify('rePwd')
          }}
        />
        <AtInput
          name='code'
          title='验证码'
          type='text'
          clear
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
        <AtButton
          className='mt-12'
          type='primary'
          loading={loading}
          disabled = {btnDisable}
          onClick={() => {
            handleSign()
          }}>注册</AtButton>
      </View>
    </View>
  )
}

export default Sign
