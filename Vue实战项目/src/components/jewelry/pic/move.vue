<template>
	<div class="move-pic" v-if="open">
		<div class="shandow" @click="closeup"></div>
		<div class="move-box" flex="dir:top">
			<p class="title">移动到指定位置：</p>
			<div class="sel-box" flex="dir:left cross:center">
				<span>品牌:</span>
				<select class="select" v-model='choose_brand'>	
				 	<option v-for="item in brandList" :value="item.brand_id" >{{item.brand_name}}</option>
				</select>
			</div>
			<div class="sel-box" flex="dir:left cross:center">
				<span>系列:</span>
				<select class="select" v-model='choose_series'>	
				 	<option v-for="item in seriesList" :value="item.series_id" >{{item.series_name}}</option>
				</select>
			</div>
			<div class="sel-box" flex="dir:left cross:center">
				<span>款式:</span>
				<select class="select" v-model='choose_style'>	
				 	<option v-for="item in styleList" :value="item.style_id" >{{item.real_name}}</option>
				</select>
			</div>
			<div class="choose-box" flex="dir:left main:justify">
				<div class="choose" @click='save'>确定</div>
				<div class="choose" @click='closeup'>取消</div>
			</div>
		</div>	
	</div>
</template>
<script>
import PicApi from '../../../api/Pic'
import BrandApi from '../../../api/Brand'
import SeriesApi from '../../../api/Series'
import StyleApi from '../../../api/Style'
	export default {
		name:'move',
		data(){
			return{
				choose_brand:null,
				brandList:null,
				choose_series:null,
				seriesList:null,
				choose_style:null,
				styleList:null
			}
		},
		methods:{
			closeup(){
				this.$store.dispatch('pic-open-move')
			},
			save(){
				PicApi.changePicStyle(this,PicApi.getList)
			}
		},
		computed:{
			open(){
				return this.$store.state.pic.move
			},
			move_id(){
				return this.$store.state.pic.move_id
			}
		},
		watch:{
			open:function(val,oldVal){
				if(val!=true){return}
				BrandApi.getList_All(this)
			},
			choose_brand:function(val,oldVal){
				this.seriesList=[]
				this.choose_series=null
				this.styleList=[]
				this.choose_style=null
				SeriesApi.getList_All(this,val)
			},
			choose_series:function(val,oldVal){
				StyleApi.getList_All(this,val)
			}
		}
	}
</script>
<style scoped lang='scss'>
	.move-pic{
		.shandow{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0,0,0,0.5)
		}
		.move-box{
			position: fixed;
		    width: 379px;
		    height: 348px;
		    background: #FFFFFF;
		    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.33);
		    border-radius: 4px;
		    z-index: 1;
		    top: 40%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    .title{
		    	margin: 20px 0 0 30px;
				font-size: 18px;
				font-weight: bold;
				color: #454953;
				letter-spacing: 0px;
		    }
		    .sel-box{
		    	margin:35px auto 0;
		    	span{
		    		margin-right: 10px;
		    	}
				.select{
			    	border: none;
			    	outline: none;
			    	width: 190px;
			    	height: 30px;
			    	background: #fbfbfb;
					border-radius: 4px;
			    }
		    }
		    .choose-box{
		    	margin: 40px auto 0;
		    	width: 80%;
				.choose{
					width: 125px;
					height: 30px;
					background: #53AAE6;
					border-radius: 4px;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: 0px;
					text-align: center;
					line-height: 30px;
				}
		    }
		}
	}
</style>
