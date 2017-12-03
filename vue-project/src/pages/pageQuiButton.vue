<template>
  <div>
        <qui-btn msg="确定" class="small"></qui-btn>
        <qui-btn v-on:btnClickEvent="doSth" msg="我可以点击" ></qui-btn>
        <qui-btn v-on:btnClickEvent="doSth1" msg="确定1" ></qui-btn>
        <qui-btn v-on:btnClickEvent="doSth2" msg="取消" ></qui-btn>
        <qui-btn v-on:click="doSth3" msg="取消3" ></qui-btn>
        <qui-btn v-on:click="doSth5">{{ a }}</qui-btn>
        <div v-on:click="doSth4">div</div>
  </div>
</template>
<style scoped>

</style>
<script>
import QuiBtn from '../components/quiButton'
    export default{
        data(){
            return{
                a:''
            }
        },
        name:'pageguibutton',
        components:{
            'qui-btn':QuiBtn
        },
        methods:{
            doSth: function(){
                alert('你点击了组件的click:btnClickEvent');
            },
            doSth1: function(){
                alert('1111');
            },
            doSth2: function(){
                alert('2222');
            },
            doSth3: function(){
                alert('3333');
            },
            doSth4: function(){
                alert('444div');
            },
            doSth5(){
                this.$on('btnClickEvent',function(msg){
                    this.a = msg;
                });
            }          
        }
    }
</script>