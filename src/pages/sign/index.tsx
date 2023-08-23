import { AtForm, AtInput, AtButton } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { useEffect, useState, useCallback } from 'react';
import { AccountInfo, SignPropType } from 'types/user';

const Sign = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({})
  const [loading] = useState<boolean|undefined>(false)
  const handlePhoneChange = useCallback((e) => {
    setAccountInfo({...accountInfo, phone: e})
  }, [])

  const handleVerifyMail = () => {

  }
  const handleSign = () => {

  }

  const handleVerify = (type:SignPropType) => {
    const verifyFns = {
      phone: () => {
        const pattern = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g
        const bool = pattern.test(accountInfo.phone)
        console.log(bool)
      },
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
      <View className='bg-white p6'>
        <AtInput
          name='phone'
          title='手机号码'
          type='text'
          value={accountInfo.phone}
          onChange={handlePhoneChange}
          onBlur={handleVerify.bind(this, 'phone')}
        />
        <AtInput
          name='mail'
          title='邮箱'
          type='text'
          value={accountInfo.mail}
          onChange={handlePhoneChange}
        />
        <AtInput
          name='code'
          title='邮箱验证码'
          type='text'
          value={accountInfo.code}
          onChange={handlePhoneChange}
        >
          <View className='px-3' onClick={handleVerifyMail}>
           <Text className='link-text font-size-12'>发送短信验证码</Text>
          </View>
        </AtInput>
        <AtInput
          name='passwd'
          title='密码'
          type='text'
          value={accountInfo.passwd}
          onChange={handlePhoneChange}
        />
        <AtInput
          name='code'
          title='密码'
          type='text'
          value={accountInfo.rePwd}
          onChange={handlePhoneChange}
        />
      </View>

      <View className='submit bg-theme login-item px-13'>
        <AtButton
          className='mt-12'
          type='primary'
          loading={loading}
          onClick={() => {
            handleSign()
          }}>注册</AtButton>
      </View>
    </View>
  )
}

export default Sign
