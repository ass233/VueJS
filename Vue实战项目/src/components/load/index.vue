<template>
	<div class="load" v-if='open'>
		<div class="shandow-box"></div>
		<div class="box" flex="main:center cross:center">
			<img :src="load" class="">
		</div>
	</div>
</template>
<script>
	export default {
		name:'load'
		// data(){
		// 	return{
		// 		load:require('../../assets/images/loading-logo.png')
		// 	}
		// },
		// computed:{
		// 	open(){
  //           	return this.$store.state.load.open
  //           }
		// }
	}
</script>
<style scoped lang='scss'>
	.load{
		.shandow-box{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background:rgba(0,0,0,0.5);
			z-index: 10000;
		}
		.box{
			z-index: 10001;
		    width: 100px;
		    height: 100px;
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
		    background: #fff;
		    border-radius: 10px;
		    img{
		    	display: block;
		    	width: 100%;
		    	height: auto;
		    	animation-name: load;
			    animation-duration: 4s;
			    animation-timing-function: linear;
			    animation-iteration-count: infinite;
		    }
		}
		@keyframes load
		{
		    0%   {transform: rotateY(0deg);}
		    50%  {transform: rotateY(180deg);}
		    100% {transform: rotateY(360deg);}
		}
	}
</style>
