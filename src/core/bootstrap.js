import Vue from 'vue'
import store from '@/store/'
import {
  TIPS_VISUAL,
  PAGE_SIZE,
  PREDICTABLE
} from '@/store/mutation-types'
import config from '@/config/defaultSettings'

export default function Initializer () {
  store.commit('SET_TIPS_VISUAL', Vue.ls.get(TIPS_VISUAL, config.tipsVisual))
  store.commit('SET_PAGE_SIZE', Vue.ls.get(PAGE_SIZE, config.pageSize))
  store.commit('SET_PREDICTABLE', Vue.ls.get(PREDICTABLE, config.predictable))
}
