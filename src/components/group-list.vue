<template>

<div class="group-list-container">
        <draggable  class="group-list"> 
        <group-preview v-for="group in board.groups" :group="group" :key="group.id" ></group-preview>
       </draggable>
</div>




  
</template>

<script>
import groupPreview from './group-preview.vue'
import boardService from '../store/index.js'
import draggable from "vuedraggable";

export default {
components:{
    groupPreview,
    draggable
},
computed:{
    board(){
        return this.$store.getters.board
    }
}
}
</script>

<style>
.group-list-container {
    overflow-x: auto;
}
</style>