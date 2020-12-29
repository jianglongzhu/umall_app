import { reqSpeList, reqSpeTotal } from "../../utils/http"
let state ={
    list: [],
    page: 1,
    size: 3,
    pageTotal: 0
}
let mutations = {
    changeList(state, arr) {
         state.list = arr
    },
    changePage(state, num) {
         state.page = num
    },
    changeTotal(state, sum) {
         state.pageTotal = sum
    }
}
let getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    pageTotal(state){
        return state.pageTotal
    }
}
let actions = {
    // 请求列表
    reqList(context,bool) {
        let con=bool?{}:{page: context.state.page, size: context.state.size}
        reqSpeList(con).then((res) => {
            if (res.data.code == 200) {
                if(res.data.list.length==0&&context.state.page>1){
                     context.commit("changePage",context.state.page-1)
                     context.dispatch("reqList")
                     return;
                }
                context.commit("changeList", res.data.list)
            }

        })
    },
    // 请求列表总数
    reqTotal(context) {
        reqSpeTotal().then((res) => {
           if(res.data.code==200){
               context.commit("changeTotal",res.data.list[0].total)
           }
        })
    },
    // 改变页数
    changePages(context,val){
        context.commit("changePage",val)
        context.dispatch("reqList")
    }

}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
}