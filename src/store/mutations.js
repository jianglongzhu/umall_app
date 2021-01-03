
export let state = {
    // 用本地存储进行赋值
    list: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
}
export let mutations = {
    changelist(state, arr) {
        state.list = arr
        // 同步到本地存储,如果有值进行存储,没有值不进行存储
        if (arr){
            sessionStorage.setItem("user", JSON.stringify(arr))
        } else {
            sessionStorage.removeItem("user")
        }

    }
}
export let getters = {
    list(state) {
        return state.list
    }
}