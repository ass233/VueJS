<template>
	<div class="series" flex="dir:top">
		<topList :list-msg="list"></topList>
		<div class="message" flex="dir:left main:justify cross:center">
			<div class="tag-search" flex="dir:left">
				<span flex-box="0" class='tag'>系列</span>
				<input type='text' class="search" placeholder="筛选.." v-model="search">
				<div class="search-button" @click='changemsg'>搜索</div>
			</div>
			<div class="add" @click="addNewSeries">创建新系列</div>
		</div>
		<div class="searchEnd" v-if="change!=null&&change!=''">以下为筛选结果…</div>
		<prompt></prompt>
		<msgList></msgList>
		<page></page>
	</div>
</template>
<script>
import topList from '../../list/list'
import prompt from '../../NotEdit/prompt'
import msgList from './List'
import page from '../../page/index'
import SeriesApi from '../../../api/Series'
	export default {
		name:'series',
		data(){
			return{
				list:['婚纱库','>','系列列表'],
				search:null,
				change:null
			}
		},
		components:{
			prompt,topList,msgList,page
		},
		computed:{
			now(){
            	return this.$store.state.publicMsg.nowpage
            }
		},
		methods:{
			addNewSeries(){
				this.$router.push({path:'/index/weddingDress/series/edit',query:{brand_id:this.$route.query.brand_id}})
			},
			changemsg(){
				this.change=this.search
				if(this.now==1){
					SeriesApi.getList(this)
				}else{
					this.$store.dispatch('now-change',1)
				}			
			},
			addseries(){
				this.$router.push({path:'/index/weddingDress/series/edit'})
			}
		},
		watch:{
			now:function(val, oldVal){
				if(!this.$route.query.brand_id || !isNaN(val)){
					sessionStorage.setItem("series-now-page",val)
				}
				SeriesApi.getList(this)
			},
			search:function(val, oldVal){
				this.$store.dispatch('series-search',val)
			}
		},
		created(){
			if(this.$route.query.brand_id){
				this.$store.dispatch('now-change',1)
			}else{
		    	this.$store.dispatch('now-change',parseInt(sessionStorage.getItem("series-now-page")) || 1)
			}
		},
		beforeRouteLeave(to, from, next){
			this.$store.dispatch('series-search',null)
			this.$store.dispatch('now-change',Number)
			next()
		}
	}
</script>
<style scoped lang='scss'>
	.series{
		.message{
			height: 60px;
			width: 980px;
			margin: auto;
			.tag-search{
				.tag{
					width: 70px;
					font-size: 24px;
					color: #454953;
					letter-spacing: 0px;
					line-height: 30px;
					font-weight: bold;
				}
				.search{
					background-image: url(../../../assets/images/seach_icon.png);
					background-repeat: no-repeat;
					background-size: auto 20px;
					background-color: #FFFFFF;
					background-position:10px 5px;
					height: 30px;
					width: 250px;
					border:none;
					outline: none;
					border-radius: 18px 0 0 18px;
					padding-left: 38px;
					font-size: 14px;
				}
				.search-button{
					background: #53AAE6;
					border-radius: 0px 18px 18px 0px;
					font-size: 12px;
					color: #FFFFFF;
					letter-spacing: 0px;
					line-height: 30px;
					width: 53px;
					text-align: center;
					cursor:pointer;
				}
			}
			.add{
				background-image: url(../../../assets/images/list_new_increase.png);
				background-repeat: no-repeat;
				background-size: auto 18px;
				background-color: #5ABCCB;
				background-position:12px 6px;
				width: 105px;
				height: 30px;
				border-radius: 4px;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0px;
				text-align: center;
				line-height: 30px;
				padding-left: 25px;
				cursor:pointer;
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
