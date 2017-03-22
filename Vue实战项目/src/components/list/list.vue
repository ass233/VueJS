<template>
	<div class="list" flex="dir:top">
		<header flex="dir:left cross:main">
			<div class="nav">
				<span v-for="item in listMsg">{{item}}</span>
			</div>
		</header>
	</div>
</template>
<script>
	export default {
		name:'list',
		components:{
		
		},
		props:['listMsg']
	}
</script>
<style scoped lang='scss'>
	.list{
		header{
			height: 57px;
			background: #FFFFFF;
			.nav{
				width: 980px;
				margin: auto;
				span{
					font-size: 12px;
					color: #BFBFBF;
					letter-spacing: 0px;
					margin-right: 3px;
				}
				span:last-child{
					color: #001F23;
				}
			}
		}
	}
</style>
