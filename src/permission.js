import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log('to：', to)
  to.query.serch_text
  if (to.path === '/r') {
    // to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
    // 如果路由指向搜索结果，则标题改为"'搜索内容'-搜索结果"
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.query.search_text} - 搜索结果`))

  } else {
    // 如果指向首页，则标题改为"首页-电影搜索引擎"
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - 电影搜索引擎`))
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})