/**
 * Created by 北狼 on 2016/11/17.
 */
const Foo = {template:'<div>foo</div>'}
const Bar = {template:'<div>bar</div>'}


const routes = [
    {path:'/foo',component:Foo },
    {path:'/bar',component:Bar }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')