import Vue from 'vue'
import Router from 'vue-router'

import busjiankong from '@/pages/busjiankong'
import linejiankong from  '@/pages/linejiankong'
import guiji from  '@/pages/guiji'
import xianluyanshi from  '@/pages/xianluyanshi'
import xianluedit from  '@/pages/xianluedit'
import driverlist from  '@/pages/driverlist'
import buslist from  '@/pages/buslist'
import test from  '@/pages/test'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/busjiankong',
      name: '车辆监控',
      component: busjiankong
    },
    {
      path: '/linejiankong',
      name: '线路监控',
      component: linejiankong
    },
    {
      path: '/guiji',
      name: '轨迹回放',
      component: guiji
    },
    {
      path: '/xianluyanshi',
      name: '线路演示',
      component: xianluyanshi
    },
    {
      path: '/xianluedit',
      name: '线路管理',
      component: xianluedit
    },
    {
      path: '/driverlist',
      name: '驾驶员管理',
      component: driverlist
    },
    {
      path: '/buslist',
      name: '车辆管理',
      component: buslist
    },
    {
      path: '/test',
      name: '测试页面',
      component: test
    }
  ]
})
