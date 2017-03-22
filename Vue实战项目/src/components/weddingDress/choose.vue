<template>
  <div class="wed" flex-box="1" flex="dir:left main:center">
    <router-link :to="{path:'/index/weddingDress/brand'}" tag="div" class="choose-tag menu_brand" flex="dir:top main:justify cross:center">
    	<img :src="menu_brand">
    	<span>品牌库</span>
    </router-link>
	<router-link :to="{path:'/index/weddingDress/series'}" tag="div" class="choose-tag menu_series" flex="dir:top main:justify cross:center">
		<img :src="menu_series">
    	<span>系列库</span>
	</router-link>
	<router-link :to="{path:'/index/weddingDress/style'}" tag="div" class="choose-tag menu_style" flex="dir:top main:justify cross:center">
		<img :src="menu_style">
    	<span>款式库</span>
	</router-link>
	<router-link :to="{path:'/index/weddingDress/parameter'}" tag="div" class="choose-tag menu_para" flex="dir:top main:justify cross:center" v-if="see==1">
		<img :src="menu_para">
    	<span>参数管理</span>
	</router-link>	
  </div>
</template>

<script>
export default {
  name: 'wed',
  data(){
  	return{
  		menu_brand:require('../../assets/images/menu_brand.png'),
  		menu_series:require('../../assets/images/menu_series.png'),
  		menu_style:require('../../assets/images/menu_style.png'),
  		menu_para:require('../../assets/images/menu_para.png'),
  	}
  },
  computed:{
  	see(){
  		return parseInt(localStorage.getItem("role_id"))
  	}
  }
}
</script>

<style scoped lang='scss'>
	.wed{
		.choose-tag{
			height: 145px;
			width: 145px;
			margin-top: 110px;
			margin-left: 35px;
			border-radius: 8px;
			background: rgba(69,73,83,0.60);
			border-radius: 8px;
			cursor:pointer;
			span{
				font-size: 0.8rem;
				color: #FFFFFF;
				letter-spacing: 0px;
				margin-bottom: 23px;
			}
		}
		.choose-tag:hover{
			box-shadow: 0px 8px 14px 0px rgba(112,189,243,0.41);
			margin-top: 100px;
			background: #6AC4F4;
		}
		.menu_brand img{
			margin-top: 35px;
			width:40%;
		}
		.menu_series img{
			margin-top: 35px;
			width:32%;
		}
		.menu_style img{
			margin-top: 50px;
			width: 33%;
		}
		.menu_para img{
			margin-top: 38px;
			width:20%;
		}
		.choose-tag:first-child{
			margin-left: 0;
		}
	}
</style>
