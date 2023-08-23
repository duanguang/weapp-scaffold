import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { useEffect, useState, useCallback } from 'react';
import { AccountInfo, SignPropType } from 'types/user';
import { VerifyInfo } from 'types/verify'
import { userApi } from '@/api/index'
import { VerifyPassword } from '@/constants/index'


const Sign = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({phone: '15802685782'} as AccountInfo)
  const [phoneVerfiyInfo, setPhoneVerfiyInfo] = useState<VerifyInfo>({} as VerifyInfo)
  const [loading] = useState<boolean | undefined>(true)
  const [btnDisable] = useState<boolean>(false)
  const handleChange = useCallback((type, e) => {
    let _accountInfo = {...accountInfo}
    _accountInfo[type] = e
    setAccountInfo(_accountInfo)
  }, [accountInfo, setAccountInfo])

  const handleVerifyMail =  async() => {
   const res = await userApi.verifyMail({
      mail: accountInfo.mail,
      type: 1,
      pwd: VerifyPassword
    })

    console.log(res)
  }
  const handleSign = async () => {
    const res = await userApi.sign(accountInfo)
    console.log(res)
  }

  const handleVerify = (type:SignPropType) => {
    const verifyFns = {
      mail: () => {

      },
      code: () => {

      },
      passwd: () => {

      },
      rePwd: () => {

      }
    }
    verifyFns[type]()
  }

  return (
    <View>
      <View className='bg-white p6 mt-12'>
        <AtInput
          name='mail'
          title='邮箱'
          type='text'
          value={accountInfo.mail}
          onChange={(e) => {
            handleChange('mail', e)
          }}
        />
        <AtInput
          name='passwd'
          title='密码'
          type='text'
          value={accountInfo.passwd}
          onChange={(e) => {
            handleChange('passwd', e)
          }}
        />
        <AtInput
          name='rePwd'
          title='确认密码'
          type='text'
          value={accountInfo.rePwd}
          onChange={(e) => {
            handleChange('rePwd', e)
          }}
        />
        <AtInput
          name='code'
          title='验证码'
          type='text'
          value={accountInfo.code}
          onChange={(e) => {
            handleChange('code', e)
          }}
        >
          <View className='px-3' onClick={handleVerifyMail}>
           <Text className='link-text font-size-12'>发送邮箱验证码</Text>
          </View>
        </AtInput>
      </View>

      <View className='submit px-13'>
        <AtButton
          className='mt-12 at-button--disabled'
          type='primary'
          loading={loading}
          disabled = {btnDisable}
          onClick={() => {
            handleSign()
          }}>确定</AtButton>
      </View>
    </View>
  )
}

export default Sign
