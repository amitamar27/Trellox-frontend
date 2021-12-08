<template >
  <div v-if="board"  class="board-container" >
    

    <board-header 
      :board="board"
     />
    
    <!-- {{board}} -->
    <group-list  @dragEnd="dragEnd" @pickTask="pickTask" :board="board" v-if="board" ></group-list>
    <!-- <router-view /> -->
    <!-- <task-edit></task-edit> -->
    <router-view />
    <!-- <div class="scroller"></div> -->
  </div>
</template>

<script>
import groupList from "../components/group-list.vue";
import taskEdit from './task-edit.vue';
import boardHeader from '../components/board-header.vue';
export default {
   watch: {
        '$route.params.boardId': {
            handler() {
               const { boardId } = this.$route.params;
                 
            },
            immediate: true
        }
    },
  computed: {
    board() {
      // :style="getStyle"
      return this.$store.getters.board;
    },
    getStyle(){
      if (this.board.style.backgroundSrc) {
        const url =this.board.style.backgroundSrc
       return {'background-image':`url(${url})`}
      }
      else{
        const backgroundColor =this.board.style.backgroundColor
        return {backgroundColor:`${backgroundColor}`}
      }
    }
  },
  methods:{
    pickTask(){
      console.log(this.board);
    },
    dragEnd(){
      const board =this.board
      this.$store.dispatch({type:'setBoard', board})
    },
    
    
  },

  components: {
    groupList,
    taskEdit,
    boardHeader
  },
};
</script>

<style>
/* .scroller::-webkit-scrollbar {
  height: 15px;
  width: 12px;
}

.scroller::-webkit-scrollbar-track {
  
  background: rgba(9, 30, 66, 0.08);
  border-radius: 20px;
}

.scroller::-webkit-scrollbar-button {
  height: 4px;
  width: 4px;
}

.scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.425);
  border-radius: 20px;
} */
</style>