
import Taro from '@tarojs/taro'
export function setStorageSync(key,value){
    Taro.setStorageSync(key, value)
}
export function getStorageSync(key){
   return Taro.getStorageSync(key)
}
export function removeStorageSync(key){
    Taro.removeStorageSync(key)
}