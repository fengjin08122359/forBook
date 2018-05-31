<template>
  <div class="channel">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data () {
    return {
      pk: '',
      channelName: '',
      channelType: 'AddWebChannel',
      channelText: '',
      monitor: '1',
      linkType: '1',
      publicNo: '',
      appId: '',
      appSecret: '',
      sendType: '1',
      sendLink: ''
    }
  },
  methods: {
    setChannel (json) {
      this.pk = json.pk || ''
      this.channelName = json.channelName || ''
      this.channelType = json.channelType || 'AddWebChannel'
      this.channelText = json.channelText || ''
      this.monitor = json.monitor || '1'
      this.linkType = json.linkType || '1'
      this.publicNo = json.publicNo || ''
      this.appId = json.appId || ''
      this.appSecret = json.appSecret || ''
      this.sendType = json.sendType || '1'
      this.sendLink = json.sendLink || ''
    }
  }
}
</script>
