<template>
	<div class="prompt" flex="dir:left main:justify cross:center" v-if="false">
		<div class="see" flex="dir:left">
			<img class="error" :src="error">
			<div class="word" flex="cross:center">
				<span>你有一条内容尚未保存，</span>
				<span class="click">点击查看</span>
			</div>
		</div>
		<div class="close-box" flex="dir:left">
			<div flex="main:center"><span>忽略</span></div>
			<img class="close" :src="close">
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				error:require('../../assets/images/warn_icon_sign.png'),
				close:require('../../assets/images/warn_icon_close.png')
			}
		},
		name:'prompt',
	}
</script>
<style scoped lang='scss'>
	.prompt{
		width: 980px;
		height: 50px;
		margin: auto;
		background: #DFEFF9;
		box-shadow: 0px 2px 5px 0px rgba(83,169,229,0.44);
		.see{
			.error{
				height: 24px;
				padding: 0 12px;
			}
			.word{
				font-size: 14px;
				color: #454953;
				letter-spacing: 0px;
				.click{
					color:#53AAE6;
					cursor:pointer;
				}
			}
		}
		.close-box{
			cursor:pointer;
			margin-right: 20px;
			font-size: 14px;
			.close{
				padding: 0 12px;
				height: 20px;
			}
		}
	}
</style>
