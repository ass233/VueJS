<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">ID</div>
			<div flex="cross:center main:center" flex-box="2">品牌名称</div>
			<div flex="cross:center main:center" flex-box="1">国别</div>
			<div flex="cross:center main:center" flex-box="3">旗下系列</div>
			<div flex="cross:center main:center" flex-box="2">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="1" class="id">
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.brand_id}}</span>
				<span v-if="item.status==2">停用中</span>
			</div>
			<div flex-box="2" class="brand" flex="cross:center main:center"  @click='goseries(item.brand_id)'>
				<div class="space" flex="cross:center main:center" >
					<span>{{item.brand_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="1" class="country">
				<div class="space" flex="cross:center main:center" v-if="item.country">
					<span>{{item.country.country_name}}</span>
				</div>
			</div>
			<div class="para" flex-box="3" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
					<div v-for="list in item.pl_series_list" :class="{'close':list.status==2}" @click="go_style(list.series_id)">
						<span v-if="list.series_name" >{{list.series_name}}</span>
						<span v-else>无系列</span>
						<span v-if="list.status==2">(停用)</span>
					</div>
					<div class="add" @click="add_edit_series(item.brand_id)">+ 添加系列</div>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="2">
				<div class="edit" @click="changBrand(item.brand_id)">编辑品牌</div>
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_status(item.brand_id,2)">停用</span>
					<span v-if="item.status==2" @click="change_status(item.brand_id,0)">启用</span>
					<span @click="change_status(item.brand_id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import BrandApi from '../../../api/Brand'
import CommonApi from '../../../api/Common'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
			}
		},
		name:'brand-list',
		methods:{
			change_status(id,status){
				if(status==2){
					if(!confirm('确定停用吗？')){return}
				}
				if(status==1){
					if(!confirm('确定删除吗？')){return}
				}
				CommonApi.ChangeStatus(this,1,id,status,BrandApi.getList)
			},
			changBrand(brand_id){
				this.$router.push({path:'/index/jewelry/brand/edit',query:{brand_id:brand_id}})
			},
			goseries(brand_id){
				window.open(location.pathname+'#/index/jewelry/series?brand_id='+brand_id)
			},
			add_edit_series(brand_id){
				this.$router.push({path:'/index/jewelry/series/edit',query:{brand_id:brand_id}})
			},
			go_style(series_id){
				window.open(location.pathname+'#/index/jewelry/style?series_id='+series_id)
			}
		},
		computed:{
			msg(){
            	return this.$store.state.brand.list
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
			.id,.country,.brand,.para{
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
			width: 100%;
			background:#ffffff;
			height: auto;
			>div{
				padding: 30px 0;
				min-height: 120px;
			}
			.brand,.para{
				color: #53AAE6;
				cursor:pointer;
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
