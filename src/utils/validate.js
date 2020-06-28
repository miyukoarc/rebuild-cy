/*
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-28 16:12:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\utils\validate.js
 */ 
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 验证手机号码格式
export function isMobilePhone(mobile) {
  return mobile && /(^13\d{9}$)|(^14)[5,7,9]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^16\d{9}$)|(^17)[0,1,3,5,6,7,8]\d{8}$|(^18\d{9}$)|(^19\d{9}$)/.test(mobile)
}