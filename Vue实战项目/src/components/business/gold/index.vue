<template>
	<div class="brand" flex="dir:top">
		<div class="message" flex="dir:left main:justify cross:center">
			<div class="tag-search" flex="dir:left">
				<span flex-box="0" class='tag'>当日金价</span>
				<div class="present">
					<span>今天 {{nowtimes | times}}</span>
				</div>
			</div>
		</div>
		<msgList></msgList>
		<page></page>
	</div>
</template>
<script>
import msgList from './List'
import page from '../../page/index'
import goldApi from '../../../api/gold'
	export default {
		name:'brand',
		data(){
			return{
				nowtimes:Date.parse(new Date()),
			}
		},
		filters:{
			times:function(value){
				var date = new Date();
			    var seperator1 = "/";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    return currentdate;
			}
		},
		components:{
			msgList,page
		},
		computed:{
			now(){
            	return this.$store.state.publicMsg.nowpage
            }
		},
		watch:{
			now:function(val, oldVal){
				if(!isNaN(val)){sessionStorage.setItem("gold-now-page",val)}
				goldApi.getList(this)
			}
		},
		created(){
			let nowpage=parseInt(sessionStorage.getItem("gold-now-page"))
	    	this.$store.dispatch('now-change',nowpage || 1)
		},
		beforeRouteLeave(to, from, next){
			this.$store.dispatch('now-change',Number)
			next()
		}
	}
</script>
<style scoped lang='scss'>
	.brand{
		.message{
			height: 60px;
			width: 980px;
			margin: auto;
			.tag-search{
				.tag{
					padding-right: 10px;
					font-size: 24px;
					color: #454953;
					letter-spacing: 0px;
					line-height: 30px;
					font-weight: bold;
				}
 				.present{
					background-image: url(../../../assets/images/present.png);
					background-repeat: no-repeat;
				 	background-size: auto 25px;
					background-position:0px 5px;
					height:35px;
					width:162px;
					border:none;
					outline: none;
					>span{
						line-height: 35px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: 0px;
						padding-left: 20px;
					}
				}
			}
		}
		.searchEnd{
			width: 980px;
			margin:0 auto 20px;
			height: 20px;
			font-size: 14px;
			color: #999999;
			letter-spacing: 0px;
		}
	}
</style>
