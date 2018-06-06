<template>
  <div id="app">
    <el-menu class="el-menu-demo"  mode="horizontal" :router="router"
      default-active="1">
      <el-menu-item v-for="item in menu" v-bind:key="item.name" :index="item.path">
          <span slot="title" v-text="item.title"></span>
      </el-menu-item>
    </el-menu>
    <keep-alive>
    <router-view  v-wechat-title="$route.meta.title" class="routerView" ></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      router: true,
      menu: [{
        title: '搜索',
        name: 'search',
        path: 'search'
      }, {
        title: '仓库',
        name: 'repository',
        path: 'repository'
      }]
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
#app{
  position: relative;
}
#app .gameCenter{
  position: relative;
}
</style>
