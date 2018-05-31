<template>
  <div class="h5preview">
    <div class="dialogueTitle" v-text="title"></div>
    <div id="message" class="dialogue" :style="backgroundDiv">
    <div class="time">
      2018-02-02 15:07:19
    </div>
    <div class="dialogue-me contentMessage" name="">
      <div class="dialogue-pic">
        <img :src="visitorIco">
      </div>
      <div class="dialogue-c" :style="{ background: activeColor }">
        <span class="dialogue-dot2" ><img src="../../assets/dialogue_dot2.png"></span><span class="content">33333333</span>
      </div>
    </div>
    <div class="clearboth">
    </div>
    <div class="time">
      2018-02-02 15:07:26
    </div>
    <div class="dialogue-in contentMessage" name="">
      <div class="dialogue-pic">
        <img :src="robotIco">
      </div>
      <div class="dialogue-name">
      </div>
      <div class="dialogue-c">
        <span class="dialogue-dot1"><img src="../../assets/dialogue_dot1.png"></span><span class="content">
        <div style="font-size:14px;font-weight:normal;font-family:微软雅黑;text-decoration:initial;font-style:normal;color:#000;">
          1111111
        </div>
        </span>
      </div>
    </div>
    <div class="clearboth">
    </div>
    <div class="time">
      2018-02-02 15:07:51
    </div>
    <div class="dialogue-me contentMessage" name="">
      <div class="dialogue-pic">
        <img :src="visitorIco">
      </div>
      <div class="dialogue-c" :style="{ background: activeColor }">
        <span class="dialogue-dot2"><img src="../../assets/dialogue_dot2.png"></span><span class="content">1111111111111</span>
      </div>
    </div>
    <div class="clearboth">
    </div>
    <div class="time">
      16:47:29
    </div>
    <div class="dialogue-in contentMessage" name="">
      <div class="dialogue-pic">
        <img :src="clientIco">
      </div>
      <div class="dialogue-name">
        客服
      </div>
      <div class="dialogue-c">
        <span class="dialogue-dot1"><img src="../../assets/dialogue_dot1.png"></span><span class="content">
          您好！欢迎使用自助服务系统，很高兴为您服务！
        </span>
      </div>
    </div>
    <div class="clearboth">
    </div>
    </div>
    <section class="dialogue-footer">
      <div class="dialogue-footer-search">
        <div class="key-input">
          <div class="dialogue-footer-text" id="dialogue-footer-text" contenteditable="true" style="overflow-y: auto;"></div>
          <div class="talk-btn">
            <a class="talk-add" id="dialogue-biaoqing"><img  src="../../assets/biaoqing.png"></a>
            <a class="talk-add" id="dialogue-send"><img  src="../../assets/send.png"></a>
          </div>
        </div>
      </div>
      <div class="dialogue-footer-cover"></div>
      <div class="clearboth"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'h5preview',
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
    activeColor () {
      return this.$attrs.preview.activeColor
    },
    backgroundDiv () {
      return {
        backgroundImage: 'url(' + this.backgroundImg + ')'
      }
    }
  }
}
</script>

<style>
.h5preview .dialogue {
  padding-left: 3%;
  padding-right: 3%;
  width: 94%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ebebeb;
}

.h5preview .dialogue h3 {
  text-align: center;
  color: #666;
  font-size: 1.375rem;
  font-weight: normal;
  padding-top: 41px;
}

.h5preview .dialogue-in,.dialogue-me {
  position: relative;
  margin: 10px 54px
}

.h5preview .dialogue-in img,.dialogue-me img {
  max-width: 100%;
}

.h5preview .dialogue-in .dialogue-c a["placeholder"]:before,.h5preview .dialogue-me .dialogue-c a["placeholder"]:before {
  content: attr(placeholder);
}

.h5preview .dialogue-pic {
  position: absolute;
  left: -54px;
  top: 10px;
  width: 43px;
  height: 43px;
}

.h5preview .dialogue-pic img {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  float: left;
}

.h5preview .dialogue-c p a.download {
  line-height: 30px;
  vertical-align: top;
  margin-left: 10px;
  font-size: 15px;
  color: #069dd5;
  text-decoration: underline;
}

.h5preview .dialogue-c .content img {
  max-width: 100%;
}

.h5preview .dialogue-c div {
  max-width: 100%;
  word-wrap: break-word;
}

.h5preview .dialogue-c .spans {
  word-break: break-all;
}

.h5preview .dialogue-c .spans,.h5preview dialogue-c a {
  color: #1e93c6;
}

.h5preview .dialogue-dot1 {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 13px;
  height: 12px;
  display: block;
}

.h5preview .dialogue-me .dialogue-pic {
  right: -54px;
  left: auto;
}

.h5preview .dialogue-me .dialogue-c {
  float: right;
  position: relative;
  background: #b8e6f7;
  border: 1px solid #b8e6f7;
  color: #0b3036;
  margin: 10px 0px;
}

.h5preview .dialogue-dot2 {
  position: absolute;
  top: -6px;
  right: -13px;
  width: 13px;
  height: 12px;
  display: block;
}

.h5preview .dialogue-short {
  bottom: 200px;
}

.h5preview .dialogue-short2 {
  padding-bottom: 154px;
}

.h5preview .dialogue h3 {
  font-size: 0.675em;
  padding-top: 10px;
}

.h5preview .dialogue-name {
  padding-top: 10px;
  font-size: 14px;
  color: #999;
  line-height: 14px;
}

.h5preview .dialogue-c {
  float: left;
  position: relative;
  background: #fff;
  border-radius: 7px;
  color: #333;
  padding-top: 10px;
  padding-right: 14px;
  padding-bottom: 10px;
  padding-left: 14px;
  font-size: 16px!important;
  line-height: 24px;
  max-width: 100%;
  margin: 5px 0px 10px 0px;
  word-break: break-all;
  word-wrap: break-word;
}

.h5preview .dialogue-dot1 img {
  width: 6px;
  height: 6px;
}

.h5preview .dialogue-dot2 img {
  width: 6px;
  height: 6px;
}

.h5preview .dialogue-footer-face {
  background: #ebebeb;
  display: none;
}

.h5preview .time {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 34px;
  color: #666;
}

.h5preview .clearboth {
  clear: both;
}

.h5preview .dialogue-footer-face {
  background: #ebebeb;
  display: none;
}

.h5preview .dialogue-footer {
  left: 0;
  bottom: 0;
  width: 94%;
  background: #eee;
  border-top: 1px solid #cfcfcf;
}

.h5preview .dialogue-footer-cover {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  display: none;
  z-index: 99;
}

.h5preview .dialogue-footer-search {
  position: relative;
  height: 48px;
  min-height: 48px;
  background: #e9e9e9;
}

.h5preview .key-input {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
}

.h5preview .dialogue-footer-text {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 33px;
  bottom: 0;
  right: 33px;
  margin: 7px 8px;
  min-height: 34px;
  border-radius: 0.5rem;
  color: #999;
  float: left;
  background: #fff;
  word-wrap: break-word;
  overflow-y: auto;
  overflow-x: hidden;
  line-height: 34px;
  -webkit-user-modify: read-write-plaintext-only;
  -moz-user-modify: read-write-plaintext-only;
  user-modify: read-write-plaintext-only;
}

.h5preview #dialogue-send,.h5preview #dialogue-add {
  float: right;
}

.h5preview .dialogue-footer-text img {
  width: 28px;
}

.h5preview .dialogue-footer-select {
  border-top: 1px solid #d8d5d5;
}

.h5preview .footer-add {
  width: 94%;
  padding-left: 3%;
  padding-right: 3%;
}

.h5preview .dialogue-footer-search a img {
  width: 25px;
  position: relative;
  vertical-align: top;
  margin: 12.5px 8px;
}
.h5preview .dialogueTitle{
  text-align: center;
  width:94%;
  background:#000;
  color:#fff;
}
</style>
