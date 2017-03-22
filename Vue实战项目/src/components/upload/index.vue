<template>
	<div class="upload" v-if='openup'>
		<div class="box" @click="closeup"></div>
		<div class="upload-box">
			<p class="pic-attr">设置图片属性</p>
			<div class="kind-box" flex="dir:left cross:center">
				<p flex-box="0">图片分类:</p>
				<select flex-box="0" v-model='choose_category' v-if="picture_category!=null">
				 	<option v-for="item in picture_category" :value="item.picture_category_id" >{{item.picture_category_name}}</option>
				</select>
			</div>
			<div class="name-box" flex="dir:left cross:center">
				<p flex-box="0">图片命名:</p>
				<input flex-box="0" type='text' placeholder='若不填写则使用图片自带名称' v-model="title">
			</div>
			<div class="water-box" flex="dir:left cross:center">
				<p flex-box="0">图片水印:</p>
				<div flex="dir:left cross:center" @click="haswater">
					<div class="circle" :class="{'choose':has_water_mark==1}"></div>
					<p class="true">是</p>
				</div>
				<div flex="dir:left cross:center" @click="nowater">
					<div class="circle" :class="{'choose':has_water_mark==0}"></div>
					<p class="false">否</p>	
				</div>
			</div>
			<p class="pic-choose">设置图片属性</p>
			<div class='choose-box' flex='dir:left main:justify'>
				<div flex-box="0" class="upload-pic" v-if='choose_category!=null'>
					<div class="upload-word">选择文件</div>
					<input type="file" id="Upload" multiple @change="getfile" accept="image/jpg,image/jpeg,image/gif,image/png,image/bmp"/>	
				</div>
				<div flex-box="0" class="start-upload" @click="uploadPic" v-if="host!=null&&choose_category!=null">开始上传</div>
			</div>
			<div class='pic-msg-box'>
				<div class="pic-msg" flex="dir:top" v-for='(item,index) in files'>
					<div class="pic-name-box" flex="dir:left cross:center">
						<p class="pic-name">{{item.name}}</p>
						<p class='pic-size'>{{item.size | changeSize}}KB</p>
					</div>
					<div class="pic-pro-box" flex="dir:left cross:center">
						<div class="pic-pro">
							<div class="pic-pro-per" :style="{width:allpro[index]+'%'}"></div>
						</div>
						<p class='pic-wait' v-if='allstatus[index]==0'>等待上传</p>
						<p class='prc-pro' v-if='allstatus[index]==1'>{{allpro[index]}}</p>
						<p class='pic-success' v-if='allstatus[index]==2'>上传成功</p>
						<p class='pic-error' v-if='allstatus[index]==3'>上传失败，点击<span class='repeat' @click="repeat(index)">重试</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import PicApi from '../../api/Pic'
import CommonApi from '../../api/Common'
	export default {
		data(){
			return{
				num:0,
				choose_category:null,
				reval:null,
				allpro:null,
				allstatus:null,
				xhr:null,
				msg:null,
				files:null,
				host:null,
				access_url:null,
				accessid:null,
				expire:null,
				host:null,
				key:null,
				oss_bucket:null,
				policy:null,
				signature:null,
				uploadMsg:[],
				allname:null,
				title:null,
				now_time:null,
				has_water_mark:0
			}
		},
		name:'upload',
		methods:{
			haswater(){
				this.has_water_mark=1
			},
			nowater(){
				this.has_water_mark=0
			},
			closeup(){
				PicApi.getList(this)
				this.choose_category=null
				this.title=null
				this.has_water_mark=0
				this.$store.dispatch('pic-open-upload')
			},
			getfile(){
				this.num=0
				this.uploadMsg=[]
				this.allpro=[]
				this.allstatus=[]
				let msg=document.querySelector('#Upload').files
				for (let index = 0; index < msg.length; index++) {   
				    this.allpro.push(0)
					this.allstatus.push(0) 
				}
				this.files=document.querySelector('#Upload').files
			},
			uploadPic(){
					this.$set(this.allstatus,this.num,1)
					this.xhr = new XMLHttpRequest()
					let from=new FormData()
					this.now_time=new Date().getTime()
					from.append('OSSAccessKeyId',this.accessid)
					from.append('key',this.key+this.now_time+'_'+'${filename}')
					from.append('policy',this.policy)
					from.append('signature',this.signature)
					from.append('file',this.files[this.num])
					this.xhr.upload.addEventListener("progress", this.uploadpro, false)
					this.xhr.open("POST", this.host , true)
					this.xhr.send(from)
					this.xhr.onreadystatechange=this.callback 
			},
			uploadpro(evt){
				let percentComplete = Math.round((evt.loaded) * 100 / evt.total)
				this.$set(this.allpro,this.num,percentComplete)
			},
			callback(){
				if(this.xhr.readyState==4 && this.xhr.status>=200 &&this.xhr.status<300){
					this.$set(this.allstatus,this.num,2)
					let url=this.access_url+this.key+this.now_time+'_'+this.files[this.num].name
					let name=this.files[this.num].name.substring(0,this.files[this.num].name.lastIndexOf('.'))
					let onepic={}
					onepic.url=url
					onepic.title=name
					this.uploadMsg.push(onepic)
					if(this.num!=(this.files.length-1)){
						this.num+=1
						return this.uploadPic()
					}else{
						this.uploadall()
					}
				}else if(this.xhr.readyState==4){
					this.$set(this.allstatus,this.num,3)
					if(this.num!=(this.files.length-1)){
						this.num+=1
						return this.uploadPic()
					}else{
						this.uploadall()
					}
				}
			},
			uploadall(){
				this.$store.dispatch('load-start')
				this.$http.post('/api/plcms/style_picture/UploadPicture',{
					pl_library_id:parseInt(sessionStorage.getItem("pl_library_id")),
					style_id:parseInt(this.$route.query.style_id),
					picture_url_list:this.uploadMsg,
					picture_category_id:this.choose_category,
					title:this.title,
					has_water_mark:this.has_water_mark
				})
				.then((response) => {
					this.$store.dispatch('load-close')
				})	
			},
			repeat(val){
				this.reval=val
				this.$set(this.allstatus,this.reval,1)
				this.xhr = new XMLHttpRequest()
				let from=new FormData()
				this.now_time=new Date().getTime()
				from.append('OSSAccessKeyId',this.accessid)
				from.append('key',this.key+this.now_time+'_'+'${filename}')
				from.append('policy',this.policy)
				from.append('signature',this.signature)
				from.append('file',this.files[this.reval])
				this.xhr.upload.addEventListener("progress", this.uploadprorepeat, false)
				this.xhr.open("POST", this.host , true)
				this.xhr.send(from)
				this.xhr.onreadystatechange=this.callbackrepeat
			},
			uploadprorepeat(evt){
				let percentComplete = Math.round((evt.loaded) * 100 / evt.total)
				this.$set(this.allpro,this.reval,percentComplete)
			},
			callbackrepeat(){
				if(this.xhr.readyState==4 && this.xhr.status>=200 &&this.xhr.status<300){
					this.$set(this.allstatus,this.reval,2)
				}else if(this.xhr.readyState==4){
					this.$set(this.allstatus,this.reval,3)
				}
			}
		},
		filters:{
			changeSize(value){
				let size=Math.floor(value/1024)
				return size
			}
		},
		computed:{
			openup(){
            	return this.$store.state.pic.upload
            },
            picture_category(){
				return this.$store.state.pic.picture_category
			}
		},
		created(){
			CommonApi.signature(this)
		},
		watch:{
			openup:function(){
				this.files=null
			}
		}
	}
</script>
<style scoped lang='scss'>
	.upload{
		.box{
			position: fixed;
			height: 100%;
			width: 100%;
			min-width: 1200px;
			top: 0;
			left: 0;
			background:rgba(0,0,0,0.33);
		}
		.upload-box{
			position: fixed;
			width: 720px;
			height: 542px;
			background: #FFFFFF;
			box-shadow: 0px 2px 14px 0px rgba(0,0,0,0.33);
			border-radius: 4px;
			z-index: 1;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-50%);
			.pic-attr,.pic-choose{
				margin-top: 30px;
				padding-left: 30px;
				font-size: 18px;
				color: #454953;
				letter-spacing: 0px;
				font-weight: bold;
			}
			.pic-choose{
				margin-top: 50px;
			}
			.kind-box{
				margin-top: 40px;
			}
			.name-box{
				margin-top: 20px;
			}
			.water-box{
				margin-top: 20px;
			}
			.kind-box,.name-box,.water-box{
				padding-left: 50px;
				p{
					font-size: 14px;
					color: #454953;
					letter-spacing: 0px;
					margin-right: 30px;
				}
				select{
					outline: none;
					border:none;
					height: 30px;
					width: 190px;
					background: #FBFBFB;
					border-radius: 4px;
					font-size: 12px;
					color: #454953;
					letter-spacing: 0px;
					text-indent: 10px;
				}
				input{
					outline: none;
					border:none;
					height: 30px;
					width: 340px;
					background: #FBFBFB;
					border-radius: 4px;
					font-size: 12px;
					color: #454953;
					letter-spacing: 0px;
					text-indent: 10px;
				}
				.circle{
					margin-right: 7px;
					width: 5px;
					height: 5px;
					border-radius: 50%;
					border:5px solid #EBEBEB;
				}
				.choose{
					border:5px solid #53AAE6;
				}
				.true{
					margin-right: 50px;
				}
			}
			.choose-box{
				margin-top: 30px;
				padding-left: 50px;
				margin-bottom: 20px;
				width: 300px;
			}
			.upload-pic{
				position: relative;
				.upload-word{
					background: #53AAE6;
					border-radius: 4px;
					width: 125px;
					height: 30px;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: 0px;
					text-align: center;
					line-height: 30px;
					cursor: pointer;
				}
				#Upload{
					cursor: pointer;
					width: 125px;
					height: 30px;
					opacity: 0;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			.start-upload{
				background: #53AAE6;
				border-radius: 4px;
				width: 125px;
				height: 30px;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0px;
				text-align: center;
				line-height: 30px;
				cursor: pointer;
			}
			.pic-msg-box{
				height: 160px;
				overflow: auto;
			}
			.pic-msg{
				padding-left: 50px;
				.pic-name{
					font-size: 12px;
					color: #999999;
					letter-spacing: 0px;
					margin-right: 50px;
				}
				.pic-size{
					font-size: 12px;
					color: #999999;
					letter-spacing: 0px;
				}
				.pic-pro{
					background: #EBEBEB;
					border-radius: 4px;
					height: 10px;
					width: 332px;
					.pic-pro-per{
						width: 0;
						height: 10px;
						background: #95D584;
						border-radius: 4px;
					}
				}
				.pic-success,.prc-pro,.pic-error,.pic-wait{
					font-size: 12px;
					color: #95D584;
					letter-spacing: 0px;
					width: 130px;
					padding-left: 30px;
					height: 30px;
					line-height: 30px;
				}
				.prc-pro{
					padding-left: 10px;
					color: #999999;
				}
				.pic-error{
					color: #454953;
					.repeat{
						line-height: none;
						color: #53AAE6;
					}
				}
			}
		}
	}
</style>
