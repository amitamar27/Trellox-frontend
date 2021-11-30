<template>
  
  <div class="board-container">
      <!-- <h1>grandfather: board</h1> -->
      <!-- <div  v-if="board">{{board.groups}}</div> -->
      
      <!-- <div>{{x.length}}</div> -->
      <group-list v-if="board" :board="board"></group-list>
      <div class="scroller"></div>
  </div>

</template>

<script>
import groupList from '../components/group-list.vue'
export default {

  data(){
    return {
     
    }
  },
  created(){
    this.$store.dispatch({type: "loadBoard"})
  },
  computed: {
    board(){
      return this.$store.getters.board
    }
  },

components:{
  groupList,
 }
}
</script>

<style>

.board-container{
    margin-top: 45px;
    height: calc(100% - 57px);
    overflow-x:auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    
}

</style>