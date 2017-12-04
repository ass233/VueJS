<template>
  <div class="qui-list">
      <span class="list-tips">{{ tipsText}}</span>
      <qui-button @btnClickEvent="btnClickEvent" :msg=msg class="small"></qui-button>
  </div>
</template>
<style scoped>

</style>
<script>
import quiButton from './quiButton'
export default {
    components:{
        'qui-button':quiButton
    },
    props:{
        msg:{
            default:'下载3'
        },
        tipsText:{
            default:'默认值'
        }
    },
    methods:{
        btnClickEvent(){
            alert(11111);
        }
    }
  
}
</script>
