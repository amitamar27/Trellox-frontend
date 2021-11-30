<template>
  
  <div class="board-container">
      <h1>grandfather: board</h1>
      <group-list></group-list>
      <div class="scroller"></div>
  </div>

</template>

<script>
import groupList from '../components/group-list.vue'
export default {

  data(){

  },

components:{
  groupList,
 }
}
</script>

<style>
.scroller::-webkit-scrollbar-thumb{
  background: rgba(192,196,207,.7490196078431373);
  border-radius: 5px;
}
.scroller::-webkit-scrollbar {
    height: 15px;
    width: 8.5px;
}
</style>