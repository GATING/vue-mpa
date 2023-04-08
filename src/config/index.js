const isDevelopment = process.env.NODE_ENV === 'development'

const baseUrl = process.env.BASE_URL

// 页面的title，keywords，description
const meta = {
  index: {
    title: 'vue-map首页',
    keywords: '首页关键字',
    description: '首页描述',
  },
  list: {
    title: 'vue-map列表页',
    keywords: '列表页关键字',
    description: '列表页描述',
  },
  login: {
    title: 'vue-map登录页',
    keywords: '登录页关键字',
    description: '登录页描述',
  },
  spa: {
    title: 'vue-map单页面',
    keywords: '单页面关键字',
    description: '单页面描述',
  },
}

// 为了给vue.config.js也用
module.exports = {
  isDevelopment,
  baseUrl,
  meta,
}
