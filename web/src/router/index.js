import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/page/Welcome'
import SetConfig from '@/page/SetConfig'
import AddWebChannel from '@/page/AddWebChannel'
import AddAppChannel from '@/page/AddAppChannel'
import AddWxChannel from '@/page/AddWxChannel'
import H5Appearance from '@/page/H5Appearance'
import H5Preview from '@/page/H5Preview'
import PcAppearance from '@/page/PcAppearance'
import PcPreview from '@/page/PcPreview'
import ChannelManage from '@/page/ChannelManage'
import Channel from '@/page/Channel'
import ChannelDataStatistics from '@/page/ChannelDataStatistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Welcome,
      meta:
      {
        title: '首页'
      }
    },
    {
      path: '/Channel',
      name: '',
      component: Channel,
      meta:
      {
        title: '渠道管理'
      },
      children: [{
        path: '',
        name: 'ChannelManage',
        component: ChannelManage,
        meta:
        {
          title: '渠道管理'
        }
      },
      {
        path: 'AddWebChannel',
        name: 'AddWebChannel',
        component: AddWebChannel,
        meta:
        {
          title: '添加web渠道'
        }
      },
      {
        path: 'AddWxChannel',
        name: 'AddWxChannel',
        component: AddWxChannel,
        meta:
        {
          title: '添加微信渠道'
        }
      },
      {
        path: 'AddAppChannel',
        name: 'AddAppChannel',
        component: AddAppChannel,
        meta:
        {
          title: '添加APP渠道'
        }
      },
      {
        path: 'PcAppearance',
        name: 'PcAppearance',
        component: PcAppearance,
        meta:
        {
          title: '桌面窗口外观'
        }
      },
      {
        path: 'H5Appearance',
        name: 'H5Appearance',
        component: H5Appearance,
        meta:
        {
          title: '手机窗口外观'
        }
      },
      {
        path: 'SetConfig',
        name: 'SetConfig',
        component: SetConfig,
        meta:
        {
          title: '接入对话设置'
        }
      },
      {
        path: 'PcPreview',
        name: 'PcPreview',
        component: PcPreview,
        meta:
        {
          title: 'web预览页面'
        }
      },
      {
        path: 'H5Preview',
        name: 'H5Preview',
        component: H5Preview,
        meta:
        {
          title: 'H5预览页面'
        }
      }]
    },
    {
      path: '/ChannelDataStatistics',
      name: 'ChannelDataStatistics',
      component: ChannelDataStatistics,
      meta:
      {
        title: '渠道数据统计'
      }
    }
  ],
  defaultTile: '首页'
})
