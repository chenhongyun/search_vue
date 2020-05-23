import Vue from 'vue'
// import VueStorage from 'vue-ls'
// import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Axios from 'axios';

import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)

Vue.prototype.$axios=Axios; //设置原型

Vue.use(Antd)

// Vue.use(VueStorage, config.storageOptions)
