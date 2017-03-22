<template>
	<div class="alert" v-if="open">
		<div class="shandow-box"></div>
		<div class="box" flex="main:center cross:center">
			{{msg}}
		</div>
	</div>
</template>
<script>
	export default {
		name:'alert',
		computed:{
			open(){
            	return this.$store.state.alert.open
            },
            msg(){
            	return this.$store.state.alert.msg
            }
		},
		watch:{
			open:function(val,oldVal){
				if(val){
					setTimeout(() => {
						this.$store.dispatch('alert-close')
					}, 2000);
				}
			}
		}
	}
</script>
<style scoped lang='scss'>
	.alert{
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
		    height: 100px;
		    padding: 0 100px;
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
		    background: #fff;
		    border-radius: 10px;
		    color:red;
		    font-weight: bold;
		}
	}
</style>
