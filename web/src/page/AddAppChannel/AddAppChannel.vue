<template>
  <div class="AddAppChannel">
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
      <span>APP ID:</span>
      <el-input v-model="appId" ></el-input>
    </el-row>
    <el-row>
      <span>APP Secret:</span>
      <el-input v-model="appSecret" ></el-input>
    </el-row>
    <el-row>
      <span>推送方式:</span>
      <el-radio v-model="sendType" label="1">不推送</el-radio>
      <el-radio v-model="sendType" label="2">自定义推送服务器</el-radio>
      <el-input v-model="sendLink" ></el-input>
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
      <el-button plain>保存</el-button>
      <el-button plain>取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddAppChannel',
  data () {
    return {
      pk: '',
      channelName: '',
      channelType: '',
      appId: '',
      appSecret: '',
      sendType: '1',
      sendLink: '',
      channelText: '',
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
    this.appId = this.$parent.$data.appId
    this.appSecret = this.$parent.$data.appSecret
    this.sendType = this.$parent.$data.sendType
    this.sendLink = this.$parent.$data.sendLink
  },
  methods: {
    channelTypeChange (item) {
      this.$parent.$data.channelType = item
      this.$router.push(item)
    },
    backTo () {
      this.$router.push('/Channel')
    }
  },
  updated () {
    this.$nextTick(function () {
      this.$parent.$data.channelName = this.channelName
      this.$parent.$data.channelText = this.channelText
      this.$parent.$data.appId = this.appId
      this.$parent.$data.appSecret = this.appSecret
      this.$parent.$data.sendType = this.sendType
      this.$parent.$data.sendLink = this.sendLink
    })
  }
}
</script>
