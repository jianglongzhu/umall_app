import { data } from "autoprefixer"
import axios from "axios"
import qs from "qs"
import Vue from "vue"

// 开发环境 ：8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 响应拦截
axios.interceptors.response.use(res => {
    console.group("请求的路由地址是:" + res.config.url)
    if (res.data.code == 200) {
        console.log(res)
    }

    console.groupEnd();

    // 当请求列表的数据为空时，赋值为一个空数组
    if (!res.data.list) {
        res.data.list = [];
    }
    return res
})

// post请求时，参数有文件上传时的处理  使用formdata
function dataToFormData(user) {
    let data = new FormData();
    for (let i in user) {
        data.append(i, user[i]);
    }
    return data;
}


/* -----------------菜单管理----------------------- */
// 菜单列表
export let reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }

    })
}

// 菜单添加
export let reqMenuAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 菜单删除
export let reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id })

    })
}

// 菜单修改
export let reqMenuUpdate = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 获取菜单信息
export let reqMenuInfo = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: 'get',
        params: {
            id,
        }
    })
}
/* -----------------菜单管理结束----------------------- */


/* -------------------角色管理-------------------- */
// 角色列表
export let reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}
//角色添加
export let reqRoleAdd = (role) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(role)
    })
}
// 角色删除
export let reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id, })

    })
}

// 角色获取
export let reqRoleInfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id,
        }
    })
}

// 角色修改
export let reqRoleUpdata = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: qs.stringify(obj)
    })
}
/* ------------------角色管理结束------------------ */

/* ------------------管理员管理------------------ */
// 管理员添加
export let reqManAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 管理员列表
export let reqManList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}
// 管理员总数
export let reqManTotal = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"

    })
}
// 管理员删除
export let reqManDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid, })
    })
}
// 管理员修改
export let reqManUpdata = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 获取管理员信息一条
export let reqManInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid
        }
    })
}
/* -------------------管理员管理结束-------------- */



/* -------------------商品分类-------------- */
// 商品添加
export let reqGoodAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

// 商品分类列表
export let reqGoodList = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: obj
    })
}

// 商品分类一条获取
export let reqGoodInfo = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: "get",
        params: {
            id,
        }
    })
}

// 修改
export let reqGoodUpdata = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(user)
    })
}

// 删除
export let reqGoodDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id,
        })
    })
}
/* -------------------商品分类结束-------------- */

/* -------------------轮播图管理--------------------- */
// 轮播图添加
export let reqBannerAdd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })

}
// 轮播图列表
export let reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get"
    })
}

//轮播图获取一条
export let reqBannerInfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id
        }
    })
}

// 轮播图修改
export let reqBannerUpdata = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

// 轮播图删除
export let reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id,
        })
    })
}



/* -------------------轮播图管理结束--------------------- */

/* -------------------会员管理--------------------- */
// 会员列表
export let reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}


// 会员一条信息
export let reqMemberInfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid,
        }
    })
}

// 会员修改
export let reqMemberUpdata = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}

/* -------------------会员管理结束--------------------- */

/* -------------------商品规格--------------------- */
// 规格添加
export let reqSpeAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)

    })
}


// 商品规格总数
export let reqSpeTotal = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get"
    })
}

// 商品规格列表
export let reqSpeList = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: obj
    })
}

// 商品规格一条
export let reqSpeInfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id,
        }

    })
}

// 商品规格修改
export let reqSpeUpdate = (obj) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(obj)

    })
}

// 商品规格删除
export let reqSpeDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: {
            id,
        }

    })
}
/* -------------------商品规格结束--------------------- */
/* -------------------商品管理--------------------- */
// 商品添加
export let reqGManAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(obj)
    })
}

// 商品总数
export let reqGManTotal = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })

}

// 商品列表
export let reqGManlist=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:'get',
        params:obj
    })
}

// 商品详情获取
export let reqGManinfo=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id,
        }
    })
}

// 商品修改
export let reqGManUpdate=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:dataToFormData(obj)
    })
}

// 商品删除
export let reqGMamDel=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:'post',
        data:qs.stringify({id,})
    })
}
/* -------------------商品管理结束--------------------- */

/* -------------------秒杀活动--------------------- */
//秒杀添加
export let reqSekillAdd=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 秒杀列表
export let reqSekillList=()=>{
    return axios({
        url:baseUrl+"/api/secklist",
        method:"get"
    })
   
}
// 秒杀获取详情
export let reqSekillDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:{
            id,
        }
    })
}

// 秒杀修改
export let reqSekillUpdata=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:'post',
        data:qs.stringify(obj)
    })
   
}

// 秒杀删除
export let reqSekillDel=(id)=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify({id})
    })
}
/* -------------------秒杀活动结束--------------------- */