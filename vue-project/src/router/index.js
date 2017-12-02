import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import index from '../pages/index'
import pageQuiButton from '../pages/pageQuiButton'
import pageQuiList from '../pages/pageQuiList'
import pageQuiNav from '../pages/pageQuiNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path:'/btn',
      name:'btn',
      component:pageQuiButton
    },{
      path:'/list',
      name:'list',
      component:pageQuiList
    },{
      path:'/nav',
      name:'nav',
      component:pageQuiNav
    }
  ]
})
