import { View, Text, RadioGroup, Radio, Label } from '@tarojs/components'
import '../../app.less'
import { useState, useCallback } from 'react';

const MRadio = (props) => {
  const {onChange, data} = props
  const [selected, setSelected] = useState('')
  const onRadioChange = useCallback((e) => {
    setSelected(e.detail.value)
    onChange(e)
  }, [])
  return (
    <RadioGroup className='m-flex flex-1' onChange={onRadioChange}>
      {data.map((item, i) => {
        return (
          <Label className='radio-list__label font-size-14 ml-13 flex-1 pr' for={i} key={i}>
            <View className='pa check-radio-wrap m-flex items-center'>
              <View className={`check-wrap check-radio-size-small m-flex items-center mr-6 ${selected == item.value ? 'm-checked' : ''}`}>
                {selected == item.value && <View className='at-icon at-icon-check'></View>}
              </View>
              <Text>{item.text}</Text>
            </View>
            <Radio className='radio-list__radio opacity-0' value={item.value} >{item.text}</Radio>
          </Label>
        )
      })}
    </RadioGroup>
  )
}

export default MRadio