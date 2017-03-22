<template>
	<div class="cover" v-if="openup">
		<div class="box" @click="closeup"></div>
		<div class="cover" @click="clear_choose">
			<p class="title">设为指定封面：</p>
			<div class="choose-box" flex="dir:left main:justify">
				<div flex-box="0" @click.stop="choose(1)">
					<div class="pic-box" flex="main:center cross:center" :class="{choose:choose_val==1}">
						<span v-if="fir_url==null">未设置</span>
						<img v-else :src="fir_url+'@!gif'">
					</div>
					<p class="choose-word" v-if="choose_val==1">设为产品封面图</p>
					<!-- <p class="choose-word" @click.stop="clear_pic(1)">重设封面</p> -->
				</div>
				<div flex-box="0" @click.stop="choose(2)">
					<div class="pic-box" flex="main:center cross:center" :class="{choose:choose_val==2}">
						<span v-if="sec_url==null">未设置</span>
						<img v-else :src="sec_url+'@!gif'">
					</div>
					<p class="choose-word" v-if="choose_val==2">设为列表封面图</p>
					<!-- <p class="choose-word" @click.stop="clear_pic(2)">重设封面</p> -->
				</div>
			</div>
			<div class="button" flex="dir:left main:justify">
				<div class="confirm" @click="save">确认</div>
				<div class="cancal" @click="closeup">取消</div>
			</div>
		</div>
	</div>
</template>
<script>
import PicApi from '../../../api/Pic'
	export default {
		name:'cover',
		data(){
			return{
				fir_id:null,
				sec_id:null,
				fir_url:null,
				sec_url:null,
				choose_val:null
			}
		},
		methods:{
			choose(val){
				this.choose_val=val
			},
			clear_choose(){
				this.choose_val=null
			},
			clear_pic(val){
				if(val==1){
					this.fir_id=null
					this.fir_url=null
				}
				if(val==2){
					this.sec_id=null
					this.sec_url=null
				}
			},
			closeup(){
				this.$store.dispatch('pic-open-cover')
			},
			save(){
				if(this.choose_val==2&&this.fir_id==this.move_id){
					this.$store.dispatch('alert-msg','不能重复设置图片')
					this.$store.dispatch('alert-start')
					return
				}
				if(this.choose_val==1&&this.sec_id==this.move_id){
					this.$store.dispatch('alert-msg','不能重复设置图片')
					this.$store.dispatch('alert-start')
					return
				}
				let put=[]
				let fir={}
				let sec={}
				fir.picture_id=this.fir_id
				fir.order_num=1
				sec.picture_id=this.sec_id
				sec.order_num=2
				if(this.choose_val==1){
					fir.picture_id=this.move_id
				}
				if(this.choose_val==2){
					sec.picture_id=this.move_id
				}
				put.push(fir,sec)
				PicApi.SetListImage(this,put,PicApi.GetListImage)
			}
		},
		computed:{
			openup(){
            	return this.$store.state.pic.cover
            },
            move_id(){
				return this.$store.state.pic.move_id
			},
			move_url(){
				return this.$store.state.pic.move_url
			}
		},
		watch:{
			openup:function(val,oldVal){
				if(val){
					PicApi.GetListImage(this)
					return
				}
				this.choose_val=null
				this.fir_url = null
				this.sec_url = null
				this.fir_id = null
				this.sec_id = null
			}
		}
	}
</script>
<style scoped lang='scss'>
	.cover{
		.box{
			position: fixed;
			height: 100%;
			width: 100%;
			min-width: 1200px;
			top: 0;
			left: 0;
			background:rgba(0,0,0,0.33);
		}
		.cover{
			position: fixed;
			width: 475px;
			height: 355px;
			background: #FFFFFF;
			box-shadow: 0px 2px 14px 0px rgba(0,0,0,0.33);
			border-radius: 4px;
			z-index: 1;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			.title{
			    margin-top: 30px;
			    padding-left: 30px;
			    font-size: 18px;
			    color: #454953;
			    letter-spacing: 0px;
			    font-weight: bold;
			}
			.choose-box{
				margin-top: 50px;
				padding: 0 85px;
				>div{
					width: 120px;
					.pic-box{
						width: 100%;
						height: 120px;
						background: #F4F6F8;
						border-radius: 3px;	
						font-size: 12px;
						color: #CFCECE;
						box-sizing: border-box;
						letter-spacing: 0px;
						img{
							display: block;
							width: 100%;
							height: auto;
						}
					}
					.choose{
						border:1px solid #53AAE6;
					}
					.choose-word{
						margin-top: 10px;
						text-align: center;
						font-size: 12px;
						color: #53AAE6;
						letter-spacing: 0px;
					}
				}
			}
			.button{
				margin-top: 20px;
				padding: 0 80px;
				.confirm,.cancal{
					width: 125px;
					height: 30px;
					background: #53AAE6;
					border-radius: 4px;
					color: #ffffff;
					text-align: center;
					line-height: 30px;
				}
				.cancal{
					background: #E4EBF0;
				}
			}
		}
	}	
</style>
