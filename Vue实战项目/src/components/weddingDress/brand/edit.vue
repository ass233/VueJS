<template>
	<div calss="Create" flex="dir:top">
		<topList :list-msg="list"></topList>
		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
				<span class="important" flex-box="0">品牌名称</span>
				<input flex-box="0" type="text" name="" v-model='brand_name'>
			</li>
			<li flex="dir:left cross:center">
				<span class="important" flex-box="0">显示名称</span>
				<input type="text" name="" v-model='chinese_name'>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">所属公司</span>
				<input type="text" name="" v-model='company_name'>
			</li>
			<li flex="dir:left cross:center">
				<span class="important" flex-box="0">国别</span>
				<select class="YY-select" v-model='choose_country' v-if="country!=null">
				 	<option v-for="item in country" :value="item.country_id" >{{item.country_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
			    <span class="important" flex-box="0">类别</span>
			    <ul>
				    <li v-for="item in category" class="Hq_label">
					    <input name="Fruit" type="checkbox" :value="item.category_id" :id="item.category_id" v-model="choose_category"/>
						<label :for="item.category_id">{{item.category_name}}</label>
				    </li> 	
			    </ul>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">品牌logo</span>
				<div class="Hq_logo">
					<img :src="img+'@!gif'" alt="品牌logo" v-if="img!=null&&img!=''">
					<input type="file" id="Upload" @change="getfile" accept="image/jpeg,image/gif,image/png,image/bmp,image/jpg" v-if="accessid!=null"/>
				</div>
				<div class='explain'>
					<p>1.每张图片不超过2M</p>
					<p>2.格式为PNG和JPG</p>
					<p>3.尺寸300*300</p>
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">品牌介绍</span>
				<textarea name="" v-model="description" maxlength="500"></textarea>
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
import BrandApi from '../../../api/Brand'
import CommonApi from '../../../api/Common'
	export default {
		name:'EditBrand',
		data(){
			return{
				list:['婚纱库','>','品牌列表','>','编辑品牌'],
				brand_name:null,
				chinese_name:null,
				company_name:null,
				country:null,
				choose_country:null,
				category:null,
				description:null,
				choose_category:[],
				img:null,
				files:null,
				host:null,
				access_url:null,
				accessid:null,
				expire:null,
				host:null,
				key:null,
				oss_bucket:null,
				policy:null,
				signature:null
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
				if(this.brand_name==null||this.brand_name==""){
					this.$store.dispatch('alert-msg', '请输入品牌名称')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.chinese_name==null||this.chinese_name==""){
					this.$store.dispatch('alert-msg', '请输入显示名称')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.choose_country==null||this.choose_country==""){
					this.$store.dispatch('alert-msg', '请选择国别')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.choose_category==null||this.choose_category==""){
					this.$store.dispatch('alert-msg', '请选择类型')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.$route.query.brand_id){
					BrandApi.update(this)
				}else{
					BrandApi.add(this)
				}
			},
			getfile(){
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
					this.img=this.access_url+this.key+now_time+'_'+this.files[0].name
				})
			}
		},
		mounted(){
			CommonApi.country(this)
			CommonApi.category(this,1)
			CommonApi.signature(this)
			BrandApi.getBrand(this)
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
			.important:after{
				position: absolute;
				content: '*';
				color: red;
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
