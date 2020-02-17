/*
 * @Author: your name
 * @Date: 2019-11-01 10:18:26
 * @LastEditTime: 2019-12-03 16:08:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bpsp-ui\src\store\modules\dics.js
 */
import { getXZQH, getDepartments, getDic, getNewDic } from '@/api/dics'
const state = {
  XZQH: [],
  DEPARTMENTS: [],
  SET_DIC: ''
}

const mutations = {
  SET_XZQH: (state, XZQH) => {
    state.XZQH = XZQH
  },
  SET_DEPARTMENTS: (state, DEPARTMENTS) => {
    state.DEPARTMENTS = DEPARTMENTS
  },
  SET_DIC: (state, DIC) => {
    state.DIC = DIC
  }
}

const actions = {
  getXzqhData: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getXZQH().then(res => {
        commit('SET_XZQH', res.Data)
        resolve(res.Data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDepartmentsData: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getDepartments().then(res => {
        commit('SET_DEPARTMENTS', res.Data)
        resolve(res.Data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getDicData: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      getDic(data).then(res => {
        commit('SET_DIC', res.Data)
        resolve(res.Data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getNewDicData: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      getNewDic(data).then(res => {
        commit('SET_DIC', res.Data)
        resolve(res.Data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
