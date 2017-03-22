<template>
  <div class="main">
    <router-view></router-view>	
  </div>
</template>

<script>
export default {
  name: 'main',
  beforeRouteEnter(to, from, next){
    sessionStorage.setItem("pic_type",3)
    sessionStorage.setItem("pl_library_id",1)
  	sessionStorage.setItem("brand-now-page",1)
  	sessionStorage.setItem("series-now-page",1)
  	sessionStorage.setItem("style-now-page",1)
  	sessionStorage.setItem("parameter-now-page",1)
  	sessionStorage.setItem("pic-now-page",1)
    next()
  }
}
</script>

<style scoped lang='scss'>
</style>
