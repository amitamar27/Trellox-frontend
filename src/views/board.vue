<template>
  <div class="board-container" >
  
    <group-list @pickTask="pickTask" :board="board" v-if="board" ></group-list>
    <!-- <task-edit></task-edit> -->
    <!-- <div class="scroller"></div> -->
  </div>
</template>

<script>
import groupList from "../components/group-list.vue";
import taskEdit from './task-edit.vue'
export default {
  
  created() {
    this.$store.dispatch({ type:"loadBoard" });
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  methods:{
    pickTask(){
      console.log(this.board);
    }
  },

  components: {
    groupList,
    taskEdit
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