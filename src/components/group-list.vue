<template>

<div class="group-list-container">
        <draggable  class="group-list"> 
        <div v-for="group in board.groups" :group="group" :key="group.id" class="group-preview">
          <div class="group-preview-header">
               {{ group.title }}
           <button class="group-preview-btn">
           <img :src="require('@/assets/dots-menu.svg')"/>
           </button>
          </div>
        <card-list :tasks="group.tasks" :groupId="group.id" ></card-list>
       </div>
       <div class ="group-add-container">
       <div class="group-add-btn"><p v-if="!isAddingTitle" @click="isAddingTitle=true"> +Add Group</p>
           <form v-else class="add-group-form" @submit.prevent="addNewGroup">
               <textarea v-model="newGroupTitle" name="" id="" cols="30" rows="1" placeholder="Enter list title"></textarea>
               <div class="form-actions">
               <a class="add-group-add" @click="addNewGroup">Add Group</a>
               <button class="add-group-close" @click="isAddingTitle=!isAddingTitle"> x</button>
               </div>
           </form>

       </div>
       
       </div>
       </draggable>
</div>




  
</template>

<script>
import groupPreview from './group-preview.vue'
import boardService from '../store/index.js'
import draggable from "vuedraggable";
import cardList from "./card-list.vue"


export default {
components:{
    groupPreview,
    draggable,
    cardList
},
data(){
    return {
        isAddingTitle:false,
        newGroupTitle:''
    }
},
computed:{
    board(){
        return this.$store.getters.board
    }
},
methods:{
    addNewGroup(){
        if(this.newGroupTitle==='') return
        this.isAddingTitle=false
        var groupTitle = this.newGroupTitle
        this.$store.dispatch({type:'addGroup', groupTitle})
        this.newGroupTitle=''

    }
}
}
</script>

<style>
.group-list-container {
    overflow-x: auto;
}
</style>