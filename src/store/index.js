import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,mutations,getters} from "./mutations"
import cate  from "./modules/cate"
import spec from "./modules/spec"
import goodsman from "./modules/goodsman"
import seskill from "./modules/sekill"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        cate,
        spec,
        goodsman,
        seskill
    }

})