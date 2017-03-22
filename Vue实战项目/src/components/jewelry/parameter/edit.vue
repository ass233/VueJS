<template>
	<div calss="Create" flex="dir:top">
		<topList :list-msg="list"></topList>
		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
				<span flex-box="0">所属分组</span>
				<select v-model='choose_parameter' v-if="parameterList!=null">
				 	<option v-for="item in parameterList" :value="item.parameter_group_id" >{{item.parameter_group_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">名称</span>
				<input flex-box="0" type="text" name="" v-model='parameter_name'>
			</li>
			<li flex="dir:left cross:center"> 
			    <span flex-box="0">归类</span>
			    <ul>
				    <li class="Hq_label" v-for="item in category">
					    <input type="checkbox" :value="item.category_id" :id="item.category_id" v-model="choose_category"/>
						<label :for="item.category_id">{{item.category_name}}</label>
				    </li>			    	
			    </ul>
			</li>
			<li class="space_line"></li> 
			<li flex="dir:left cross:center">
				<span flex-box="0">参数类型</span>
				<select v-model='choose_kind' :disabled="change">
				 	<option v-for="item in kind" :value="item.id" >{{item.name}}</option>
				</select>
			</li> 
			<li flex="dir:left cross:center" v-if="choose_kind!=4">
				<span flex-box="0">单位</span>
				<input flex-box="0" type="text" v-model='unit'>
			</li>	
			<li flex="dir:left cross:center" v-for="(item,index) in option" v-if="choose_kind!=1&&choose_kind!=4">
				<span flex-box="0">选项{{index+1}}</span>
				<input flex-box="0" type="text" v-model='item.name'>
				<span class="delete" @click="delete_option(index)">删除</span>
			</li>
			<li flex="dir:left" v-if="choose_kind!=1&&choose_kind!=4">
				<p class="add-new" @click="add_option">新增选项</p>
			</li>
			<li flex="dir:left main:center">
				<div class="save" @click="save">保存</div>
				<div class="give-up" @click="goback">放弃编辑</div>
			</li>
		</ul>
	</div>
</template>
<script>
import CommonApi from '../../../api/Common'
import ParameterApi from '../../../api/Parameter'
import topList from '../../list/list'
	export default {
		name:'CreateBrand',
		data(){
			return{
				list:['珠宝库','>','参数管理','>','编辑参数'],
				change:false,
				parameter_name:null,
				choose_parameter:null,
				parameterList:null,
				category:null,
				choose_category:[],
				unit:null,
				choose_kind:1,
				kind:[{
					id:1,
					name:'文本录入'
				},{
					id:2,
					name:'复选项（多选一）'
				},{
					id:3,
					name:'复选项（多选多）'
				},{
					id:4,
					name:'文本域'
				}],
				option:[{
					name:null
				},{
					name:null
				}],
			}
		},
		components:{
			topList
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			save(){
				if(this.$route.query.parameter_id){
					ParameterApi.update(this)
				}else{
					ParameterApi.add(this)
				}
			},
			add_option(){
				let newOption={}
				newOption.name=null
				this.option.push(newOption)
			},
			delete_option(index){
				this.option.splice(index,1)
			}
		},
		mounted(){
			CommonApi.category(this,1)
			ParameterApi.getGroup(this)
			ParameterApi.getEdit(this)
		}
	}
</script>
<style scoped lang='scss'>
	$backGd:#FBFBFB;
	$borderRadius:4px;
	$inputBg:#FBFBFB;
	.Hq_Create{
		background: #fff;
		margin:20px auto 0; 
		padding: 0 180px 20px;
		width: 600px;
		input,select{
			text-indent: 15px;
			outline: none;
			background: $backGd;
			border-radius: 4px;
			border:none;
			height: 30px;
			width:288px;
		}
		>li{
			font-size: 14px;
			color: #454953;
			letter-spacing: 0px;
			margin: 20px 0;
			min-height: 30px;
			.add-new{
				cursor: pointer;
				margin-left: 92px;
				font-size: 12px;
				color: #53AAE6;
				letter-spacing: 0px;
			}
			>span:first-child{
				font-weight: bold;
				text-align: justify;
				text-align-last:justify;
				width: 70px;
				padding-right: 20px;
				position: relative;
			}
			>span:first-child:after{
				position: absolute;
				content: ':';
				width: 10px;
				height: 100%;
				top: 0;
				right: 0;
			}
			.delete{
				cursor: pointer;
				margin-left: 15px;
				font-size: 12px;
				color: #53AAE6;
				letter-spacing: 0px;
			}
			.Hq_logo{
				height: 100px;
				width: 100px;
				background-image:url(../../../assets/images/form_logo_increase.png);
				background-repeat: no-repeat;
				background-size:15% contain;
				background-position: center 20px;
				border: 1px solid #E0E0E0;
				border-radius: $borderRadius;
				display: inline-block;
				position: relative;
				overflow: hidden;
				#Upload{
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: 3;
				}
				img{
					z-index: 2;
					position: absolute;
					display: block;
					width: auto;
					height: 100%;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.Hq_logo:after{
				position:absolute;
				content:'点击上传';
				width: auto;
				height: 20px;
				font-size: 12px;
				color: #7BC3F5;
				letter-spacing: 0px;
				font-weight: bold;
				left: 50%;
				transform: translate(-50%,65px);
				z-index: 1
			}
			textarea{
				height:130px;
				width: 520px;
				padding:5px;
				max-width: 527px;
				max-height: 140px;
				outline: none;
				border: none;
				background:$inputBg;
				border-radius: $borderRadius;
			}
			.save,.give-up{
				height: 30px;
				width: 130px;
				text-align:center;
				line-height: 30px;
				background: #53AAE6;
				border-radius:$borderRadius;
				color: #fff;
				cursor: pointer;
			}
			.give-up{
				margin-left: 70px;
				background: #E4EBF0;
			}
		}
		.space_line{
			min-height:0px;
			border:1px dashed #ebebeb;
		}
		.Hq_label{
			float: left;
			height: 30px;
			width: auto;
			padding-left: 50px;
			label{
				display: block;
				position: relative;
				line-height: 30px;
				width: 100%;
				text-align: right;
				cursor:pointer;
			}
			input[type=checkbox],input[type=checkbox]:checked{
				display: none
			}
			input[type=checkbox]:checked+label:after,input[type=checkbox]+label:after{
				position: absolute;
				top: 50%;
				left:0;
				transform: translate(-35px,-50%);
				content: "\2714";
				width:20px;
				height: 20px;
				text-align: center;
				line-height: 20px;
				background: #53AAE6;
				color: white;
				border-radius: 50%;
			}
			input[type=checkbox]+label:after{
				content: "";
				background: #FBFBFB;
			}
		}
	}
</style>
