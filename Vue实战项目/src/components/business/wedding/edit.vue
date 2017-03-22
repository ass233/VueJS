<template>
 	<div calss="YY-business" flex="dir:top">
		<topList :list-msg="list"></topList>
		<div flex="dir:left cross:center" class="YY-information">
	 			<span>设置商品信息</span>
 		</div>
 		<ul class="YY-business-list">
 			<h2><span></span>设置要上架的商品</h2>
 			<li flex="dir:left cross:center">
				<span flex-box="0">类别</span>
				<select class="YY-fselect" v-model='choose_category' v-if="category!=null">
				 	<option v-for="item in category" :value="item.category_id" >{{item.category_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0">商品款式</span>
				<select class="YY-fselect" v-model='choose_brand' v-if="brandList!=null">
				 	<option v-for="item in brandList" :value="item.brand_id" >{{item.brand_name}}</option>
				</select>
				<select class="YY-fselect" style="margin-left:15px;" v-model='choose_series' v-if="seriesList!=null">
				 	<option v-for="item in seriesList" :value="item.series_id" >{{item.series_name}}</option>
				</select>
			</li>
			<li flex="dir:left cross:center">
				<span flex-box="0"></span>
				<select v-model='choose_style' v-if="styleList!=null">
				 	<option v-for="item in styleList" :value="item.style_id" >{{item.real_name}}</option>
				</select>
			</li>
			<h2><span></span>销售信息</h2>
			<li class="Hq_label" flex="dir:left cross:center">
			    <span flex-box="0">销售形式</span>
			    <div v-for="item in categorys">
				    <input type="checkbox" :id="item.sale_form_id" :value='item.sale_form_id'  v-model="choose_sale"/>
					<label :for="item.sale_form_id">{{item.sale_name}}</label>
          		</div>
			</li>
			 <template v-for="(items,index) in commodity" v-if="sale==items.parameter_group_id||sale=='open'">
		        <li  flex="dir:left cross:center" v-for="item in items.parameter_list">
					<span flex-box="0">{{item.commodity_parameter_name}}</span>
					<textarea name="" v-if="item.commodity_parameter_name=='说明'" v-model='item.commodity_parameter_value'></textarea>
					<input v-else style="width:130px;" type="text" name="" v-model='item.commodity_parameter_value'>
					<p style="margin-left:10px;">{{item.commodity_parameter_unit}}</p>
		        </li>
		    </template>
			<li flex="dir:left main:center">
				<div class="save" @click='save'>保存</div>
				<div class="give-up" @click="giveup">放弃编辑</div>
			</li>
		</ul>
	</div>
</template>
<script>
import topList from '../../list/list'
import BrandApi from '../../../api/Brand'
import SeriesApi from '../../../api/Series'
import StyleApi from '../../../api/Style'
import commonlistApi from '../../../api/commodityList'
import CommonApi from '../../../api/Common'
	export default {
		name:'edit',
		components:{
			topList
		},
		data(){
			return{
				list:['商品管理','>','编辑商品'],
		        category:null,
		        choose_category:null,
		        categorys:null,
		        choose_sale:[],
		        brandList:null,
		        choose_brand:null,
		        seriesList:null,
		        choose_series:null,
		        styleList:null,
		        choose_style:null,
		        commodity:null,
		        first:true,
		        style:0
			}
		},
	    mounted(){
		  	CommonApi.category(this,1,null,1)
          	commonlistApi.GetSaleFormList(this,1)
          	if(!this.$route.query.commodity_id){return}
          	this.first=false
          	commonlistApi.getEdit(this)
	    },
	    methods:{
			save(){
				if(!this.$route.query.commodity_id){
					commonlistApi.add(this)	
				}else{
					commonlistApi.update(this)
				}
			},
			giveup(){
				this.$router.go(-1)
			},
	    },
	    watch:{
    		choose_category:function(old,oldVal){
    			if(this.first){
		    		this.brandList=null
		    		this.seriesList=null
		    		this.styleList=null
		    		this.choose_brand=null
		    		this.choose_series=null
		    		this.choose_style=null
		    		this.commodity=null	
    			}
	    		BrandApi.getList_All(this,1)
	    	},
	    	choose_brand:function(val,oldVal){
	    		if(!val){return}
    			if(this.first){
		    		this.seriesList=null
		    		this.styleList=null
		    		this.choose_series=null
		    		this.choose_style=null
		    		this.commodity=null		
    			}
	    		SeriesApi.getList_All(this,val,1)
	    	},
    		choose_series:function(val,oldVal){
				if(!val){return}
				if(this.first){
	    			this.styleList=null
	    			this.choose_style=null
	    			this.commodity=null		
				}
    			StyleApi.getList_All(this,val,1)
    		},
		    choose_style:function(val,oldval){
		    	if(!val){return}
		    	if(this.first){
		    		this.commodity=null		
		    		commonlistApi.GetCommodity(this,val)		
				}
				this.first=true
		    },
	    },
	    computed:{
	    	sale:function(){
	    		if(this.choose_sale.length==0){
	    			return null
	    		}
	    		if(this.choose_sale.length==2){
	    			return 'open'
	    		}
	    		return this.choose_sale[0]
	    	},
	    	sale_from_list:function(){
	    		return this.choose_sale
	    	}
	    }
	}
</script>
<style scoped lang='scss'>
	$backGd:#FBFBFB;
	$borderRadius:4px;
	$inputBg:#FBFBFB;
	#YY-template{
		margin-left: -180px;
	}
	.YY-information{
		height: 57px;
		width: 960px;
		background: #7BC3F5;
		margin: 20px auto 0;
			-moz-border-radius: 15px 15px 0px 0px;;
		-webkit-border-radius: 15px 15px 0px 0px;;
		border-radius:15px 15px 0px 0px;
		>span{
			font-family: PingFangSC-Semibold;
			font-weight: bold;
			font-size: 20px;
			color: #FFFFFF;
			letter-spacing: 0px;
			margin-left: 96px;
		}
	}
	.YY-business-list{
		background: #fff;
		margin:0 auto;
		padding: 0 180px 20px;
		width: 600px;
		extend_public{
			text-indent: 10px;
			outline: none;
			background: $backGd;
			border-radius: 4px;
			border:none;
			height: 30px;
		}
		h2{
			font-family: PingFangSC-Regular;
			font-size: 20px;
			color: #454953;
			letter-spacing: 0px;
			margin: 60px 0 0 -30px;
			span{
				display: block;
				float:left;
				line-height: 15px;
				height: 15px;
				width: 4px;
				background: #FF6161;
				border-radius: 1px;
				margin:3px 10px 0 0;
			}
		}
		.YY-fselect{
			@extend extend_public;
			width:190px;
		}
		.YY-price{
			width:190px;
		}
		select{
			@extend extend_public;
			width: 400px;
		}
		input{
			@extend extend_public;
			width:400px;
		}
		>li{
			font-size: 14px;
			color: #454953;
			letter-spacing: 0px;
			margin: 20px 0;
			>span{
				text-align: justify;
				text-align-last:justify;
				width: 70px;
				padding-right:10px;
				position: relative;
			}
			>.YY-tel{
				span:nth-child(1){
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #454953;
					letter-spacing: 0px;
					width: 48px;
					height: 17px;
				};
				input:nth-child(1){
					width: 56px;
				}
			}
			>span:after{
				position: absolute;
				content: ':';
				width:10px;
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
		.Hq_label{
			>div{
				height: 40px;
				width: auto;
				padding-left: 50px;
				label{
					display: block;
					position: relative;
					line-height: 40px;
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
	}
</style>
