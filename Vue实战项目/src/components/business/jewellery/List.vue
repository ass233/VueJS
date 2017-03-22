<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">排序</div>
			<div flex="cross:center main:center" flex-box="2">分类</div>
			<div flex="cross:center main:center" flex-box="2">商品名称</div>
			<div flex="cross:center main:center" flex-box="1">售价(元)</div>
			<div flex="cross:center main:center" flex-box="1">租赁价(元)</div>
			<div flex="cross:center main:center" flex-box="1">状态</div>
			<div flex="cross:center main:center" flex-box="2">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="1" class="id" >
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.order_num}}</span>
				<span v-if="item.status==2">下架</span>
			</div>
			<div flex-box="2" class="brand" flex="cross:center main:center">
				<div class="space" flex="cross:center main:center" >
					<span>{{item.category_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="1" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.sale_value}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="1" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.lease_value}}</span>
				</div>
			</div>
			<div class="para" flex-box="1" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
					<div class="add" v-if="item.status==0">正常</div>
					<div class="add" v-if="item.status==2">下架</div>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="2">
				<div class="edit" @click="changcommon(item.category_id,item.commodity_id)">编辑商品</div>
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_status(item.commodity_id,2)">下架</span>
					<span v-if="item.status==2" @click="change_status(item.commodity_id,0)">上架</span>
					<span @click="change_status(item.commodity_id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import commonlistApi from '../../../api/commodityList'
	export default {
		name:'common-list',
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
			}
		},
		methods:{
			change_status(id,status){
				commonlistApi.UpdateCommodityStatus(this,id,status,commonlistApi.getList)
			},
			changcommon(id,commodity_id){
				this.$router.push({path:'/index/business/jewellery/edit',query:{commodity_id:commodity_id,seller_id:this.$route.query.seller_id}})
			}
		},
		computed:{
			msg(){
            	return this.$store.state.common.list
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
