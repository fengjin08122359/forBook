<template>
  <div class="pcAppearance">
    <backcol  msg="桌面窗口外观"/>
    <el-row>
      <span>窗口模板:</span>
      <el-radio v-model="modalType" label="1">广告模板</el-radio>
      <el-radio v-model="modalType" label="2">页签模板</el-radio>
    </el-row>
    <div class="appArea">
      <pcpreview :preview="preview" class="pcpreview" />
      <div class="areas">
        <div class="areas-head" @click="headConfigVisible = true">
          <span class="el-icon-edit-outline"></span>点击进入编辑
        </div>
        <div class="areas-message" @click="dialogueVisible = true">
          <span class="el-icon-edit-outline"></span>点击进入编辑
        </div>
        <div class="areas-tools" @click="toolsVisible = true">
          <span class="el-icon-edit-outline"></span>点击进入编辑
        </div>
        <div class="areas-tabs" v-show="modalType === '1'" @click="advVisible = true">
          <span class="el-icon-edit-outline"></span>点击进入编辑
        </div>
        <div class="areas-pictrues" v-show="modalType === '2'" @click="tabVisible = true">
          <span class="el-icon-edit-outline"></span>点击进入编辑
        </div>
      </div>
    </div>
    <el-row>
      <el-button plain>保存</el-button>
      <el-button plain>取消</el-button>
    </el-row>
    <el-dialog title="对话窗口标题设置" :visible.sync="headConfigVisible" width="50%" >
      <el-row>
        <span>对话窗口标题:</span>
        <el-input v-model="title" ></el-input>
      </el-row>
      <el-row>
        <span>LOGO图片:</span>
        <fileupload v-on:geturl="getLogoImgUrl" :size="10*1024*1024"/>
        <div class="el-upload__tip">图片最大尺寸为180*50，图片格式为jpg，png</div>
      </el-row>
      <el-row>
        <span>跳转链接:</span>
        <el-input v-model="titleLink" ></el-input>
      </el-row>
      <el-row>
        <span>主题:</span>
        <el-row>
          <el-col :span="4" v-for="item in colors" v-bind:key="item.index" >
            <el-button @click="colorClick(item.index)" :size="size(item.index)" :style="{ background: item.type }"></el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <span>自定义色值:</span>
        <el-input v-model="selectColor" ></el-input>
      </el-row>
    </el-dialog>
    <el-dialog title="对话栏设置" :visible.sync="dialogueVisible" width="50%" >
      <el-row>
        <span>语言设置:</span>
        <el-radio v-model="langType" label="1">简体</el-radio>
        <el-radio v-model="langType" label="2">繁体</el-radio>
        <el-radio v-model="langType" label="3">EN</el-radio>
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
        <span>背景图片:</span>
        <fileupload v-on:geturl="getBackgroundImgUrl" :size="50*1024"/>
        <div class="el-upload__tip">建议图片尺寸为2400px*3000px，大小&gt;1M</div>
      </el-row>
    </el-dialog>
    <el-dialog title="工具栏设置" :visible.sync="toolsVisible" width="50%" >
      <el-row>
        <span>访客工具配置:</span>
        <el-checkbox-group v-model="toolsSelect" >
          <el-checkbox v-for="item in toolsList" :label="item.label" :key="item.index"></el-checkbox>
        </el-checkbox-group>
      </el-row>
    </el-dialog>
    <el-dialog title="广告栏设置" :visible.sync="advVisible" width="80%" >
      <el-row>
        <el-radio v-model="advType" label="1">多广告形式</el-radio>
        <el-radio v-model="advType" label="2">网页形式</el-radio>
      </el-row>
      <el-row v-show="advType === '1'">
        <span>(支持多广告轮播，时间间隔为60s)</span>
        <el-row v-for="item in advList" v-bind:key="item.index" v-if="!item.remove">
          <el-col :span="11" >
            <span>广告图:</span>
            <el-input v-model="item.url" ></el-input>
          </el-col>
          <el-col :span="11" >
            <span>跳转链接:</span>
            <el-input v-model="item.link" ></el-input>
          </el-col>
          <el-col :span="2" >
            <span @click="addAdvList" class="el-icon-plus"></span>
            <span @click="removeAdvList(item.index)" v-show="item.index !== 0" class="el-icon-close"></span>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-show="advType === '2'">
        <span>(支持自定义网页内容)</span>
        <el-row>
          <span>网页链接:</span>
          <el-input v-model="advWebLink" ></el-input>
        </el-row>
      </el-row>
    </el-dialog>
    <el-dialog title="标签栏" :visible.sync="tabVisible" width="80%" >
      <span>(支持多标签页)</span>
      <el-row>
        <span>指定客服:</span>
        <el-radio v-model="opType" label="1">开启</el-radio>
        <el-radio v-model="opType" label="2">关闭</el-radio>
      </el-row>
      <el-row v-show="opType === '1'">
        <el-checkbox-group v-model="opSelect" >
          <el-checkbox v-for="item in opList" :label="item.label" :key="item.index"></el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row>
        <el-row v-for="item in tabList" v-bind:key="item.index" v-if="!item.remove">
          <el-col :span="11" >
            <span>页签名称:</span>
            <el-input v-model="item.name" ></el-input>
          </el-col>
          <el-col :span="11" >
            <span>内容链接:</span>
            <el-input v-model="item.link" ></el-input>
          </el-col>
          <el-col :span="2" >
            <span @click="addTabList" class="el-icon-plus"></span>
            <span @click="removeTabList(item.index)" v-show="item.index !== 0" class="el-icon-close"></span>
          </el-col>
        </el-row>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PcAppearance',
  data () {
    return {
      msg: 'PcAppearance',
      langType: '1',
      modalType: '1',
      advType: '1',
      opType: '1',
      headConfigVisible: false,
      dialogueVisible: false,
      toolsVisible: false,
      advVisible: false,
      tabVisible: false,
      title: '',
      titleLink: '',
      advWebLink: '',
      logo: '',
      visitorIco: '',
      clientIco: '',
      robotIco: '',
      backgroundImg: '',
      multiple: false,
      active: 0,
      selectColor: '',
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
      }],
      toolsList: [{
        index: 0,
        label: '常见问题'
      }, {
        index: 1,
        label: '字体'
      }, {
        index: 2,
        label: '表情'
      }, {
        index: 3,
        label: '保存对话记录'
      }, {
        index: 4,
        label: '满意度评价'
      }, {
        index: 5,
        label: '发送文件'
      }, {
        index: 6,
        label: '语音'
      }, {
        index: 7,
        label: '发送图片'
      }, {
        index: 8,
        label: '屏幕截图'
      }],
      toolsSelect: [],
      advList: [{
        index: 0,
        url: '',
        link: '',
        remove: false
      }],
      opList: [{
        index: 0,
        label: '专属客服'
      }, {
        index: 1,
        label: '历史客服'
      }, {
        index: 2,
        label: '全部客服'
      }],
      opSelect: [],
      tabList: [{
        index: 0,
        url: '',
        name: '',
        remove: false
      }]
    }
  },
  computed: {
    activeColor () {
      return this.selectColor || this.colors[this.active].type
    },
    tabConfig () {
      if (this.modalType === '1') {
        if (this.advType === '1') {
          var list = []
          for (var i in this.advList) {
            if (!this.advList[i].remove && !!this.advList[i].url) {
              list.push(this.advList[i])
              list[list.length - 1].index = list.length - 1
            }
          }
          return {
            type: 'adv',
            list: list
          }
        } else {
          return {
            type: 'web',
            link: this.advWebLink
          }
        }
      } else {
        var tabList = []
        for (var advi in this.tabList) {
          if (!this.tabList[advi].remove && !!this.tabList[advi].name) {
            tabList.push(this.tabList[advi])
            tabList[tabList.length - 1].index = tabList.length - 1
          }
        }
        return {
          type: 'tab',
          op: this.opSelect,
          opType: this.opType,
          list: tabList
        }
      }
    },
    preview () {
      return {
        title: this.title,
        logo: this.logo,
        activeColor: this.activeColor,
        langType: this.langType,
        backgroundImg: this.backgroundImg,
        visitorIco: this.visitorIco,
        clientIco: this.clientIco,
        robotIco: this.robotIco,
        toolsSelect: this.toolsSelect,
        tabConfig: this.tabConfig
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
    getLogoImgUrl (url) {
      this.logo = url
    },
    headClick () {
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
    },
    addAdvList () {
      this.advList.push({
        index: this.advList.length,
        url: '',
        link: ''
      })
    },
    removeAdvList (index) {
      this.advList[index].remove = true
      this.$set(this.advList, index, this.advList[index])
    },
    addTabList () {
      this.tabList.push({
        index: this.tabList.length,
        name: '',
        link: ''
      })
    },
    removeTabList (index) {
      this.tabList[index].remove = true
      this.$set(this.tabList, index, this.tabList[index])
    }
  }
}
</script>

<style>
.appArea{
  position:relative;
  width:100%;
  height:500px;
}
.areas {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:2;
}
.areas > div{
  opacity: 0;
  color:#000;
  text-align:center;
}
.areas > div:hover{
  background:#eee;
  opacity: 0.5;
  color:blue;
  border:1px solid #000;
}
.areas-head{
  height: 74px;
  width:100%;
  line-height:84px;
}
.areas-message{
  position: absolute;
  top: 74px;
  right: 30%;
  bottom: 164px;
  left: 0;
  line-height:262px;
}
.areas-tools{
  position: absolute;
  right: 30%;
  bottom: 134px;
  left: 0;
  height: 30px;
  line-height:30px;
}
.areas-tabs,.areas-pictrues{
  position: absolute;
  right: 0;
  top: 74px;
  left: 70%;
  bottom:0;
  line-height:426px;
}
.pcAppearance .pcpreview{
  height:500px;
}
.swiper-container{
  height:426px;
}
</style>
