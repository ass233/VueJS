<template>
 	<div calss="YY-business" flex="dir:top">
		<topList :list-msg="list"></topList>
 		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
			    <span flex-box="0">类别</span>
			    <select class="YY-fselect" v-model='category'>
				 	<option :value='1' >公司(10人以上)</option>
				 	<option :value='2' >工作室(10人以下)</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家名称</span>
				<input class="long" type="text" name="" v-model='name'>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家简称</span>
				<input class="long" type="text" name="" v-model='short_name'>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家地址</span>
				<div flex="dir:top">
					<div flex="dir:left" class="bottom_space">
						<select class="right_space" v-model='province_id' v-if="province_list!=null">
						 	<option v-for="item in province_list" :value="item.province_id" >{{item.name}}</option>
						</select>
						<select v-model="city_id" v-if="province_id!=null">
						 	<option v-for="item in city_list" :value="item.city_id" >{{item.name}}</option>
						</select>
					</div>
					<div flex="dir:left">
						<input type="text" class="long" placeholder="详细地址" v-model="address">
					</div>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家电话</span>
				<div flex="dir:top">
					<div flex="dir:left cross:center" class="bottom_space">
						<span>商家电话:</span>
						<input class="company" type="text" placeholder="区号+电话号码" v-model="phone_area">
					</div>
					<div flex="dir:left cross:center" class="bottom_space">
						<span>400电话:</span>
						<input type="text" placeholder="请输入400电话" v-model="phone_four">
					</div>
					<div flex="dir:left cross:center" class="bottom_space">
						<span>手机号码:</span>
						<input type="text" placeholder="请输入手机号码" v-model="phone_mobile">	
					</div>				
				</div>
             </li>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家logo</span>
				<div class="Hq_logo">
					<img :src="logo_url+'@!gif'" alt="品牌logo" v-if="logo_url!=null&&logo_url!=''">
					<input type="file" class="upload" id="Upload" @change="getfile_logo" accept="image/jpeg,image/gif,image/png,image/bmp"/>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">负责人</span>
				<input type="text" name="" v-model='person_in_charge'>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">营业执照</span>
				<div class="Hq_logo">
					<img :src="business_license+'@!gif'" alt="品牌logo" v-if="business_license!=null&&business_license!=''">
					<input type="file" class="upload" id="business" @change="getfile_business" accept="image/jpeg,image/gif,image/png,image/bmp"/>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">经营分类</span>
				<select class="YY-fselect" v-model='business_class_id'>
				 	<option v-for="item in businessclassification_list" :value="item.business_classification_id" >{{item.name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
			    <span flex-box="0">品牌授权</span>
			    <div>
				    <div v-for="(item,index) in brandList" class="Hq_label" @click="getbrand_id(item.brand_id)">
					    <input type="checkbox" :value="item.brand_id" v-model="brand_id"/>
						<label>{{item.brand_name}}</label>
					</div>	
			    </div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">授权书</span>
				<div class="Hq_logo" >
					<img :src="certificate_url[0]+'@!gif'" alt="品牌logo" v-if="certificate_url[0]!=null&&certificate_url[0]!=''">
					<input type="file" class="upload" id="certificate" @change="getfile_certificate" accept="image/jpeg,image/gif,image/png,image/bmp" v-if="accessid!=null"/>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">服务范围</span>
				<div>
				    <div v-for="item in coverage_list" class="Hq_label">
					    <input type="checkbox" :id="item.coverage_id" :value="item.coverage_id" v-model="coverage"/>
						<label :for="item.coverage_id">{{item.name}}</label>
					</div>	
			    </div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商家简介</span>
				<textarea name="" v-model="description"></textarea>
			</li>
			<li flex="dir:left main:center">
				<div class="save" @click="save">保存</div>
				<div class="give-up" @click="goback">放弃编辑</div>
			</li>
		</ul>
	</div>
</template>
<script>
import topList from '../../list/list'
import manApi from '../../../api/management'
import comApi from '../../../api/Common'
import brandApi from '../../../api/Brand'
	export default {
		name:'CreateBrand',
		data(){
			return{
				list:['商家','>','商品管理','>','编辑商家'],
				category:null,
				name:null,
				short_name:null,
				province_list:null,
				province_id:null,
				city_list:null,
				address:null,
				phone_area:null,
				phone_four:null,
				phone_mobile:null,
				host:null,
				access_url:null,
				accessid:null,
				expire:null,
				host:null,
				key:null,
				oss_bucket:null,
				policy:null,
				signature:null,
				logo_url:null,
				person_in_charge:null,
				business_license:null,
				business_class_id:null,
				businessclassification_list:null,
				brandList:null,
				brand_id:[],
				certificate_url:[],
				coverage:[],
				coverage_list:[],
				description:null
			}
		},
		components:{
			topList
		},
		methods:{
			getbrand_id(id){
				for(let index in this.brand_id){
					if(this.brand_id[index]==id){
						this.brand_id.splice(index,1)
						return
					}
				}
				this.brand_id.push(id)
			},
		    goback(){
		        this.$router.go(-1)
		    },
			save(){
				if(this.$route.query.seller_id){		
					manApi.update(this)
				}else{
					manApi.add(this)				
				}
			},
			getfile_logo(){
				this.files=document.querySelector('#Upload').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					this.logo_url=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			},
			getfile_business(){
				this.files=document.querySelector('#business').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					this.business_license=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			},
			getfile_certificate(){
				this.files=document.querySelector('#certificate').files
				let from=new FormData()
				let now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[0])
				this.$http.post(this.host,from)
				.then((response) => {
					let url=this.access_url+this.key+now_time+'_'+this.files[0].name
					this.certificate_url.splice(0,1,url)
				})
			}
		},
		mounted(){
			manApi.GetProvinceList(this)
			comApi.signature(this,2)
			manApi.GetBusinessClassificationList(this)
			manApi.GetCoverageList(this)
			if(!this.$route.query.seller_id){return}
			manApi.getEdit(this)
		},
		watch:{
			province_id:function(val,oldVal){
				manApi.GetCityList(this,val)
			},
			business_class_id:function(val,oldVal){
				brandApi.getList_All(this,val)
			}
		},
		computed:{
			phone_list(){
				let put=[]
				let type_1={}
				type_1.type=1
				type_1.phone=this.phone_area
				let type_2={}
				type_2.type=2
				type_2.phone=this.phone_four
				let type_3={}
				type_3.type=3
				type_3.phone=this.phone_mobile
				if((this.phone_area!=null&&this.phone_area!="")){put.push(type_1)}
				if(this.phone_four!=null&&this.phone_four!=""){put.push(type_2)}
				if(this.phone_mobile!=null&&this.phone_four!=""){put.push(type_3)}
				return put
			}
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
			width:180px;
		}
		.long{
			width:420px;
		}
		.right_space{
			margin-right: 10px;
		}
		.bottom_space{
			margin-bottom: 20px;
			>span,input{
				margin-right: 10px;
			}
		}
		>li{
			font-size: 14px;
			color: #454953;
			letter-spacing: 0px;
			margin: 20px 0;
			min-height: 30px;
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
			.explain{
				margin-left: 10px;
				p{
					margin-bottom: 15px;
				}
				p:last-child{
					margin-bottom: 0;
				}
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
				.upload{
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
			padding-left: 50px;
			height: 30px;
			width: auto;
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
