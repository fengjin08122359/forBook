import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/page/Search'
import Repository from '@/page/Repository'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: '',
      component: Search,
      meta:
      {
        title: '搜索'
      }
    },
    {
      path: '/Repository',
      name: 'Repository',
      component: Repository,
      meta:
      {
        title: '仓库'
      }
    }
  ],
  defaultTile: '首页'
})
