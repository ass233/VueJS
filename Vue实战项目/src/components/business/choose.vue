<template>
  <div class="wed" flex-box="1" flex="dir:left main:center">
    <router-link :to="{path:'/index/business/management'}" tag="div" class="choose-tag menu_brand" flex="dir:top main:justify cross:center">
    	<img :src="shopmanage">
    	<span>商家管理</span>
    </router-link>
	<router-link :to="{path:'/index/business/gold'}" tag="div" class="choose-tag menu_series" flex="dir:top main:justify cross:center">
		<img :src="goldprice">
		<span>当日金价</span>
	</router-link>
	<router-link :to="{path:'/index/business/opportunity'}" tag="div" class="choose-tag menu_style" flex="dir:top main:justify cross:center">
		<img :src="custom">
    	<span>商机管理</span>
	</router-link>	
  </div>
</template>

<script>
export default {
  name: 'wed',
  data(){
  	return{
  		shopmanage:require('../../assets/images/shopmanage.png'),
  		custom:require('../../assets/images/custom.png'),
  		goldprice:require('../../assets/images/goldprice.png'),
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
		.choose-tag:first-child{
			margin-left: 0;
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
	}
</style>
