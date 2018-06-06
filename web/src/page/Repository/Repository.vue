<template>
  <div class="repository">
    Repository
  </div>
</template>

<script>
export default {
  name: 'Repository',
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
      
    }
  }
}
</script>
