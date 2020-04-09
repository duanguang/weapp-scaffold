import get from 'lodash/get'

/**
 *安全访问对象属性
 *
 * @export
 * @param {*} defaultValue 默认 必填
 * @param {*} path The path of the property to get.
 * @param {*} object The object to query. 目标对象
 * @returns
 */
export function getProperty(defaultValue,path,object){  
  return get(object,path,defaultValue)
}