<template>
  <div>
      <qui-btn msg="确定" class="small"></qui-btn>
      <qui-btn v-on:btnClickEvent="doSth" msg="我可以点击" ></qui-btn>
  </div>
</template>
<style scoped>

</style>
<script>
import QuiBtn from '../components/quiButton'
    export default{
        name:'pageguibutton',
        components:{
            'qui-btn':QuiBtn
        },
        methods:{
            doSth: function(){
                alert('你点击了组件的click:btnClickEvent');
            }
        }
    }
</script>