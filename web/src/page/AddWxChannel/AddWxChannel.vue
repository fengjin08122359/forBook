<template>
  <div class="addWxChannel">
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
      <span>公众号:</span>
      <el-select v-model="publicNo" placeholder="请选择">
        <el-option
          v-for="item in publicOptions"
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
      <el-button plain>保存</el-button>
      <el-button plain>取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddWxChannel',
  data () {
    return {
      pk: '',
      channelName: '',
      channelType: '',
      publicNo: '',
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
      }],
      publicOptions: [{
        value: 'pc',
        label: 'PC'
      }, {
        value: 'wx',
        label: '微信'
      }, {
        value: 'h5',
        label: 'H5'
      }]
    }
  },
  mounted () {
    this.pk = this.$parent.$data.pk
    this.channelName = this.$parent.$data.channelName
    this.channelType = this.$parent.$data.channelType
    this.channelText = this.$parent.$data.channelText
    this.publicNo = this.$parent.$data.publicNo
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
      this.$parent.$data.publicNo = this.publicNo
    })
  }
}
</script>
