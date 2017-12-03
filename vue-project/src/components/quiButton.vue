<template>
  <button class="qui-btn" v-on:click="btnClickEvent">
    <span>{{msg}}</span>
  </button>
</template>

<script>
  export default {
        props:{
            msg:{
                default:'下载'
            }
        },
        methods:{
            btnClickEvent:function(){
                alert("先弹出默认的文案");
                this.$emit('btnClickEvent',this.msg);
            },
            
        }
  }
</script>
<style scoped>

</style>