<template>
  <div class="ncselectTree">
    {{ msg }}
    <div class="selectTree" @click="clickInput" ref="selectTree" >
      <el-input v-model="value"  :placeholder="placeholder"></el-input>
      <div class="tree" v-show="toggleTree">
        <el-tree
          :data="treedata"
          show-checkbox @check-change="checkChange"
          node-key="id" ref="tree"
          :props="defaultProps">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ncselectTree',
  data () {
    return {
      value: '',
      nodes: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      toggleTree: false
    }
  },
  computed: {
    treedata () {
      return this.$attrs.treedata
    }
  },
  methods: {
    clickInput () {
      this.toggleTree = !this.toggleTree
    },
    checkChange () {
      var nodes = this.$refs.tree.getCheckedNodes()
      var label = ''
      for (var i in nodes) {
        label += nodes[i].label + ','
      }
      this.value = label
      this.nodes = nodes
    }
  },
  created () {
    var that = this
    this.msg = this.$attrs.msg
    this.placeholder = this.$attrs.placeholder ? this.$attrs.placeholder : '请输入内容'
    document.addEventListener('click', (e) => {
      if (that.$refs.selectTree && !that.$refs.selectTree.contains(e.target)) {
        that.toggleTree = false
      }
    })
  }
}
</script>

<style>
.ncselectTree .selectTree{
  position: relative;
  width:250px;
}
.ncselectTree .tree{
  position: absolute;
  top: 39px;
  left:0;
  right:0;
  border:1px solid #eee;
  z-index:999;
}
</style>
