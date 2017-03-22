<template>
	<div class="pic-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">图片序号</div>
			<div flex="cross:center main:center" flex-box="2">预览图</div>
			<div flex="cross:center main:center" flex-box="3">图片名称</div>
			<div flex="cross:center main:center" flex-box="2">图片分类</div>
			<div flex="cross:center main:center" flex-box="3">操作</div>
		</div>
		<div flex="dir:left  box:mean" class="message" v-for='(item,index) in msg' draggable='true' @dragstart='dragstart(index,item.id)' @drop='drop(index,$event,item.id)' @dragover='dragover($event)'>
			<div flex="dir:top cross:center main:center" flex-box="1" class="id">
				<input v-if="changePicNum==index" v-model="item.order_num" placeholder="输入图片序号" class="change-input" >
				<span v-else>{{item.order_num}}</span>
			</div>
			<div flex="cross:center main:center" flex-box="2" class="series">
				<div class="space" flex="cross:center main:center">
					<img :src="item.picture_url+'@!gif'">
				</div>
			</div>
			<div flex="cross:center main:center" flex-box="3" class="style">
				<div class="space" flex="cross:center main:center">
					<input v-if="changePicNum==index" v-model="item.title" placeholder="输入名称" class="change-input">
					<span v-else>{{item.title}}</span>
				</div>
			</div>
			<div class="para" flex="cross:center main:center" flex-box="2">
				<div class="space" flex="cross:center main:center" v-if="item.picture_category!=null">
					<select v-if="changePicNum==index&&picture_category!=null" v-model='item.picture_category.picture_category_id'>
					 	<option v-for="pic_id in picture_category" :value="pic_id.picture_category_id" >{{pic_id.picture_category_name}}</option>
					</select>
					<span v-else>{{item.picture_category.picture_category_name}}</span>	
				</div>
			</div>
			<div v-if="changePicNum==index" flex="dir:top cross:center main:center" flex-box="3">
				<div class="edit changePic" @click='save(index,item.id,0)'>保存</div>
			</div>
			<div v-else flex="dir:top cross:center main:center" flex-box="3">
				<div class="edit" @click='changepic(index)'>编辑图片</div>
				<div class="choose" flex="dir:left main:justify">
					<span @click="cover(item.id,item.picture_url)">设为封面</span>
					<span @click="show(item.id)">移动</span>
					<span @click="change_status(item.id,1)">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import PicApi from '../../../api/Pic'
import CommonApi from '../../../api/Common'
	export default {
		data(){
			return{
				start_id:Number,
				changeNum:Number,
				now:Number,
				nowNum:Number,
				change:Number,
				changeNum:Number,
				msg:null,
				changePicNum:null
			}
		},
		name:'pic-list',
		methods:{
			change_status(id,status){
				if(status==1){
					if(!confirm('确定删除吗？')){return}
				}
				CommonApi.ChangeStatus(this,4,id,status,PicApi.getList)
			},
			cover(id,url){
				this.$store.dispatch('pic-move_url',url)
				this.$store.dispatch('pic-move_id',id)
				this.$store.dispatch('pic-open-cover')
			},
			changepic(val){
				this.changePicNum=val
			},
			save(val,id,type,order){
				PicApi.update(this,val,id,type,order,PicApi.getList)
			},
			show(val){
				this.$store.dispatch('pic-move_id',val)
				this.$store.dispatch('pic-open-move')
			},
			dragstart(num,id){
				this.now=id
				this.nowNum=num
			},
			drop(num,event,val){
				this.change=val
				this.changeNum=num
				let now=event.clientY-this.$el.children[num+1].offsetTop+window.scrollY
				let height=this.$el.children[num+1].offsetHeight
				if( now <= height/2 && this.now!=this.change && this.changeNum-this.nowNum!=1){
					let min=this.msg[num].order_num
					let max=min+1
					let changeNum=max
					if(num!=0){
						max=this.msg[num-1].order_num	
						changeNum=Math.round((min+max)/2)
					}
					PicApi.update(this,this.nowNum,this.now,1,changeNum,PicApi.getList)
				}
				if( now > height/2 && this.now!=this.change && this.nowNum-this.changeNum!=1){
					let min=this.msg[num].order_num
					let max=min-1
					let changeNum=max
					if(num!=this.msg.length-1){
						max=this.msg[num+1].order_num	
						changeNum=Math.round((min+max)/2)
					}
					PicApi.update(this,this.nowNum,this.now,1,changeNum,PicApi.getList)
				}
			},
			dragover(val){
				event.preventDefault();
			}
		},
		computed:{
			msg(){
            	return this.$store.state.pic.list
            },
            picture_category(){
				return this.$store.state.pic.picture_category
			}
		}
	}
</script>
<style scoped lang='scss'>
	.pic-list{
		width: 980px;
		margin:5px auto 0;
		.list-top,.message{
			height: 50px;
			background: #FFFFFF;
			font-size: 14px;
			color: #383838;
			letter-spacing: 0px;
			border-bottom:1px solid #F4F6F8;
			>div{
				border-right:1px solid #F4F6F8;
			}
			>div:last-child{
				border:none;
			}
		}
		.message{
			background:#ffffff;
			height: auto;
			>div{
				padding: 30px 0;
			}
			.close-img{
				width: 20px;
				margin-bottom: 4px;
			}
			.close{
				color: #999999;
				>span:last-child{
					margin-left:10px;
				}
			}
			.para>div{
				margin-top: 13px;
				cursor:pointer;
			}
			.para>div:first-child{
				margin-top: 0;
			}
			.edit{
				width: 170px;
				height: 30px;
				background: #53AAE6;
				border-radius: 4px;
				color: #ffffff;
				text-align: center;
				line-height: 30px;
				cursor:pointer;
			}
			.changePic{
				background: #F1A881;
				color: #ffffff;
			}
			.choose{
				width: 160px;
				color: #53AAE6;
				margin-top: 8px;
				>span{
					cursor:pointer;
				}
			}
		}
		.message:nth-child(2n){	
			background: #FBFBFB;
		}
		.space{
			height: 100%;
			text-align: center;
			padding: 0 10%;
			img{
				display: block;
				width: 100%;
			}
		}
		.change-input{
			width: 80%;
			height: 30px;
			background: #FFFFFF;
			border: 1px solid #DBEAF5;
			border-radius: 4px;
			font-size: 12px;
			color: #999999;
			letter-spacing: 0px;
		}
	}
</style>
