import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"
Vue.use(Router)
//一级路由
import login from "../pages/login/login"
import index from "../pages/index/index"
// 二级路由
import menu from "../pages/menu/menu"
import role from "../pages/role/role"
import manage from "../pages/manage/manage"
import cate from "../pages/cate/cate"
import spec from "../pages/spec/spec"
import goodsman from "../pages/goodsman/goodsman"
import member from "../pages/member/member"
import banner from "../pages/banner/banner"
import seskill from "../pages/seskill/seskill"
import home from "../pages/home/home"
function enterRouter(path, next) {
  if (store.state.list.menus_url.includes(path)) {
    next();
  } else {
    next("/home")
  }

}
export let routePath = [
  {
    path: "/menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      enterRouter("/menu",next)
    }
  },
  {
    path: "/role",
    component: role,
    name: '角色管理',
    beforeEnter(to, from, next) {
      enterRouter("/menu",next)
    }
  },
  {
    path: "/manage",
    component: manage,
    name: '管理员管理',
    beforeEnter(to, from, next) {
      enterRouter("/manage",next)
    }
  },
  {
    path: "/cate",
    component: cate,
    name: "商品分类",
    beforeEnter(to, from, next) {
      enterRouter("/cate",next)
    }
  },
  {
    path: "/spec",
    component: spec,
    name: "商品规格",
    beforeEnter(to, from, next) {
      enterRouter("/spec",next)
    }
  },
  {
    path: "/goodsman",
    component: goodsman,
    name: "商品管理",
    beforeEnter(to, from, next) {
      enterRouter("/goodsman",next)
    }
  },
  {
    path: "/member",
    component: member,
    name: "会员管理",
    beforeEnter(to, from, next) {
      enterRouter("/member",next)
    }
  },
  {
    path: "/banner",
    component: banner,
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      enterRouter("/banner",next)
    }
  },
  {
    path: "/seskill",
    component: seskill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      enterRouter("/seskill",next)
    }
  },
]

let router = new Router({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: '/',
      component: index,
      children: [
        {
          path: "/",
          component: home
        },
        ...routePath
      ]
    },
  ]
})
// 登录拦截（全局守卫）
// 是登录路径进入
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }
  if (store.state.list.username) {
    next();
    return;
  }
  next("/login")
})

export default router


