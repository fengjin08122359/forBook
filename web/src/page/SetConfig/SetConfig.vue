<template>
  <div class="setConfig">
    <backcol msg="接入对话设置"/>
    <el-row>
      <h6>机器人设置</h6>
      <span>机器人:</span>
      <el-radio v-model="robot" label="1">开启</el-radio>
      <el-radio v-model="robot" label="2">关闭</el-radio>
    </el-row>
    <el-row>
      <h6>接入业务类型设置</h6>
      <ncselectTree :treedata="department" msg="接入业务类型:" ref="ncselectTree"/>
    </el-row>
    <el-row>
      <h6>基本设置</h6>
      <span>收集访客信息:</span>
      <el-radio v-model="visitorInformation" label="1">开启</el-radio>
      <el-radio v-model="visitorInformation" label="2">关闭</el-radio>
    </el-row>
    <el-row>
      <span>留言:</span>
      <el-radio v-model="leaveMessage" label="1">开启</el-radio>
      <el-radio v-model="leaveMessage" label="2">关闭</el-radio>
    </el-row>
    <el-row>
      <span>满意度调查:</span>
      <ncsatisfaction :satisfactiontree="satisfactiontree" v-model="satisfactiondata" ></ncsatisfaction>
      <el-radio v-model="satisfaction" label="1">对话结束,自动推送满意度调查</el-radio>
      <el-radio v-model="satisfaction" label="2">对话结束,不推送满意度调查</el-radio>
    </el-row>
    <el-row>
      <span>坐席工作时间:</span>
      <el-radio v-model="workTime" label="1">开启</el-radio>
      <el-radio v-model="workTime" label="2">关闭</el-radio>
    </el-row>
    <el-row>
      <el-time-picker
        v-model="startTime"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        placeholder="开始时间">
      </el-time-picker>
      <el-time-picker
        v-model="endTime"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        placeholder="结束时间">
      </el-time-picker>
    </el-row>
    <el-row>
      <span>插播广告:</span>
      <el-radio v-model="adv" label="1">开启</el-radio>
      <el-radio v-model="adv" label="2">关闭</el-radio>
    </el-row>
    <el-row>
      <span>提示语设置:</span>
      <el-col :span="8">
        <ul class="list-group" v-for="item in langlist" v-bind:key="item.index">
          <li class="list-group-item" :class="{active: active==item.index}" v-text="item.name" @click="clickList(item.index)"></li>
        </ul>
      </el-col>
      <el-col :span="16">
        <vue-tinymce ref="test2" v-model="content" :setting="setting" v-bind:cur="state">
        </vue-tinymce>
      </el-col>
    </el-row>
    <el-row>
      <span>常见问题设置:</span>
      <el-radio v-model="question" label="1">对话结束,自动推送满意度调查</el-radio>
      <el-radio v-model="question" label="2">对话结束,不推送满意度调查</el-radio>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SetConfig',
  created () {
    this.getData()
  },
  data () {
    return {
      kindeditor: 'kindeditor',
      state: 1,
      robot: '1',
      visitorInformation: '1',
      leaveMessage: '1',
      satisfaction: '1',
      workTime: '1',
      adv: '1',
      question: '1',
      department: [],
      startTime: '',
      endTime: '',
      textarea: '',
      content: '',
      satisfactiontree: [],
      satisfactiondata: '',
      setting: {
        plugins: [
          'autolink link image lists charmap preview hr anchor pagebreak spellchecker',
          'searchreplace visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
          'directionality emoticons template paste textcolor colorpicker textpattern'],
        toolbar: ' undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | link | code',
        statusbar: false,
        menubar: false,
        add_unload_trigger: false,
        language: 'zh_CN',
        paste_auto_cleanup_on_paste: false,
        paste_remove_styles: false,
        paste_remove_styles_if_webkit: false,
        paste_strip_class_attributes: false,
        paste_as_text: true,
        default_link_target: '_blank',
        relative_urls: false,
        remove_script_host: false
      },
      active: 0,
      langlist: [{
        index: 0,
        name: '对话接入中',
        content: '1'
      }, {
        index: 1,
        name: '对话开始提示语',
        content: '2'
      }, {
        index: 2,
        name: '接入欢迎语',
        content: '3'
      }, {
        index: 3,
        name: '欢迎语1',
        content: '4'
      }, {
        index: 4,
        name: '欢迎语2',
        content: '5'
      }, {
        index: 5,
        name: '排队第一位提示语',
        content: '6'
      }, {
        index: 6,
        name: '排队队列位置提示语',
        content: '7'
      }, {
        index: 7,
        name: '微信端访客排队超长提示语',
        content: '8'
      }, {
        index: 8,
        name: '微信端访客排队超时提示语',
        content: '9'
      }, {
        index: 9,
        name: '访客排队超时出列提示语',
        content: '10'
      }]
    }
  },
  watch: {
    active () {
      this.content = this.langlist[this.active].content
    },
    content () {
    }
  },
  methods: {
    clickList (index) {
      this.state = 1
      this.langlist[this.active].content = this.content
      this.$set(this.langlist, this.active, this.langlist[this.active])
      this.active = index
    },
    getData () {
      var that = this
      that.content = this.langlist[this.active].content
      this.$ajax.get('echatManager.do', {
        method: 'getSettingsAndService',
        companyPk: 'ff808081612620ee016126a0c33f0003',
        codeKey: '1'
      }
        , s => {
        that.radio = '2'
      }
        , f => {
        that.radio = '1'
      })
      this.$ajax.get('echatManager.do', {
        method: 'getDepartment',
        companyPk: 'ff808081612620ee016126a0c33f0003',
        codeKey: '1'
      }
        , s => {
      }
        , f => {
        var array = []
        for (var i in f) {
          array.push({
            id: f[i].pk,
            label: f[i].name,
            parentId: f[i].parentPk
          })
        }
        this.department = this.$config.tooTree(array, 'id', 'parentId', '-1')
      })
    }
  }
}
</script>

<style>
.setConfig #editor {
  height: 400px
}
</style>
