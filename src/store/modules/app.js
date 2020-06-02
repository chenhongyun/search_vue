import Vue from 'vue'

import {
  TIPS_VISUAL,
  PAGE_SIZE,
  PREDICTABLE
} from '@/store/mutation-types'

const app = {
  state: {
    tipsVisual: true,  // 默认显示搜索框提示
    pageSize: 10,  // 默认页面大小为10
    predictable: false,  // 是否预测搜索，即在首页输入完成后是否自动搜索
  },
  mutations: {
    // 设置搜索提示，保存到全局状态以及浏览器数据库中
    SET_TIPS_VISUAL: (state, visual) => {
      state.tipsVisual = visual
      Vue.ls.set(TIPS_VISUAL, visual)
    },
    SET_PAGE_SIZE: (state, size) => {
      state.pageSize = size
      Vue.ls.set(PAGE_SIZE, size)
    },
    SET_PREDICTABLE: (state, predictable) => {
      state.predictable = predictable
      Vue.ls.set(PREDICTABLE, predictable)
    }
  }
  // actions: {
  //   // 这些都是异步加载，通过调用mutations里的函数进行异步加载
  //   setSidebar ({ commit }, type) {
  //     commit('SET_SIDEBAR_TYPE', type)
  //   },
  //   CloseSidebar ({ commit }) {
  //     commit('CLOSE_SIDEBAR')
  //   },
  //   ToggleDevice ({ commit }, device) {
  //     commit('TOGGLE_DEVICE', device)
  //   },
  //   ToggleTheme ({ commit }, theme) {
  //     commit('TOGGLE_THEME', theme)
  //   },
  //   ToggleLayoutMode ({ commit }, mode) {
  //     commit('TOGGLE_LAYOUT_MODE', mode)
  //   },
  //   ToggleFixedHeader ({ commit }, fixedHeader) {
  //     if (!fixedHeader) {
  //       commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
  //     }
  //     commit('TOGGLE_FIXED_HEADER', fixedHeader)
  //   },
  //   ToggleFixSiderbar ({ commit }, fixSiderbar) {
  //     commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
  //   },
  //   ToggleFixedHeaderHidden ({ commit }, show) {
  //     commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
  //   },
  //   ToggleContentWidth ({ commit }, type) {
  //     commit('TOGGLE_CONTENT_WIDTH', type)
  //   },
  //   ToggleColor ({ commit }, color) {
  //     commit('TOGGLE_COLOR', color)
  //   },
  //   ToggleWeak ({ commit }, weakFlag) {
  //     commit('TOGGLE_WEAK', weakFlag)
  //   },
  //   ToggleMultiTab ({ commit }, bool) {
  //     commit('TOGGLE_MULTI_TAB', bool)
  //   }
  // }
}

export default app