<template>
  <div v-if="board" class="group-list-container">
     <!-- {{ board.groups}} -->
    <draggable class="group-list">
      <div v-for="group in board.groups"  :key="group.id" class="group-preview" >
        <div class="group-preview-header">
          <p
            class="group-title"
            dir="auto"
            maxlength="512"
            style="overflow: hidden; overflow-wrap: break-word; height: 28px">
            {{ group.title }}
          </p>
         <div class="group-preview-btn">
                <span class="span-1 hide">
                    <span class="span-2 icon-sm" ></span>
                </span>
                <div @click="openGroupMenu(group.id)" class="group-header-extras-menu span-1 icon-sm icon-overflow-menu-horizontal" ></div>
            </div>
        </div>
        <!-- <draggable> -->
        <card-list :tasks="group.tasks" :groups="board.groups" :groupId="group.id" @addTask="addTask"></card-list>

        <!-- </draggable> -->
      </div>
      <group-menu @mousedown.stop="" v-if="isMenuOpened && group" @closeMenu="closeGroupMenu" :group="group" :title="'List actions'"></group-menu>
    </draggable>
      <div class="group-add-container">
        <div class="group-add-btn" >
          <p v-if="!isAddingTitle" @click="isAddingTitle = true">+Add Group</p>
          <form v-else class="add-group-form" @submit.prevent="addNewGroup">
            <textarea v-model="newGroupTitle" name="" id="" cols="30" rows="1" placeholder="Enter list title"></textarea>
            <div class="form-actions" >
              <a class="add-group-add" @click="addNewGroup">Add Group</a>
              <button class="add-group-close" @click="isAddingTitle = !isAddingTitle">x</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import groupPreview from "./group-preview.vue";
import {boardService} from "../store/index.js";
import draggable from "vuedraggable";
import cardList from "./card-list.vue";
import groupMenu from './menus-cmps/group-menu.vue'
export default {
  components: {
    groupPreview,
    draggable,
    cardList,
    groupMenu,
  },
  data() {
    return {
      isAddingTitle: false,
      newGroupTitle: "",
      isMenuOpened: false,
      group: null,
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    groups(){
     return this.$store.getters.groups;


    }
  },
  methods: {
    addNewGroup() {
      if (this.newGroupTitle === "") return;
      this.isAddingTitle = false;
      var groupTitle = this.newGroupTitle;
      this.$store.dispatch({ type: "addGroup", groupTitle });
      this.newGroupTitle = "";
    },
    async openGroupMenu(groupId) {
      this.isMenuOpened = true
      const group = await this.$store.dispatch({type: 'getGroupById', groupId});
      this.group = group
      console.log('group',group);
      console.log('open');
    },
    closeGroupMenu() {
      this.isMenuOpened = false
      console.log('close');
    },
    async addTask(task){
        console.log(task);
         await this.$store.dispatch({type:'addTask',task})
         this.$store.dispatch({type:'saveBoard', board:this.board})
    },
    changeGroup(ev){
      const fromIndex =ev.oldIndex
      const toIndex =ev.newIndex
      if(fromIndex===toIndex)return
      const board=this.board
      const payload ={board,fromIndex,toIndex}
      this.$store.dispatch({type:'changeGroupPos',payload})
    }
  },
};
</script>

<style>
/* .group-list-container {
  overflow-x: auto;
} */
</style>