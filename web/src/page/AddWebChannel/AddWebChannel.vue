<template>
  <div class="addWebChannel">
    <backcol/>
    <el-row>
      <span>渠道名称:</span>
      <el-input v-model="channelName" ></el-input>
    </el-row>
    <el-row>
      <span>渠道类型:</span>
      <el-select v-model="channelType" placeholder="请选择"  @change="channelTypeChange">
        <el-option
          v-for="item in channelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row>
      <span>渠道说明:</span>
      <el-input
        type="textarea"
        :rows="3"
        resize="none"
        placeholder="渠道说明"
        v-model="channelText">
      </el-input>
    </el-row>
    <el-row>
      <span>链接地址:</span>
      <el-radio v-model="linkType" label="1">https</el-radio>
      <el-radio v-model="linkType" label="2">http</el-radio>
    </el-row>
    <el-row>
      <span>浏览轨迹:</span>
      <el-radio v-model="monitor" label="1">开启</el-radio>
      <el-radio v-model="monitor" label="2">关闭</el-radio>
      <span>开启浏览轨迹后，会将访客浏览您网站的记录呈现在访客监控中</span>
    </el-row>
    <el-row>
      <el-button plain>保存</el-button>
      <el-button plain>取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddWebChannel',
  data () {
    return {
      pk: '',
      channelName: '',
      channelType: '',
      channelText: '',
      monitor: '1',
      linkType: '1',
      channelOptions: [{
        value: 'AddWebChannel',
        label: 'PC'
      }, {
        value: 'AddWxChannel',
        label: '微信'
      }, {
        value: 'AddAppChannel',
        label: 'App'
      }]
    }
  },
  mounted () {
    this.pk = this.$parent.$data.pk
    this.channelName = this.$parent.$data.channelName
    this.channelType = this.$parent.$data.channelType
    this.channelText = this.$parent.$data.channelText
    this.monitor = this.$parent.$data.monitor
    this.linkType = this.$parent.$data.linkType
  },
  methods: {
    channelTypeChange (item) {
      this.$parent.$data.channelType = item
      this.$router.push(item)
    }
  },
  updated () {
    this.$nextTick(function () {
      this.$parent.$data.channelName = this.channelName
      this.$parent.$data.channelText = this.channelText
      this.$parent.$data.monitor = this.monitor
      this.$parent.$data.linkType = this.linkType
    })
  }
}
</script>

<style>
.addWebChannel{
  padding: 0 24px;
}
</style>
