<template>
	<div calss="Create" flex="dir:top">
		<topList :list-msg="list"></topList>
		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
				<p class="title">
					<span>基本信息</span>
					<span class='red'>*</span>
				</p>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">品牌/系列</span>
				<select v-model='choose_brand' v-if="brandList!=null" @change="put_in_style($event,0)">
				 	<option v-for="item in brandList" :value="item.brand_id">{{item.brand_name}}</option>
				</select>
				<select v-model='choose_series' v-if="seriesList!=null" @change="put_in_style($event,1)">
				 	<option v-for="item in seriesList" :value="item.series_id">{{item.series_name||'无系列'}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">类别</span>
			    <select v-model='choose_category'  v-if="category!=null">
				 	<option v-for="item in category" :value="item.category_id" >{{item.category_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">销售状态</span>
			    <select v-model='choose_sell_status'>
				 	<option v-for="item in sell_status" :value="item.id">{{item.name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">年款</span>
				<select v-model='choose_year' v-if="year!=null" @change="put_in_style($event,2)">
				 	<option v-for="item in year" :value="item.year_style_id">{{item.year_style_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">生成名称</span>
				<input class="all" type="text" name="" v-model='style_name' disabled="disabled">
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">显示名称</span>
				<input class="all" type="text" name="" v-model='style_real_name' v-if="show_real_name==null">
				<input class="all" type="text" name="" v-model='show_real_name' v-else>
			</li>
			<template v-for="(item,index) in add_list">
				<li flex="dir:left cross:center">
					<p class="title">
						<span>{{item.parameter_group_name}}</span>
					</p>
				</li>
				<li flex="dir:left cross:center" v-for="list in item.parameter_list">
					<span flex-box="0">{{list.parameter_name}}</span>
					<input type="text" name="input" v-model='list.value' v-if="list.data_type==1">
					<textarea name="" v-model="list.value" maxlength="500" v-if="list.data_type==4"></textarea>
			    	<select v-model='list.value'  v-if="list.data_type==2">
					 	<option v-for="options in list.parameter_content_list" :value="options.id" >{{options.name}}</option>
					</select>
					<ul v-if="list.data_type==3">
						<li class="Hq_label" v-for="options in list.parameter_content_list">
						    <input :name="index" type="checkbox" :id="options.id" :value="options.id" v-model="list.value"/>
							<label :for="options.id" >{{options.name}}</label>	
			    		</li>	
					</ul>
		    		<p class='unit' v-if="list.unit!=null&&list.unit!=''">({{list.unit}})</p>
				</li>	
			</template>
			<li flex="dir:left main:center">
				<div class="save" @click="save">保存</div>
				<div class="give-up" @click="goback">放弃编辑</div>
			</li>
		</ul>
	</div>
</template>
<script>
import BrandApi from '../../../api/Brand'
import CommonApi from '../../../api/Common'
import SeriesApi from '../../../api/Series'
import StyleApi from '../../../api/Style'
import topList from '../../list/list'
	export default {
		name:'edit',
		data(){
			return{
				list:['婚纱库','>','款式列表','>','编辑列表'],
				first:false,
				brandName:null,
				seriesName:null,
				yearName:null,
				brandList:null,
				choose_brand:null,
				seriesList:null,
				choose_series:null,
				year:null,
				choose_year:null,
				category:null,
				choose_category:null,
				style_name:null,
				style_real_name:null,
				show_real_name:null,
				paremeter_list:null,
				choose_sell_status:null,
				sell_status:[{
					id:0,
					name:'在销'
				},{
					id:1,
					name:'停销'
				},{
					id:2,
					name:'待销'
				}],
				add_list:null,
			}
		},
		methods:{
			put_in_style(event,index){
				if(event.currentTarget.selectedIndex<0){return}
				if(index==0){
					this.brandName=event.currentTarget.options[event.currentTarget.selectedIndex].text
				}
				if(index==1){
					this.seriesName=event.currentTarget.options[event.currentTarget.selectedIndex].text
				}
				if(index==2){
					this.yearName=event.currentTarget.options[event.currentTarget.selectedIndex].text
				}	
			},
			save(){
				if(this.$route.query.style_id){
					StyleApi.update(this)
				}else{
					StyleApi.add(this)
				}
			},
			goback(){
				this.$router.go(-1)
			}
		},
		computed:{
			paremeter_list(){
				let put=[]
				if(this.add_list==null){return null}
				if(this.add_list.length==0){return null}
            	for(let list of this.add_list){
            		for(let item of list.parameter_list){
	            		let add={}
	            		add.style_parameter_id=item.pl_style_parameter_id
	            		add.data_type=item.data_type
	            		if(item.value!=null&&item.value!=''){
		            		if(item.data_type==3){
	            				add.value=item.value.join()
		            		}
		            		if(item.data_type==2){
		            			add.value=String(item.value)
		            		}
		            		if(item.data_type==1||item.data_type==4){
		            			add.value=item.value
		            		}
	            			put.push(add)	
	            		}
            		}
            	}
            	if(put[0]==null){put=null}
            	return put
            },
            style_name(){
            	let put=this.seriesName
            	let yearspace=null
            	let putspace=null
            	if(put=='无系列'){put=null}
            	if(this.yearName!=null){
            		yearspace=' '
            	}
            	if(put!=null){
            		putspace=' '
            	}
            	let finalword=(this.brandName||'')+(yearspace||'')+(this.yearName||'')+(putspace||'')+(put||'')
            	if(finalword==''){return null}
            	return finalword
            }
		},
		watch:{
			choose_brand:function(val,oldVal){
				if(!this.first){
					this.seriesName=null
					this.choose_series=null
					this.seriesList=null
					this.choose_year=null
					this.yearName=null
					this.choose_category=null
				}	
				SeriesApi.getList_All(this,val)
			},
			choose_series:function(val,oldVal){
				CommonApi.category(this,3,val)
			},
			choose_category:function(val,oldVal){
				if(this.first){
					this.first=false	
				}else{
					StyleApi.ParameterByCategory(this,val)
				}
			},
			year:function(val,oldVal){
				for(let item of val){
					if(item.year_style_id==this.choose_year){
						this.yearName=item.year_style_name
					}
				}
			},
			style_name:function(val,oldVal){
				this.style_real_name=val
			}
		},
		components:{
			topList
		},
		created(){
			BrandApi.getList_All(this)
			StyleApi.getEdit(this,CommonApi.Year)
			if(this.$route.query.style_id){
				this.first=true
			}
		},
	}
</script>
<style scoped lang='scss'>
	$backGd:#FBFBFB;
	$borderRadius:4px;
	$inputBg:#FBFBFB;
	.title{
		font-size: 20px;
		color: #454953;
		letter-spacing: 0px;
		font-weight: bold;
		.red{
			color: red;
		}
	}
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
			width:230px;
			margin-right: 25px;
		}
		>li{
			font-size: 14px;
			color: #454953;
			letter-spacing: 0px;
			margin: 20px 0;
			min-height: 30px;
			.all{
				width: 100%;
			}
			.unit{
				margin-left: 5px;
			}
			>span{
				font-weight: bold;
				text-align: justify;
				text-align-last:justify;
				width: 70px;
				padding-right: 20px;
				position: relative;
			}
			>span:after{
				position: absolute;
				content: ':';
				width: 10px;
				height: 100%;
				top: 0;
				right: 0;
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
				height:160px;
				width: 520px;
				padding:5px 0 5px 10px;
				max-width: 527px;
				max-height: 140px;
				outline: none;
				border: none;
				background:$inputBg;
				border-radius: $borderRadius;
				overflow-y: auto;
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
			input[type=radio],input[type=checkbox],input[type=radio]:checked,input[type=checkbox]:checked{
				display: none
			}
			input[type=radio]:checked+label:after,input[type=checkbox]:checked+label:after,input[type=radio]+label:after,input[type=checkbox]+label:after{
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
			input[type=radio]+label:after,input[type=checkbox]+label:after{
				content: "";
				background: #FBFBFB;
			}	
		}
	}
</style>
