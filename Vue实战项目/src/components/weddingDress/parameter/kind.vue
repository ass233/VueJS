<template>
	<div class="kind" flex="dir:top" v-if="open">
		<div class="shandow" @click="closeup"></div>
		<div class="kind-box">
			<p class="title">创建分组</p>
			<input class="kind-input" type="text" v-model='kind'>
			<div class="choose-box" flex="dir:left main:justify">
				<div class="choose" @click="add_kind">确定</div>
				<div class="choose close" @click="closeup">取消</div>
			</div>
		</div>
	</div>
</template>
<script>
import ParameterApi from '../../../api/Parameter'
	export default {
		name:'kind',
		data(){
			return{
				kind:null
			}
		},
		methods:{
			closeup(){
				this.$store.dispatch('pic-open-kind')
			},
			add_kind(){
				ParameterApi.addGroup(this,ParameterApi.getList)
			}
		},
		computed:{
			open(){
				return this.$store.state.pic.kind
			}
		}
	}
</script>
<style scoped lang='scss'>
	.kind{
		.shandow{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(0,0,0,0.5)
		}
		.kind-box{
			position: fixed;
		    width: 379px;
		    height: 170px;
		    background: #FFFFFF;
		    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.33);
		    border-radius: 4px;
		    z-index: 1;
		    top: 40%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    .title{
		    	margin: 20px 0 0 30px;
				font-size: 18px;
				font-weight: bold;
				color: #454953;
				letter-spacing: 0px;
		    }
		    .kind-input{
		    	margin: 25px auto 0;
		    	display: block;
	    	    outline: none;
			    border: none;
			    height: 30px;
			    width: 80%;
			    background:rgba(0,0,0,0.15);
			    border-radius: 4px;
			    font-size: 12px;
			    color: #454953;
			    letter-spacing: 0px;
			    text-indent: 10px;
		    }
		    .choose-box{
		    	margin: 25px auto 0;
		    	width: 80%;
				.choose{
					cursor: pointer;
					width: 125px;
					height: 30px;
					background: #53AAE6;
					border-radius: 4px;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: 0px;
					text-align: center;
					line-height: 30px;
				}
				.close{
					background: #E4EBF0;
					color: #ffffff
				}
		    }
		}
	}
</style>
