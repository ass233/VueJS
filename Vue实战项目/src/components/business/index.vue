<template>
  <div class="main">
    <router-view></router-view>	
  </div>
</template>

<script>
export default {
  	name: 'main',
 	beforeRouteEnter(to, from, next){
	  	sessionStorage.setItem("gold-now-page",1)
	  	sessionStorage.setItem("management-now-page",1)
	  	sessionStorage.setItem("opportunity-now-page",1)
    	next()
  	}
}
</script>

<style scoped lang='scss'>
</style>
