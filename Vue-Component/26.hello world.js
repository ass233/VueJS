/**
 * Created by 北狼 on 2016/11/17.
 */

// 步骤 1:创建一个Vue实例
var Vue = require('vue')
var app = new Vue({
    render:function (h) {
        return h('p','hello world')
    }
})


// 步骤 2: 创建一个渲染器
var renderer = require('vue-server-render').createRenderer()

// 步骤 3: 将 Vue实例 渲染成 HTML
renderer.renderToString(app,function (error,html) {
    if(error) throw error
    console.log(html)
})