<template>
	<div class="brand-list" flex="dir:top">
		<div class="message-box" v-for='(list,index) in msg'>
			<div class="parameter_list-name" flex="dir:left cross:center">
				<template v-if="group_num!=index">
					<span class="big">{{list.order_num}}</span>
					<span class="big">{{list.parameter_group_name}}</span>
					<span class="change" @click="change(index)">修改</span>
				</template>
				<template v-else>
					<input class="little-change" type='text' v-model="list.order_num">
					<input class="big-change" type='text' v-model="list.parameter_group_name">
					<span class="change" @click="return_num(list.parameter_group_id,list.order_num,1,list.parameter_group_name)">保存</span>
				</template>
				<span class="change" @click="del_group(list.parameter_group_id)">删除</span>
			</div>
			<div flex-box="0" flex="dir:left box:mean" class="list-top">
				<div flex="cross:center main:center" flex-box="1">序号</div>
				<div flex="cross:center main:center" flex-box="2">参数名称</div>
				<div flex="cross:center main:center" flex-box="1">参数ID</div>
				<div flex="cross:center main:center" flex-box="2">类别</div>
				<div flex="cross:center main:center" flex-box="2">操作</div>
			</div>
			<div flex-box="0" flex="dir:left  box:mean" class="message" v-for="(item,index) in list.parameter_list" :class="{'all-close':item.status==2}">
				<div flex="dir:top cross:center main:center" flex-box="1" class="id" @click.stop="change_order(item.pl_style_parameter_id)">
					<input flex-box="0" type="text" class="change-order" v-model.number='item.order_num' v-if="change_num==item.pl_style_parameter_id" @blur="return_num(item.pl_style_parameter_id,item.order_num,2)">
					<div flex="dir:top cross:center main:center" v-else>
						<img :src="close" class="close-img" v-if="item.status==2">
						<span>{{item.order_num}}</span>
						<span v-if="item.status==2">停用中</span>	
					</div>
				</div>
				<div flex="cross:center main:center" flex-box="2" class="brand">
					<span>{{item.parameter_name}}</span>
				</div>
				<div flex="cross:center main:center" flex-box="1" class="country">{{item.pl_style_parameter_id}}</div>
				<div flex="dir:left cross:center main:center" class="para" flex-box="2">
					<p>
						<span v-for="content in item.category_list" flex-box="0">{{content.category_name}}</span>
					</p>
				</div>
				<div flex="dir:top cross:center main:center" flex-box="2">
					<div class="edit" @click="change_parameter(item.pl_style_parameter_id)">编辑参数</div>
					<div class="choose" flex="dir:left main:justify">
						<span v-if="item.status==0" @click="change_status(item.pl_style_parameter_id,2)">停用</span>
						<span v-if="item.status==2" @click="change_status(item.pl_style_parameter_id,0)">启用</span>
						<span @click="change_status(item.pl_style_parameter_id,1)">删除</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ParameterApi from '../../../api/Parameter'
import CommonApi from '../../../api/Common'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
				change_num:null,
				group_num:null,
			}
		},
		name:'para-list',
		methods:{
			change_parameter(parameter_id){
				this.$router.push({path:'/index/jewelry/parameter/edit',query:{parameter_id:parameter_id}})
			},
			change(val){
				this.group_num=val
			},
			change_order(id){
				this.change_num=id
			},
			return_num(id,order,type,name){
				ParameterApi.ChangeParameterOrderNum(this,id,order,type,ParameterApi.getList,name)
			},
			change_status(id,status){
				if(status==2){
					if(!confirm('确定停用吗？')){return}
				}
				if(status==1){
					if(!confirm('确定删除吗？')){return}
				}
				CommonApi.ChangeStatus(this,5,id,status,ParameterApi.getList)
			},
			del_group(id){
				CommonApi.ChangeStatus(this,6,id,1,ParameterApi.getList)
			}
		},
		computed:{
			msg(){
            	return this.$store.state.parameter.list
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
		.message-box{
			margin-bottom: 30px;
		}
		.message-box:last-child{
			margin-bottom: 0;
		}
		.parameter_list-name{
			background: #D0F3AD;
			height: 50px;
			span{
				font-size: 14px;
				margin-left: 20px;
			}
			.big{
				font-size: 18px;	
				color: #454953;
				letter-spacing: 0px;
			}
			.little-change{
				width: 50px;
			}
			.big-change{
				width: 200px;
			}
			.little-change,.big-change{
				border-radius: 4px;
				text-indent: 15px;
				outline: none;
				border-radius: 4px;
				border:none;
				margin-left: 10px;
			}
			.change{
			    color: #53AAE6;
    			cursor: pointer;
			}
		}
		.message{
			background:#ffffff;
			height: auto;
			>div{
				padding: 30px 0;
			}
			.brand,.para{
				color: #53AAE6;
				>span{
					cursor:pointer;
				}
			}
			.id{
				.change-order{
					width: 80%;
					border: 1px solid rgba(0,0,0,0.22);
					text-align: center;
					border-radius: 4px;
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
			.para{
				>div{
					margin-top: 13px;
					cursor:pointer;
				}
				>div:first-child{
					margin-top: 0;
				}
				p{
					width: 100%;
					padding: 0 10%;
					text-align: center;
				}
				span{
					padding-right: 8px;
				}
				span:after{
					content: "，";
				}
				span:last-child{
					padding-right: 0
				}
				span:last-child:after{
					content: "";
				}
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
	}
</style>
