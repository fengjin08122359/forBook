<template>
  <div class="h5Appearance">
    <backcol msg="手机窗口外观"/>
    <el-row>
      <span>窗口模板:</span>
    </el-row>
    <el-row>
      <el-col :span="12" >
        <h5preview :preview="preview" />
      </el-col>
      <el-col :span="12" >
        <el-row>
          <span>对话窗口标题:</span>
          <el-input v-model="title" ></el-input>
        </el-row>
        <el-row>
          <span>气泡样式:</span>
          <el-row>
            <el-col :span="4" v-for="item in colors" v-bind:key="item.index" >
              <el-button @click="colorClick(item.index)" :size="size(item.index)" :style="{ background: item.type }"></el-button>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <span>背景图片:</span>
          <fileupload v-on:geturl="getBackgroundImgUrl" :size="1*1024*1024"/>
          <div class="el-upload__tip">建议图片尺寸为2400px*3000px，大小&gt;1M</div>
        </el-row>
        <el-row>
          <span>访客图标:</span>
          <fileupload v-on:geturl="getVisitorIcoImgUrl" :size="50*1024"/>
          <div class="el-upload__tip">建议图片尺寸为86px*86px，大小gt;50KB</div>
        </el-row>
        <el-row>
          <span>坐席图标:</span>
          <fileupload v-on:geturl="getClientIcoImgUrl" :size="50*1024"/>
          <div class="el-upload__tip">建议图片尺寸为86px*86px，大小gt;50KB</div>
        </el-row>
        <el-row>
          <span>机器人图标:</span>
          <fileupload v-on:geturl="getRobotIcoImgUrl" :size="50*1024"/>
          <div class="el-upload__tip">建议图片尺寸为86px*86px，大小gt;50KB</div>
        </el-row>
        <el-row>
          <el-button plain>保存</el-button>
          <el-button plain>取消</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'H5Appearance',
  data () {
    return {
      title: '',
      backgroundImg: '',
      visitorIco: '',
      clientIco: '',
      robotIco: '',
      multiple: false,
      active: 0,
      colors: [{
        index: 0,
        type: 'red'
      }, {
        index: 1,
        type: 'blue'
      }, {
        index: 2,
        type: 'yellow'
      }, {
        index: 3,
        type: 'green'
      }, {
        index: 4,
        type: 'pink'
      }, {
        index: 5,
        type: '#fff'
      }]
    }
  },
  computed: {
    activeColor () {
      return this.colors[this.active].type
    },
    preview () {
      return {
        title: this.title,
        backgroundImg: this.backgroundImg,
        activeColor: this.activeColor,
        visitorIco: this.visitorIco,
        clientIco: this.clientIco,
        robotIco: this.robotIco
      }
    }
  },
  methods: {
    getRobotIcoImgUrl (url) {
      this.robotIco = url
    },
    getClientIcoImgUrl (url) {
      this.clientIco = url
    },
    getVisitorIcoImgUrl (url) {
      this.visitorIco = url
    },
    getBackgroundImgUrl (url) {
      this.backgroundImg = url
    },
    size (index) {
      if (index === this.active) {
        return ''
      } else {
        return 'small'
      }
    },
    colorClick (index) {
      this.active = index
    }
  }
}
</script>
