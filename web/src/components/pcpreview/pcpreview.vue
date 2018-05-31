<template>
  <div class="pcpreview">
    <div class="ucc">
      <div class="top">
        <div class="dialogueTitle" v-text="title"></div>
        <div class="gap-top">
          <a href="http://www.any800.com/" target="_blank"><img :src="logo" class="ucc-logo"></a>
        </div>
      </div>
      <!--top end-->
      <div class="main">
        <div class="gap main-gap">
          <div class="tab_info">
            <div v-show="tabConfig.type === 'adv'">
              <swiper :options="swiperOption" ref="advSwiper">
                <swiper-slide v-for="item in tabConfig.list" :key="item.index">
                  <img :src="item.url"/>
                </swiper-slide>
              </swiper>
            </div>
            <div v-show="tabConfig.type === 'web'" class="tabConfigWeb">
              <iframe :src="tabConfig.link" />
            </div>
            <div v-show="tabConfig.type === 'tab'">
              <!-- 选项卡 -->
              <div class="tab_title">
                <span class="" v-for="item in tabConfig.list" :key="item.index" v-text="item.name" :class="{active: (item.index === 0)}"  ></span>
              </div>
              <div class="tab_main">
                <div data-index="0" class="iframe" v-for="item in tabConfig.list" :key="item.index" :class="{active: (item.index === 0)}">
                  <iframe :src="item.link" frameborder="0" scrolling="scroll">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialogue">
          <div class="dialogue-c">
            <div class="dialogue-record">
              <div class="dialogue-record-c" id="message">
                <div class="dialogue-me contentMessage" name="">
                  <p class="dialogue-pic">
                    <img :src="visitorIco">
                  </p>
                  <div class="dialogue-in-r">
                    <p class="in-name">
                      访客282
                    </p>
                    <div class="dialogue-in-c" :style="{ background: activeColor }">
                      <span class="d-dot2"><img src="../../assets/d-dot2.png"></span><span class="content"><span style="font-size:14px;color:#000000;font-weight:normal;font-style:normal;text-decoration:none;line-height:14px;font-family:微软雅黑">123123</span></span>
                    </div>
                  </div>
                </div>
                <div class="clearboth">
                </div>
                <div class="dialogue-in contentMessage" name="">
                  <p class="dialogue-pic">
                    <img :src="robotIco">
                  </p>
                  <div class="dialogue-in-r">
                    <p class="in-name">
                      机器人
                    </p>
                    <div class="dialogue-in-c">
                      <span class="d-dot1"><img src="../../assets/d-dot1.png"></span><span class="content">我正在学习中</span>
                    </div>
                  </div>
                </div>
                <div class="clearboth">
                </div>
                <div class="dialogue-in contentMessage" name="">
                  <p class="dialogue-pic">
                    <img :src="clientIco">
                  </p>
                  <div class="dialogue-in-r">
                    <p class="in-name">
                      客服
                    </p>
                    <div class="dialogue-in-c">
                      <span class="d-dot1"><img src="../../assets/d-dot1.png"></span><span class="content">我正在学习中</span>
                    </div>
                  </div>
                </div>
                <div class="clearboth">
                </div>
              </div>
              <!--dialogue-record-c end-->
            </div>
            <!--dialogue-record end-->
            <div class="dialogue-area">
              <div id="expander">
              </div>
              <div class="dialogue-area-top">
                <span class="messagerecord">消息记录</span>
                <div class="area-top-p" id="face_08" >
                  <span class="tool" v-for="item in toolsList" :key="item.index" v-show="showTools(item.label)" ><img :src="item.url"></span>
                </div>
                <!--label-pop end-->
              </div>
              <!--dialogue-area-top end-->
              <div class="dialogue-area-text">
                <div class="dialogue-area-write" contenteditable="true" style="display: block; color: rgb(0, 0, 0); font-weight: normal; font-style: normal; text-decoration: none; font-size: 14px; line-height: 14px; font-family: 微软雅黑;">
                </div>
              </div>
              <!--dialogue-area-text end-->
            </div>
            <!--dialogue-area end-->
            <div class="dialogue-area-btn">
              <a id="close">结束对话</a>
              <a class="send">发送</a>
              <a class="send-select">&nbsp;</a>
            </div>
            <!--dialogue-area-btn end-->
            <div class="dialogue-area-bottom">
              <p>
                <a href="http://www.any800.com/" target="_blank"><img src="../../assets/watermarkPC.png"></a>
              </p>
            </div>
            <!--dialogue-area-bottom end-->
          </div>
          <!--dialogue-c end-->
        </div>
        <!--dialogue end-->
      </div>
      <!--gap end-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'pcpreview',
  data () {
    return {
      toolsList: [{
        index: 0,
        url: require('../../assets/f.png'),
        label: '常见问题'
      }, {
        index: 1,
        url: require('../../assets/font.png'),
        label: '字体'
      }, {
        index: 2,
        url: require('../../assets/face.png'),
        label: '表情'
      }, {
        index: 3,
        url: require('../../assets/save.png'),
        label: '保存对话记录'
      }, {
        index: 4,
        url: require('../../assets/pingjia.png'),
        label: '满意度评价'
      }, {
        index: 5,
        url: require('../../assets/transfer.png'),
        label: '发送文件'
      }, {
        index: 6,
        url: require('../../assets/yuyin.png'),
        label: '语音'
      }, {
        index: 7,
        url: require('../../assets/sendPic.png'),
        label: '发送图片'
      }, {
        index: 8,
        url: require('../../assets/screenshotLeft.png'),
        label: '屏幕截图'
      }],
      swiperOption: {
        autoplay: 1000,
        loop: true,
        height: '426px',
        calculateHeight: true
      }
    }
  },
  computed: {
    backgroundImg () {
      return this.$attrs.preview.backgroundImg
    },
    visitorIco () {
      return this.$attrs.preview.visitorIco
    },
    clientIco () {
      return this.$attrs.preview.clientIco
    },
    robotIco () {
      return this.$attrs.preview.robotIco
    },
    title () {
      return this.$attrs.preview.title
    },
    langType () {
      return this.$attrs.preview.langType
    },
    logo () {
      return this.$attrs.preview.logo
    },
    activeColor () {
      return this.$attrs.preview.activeColor
    },
    toolsSelect () {
      return this.$attrs.preview.toolsSelect
    },
    tabConfig () {
      return this.$attrs.preview.tabConfig
    },
    backgroundDiv () {
      return {
        backgroundImage: 'url(' + this.backgroundImg + ')'
      }
    }
  },
  methods: {
    showTools (label) {
      return this.toolsSelect.indexOf(label) > -1
    }
  }
}
</script>

<style>
.pcpreview .ucc {
  height: 100%;
  font-size: 9pt;
  width: 100%;
}

.pcpreview .top {
  width: 100%;
}

.pcpreview .top {
  height: 94px;
  border-top: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  background: #f9f9f9;
}

.pcpreview .gap-top {
  height: 74px;
}

.pcpreview .dialogueTitle {
  text-align: center;
  background: #000;
  color: #fff;
  height: 20px;
  line-height: 20px;
}

.pcpreview .gap {
  margin: 0 auto;
  width: auto;
}

.pcpreview .ucc-logo {
  float: left;
  padding-top: 14px;
  padding-left: 28px;
  height: 47px;
}

.pcpreview .main {
  position: absolute;
  top: 76px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: #ebebeb;
}

.pcpreview .main-gap {
  width: 100%;
  min-width: 40pc;
  border-right: 1px solid #d7d7d7;
  background: #fff;
}

.pcpreview .main-gap {
  height: 100%;
  border-left: 1px solid #d7d7d7;
}

.pcpreview .info-top {
  height: 36px;
  background: url(../../assets/info-top-bg.gif) repeat-x;
}

.pcpreview .dialogue {
  position: absolute;
  top: 0;
  right: 30%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
}

.pcpreview .dialogue-c {
  width: 100%;
}

.pcpreview .dialogue-record {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 164px;
  left: 0;
}

.pcpreview .dialogue-c .watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -18px;
  margin-left: -63px;
}

.pcpreview .dialogue-date {
  padding-top: 4px;
  color: #999;
  text-align: center;
  font-size: 9pt;
}

.pcpreview .dialogue-in,.pcpreview .dialogue-me {
  position: relative;
  margin-top: 11px;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
}

.pcpreview .dialogue-record .clearboth {
  margin-bottom: 10px;
}

.pcpreview .dialogue-in .dialogue-pic {
  position: absolute;
  left: 10px;
  width: 38px;
}

.pcpreview .dialogue-in .dialogue-in-r {
  display: block;
  margin: 0 55px;
}

.pcpreview .in-name {
  margin-left: 8px;
  color: #666;
  font-size: 9pt;
}

.pcpreview .dialogue-in .dialogue-in-c {
  position: relative;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
  padding: 4px 10px;
  min-height: 20px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background: #f1fafe;
  color: #171717;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 20px;
}

.pcpreview .dialogue-in .d-dot1 {
  position: absolute;
  border-radius: 50%;
  top: 7px;
  left: -9px;
}

.pcpreview .dialogue-pic img {
  width: 38px;
  height: 38px;
}

.pcpreview .dialogue-me .dialogue-pic {
  position: absolute;
  right: 10px;
  width: 38px;
}

.pcpreview .dialogue-me .dialogue-in-r {
  display: block;
  margin: 0 55px;
  min-height: 10px;
}

.pcpreview .dialogue-me .dialogue-in-c {
  position: relative;
  float: right;
  margin-top: 5px;
  margin-right: 5px;
  padding: 4px 10px;
  min-height: 20px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  background: #a0e2fd;
  color: #333;
  word-wrap: break-word;
  font-size: 9pt;
  line-height: 20px;
}

.pcpreview .dialogue-me .d-dot2 {
  position: absolute;
  top: 7px;
  right: -9px;
}

.pcpreview .dialogue-me .in-name {
  float: right;
  margin-right: 8px;
  width: 100%;
  text-align: right;
}

.pcpreview .dialogue-c p a.download {
  margin-left: 10px;
  color: #069dd5;
  text-decoration: underline;
  font-size: 9pt;
}

.pcpreview .dialogue-area {
  position: absolute;
  right: 0;
  bottom: 38px;
  left: 0;
  height: 126px;
}

.pcpreview .dialogue-in .dialogue-in-c img,.pcpreview .dialogue-me .dialogue-in-c img {
  max-width: 100%;
}

.pcpreview .dialogue-area-top {
  height: 30px;
  background: #f4f4f4;
}

.pcpreview .dialogue-area-top .messagerecord {
  float: right;
  margin-right: 10px;
  line-height: 30px;
  cursor: pointer;
  font-size: 9pt;
}

.pcpreview .dialogue-record-c {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 20px;
}

.pcpreview .dialogue-area-btn {
  position: absolute;
  right: 0;
  bottom: 14px;
  margin: 0 auto;
  height: 24px;
}

.pcpreview .dialogue-area-btn a {
  cursor: pointer;
  bottom: 0;
  display: inline-block;
  margin-right: 10px;
  width: 71px;
  height: 24px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  background: #069dd5;
  color: #fff!important;
  text-align: center;
  text-decoration: none;
  line-height: 24px;
}

.pcpreview .dialogue-area-btn a:hover {
  background: #45c1ef;
}

.pcpreview .dialogue-area-btn a.send {
  margin-right: 0;
  width: 66px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-align: center;
  text-decoration: none;
}

.pcpreview .dialogue-area-btn a.send:hover {
  background: #45c1ef;
}

.pcpreview .dialogue-area-btn a.send-select {
  position: relative;
  left: -6px;
  margin-right: 0;
  width: 20px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  background: #069dd5 url(../../assets/d-dot4.png) no-repeat center center;
}

.pcpreview .dialogue-area-bottom {
  position: absolute;
  bottom: 0;
  margin-top: 5px;
  width: 100%;
  height: 8px;
  border-top: 1px solid #e7e7e7;
}

.pcpreview .dialogue-area-bottom p {
  position: relative;
}

.pcpreview .dialogue-area-bottom img {
  position: absolute;
  top: -19px;
  left: 1pc;
}

.pcpreview .dialogue-area-text {
  position: absolute;
  top: 33px;
  right: 5px;
  bottom: 5px;
  left: 0;
  overflow: hidden;
  padding: 5px 0 0 10px;
  background: #fff;
  word-wrap: break-word;
}

.pcpreview .dialogue-area-write {
  width: 100%;
  height: 100%;
  display: none;
  outline: 0;
  border: none;
  background: none;
  color: #999;
  -webkit-user-modify: read-write-plaintext-only;
  -moz-user-modify: read-write-plaintext-only;
  user-modify: read-write-plaintext-only;
  overflow-y: auto;
  text-decoration: none;
  outline-width: 0px;
}

.pcpreview .area-top-p {
  padding-top: 2px;
  padding-left: 5px;
  height: 30px;
}

.pcpreview .area-top-p span {
  display: inline;
  padding-top: 4px;
  float: left;
  width: 24px;
  height: 20px;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  cursor: pointer;
}

.pcpreview .area-top-p span:hover {
  border: 1px solid #bfbfbf;
  background: #dedede;
}

.pcpreview .area-top-p span.click {
  border: 1px solid #bfbfbf;
  background: #e9e9e9;
}

.pcpreview .area-top-p span img {
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

.pcpreview .clearboth {
  clear: both;
}

.pcpreview .tab_info {
  position: absolute;
  right: 0;
  box-sizing: border-box;
  width: 30%;
  background: #f7f7f7;
  height: 100%;
  border-left: 1px solid #d7d7d7;
}

.pcpreview .tab_info .tab_title {
  position: relative;
  background: url(../../assets/tab-bg.gif) repeat-x;
  height: 36px;
  overflow: hidden;
}

.pcpreview .tab_info .tab_title span {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 31px;
  padding-right: 10px;
  line-height: 30px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-indent: 10px;
  margin-top: 5px;
  color: #b7b7b7;
  cursor: pointer;
}

.pcpreview .tab_info .tab_title span.active {
  color: #326c2f;
  background-image: url(../../assets/tab-control_tab_li.png);
}

.pcpreview .tab_info .tab_title span i {
  position: absolute;
  right: 6px;
  top: 8px;
  width: 15px;
  height: 15px;
  background-image: url(../../assets/tab-control_tab_li.png);
  background-position: -80px -40px;
}

.pcpreview .tab_info .tab_title span.active i {
  background-position: -80px 0px;
}

.pcpreview .tab_info .tab_main {
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
}

.pcpreview .tab_info .tab_main .iframe {
  height: 100%;
  display: none;
}

.pcpreview .tab_info .tab_main .iframe.active {
  display: block;
}

.pcpreview .tab_info .tab_main .iframe iframe {
  height: 100%;
  width: 100%;
}

.pcpreview .tabConfigWeb{
  height: 100%;
}

.pcpreview .tabConfigWeb iframe{
  border: 0;
  height: 100%;
}
</style>
