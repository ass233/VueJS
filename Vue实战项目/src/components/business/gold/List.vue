<template>
	<div class="brand-list" flex="dir:top">
		<div flex-box="0" flex="dir:left box:mean" class="list-top">
			<div flex="cross:center main:center" flex-box="1">品牌名称</div>
			<div flex="cross:center main:center" flex-box="1">当日黄金价</div>
			<div flex="cross:center main:center" flex-box="1">当日铂金价</div>
		</div>
		<div flex-box="0" flex="dir:left  box:mean" class="message" v-for='(item,index) in msg'>
			<div flex="dir:top cross:center main:center" flex-box="1" class="id">
				<span>{{item.brand_name}}</span>
			</div>
	        <ul flex-box="1" class="brand" flex="cross:center main:center  dir:top">
	          	<li flex="cross:center main:center" v-if="change==item.gold_daily_quotation_id&&change_brand==item.brand_id&&choose_side">
		          	<input type="number" placeholder="输入今日金价" v-model.number="item.gold_price">
		          	<span class="YY-submit" @click="submit(item.brand_id,item.gold_price,item.platinum_price)">提交</span>
	          	</li>
     		  	<li flex="cross:center main:center" v-else>
         		  	<span class="YY-brand-list1">{{item.gold_price}}</span>
         		  	<span  class="YY-brand-list2" @click="fix_gold(item.brand_id,item.gold_daily_quotation_id)">修改</span>
     		  	</li>
	          	<li flex="cross:center main:center">
      				<span>最后更新:</span>&nbsp;<span>{{item.gold_update_time | times}}</span>
	          	</li>
	        </ul>
	        <ul flex="cross:center main:center dir:top" flex-box="1" class="brand">
				<li flex="cross:center main:center" v-if="platinum==item.platinum_daily_quotation_id&&change_brand==item.brand_id&&!choose_side">
				  	<input type="number" placeholder="输入今日金价" v-model.number="item.platinum_price">
				  	<span class="YY-submit" @click="submit(item.brand_id,item.gold_price,item.platinum_price)">提交</span>
				</li>
				<li flex="cross:center main:center" v-else>
				  	<span class="YY-brand-list1">{{item.platinum_price}}</span>
				  	<span  class="YY-brand-list2"  @click="fix_platinum(item.brand_id,item.platinum_daily_quotation_id)">修改</span>
				</li>
				<li flex="cross:center main:center"><span>最后更新:</span>&nbsp;<span>{{item.platinum_update_time | times}}</span></li>
	        </ul>
		</div>
	</div>
</template>
<script>
import goldApi from '../../../api/gold'
	export default {
		data(){
			return{
				close:require('../../../assets/images/list_downstate.png'),
				change:Number,
				platinum:Number,
				change_brand:Number,
				choose_side:null,
			}
		},
		filters:{
			times:function(value){
			  	let date = new Date(value);
			    let seperator1 = "/";
			    let seperator2 = ":";
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    return currentdate;
			}
		},
		methods:{
			fix_gold(brand,id){
				this.choose_side=true
				this.platinum=Number
				this.change_brand=brand
				this.change=id
			},
			fix_platinum(brand,id){
				this.choose_side=false
				this.change=Number
				this.change_brand=brand
				this.platinum=id
			},
			submit(id,gold,platinum){
				goldApi.UpdateQuotation(this,id,gold,platinum,goldApi.getList)
			},
		},
		computed:{
			msg(){
            	return this.$store.state.gold.list
            }
		}
	}
</script>
<style scoped lang='scss'>
	.brand-list{
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
		}
		.brand{
			li{
				padding:4px 0;
			}
        .YY-brand-list1{
            font-family: PingFangSC-Medium;
            font-size: 22px;
            color: #2B3443;
            letter-spacing: 0px
          }
        .YY-brand-list2{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #53AAE6;
            letter-spacing: 0px;
            cursor: pointer;
            margin-left: 10px;
          }
        li:nth-child(1){
          input{
            background: #FFFFFF;
            border: 1px solid #DBEAF5;
            border-radius: 4px 0 0 4px;
            height: 30px;
            width: 148px;
            text-indent:15px;
            outline: none;
          }
          .YY-submit{
			height: 32px;
			line-height: 32px;
			background: #F1A881;
			border-radius: 0px 4px 4px 0px;
			color: #fff;
			padding: 0px 7px;
			cursor: pointer;
           }

        }
        li:nth-child(3){
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #BCBCBC;
          letter-spacing: 0px;
        }
		}
		.message{
			width: 100%;
			background:#ffffff;
			height: auto;
			>div{
				min-height: 120px;
			}
			.choose{
				width: 100px;
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
		}
	}
</style>
