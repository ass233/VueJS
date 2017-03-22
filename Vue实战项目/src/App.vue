<template>
	<div class="all">
		<top></top>
	  	<router-view></router-view>
	  	<alert></alert>	
	  	<load></load>
	</div>
</template>
<script>
import alert from './components/alert/index'
import top from './components/header/index'
import load from './components/load/index'
	export default {
		name:'all',
		components:{
			top,alert,load
		}
	}
</script>
<style scoped lang='scss'>
</style>
