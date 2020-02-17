/*
 * @Author: your name
 * @Date: 2019-11-12 17:06:19
 * @LastEditTime: 2019-12-17 14:42:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bpsp-ui\src\api\system\com.js
 */

import request from '@/utils/request'
// 获取人员列表
export function getStaffsData(params) {
  return request({
    url: '/System/Companys/GetUserlistBycomcode',
    method: 'get',
    params
  })
}

// 获取车辆列表
export function getCarData(params) {
  return request({
    url: '/System/Companys/GetCllistBycomcode',
    method: 'get',
    params
  })
}

// 获取项目列表
export function getProjectData(params) {
  return request({
    url: '/System/Companys/GetProjectListBycomcode',
    method: 'get',
    params
  })
}

// 获取库区列表
export function getKuquData(params) {
  return request({
    url: '/System/Companys/GetKqListBycomcode',
    method: 'get',
    params
  })
}

// 获取库房列表
export function getKufangData(params) {
  return request({
    url: '/System/Companys/GetCkListBycomcode',
    method: 'get',
    params
  })
}

// 获取公司信息
export function getSysCompanyByCode(params) {
  return request({
    url: '/System/Companys/GetSysCompanyByCode',
    method: 'get',
    params
  })
}

export function getComList(params) {
  return request({
    url: '/System/Companys/GetList',
    method: 'get',
    params
  })
}

// 获取许可证列表
export function getXkzListByCode(params) {
  return request({
    url: '/System/Companys/GetXkzListByCode',
    method: 'get',
    params
  })
}
