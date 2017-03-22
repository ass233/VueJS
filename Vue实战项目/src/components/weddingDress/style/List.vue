<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="2">ID</div>
			<div flex="cross:center main:center" flex-box="4">所属品牌名称</div>
			<div flex="cross:center main:center" flex-box="4">系列名称</div>
			<div flex="cross:center main:center" flex-box="6">款式名称</div>
			<div flex="cross:center main:center" flex-box="4">款式图片</div>
			<div flex="cross:center main:center" flex-box="5">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='item in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="2" class="id">
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.style_id}}</span>
				<span v-if="item.status==2">停用中</span>
			</div>
			<div flex-box="4" class="brand">
				<div class="space" flex="cross:center main:center">
					<span>{{item.brand_name}}</span>	
				</div>
			</div>
			<div flex-box="4" class="series">
				<div class="space" flex="cross:center main:center">
					<span>{{item.series_name||'无系列'}}</span>
				</div>
			</div>
			<div flex-box="6" class="style">
				<div class="space" flex="cross:center main:center">
					<span>{{item.real_name}}</span>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" class="para" flex-box="4" @click="gopic(item.style_id)">
				<div class="add" v-if="item.picture_count!=0">编辑图片 ({{item.picture_count}})</div>
				<div class="add" v-else>+ 添加图片</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="5">
				<div class="edit" @click="change_style(item.style_id)">编辑款式</div>
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_status(item.style_id,2)">停用</span>
					<span v-if="item.status==2" @click="change_status(item.style_id,0)">启用</span>
					<span @click="change_status(item.style_id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import CommonApi from '../../../api/Common'
import StyleApi from '../../../api/Style'
	export default {
		name:'style-list',
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),					
			}
		},
		computed:{
			msg(){
            	return this.$store.state.style.list
            }
		},
		methods:{
			change_status(id,status){
				if(status==2){
					if(!confirm('确定停用吗？')){return}
				}
				if(status==1){
					if(!confirm('确定删除吗？')){return}
				}
				CommonApi.ChangeStatus(this,3,id,status,StyleApi.getList)
			},
			gopic(style_id){
				window.open(location.pathname+'#/index/weddingDress/pic?style_id='+style_id)
            },
            change_style(style_id){
            	this.$router.push({path:'/index/weddingDress/style/edit',query:{style_id:style_id}})
            }
		}
	}
</script>
<style scoped lang='scss'>
	.brand-list{
		width: 980px;
		margin:5px auto 0;
		.all-close{
			background:rgba(0,0,0,0.1) !important;
			.id,.country,.brand,.para,.style,.series{
				color: #999999 !important;	
			}
		}
		.list-top,.message{
			height: 50px;
			background: #FFFFFF;
			font-size: 14px;
			color: #383838;
			letter-spacing: 0px;
			border-bottom:1px solid #F4F6F8;
			>div{
				border-right:1px solid #F4F6F8;
			}
			>div:last-child{
				border:none;
			}
		}
		.message{
			background:#ffffff;
			height: auto;
			>div{
				padding: 30px 0;
			}
			.style,.para{
				color: #53AAE6;
				>span{
					cursor:pointer;
				}
			}
			.close-img{
				width: 20px;
				margin-bottom: 4px;
			}
			.close{
				color: #999999;
				>span:last-child{
					margin-left:10px;
				}
			}
			.para>div{
				margin-top: 13px;
				cursor:pointer;
			}
			.para>div:first-child{
				margin-top: 0;
			}
			.edit{
				width: 125px;
				height: 30px;
				background: #53AAE6;
				border-radius: 4px;
				color: #ffffff;
				text-align: center;
				line-height: 30px;
				cursor:pointer;
			}
			.choose{
				width: 100px;
				color: #53AAE6;
				margin-top: 8px;
				>span{
					cursor:pointer;
				}
			}
		}
		.message:nth-child(2n){	
			background: #FBFBFB;
		}
		.space{
			height: 100%;
			text-align: center;
			padding: 0 10%;
		}
	}
</style>
