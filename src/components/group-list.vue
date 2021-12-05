<template>
  <div v-if="board" class="group-list-container">
    <div class="group-list">
      <draggable
        data-dragscroll
        class="group-list"
        groups="groups"
        :list="board.groups"
        @end="dragEnd"
      >
        <div
          v-for="group in board.groups"
          :groupId="group.id"
          :key="group.id"
          class="group-preview"
        >
          <div class="group-preview-header">
            <p
              class="group-title"
              dir="auto"
              maxlength="512"
              style="overflow: hidden; overflow-wrap: break-word; height: 28px"
            >
              {{ group.title }}
            </p>
            <div class="group-preview-btn">
              <span class="span-1 hide">
                <span class="span-2 icon-sm"></span>
              </span>
              <div
                @click="openGroupMenu(group.id)"
                class="
                  group-header-extras-menu
                  span-1
                  icon-sm icon-overflow-menu-horizontal
                "
              ></div>
            </div>
          </div>
          <card-list
            @dragEnd="dragEnd"
            @pickTask="pickTask"
            :tasks="group.tasks"
            :group="group"
            :groups="board.groups"
            :groupId="group.id"
            @addTask="addTask"
          >
          </card-list>
          <div
            v-if="isAdding && group.id === currGroupId"
            class="card-add-edit"
          >
            <textarea
              v-model="task.title"
              name=""
              id=""
              cols="10"
              rows="5"
              placeholder="Enter a title for this card..."
            ></textarea>
            <div class="card-actions">
              <a @click="addTask(group.id)"> + Add List</a>
              <button @click="isAdding = false">x</button>
            </div>
          </div>
          <div @click="opemModal(group.id)" v-else class="card-add-btn">
            <a> + Add a card</a>
          </div>
        </div>
      </draggable>

      <group-menu
        @addCard="onAddCard"
        @mousedown.stop=""
        v-if="isMenuOpened && group"
        @closeMenu="closeGroupMenu"
        :group="group"
        :title="'List actions'"
      ></group-menu>


    </div>
    <div class="group-add-container">
      <div class="group-add-btn">
        <p v-if="!isAddingTitle" @click="isAddingTitle = true">+Add another list</p>
        <form v-else class="add-group-form" @submit.prevent="addNewGroup">
          <textarea
            v-model="newGroupTitle"
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="Enter list title"
          ></textarea>
          <div class="form-actions">
            <a class="add-group-add" @click="addNewGroup">Add Group</a>
            <button
              class="add-group-close"
              @click="isAddingTitle = !isAddingTitle"
            >
              x
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import groupPreview from "./group-preview.vue";
import draggable from "vuedraggable";
import cardList from "./card-list.vue";
import groupMenu from './menus-cmps/group-menu.vue'
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  components: {
    groupPreview,
    cardList,
    groupMenu,
    Container,
    draggable
  },
  props: {
    board: {
      type: Object,
      required: true,
    }

  },
  data() {
    return {
      isAddingTitle: false,
      newGroupTitle: "",
      isMenuOpened: false,
      group: null,
      isAdding: false,
      currGroupId: null,
      task: {
        title: ''
      }
    };
  },
  computed: {
    // board() {
    //   return this.$store.getters.board;
    // },
    // groups(){
    //  return this.$store.getters.groups;


    // }
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
      const board = this.$store.getters.board
      const groupDetails = { board, groupId }
      this.isMenuOpened = !this.isMenuOpened
      const group = await this.$store.dispatch({ type: 'getGroupById', groupDetails });
      this.group = group
      // console.log(group);
    },
    closeGroupMenu() {
      console.log('close group menu')
      this.isMenuOpened = false
      // console.log('close');
    },
    dragEnd() {
      this.$emit('dragEnd')
      console.log('dragEnd');

    },

    changeGroup(ev) {
      console.log(ev);
      const fromIndex = ev.oldIndex
      const toIndex = ev.newIndex
      if (fromIndex === toIndex) return
      const board = this.board
      const payload = { board, fromIndex, toIndex }
      this.$store.dispatch({ type: 'changeGroupPos', payload })
    },
    pickTask() {
      console.log('gothere');
      this.$emit('pickTask')
    },
    opemModal(groupId) {
      console.log('hello');
      this.isAdding = true;
      this.currGroupId = groupId



    },
    async addTask(groupId) {
      if (!this.task.title) return
      this.isAdding = false;
      const task = { title: this.task.title, groupId }
      this.task.title = '';
      try {
        await this.$store.dispatch({ type: 'addTask', task });
      } catch (err) {
        console.log(err);
      }


    },
    onAddCard(groupId) {
      this.isAdding = true
      this.currGroupId = groupId
      this.isMenuOpened = false
    },

  },
};
</script>

<style>
/* .group-list-container {
  overflow-x: auto;
} */
</style>