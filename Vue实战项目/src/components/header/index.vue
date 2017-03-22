<template>
	<div class="header">
		<div class="box" flex="dir:left main:justify">
			<div class="router" flex="dir:left" flex-box="0">
				<div class='cms' @click="gocms">CMS后台</div>
				<div><router-link :to="{path:'/index/weddingDress'}" tag="span">婚纱礼服</router-link></div>
				<div><router-link :to="{path:'/index/jewelry'}" tag="span">珠宝</router-link></div>
				<div><router-link :to="{path:'/index/business'}" tag="span">商家</router-link></div>	    	
			</div>
			<div class="user" flex="dir:left cross:center" flex-box="0">
				<div v-if="username!=null">{{username}}，工作辛苦了</div>
				<div v-if="username!=null">|</div>
				<div class="login" v-if="username!=null" @click="login">切换用户</div>
				<div class="login" v-else @click="login">登录</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'header',
		date(){
			return{
				username:null
			}
		},
		// methods:{
		// 	login(){
		// 		let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		// 		if (keys) {
		// 			for (let i in keys){
		// 				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()+"; path=/";	
		// 			}
		// 		}
		// 		localStorage.setItem("userInfo",null)
		// 		location.href="/cms/login.html"
		// 	},
		// 	gocms(){
		// 		window.open('/cms/message_pool.html')
		// 	}
		// },
		// created(){
		// 	let user=JSON.parse(localStorage.getItem("userInfo"))
		// 	if(user==null || user==""){
		// 		location.href="/cms/login.html"
		// 	}
		// 	this.username=user.realname
		// 	localStorage.setItem("role_id",user.cms_roles[0].cms_role_id)
		// }
	}
</script>
<style scoped lang='scss'>
	.header{
		height: 80px;
		background: #2B3443;
		color: #90969E;
		.box{
			width: 980px;
			margin: auto;
			height: 100%;
			font-size: 0.9rem;
			.router-link-active{
				color: #7BC3F5;
				position: relative;
			}
			.router-link-active:before{
				position: absolute;
				content: "";
				width: 0;
			    height: 0;
			    border-left: 5px solid transparent;
			    border-right: 5px solid transparent;
			    border-bottom: 8px solid #7BC3F5;
				bottom:0;
				left: 50%;
				transform: translate(-50%,15px);
			}
			.router{
				>div{
					cursor:pointer;
					width: 110px;
					text-align: center;
					height: 100%;
					line-height: 80px;
				}
				.cms{
					width: auto;
					margin-right: 50px;
				}
			}
			.user{
				>div{
					margin-left: 8px;
				}
				.login{
					cursor: pointer;
					color: #7BC3F5;
				}
			}
		}
	}
</style>
