<template>
	<div class="series-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">ID</div>
			<div flex="cross:center main:center" flex-box="2">所属品牌</div>
			<div flex="cross:center main:center" flex-box="3">系列名称</div>
			<div flex="cross:center main:center" flex-box="3">旗下款式</div>
			<div flex="cross:center main:center" flex-box="2">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="1" class="id">
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.series_id}}</span>
				<span v-if="item.status==2">停用中</span>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="brand">
				<div flex="cross:center main:center" class="space">	
					<span>{{item.brand.brand_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="3" class="series">
				<div flex="cross:center main:center" class="space" @click="go_style_list(item.series_id,item.brand.brand_id)">	
					<span v-if="item.series_name!=''">{{item.series_name}}</span>
					<span v-else>无系列</span>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" class="para" flex-box="3">
				<div flex="dir:top cross:center main:center" class="space">
					<div v-for="list in item.pl_style_list" :class="{'close':list.status==2}" @click="changestyle(list.style_id)">
						<span>{{list.real_name}}</span>
						<span v-if="list.status==2">(停用)</span>
					</div>
					<div class="add" @click="gotostyle(item.series_id,item.brand.brand_id)">+ 添加款式</div>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="2">
				<div class="edit" @click="changseries(item.series_id,item.brand.brand_id)">编辑系列</div>
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_status(item.series_id,2)">停用</span>
					<span v-if="item.status==2" @click="change_status(item.series_id,0)">启用</span>
					<span @click="change_status(item.series_id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SeriesApi from '../../../api/Series'
import CommonApi from '../../../api/Common'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
			}
		},
		name:'series-list',
		methods:{
			go_style_list(series_id,brand_id){
				window.open(location.pathname+'#/index/jewelry/style?brand_id='+brand_id+'&series_id='+series_id)
			},
			gotostyle(series_id,brand_id){
				this.$router.push({path:'/index/jewelry/style/edit',query:{series_id:series_id,brand_id:brand_id}})
			},
			changestyle(style_id){
				this.$router.push({path:'/index/jewelry/style/edit',query:{style_id:style_id}})
			},
			change_status(id,status){
				if(status==2){
					if(!confirm('确定停用吗？')){return}
				}
				if(status==1){
					if(!confirm('确定删除吗？')){return}
				}
				CommonApi.ChangeStatus(this,2,id,status,SeriesApi.getList)
			},
			changseries(series_id,brand_id){
				this.$router.push({path:'/index/jewelry/series/edit',query:{series_id:series_id,brand_id:brand_id}})
			}
		},
		computed:{
			msg(){
            	return this.$store.state.series.list
            }
		}
	}
</script>
<style scoped lang='scss'>
	.series-list{
		width: 980px;
		margin:5px auto 0;
		.all-close{
			background:rgba(0,0,0,0.1) !important;
			.id,.series,.brand,.para{
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
				min-height: 120px;
				padding: 30px 0;
			}
			.series,.para{
				color: #53AAE6;
				>span{
					cursor:pointer;
				}
				.space span{
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
			.para .space>div{
				margin-top: 13px;
				cursor:pointer;
			}
			.para .space>div:first-child{
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
