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
.scroller::-webkit-scrollbar-thumb{
  background: rgba(192,196,207,.7490196078431373);
  border-radius: 5px;
}
.scroller::-webkit-scrollbar {
    height: 15px;
    width: 8.5px;
}
.scroller{
  display: block;
  width: 1000px;
  overflow: auto;
  height: 2em;
}

/* ::-webkit-scrollbar-thumb{
  background: rgba(192,196,207,.7490196078431373);
  border-radius: 5px;
}
::-webkit-scrollbar {
    height: 15px;
    width: 8.5px;
} */
/* {
  display: block;
  width: 1000px;
  overflow: auto;
  height: 2em;
} */
</style>