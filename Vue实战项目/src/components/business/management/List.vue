<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">排序</div>
			<div flex="cross:center main:center" flex-box="3">商家名称</div>
			<div flex="cross:center main:center" flex-box="1">类型</div>
			<div flex="cross:center main:center" flex-box="2">城市</div>
			<div flex="cross:center main:center" flex-box="2" class="course">
				<span>经营范围</span>
				<span class="xtriangle"></span>
				<span class="striangle"></span>
	            <ul class="choose-list" flex="dir:left">	            	
            		<li flex-box="0" :class="{choose_ification:isActive==null}" @click="choose_ification(null)">全部</li>
            		<li flex-box="0" v-for="item in ificationList" :class="{choose_ification:isActive==item.business_classification_id}" @click="choose_ification(item.business_classification_id)">{{item.name}}</li>      
				</ul>
			</div>
			<div flex="cross:center main:center" flex-box="2">商品</div>
			<div flex="cross:center main:center" flex-box="2">操作</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='item in msg' :class="{'all-close':item.status==2}">
			<div flex="dir:top cross:center main:center" flex-box="1" class="id" >
				<img :src="close" class="close-img" v-if="item.status==2">
				<span>{{item.order_num}}</span>
				<span v-if="item.status==2">停用中</span>
			</div>
			<div flex-box="3" class="brand" flex="cross:center main:center" @click='addCompany(item.seller_id)'>
				<div class="space" flex="cross:center main:center" >
					<span>{{item.name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="1" class="country">
				<div class="space" flex="cross:center main:center" v-if="item.category == 1">
					<span>公司</span>
				</div>
				<div class="space" flex="cross:center main:center" v-else>
					<span>工作室</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.city_name}}</span>
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="country">
				<div class="space" flex="cross:center main:center">
					<span>{{item.business_class.name}}</span>
      			</div>
			</div>
			<div class="para" flex-box="2" flex="cross:center main:center">
				<div flex="dir:top cross:center main:center" class="space">
         	 		<div class="addCommodity" v-if="item.commodity_total > 0"  @click="commodity(item.business_class.business_classification_id,item.seller_id,item.name)">编辑商品({{item.commodity_total}})</div>
					<div class="addCommodity" v-else  @click="addCommodity(item.business_class.business_classification_id,item.seller_id)">+ 添加商品</div>
				</div>
			</div>
			<div flex="dir:top cross:center main:center" flex-box="2">
				<div class="edit" @click="changeManagement(item.seller_id)">编辑商家</div>
				<div class="choose" flex="dir:left main:justify">
					<span v-if="item.status==0" @click="change_status(item.seller_id,2)">停用</span>
					<span v-if="item.status==2" @click="change_status(item.seller_id,0)">启用</span>
					<span @click="change_status(item.seller_id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import manApi from '../../../api/management'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
				ificationList:null,
				isActive:null
			}
		},
		name:'brand-list',
    	methods:{
    		choose_ification(val){
    			this.isActive=val
    		},
			addCompany(seller_id){
				window.open(location.pathname+'#/index/business/opportunity?seller_id='+seller_id)
			},
			commodity(id,seller,name){
				if(id==1){
					window.open(location.pathname+'#/index/business/wedding?seller_id='+seller+'&name='+name)
				}else if(id==2){
					window.open(location.pathname+'#/index/business/jewellery?seller_id='+seller+'&name='+name)
				}
			},
			addCommodity(id,seller){
				if(id==1){
					this.$router.push({path:'/index/business/wedding/edit',query:{seller_id:seller}})
				}else if(id==2){
					this.$router.push({path:'/index/business/jewellery/edit',query:{seller_id:seller}})
				}
			},
			change_status(id,status){
				manApi.changeStatus(this,id,status,manApi.getList)
			},
			changeManagement(id){
				this.$router.push({path:'/index/business/management/edit',query:{seller_id:id}})
			},		
  		},
  		computed:{
			msg(){
            	return this.$store.state.management.list
            }
		},
		watch:{
			isActive:function(val,oldVal){
				this.$store.dispatch('management-business_id',val)
				manApi.getList(this)
			}
		},
		created(){
			manApi.ificationList(this)
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
		.list-top>div{
			.triangle{
				width: 0;
				height: 0;
				border-right:7px solid transparent;
				border-left:7px solid transparent;
				}
				.xtriangle{
					@extend .triangle;
					border-top:8px solid #7BC3F5;
					margin: 3px 0 0 5px;
				}
				.striangle{
					@extend .triangle;
					border-bottom:8px solid #7BC3F5;
					margin:0;
					position: absolute;
					margin:20px 0 0 -7px;
					visibility: hidden;
				}
			}
			.course{
				cursor: pointer;
			}
			.choose-list{
				visibility: hidden;
				cursor: pointer;
				height: 57px;
				width: 980px;
				background: #FFFFFF;
				border: 1px solid #7BC3F5;
				border-radius: 1px;
				position: absolute;
				margin-top:52px;
				box-shadow: 0px 5px 8px #888;
				li{
				 	line-height:57px;
				 	padding:0 33px;
					font-size: 12px;
					color: #4A4A4A;
					letter-spacing: 0px;
				}
				.choose_ification{
					color: #7BC3F5
				}			
			}
			.course:hover .choose-list{
				visibility: visible;
			}
			.course:hover .striangle{
				visibility: visible;
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
			word-wrap:break-word;
		}
	}
</style>
