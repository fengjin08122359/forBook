<template>
  <div class="channelManage">
    <el-button @click="addChannel"><span class="el-icon-plus"></span>添加渠道</el-button>
    <el-row :gutter="20">
      <el-col class="channelBox" :span="12" v-for="item in channelDatas" v-bind:key="item.pk">
        <el-row>
          <span>渠道名称</span>
          <span v-text='item.channelName'></span>
          <span @click="clickSetting(item)" class="el-icon-edit-outline"></span>
        </el-row>
        <el-row>
          <span>渠道类型</span>
          <span v-text='channelTypeSort(item.channelType)'></span>
        </el-row>
        <el-row>
          <span>渠道说明</span>
          <span v-text='item.channelText'></span>
        </el-row>
        <el-row v-if="item.channelType=='web'">
          <span>链接：</span>
          <span v-text='linkUrl(item)'></span>
        </el-row>
        <el-row v-if="item.channelType=='wx'">
          <span>微信公众号：</span>
          <span v-text='item.publicNo'></span>
        </el-row>
        <el-row v-if="item.channelType=='app'">
          <div>
            <span>APP ID:</span>
            <span v-text='item.appId'></span>
          </div>
          <div>
            <span>APP Secret:</span>
            <span v-text='item.appSecret'></span>
          </div>
        </el-row>
        <el-row>
          <span v-if='item.channelType!=="wx"' @click="clickAppearance(item)">外观配置</span>
          <span @click="clickConfig(item)">参数配置</span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ChannelManage',
  data () {
    return {
      channelDatas: [{
        pk: '1',
        channelName: 'Any800',
        channelType: 'web',
        channelText: '官网',
        monitor: '2',
        linkType: '2'
      },
      {
        pk: '2',
        channelName: '微信',
        channelType: 'wx',
        channelText: '携程入口',
        publicNo: ''
      },
      {
        pk: '3',
        channelName: '别克APP',
        channelType: 'app',
        channelText: 'SDK',
        appId: '123',
        appSecret: '333',
        sendType: '2',
        sendLink: 'http://www.baidu.com'
      }]
    }
  },
  methods: {
    addChannel () {
      this.$parent.setChannel({})
      this.$router.push('/Channel/' + this.$parent.$data.channelType)
    },
    channelTypeSort (type) {
      return type === 'web' ? 'Web' : type === 'wx' ? '微信' : type === 'app' ? 'APP' : 'web'
    },
    channelTypeClick (type) {
      return type === 'web' ? 'AddWebChannel' : type === 'wx' ? 'AddWxChannel' : type === 'app' ? 'AddAppChannel' : 'AddWebChannel'
    },
    linkUrl (item) {
      return ''
    },
    clickConfig (item) {
      this.$router.push('/Channel/SetConfig')
    },
    clickAppearance (item) {
      if (item.channelType === 'web') {
        this.$router.push('/Channel/PcAppearance')
      } else if (item.channelType === 'app') {
        this.$router.push('/Channel/H5Appearance')
      }
    },
    clickSetting (item) {
      item.channelType = this.channelTypeClick(item.channelType)
      this.$parent.setChannel(item)
      this.$router.push('/Channel/' + this.$parent.$data.channelType)
    }
  }
}
</script>

<style>
.channelManage{
  padding: 0 24px;
}
.channelManage .channelBox{
  border: 1px solid #fff;
  padding: 15px;
}
</style>
