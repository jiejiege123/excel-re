/*
 * @Author: your name
 * @Date: 2019-11-01 10:18:26
 * @LastEditTime : 2020-01-02 17:32:04
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bpsp-ui\src\api\system\department.js
 */
import request from '@/utils/request'

// 获取部门列表
export function getData(params) {
  return request({
    url: '/System/Departments/GetList',
    method: 'get',
    params
  })
}
// 编辑部门数据
export function updateDepartmentData(data) {
  return request({
    url: '/System/Departments/Update',
    method: 'post',
    data
  })
}
// 添加部门数据
export function addDepartmentData(data) {
  return request({
    url: '/System/Departments/Add',
    method: 'post',
    data
  })
}
// 获取用户列表
export function getDepartmentUser(params) {
  return request({
    url: '/System/Departments/GetDepartmentUser',
    method: 'get',
    params
  })
}
// 删除部门数据
export function deleteDepartmentData(params) {
  return request({
    url: '/System/Departments/Delete',
    method: 'get',
    params
  })
}
// 编辑部门用户
export function updateDepartmentUserData(data) {
  return request({
    url: '/System/Departments/UpdateUser',
    method: 'post',
    data
  })
}
// 添加部门用户
export function addDepartmentUserData(data) {
  return request({
    url: '/System/Departments/AddUser',
    method: 'post',
    data
  })
}
// 删除部门用户
export function deleteDepartmentUserData(data) {
  return request({
    url: '/System/Departments/DeleteUser',
    method: 'post',
    data
  })
}

// 部门人员修改信息
export function updateUserByDepartment(data) {
  return request({
    url: '/System/Departments/UpdateUserByDepartment',
    method: 'post',
    data
  })
}
