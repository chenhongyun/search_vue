export default {
  // primaryColor: '#1890FF', // primary color of ant design
  // navTheme: 'dark', // theme for nav menu
  // layout: 'topmenu', // nav menu position: sidemenu or topmenu
  // contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  // fixedHeader: true, // sticky header
  // fixSiderbar: false, // sticky siderbar
  // autoHideHeader: false, //  auto hide header
  // colorWeak: false,
  // multiTab: true,
  // production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  tipsVisual: true,  // 默认显示搜索框提示
  pageSize: 10,  // 默认页面大小为10
  predictable: false,  // 是否预测搜索，即在首页输入完成后是否自动搜索
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }

}