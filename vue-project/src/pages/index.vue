<template>
  <!-- <div class="mod-module mod-parallel">
    <a v-for="(item,index) in items" :class="[commonClass,item.active?activeClass:'']" @click="navClickEvent(items,index)">
      <span>{{ item.text}}</span>
    </a>
  </div> -->
    <div class="mod-module mod-parallel">
    <div class="img-list type-full">
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/btn">按钮</a>
        </p>
      </div>
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/list">列表</a>
        </p>
      </div>
      <div class="img-box">
        <p class="img-item">
          <a class="page-link" href="#/nav">导航</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
a{
  display:inline-block;
  height: 30px;
  line-height: 30px;
  width: 70px;
  text-align: center;
}
.active{
  background: #ccc;
}
</style>

<script>
    export default{
      data(){
        return{
          // commonClass:'nav-item',
          // activeClass:'active',
          //   items:[
          //       {
          //         text:'首页',
          //         active:true,
          //       },{
          //         text:'列表',
          //         active:false
          //       },{
          //         text:'关于',
          //         active:false
          //       },{
          //         text:'招聘',
          //         active:false
          //       }
          //   ]
        }
      },
      methods:{
        navClickEvent(items,index){
          items.forEach(function(item){
            item.active = false;
          });
          items[index].active = true;
          this.$emit('navClickEvent',items,index);
        }
      }
    }
</script>
