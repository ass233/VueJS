<template>
	<div>
		<div class="brand-list" flex="dir:top">
			<div flex-box="0" flex="dir:left box:mean" class="list-top">
				<div flex="cross:center main:center" flex-box="1">排序</div>
				<div flex="cross:center main:center" flex-box="1">提交时间</div>
				<div flex="cross:center main:center" flex-box="1">提交商户</div>
				<div flex="cross:center main:center" flex-box="2">商品名称</div>
				<div flex="cross:center main:center" flex-box="2">用户信息</div>
				<div flex="cross:center main:center" flex-box="2">操作</div>
			</div>
			<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg'>
				<div flex="dir:top cross:center main:center" flex-box="1" class="id">
					<span>{{item.commodity_id}}</span>			
				</div>
				<div flex-box="1" class="brand" flex="cross:center main:center">
					<div class="space" flex="cross:center main:center" >
						<span>{{item.create_time | times}}</span>
					</div>
				</div>
				<div flex="cross:center main:center" flex-box="1" class="country">
					<div class="space" flex="cross:center main:center">
						<span>{{item.seller_name}}</span>
					</div>
				</div>
				<div flex="cross:center main:center" flex-box="2" class="country">
					<div class="space" flex="cross:center main:center">
						<span>{{item.commodity_name}}</span>
					</div>
				</div>
				<div class="para" flex-box="2" flex="cross:center main:center">
					<div flex="dir:top cross:center main:center" class="space">
						<span>{{item.phone_num}}</span>
						<span>{{item.username}}</span>
					</div>
				</div>
				<div flex="dir:top cross:center main:center" flex-box="2" @click="ghg(item.user_want_id,item.return_visit_record)">
					<div class="edit add" v-if="item.return_visit_record=='' || item.return_visit_record==null">处理</div>
					<div class="add" v-else>{{item.return_visit_record}}</div>
				</div>
			</div>
		</div>
		<div class="YY-modal" v-if="modal">
		</div>
		<div class="YY-modal-title" v-if="modal">
			<span>处理结果</span><span v-if="modal" @click="modal=!modal">x</span>
			<textarea name="" v-model="description"></textarea>
			<button class="YY-button" @click="Trans">保存</button><button type="" v-if="modal" @click="modal=!modal">取消</button>
		</div>
    </div>
</template>
<script>
import oppo from '../../../api/opportunity'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
				modal: false,
				description:null,
				id:null,
			}
		},
		filters:{
			times:function(value){
				let date = new Date(value);
			    let seperator1 = "/";
			    let seperator2 = ":";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			           + " " + date.getHours() + seperator2 + date.getMinutes();
			    return currentdate;
			}
		},
		name:'brand-list',
		methods:{
			ghg(id,text){
				this.modal=true
				this.description=text
				this.id=id
			},
			Trans(){
				oppo.UpdateVisitRecord(this,oppo.getList)
			}
		},
		computed:{
			msg(){
            	return this.$store.state.opportunity.list
            }
		}
	}
</script>
<style scoped lang='scss'>
	.YY-modal{
		height: 100%;
		width: 100%;
		position: fixed;
		background: #000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		opacity:0.5;
	}
	.YY-modal-title{
		height: 342px;
		width:720px;
		background: #fff;
		position: fixed;
		z-index: 999;
		left: 50%;
		top: 50%;
		margin-left: -360px;
		margin-top: -171px;
		border-radius: 4px;
		span:nth-child(1){
			display:block;
			font-size:20px;
			float: left;
			margin: 30px 0 0 40px;
		}
		span:nth-child(2){
			float: right;
			color: #fff;
			height:25px;
			width:25px;
			background: #E3EEF3;
			border-radius: 50%;
			text-align: center;
			margin: 10px 10px 0 0;
			cursor: pointer;
		}
		textarea{
			height: 141px;
			width: 639px;
			margin: 40px;
			max-height: 141px;
			max-width: 639px;
			background: #FBFBFB;
			border-radius: 4px;
			outline: none;
			border: none;
		}button{
			height: 30px;
			width: 125px;
			margin:0 auto;
			border: none;
			outline: none;
			cursor: pointer;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #FFFFFF;
			letter-spacing: 0px;
			margin-left:150px;
			border-radius: 4px;
		}
		.YY-button{
			background: #53AAE6;
			border-radius: 4px;
		}
	}
	.brand-list{
		width: 980px;
		margin:5px auto 0;
		.all-close{
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
