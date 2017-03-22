import Vue from 'vue'
import router from './router/router'
import store from './vuex/store'
import Resource from 'vue-resource'

Vue.use(Resource)
const app = new Vue({
	router,
	store,
}).$mount('#app')