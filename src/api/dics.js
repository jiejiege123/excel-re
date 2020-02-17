/*
 * @Author: your name
 * @Date: 2019-11-01 10:18:26
 * @LastEditTime : 2019-12-20 14:51:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bpsp-ui\src\api\dics.js
 */
import request from '@/utils/request'

export function getXZQH() {
  return request({
    url: '/Basic/GetXZQH',
    method: 'get'
  })
}
export function getDepartments(params) {
  return request({
    url: '/Basic/GetDepartments',
    method: 'get',
    params
  })
}
// 获取下级行政区划
export function getNextDepartments(params) {
  return request({
    url: '/Basic/GetNextDepartments',
    method: 'get',
    params
  })
}

// 获取字典数据 刷新获取
export function getDic(data) {
  return request({
    url: '/Basic/GetDic',
    method: 'post',
    data
  })
}
export function getNewDic(data) {
  return request({
    url: '/Basic/GetNewDic',
    method: 'post',
    data
  })
}
// 首页数据
// 获取公司 人员 仓库 车辆
export function getBaseDataInfo() {
  return request({
    url: '/Basic/GetBaseDataInfo',
    method: 'get'
  })
}
// 获取基本统计信息 项目信息数量 作业信息数量
export function getProjectDataInfo() {
  return request({
    url: '/Basic/GetProjectDataInfo',
    method: 'get'
  })
}

// 图片上传
export function uploadImage(data) {
  return request({
    url: '/Basic/UploadImage',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 统计接口
// 库房统计
export function getKuFangBaseDataInfo(params) {
  return request({
    url: '/Warehouses/ComKuFang/GetBaseDataInfo',
    method: 'get',
    params
  })
}
// 库区统计
export function getKuQuBaseDataInfo(params) {
  return request({
    url: '/Warehouses/ComKuQu/GetBaseDataInfo',
    method: 'get',
    params
  })
}
// 车辆统计
export function getVehiclesBaseDataInfo(params) {
  return request({
    url: '/Vehicles/Vehicles/GetBaseDataInfo',
    method: 'get',
    params
  })
}

// 企业统计
export function getComBaseDataInfo(params) {
  return request({
    url: '/System/Companys/GetComBaseDataInfo',
    method: 'get',
    params
  })
}

// 项目统计
export function getProjectBaseDataInfo(params) {
  return request({
    url: '/PM/Project/GetBaseDataInfo',
    method: 'get',
    params
  })
}

// 人员统计
export function getStaffsBaseDataInfo(params) {
  return request({
    url: '/Staffs/Staffs/GetUserBaseDataInfo',
    method: 'get',
    params
  })
}

// 今日作业统计
export function getBaseDataInfoToday() {
  return request({
    url: '/Operations/Operations/GetBaseDataInfoToday',
    method: 'get'
  })
}

// 获取炸材类型
export function getZctype(data) {
  return request({
    url: '/Basic/GetZctype',
    method: 'post',
    data
  })
}
