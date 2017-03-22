import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})


export default store