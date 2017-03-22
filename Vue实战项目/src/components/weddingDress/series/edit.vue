<template>
	<div calss="Create" flex="dir:top">
		<topList :list-msg="list"></topList>
		<ul class="Hq_Create">
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>品牌名称</span>
				<select class="YY-select" v-model='brandId' v-if="brandList!=null">
				 	<option v-for="item in brandList" :value="item.brand_id" >{{item.brand_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0" class='important'>系列名称</span>
				<input type="text" v-model='has_series_name' v-if="!no_series">
				<input type="text" disabled v-model='no_series_name' v-else>
				<div class="no-series">
					<input type="checkbox" value='checkbox' id='checkbox' v-model='no_series'/>
					<label for='checkbox'>无系列</label>	
				</div>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">设计师</span>
				<input type="text" name="" v-model='designer_name'>
			</li>
			<li flex="dir:left cross:center"> 
			    <span flex-box="0" class='important'>类别</span>
			    <ul>
				    <li class="Hq_label" v-for="item in category">
					    <input name="Fruit" type="checkbox" :value="item.category_id" :id="item.category_id" v-model="choose_category"/>
						<label :for="item.category_id">{{item.category_name}}</label>
				    </li> 	
			    </ul>
			</li> 
			<li flex="dir:left cross:center">
				<span flex-box="0">系列简介</span>
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
import BrandApi from '../../../api/Brand'
import CommonApi from '../../../api/Common'
import SeriesApi from '../../../api/Series'
import topList from '../../list/list'
	export default {
		data(){
			return{
				list:['婚纱库','>','系列列表','>','编辑系列'],
				brandList:null,
				brandId:null,
				series_name:null,
				has_series_name:null,
				no_series_name:null,
				country:null,
				designer_name:null,
				category:null,
				choose_category:[],
				description:null,
				no_series:false,
				series_empty:"0",
			}
		},
		name:'CreateSeries',
		components:{
			topList
		},
		computed:{
			series_empty(){
				if(this.no_series){return 1}
				return 0
			},
			series_name(){
				if(this.no_series){return this.no_series_name}
				return this.has_series_name
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			save(){
				if(this.brandId==null){
					this.$store.dispatch('alert-msg', '请选择品牌')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.series_empty==0&&(this.series_name==null||this.series_name=='')){
					this.$store.dispatch('alert-msg', '请选择系列')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.choose_category.length==0){
					this.$store.dispatch('alert-msg', '请选择类别')
					this.$store.dispatch('alert-start')
					return
				}
				if(!this.$route.query.series_id){
					SeriesApi.add(this)
				}else{
					SeriesApi.update(this)
				}
			}
		},
		watch:{
			brandId:function(val,oldval){
				CommonApi.category(this,2,val)
			}
		},
		mounted(){
			this.brandId=this.$route.query.brand_id || null	
			BrandApi.getList_All(this)
			SeriesApi.getEdit(this)
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
		.Hq_label,.no-series{
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

