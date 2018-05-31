<template>
  <div class="fileupload" >
    <div class="example-btn">
      <file-upload
        class="el-button el-button--default el-button--small"
        post-action="/any800/echatManager.do?method=uploadFile"
        extensions="gif,jpg,jpeg,png"
        accept="image/png,image/gif,image/jpeg"
        :multiple="false"
        :size="size"
        v-model="files"
        @input-filter="inputFilter"
        @input-file="inputFile"
        ref="upload">
        点击上传
      </file-upload>
      <div v-show="image">
        <img :src="image" class="uploadImg" />
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
export default {
  name: 'fileupload',
  components: {
    FileUpload
  },
  data () {
    return {
      files: [],
      image: ''
    }
  },
  props: ['size'],
  methods: {
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        this.getUrl(newFile.response)
      }
      if (newFile && oldFile) {
        // update
        this.getUrl(newFile.response)
      }
      if (!newFile && oldFile) {
        // remove
      }
      this.$refs.upload.active = true
    },
    createImage (url) {
      this.image = url
    },
    getUrl (file) {
      var url = ''
      if (typeof file === 'string' && file.split('|').length >= 2) {
        url = file.split('|')[1]
      }
      this.$emit('geturl', url)
      this.createImage(url)
    }
  }
}
</script>

<style>
.uploadImg {
  max-height: 100px;
  max-width:100px;
}
</style>
