<template>
  <div class="backCol" @click="backTo"><span class="el-icon-back"></span><span v-text="msg"></span></div>
</template>

<script>
export default {
  name: 'backcol',
  computed: {
    msg () {
      return this.$attrs.msg || '添加渠道'
    }
  },
  methods: {
    backTo () {
      this.$router.go('-1')
    }
  }
}
</script>
