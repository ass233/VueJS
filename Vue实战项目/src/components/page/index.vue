<template>
	<div class="page" flex="dir:left main:center">
		<div class="choose-btn" @click="before">上一页</div>
		<div class="num-box" flex="dir:left">
			<div class="page-num" v-for="item in allpage" :class="{'now-page':item==now}" v-if="item>min&&item<=max" @click="choosepage(item)">{{item}}</div>	
		</div>
		<div class="choose-btn" @click="next">下一页</div>
	</div>
</template>
<script>
	export default {
		name:'page',
		data(){
			return{
				allpage:Number,
				now:Number,
				num:Number,
				min:0,
				max:10,
			}
		},
		methods:{
			next(){
				if(this.now<this.allpage){
					this.$store.dispatch('now-add')
				}
			},
			before(){
				if(this.now>1){
					this.$store.dispatch('now-reduce')
				}
			},
			choosepage(val){
				this.$store.dispatch('now-change',val)
			}
		},
		computed:{
			allpage(){
                return this.$store.state.publicMsg.allpage
            },
            now(){
            	return this.$store.state.publicMsg.nowpage
            },
            min(){
            	if(this.allpage>10&&(this.now-6)>0&&(this.now-6)<=(this.allpage-10)){
            		return this.now-6
            	}else if(this.allpage>10&&(this.now-6)>(this.allpage-10)){
            		return this.allpage-10
            	}else{
            		return 0
            	}
            },
            max(){
            	if(this.allpage>10&&(this.now-6)>0){
            		if((parseInt(this.now)+4)>this.allpage){
            			return this.allpage	
            		}else{
            			return parseInt(this.now)+4	
            		}
            	}else{
            		return 10
            	}
            }
		}
	}
</script>
<style scoped lang='scss'>
	.page{
		width: 980px;
		margin:25px auto 50px;
		.choose-btn{
			width: 56px;
			height: 30px;
			background: #FFFFFF;
			border: 1px solid #E8E8E8;
			border-radius: 4px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: #BCBCBC;
			letter-spacing: 0px;
			cursor: pointer;
		}
		.page-num{
			width: 32px;
			height: 30px;
			background: #FFFFFF;
			border: 1px solid #E8E8E8;
			border-radius: 4px;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			color: #BCBCBC;
			letter-spacing: 0px;
			margin-left: 10px;
			cursor: pointer;
		}
		.page-num:last-child{
			margin-right: 10px;
		}
		.now-page{
			border: 1px solid #7BC3F5;
			color: #454953;
		}
	}
</style>
