<template>
  <div class="ncmenu">
    <el-row >
      <el-col>
        <h5 @click="toggleCollapse">
          <i class="el-icon-more"></i>
        </h5>
        <transition name="fade">
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="router"
            default-active="1">
            <el-menu-item v-for="item in menu" v-bind:key="item.name" :index="item.path" v-if="item.name">
              <i :class="item.icon"></i>
                <span slot="title" v-text="item.title"></span>
            </el-menu-item>
          </el-menu>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ncmenu',
  data () {
    return {
      isCollapse: true,
      router: true
    }
  },
  props: ['menu'],
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  updated () {
    this.$nextTick(function () {
      var that = this
      that.$parent.$data.left = that.$el.offsetWidth
    })
  }
}
</script>
