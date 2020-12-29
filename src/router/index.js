import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

//一级路由
import login from "../pages/login/login"
import index from "../pages/index/index"
// 二级路由
import menu from  "../pages/menu/menu"
import role from "../pages/role/role"
import manage from "../pages/manage/manage"
import cate from "../pages/cate/cate"
import spec from "../pages/spec/spec"
import goodsman from "../pages/goodsman/goodsman"
import member from "../pages/member/member"
import banner from "../pages/banner/banner"
import seskill from "../pages/seskill/seskill"

export let routePath=[
  {
    path:"/menu",
    component:menu,
    name:"菜单管理"
  },
  {
    path:"/role",
    component:role,
    name:'角色管理'
  },
  {
    path:"/manage",
    component:manage,
    name:'管理员管理'
  },
  {
    path:"/cate",
    component:cate,
    name:"商品分类"
  },
  {
    path:"/spec",
    component:spec,
    name:"商品规格"
  },
  {
    path:"/goodsman",
    component:goodsman,
    name:"商品管理"
  },
  {
    path:"/member",
    component:member,
    name:"会员管理"
  },
  {
    path:"/banner",
    component:banner,
    name:"轮播图管理"
  },
  {
    path:"/seskill",
    component:seskill,
    name:"秒杀活动"
  },
]

export default new Router({
  routes: [
      {
        path:"/login",
        component:login
      },
      {
        path:'*',
        component:index,
        children:[
          ...routePath
        ]
      },
  ]
})


