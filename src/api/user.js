/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:31:42
 * @LastEditTime : 2019-12-30 16:09:07
 * @LastEditors  : Please set LastEditors
 */
import request from '@/utils/request'
// import qs from 'qs'

export function login(params) {
  const data = JSON.stringify(params)
  return request({
    url: '/Accounts/Login',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function getInfo() {
  return request({
    url: '/Accounts/Profile',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getRouter() {
  return request({
    url: '/Home/GetClientsDataJson',
    method: 'get'
  })
}

// 获取验证文字和图片
export function getCodeImage() {
  return request({
    url: '/Accounts/VCodeImage',
    method: 'get'
  })
}

// 验证坐标
export function codeCheck(data) {
  return request({
    url: '/Accounts/VCodeCheck',
    method: 'post',
    data
  })
}

// 修改密码
export function changePassword(data) {
  return request({
    url: '/Accounts/ChangePassword',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 获取系统配置
export function getSystemInfo() {
  return request({
    url: '/Accounts/GetSystemInfo',
    method: 'get'
  })
}
