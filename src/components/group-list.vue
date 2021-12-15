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
            <!-- <input
                class="input-title"
                type="text"
                v-model="newTitle"
                @blur="editTitle"
                @keyup.enter="$event.target.blur()"
                
            /> -->
           
            <p
            v-if="!isEditingTitle"
            @click="editingTitle"
              class="group-title"
              dir="auto"
              maxlength="512"
              style="overflow: hidden; overflow-wrap: break-word; height: 28px"
            >
              {{ group.title }}
            </p>

             <el-input
            v-if="isEditingTitle"
            @mousedown.stop=""
            v-model="group.title"
            type="text"
				    placeholder="Title"
            class="group-title"
            >

            </el-input>

            <div class="group-preview-btn">
              <span class="span-1 hide">
                <span class="span-2 icon-sm"></span>
              </span>
              <div
                @click.prevent.stop="openGroupMenu(group.id)"
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
            :boardLabels="board.labels"
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
              <a @click="addTask(group.id)">Add card</a>
              <button @click="closeAddCard">
                <img :src="require('@/assets/cancel-icon.png')" />
              </button>
            </div>
          </div>
          <div @click="openModal(group.id)" v-else class="card-add-btn">
            <button>
              <img :src="require('@/assets/add.svg')" />Add a card
            </button>
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
        :style="{
          top: menuPosition.posY + 'px',
          left: menuPosition.posX + 'px',
        }"
      ></group-menu>

      <!-- <group-menu
        @addCard="onAddCard"
        @mousedown.stop=""
        v-if="isMenuOpened && group"
        @closeMenu="closeGroupMenu"
        :group="group"
        :title="'List actions'"
      ></group-menu> -->
    </div>
    <div class="group-add-container">
      <div class="group-add-btn">
        <p v-if="!isAddingTitle" @click="isAddingTitle = true">
          <img :src="require('@/assets/add.svg')" />
          Add another list
        </p>
        <form v-else class="add-group-form" @submit.prevent="addNewGroup">
          <textarea
            ref="textarea"
            v-model="newGroupTitle"
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="Enter list title"
          ></textarea>
          <div class="form-actions">
            <a class="add-group-add" @click="addNewGroup">Add list</a>
            <button
              class="add-group-close"
              @click="isAddingTitle = !isAddingTitle"
            >
              <img :src="require('@/assets/cancel-icon.png')" />
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
import groupMenu from "./menus-cmps/group-menu.vue";
import taskEdit from "../views/task-edit.vue";
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  components: {
    groupPreview,
    cardList,
    groupMenu,
    Container,
    taskEdit,
    draggable,
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAddingTitle: false,
      isEditingTitle:false,
      boardId: "",
      newTitle: "",
      newGroupTitle: "",
      isMenuOpened: false,
      group: null,
      isAdding: false,
      currGroupId: null,
      menuPosition: { posX: "", posY: "" },
      task: {
        title: "",
        labelIds: [],
        cover: {
          bgColor: "",
        },
      },
      
    };
  },
  computed: {
    
  },
  methods: {
    editingTitle(){
      console.log('this.isEditingTitle',this.isEditingTitle);
      this.isEditingTitle = !this.isEditingTitle
    },
    addNewGroup() {
      if (this.newGroupTitle === "") return;
      this.isAddingTitle = false;
      var groupTitle = this.newGroupTitle;

      this.$store.dispatch({ type: "addGroup", groupTitle });
      this.newGroupTitle = "";
    },
    async openGroupMenu(groupId) {
      const group = this.board.groups.find((group) => {
        return group.id === groupId;
      });
      this.group = group;
      this.isMenuOpened = !this.isMenuOpened;
    },
    closeGroupMenu() {
      console.log("close group menu");
      this.isMenuOpened = false;
      // console.log('close');
    },
    dragEnd() {
      this.$emit("dragEnd");
      // this.$emit('socketUpdateBoard')
      // console.log('dragEnd');
    },
    closeAddCard() {
      this.task.title = "";
      this.isAdding = false;
    },

    changeGroup(ev) {
      // console.log(ev);
      const fromIndex = ev.oldIndex;
      const toIndex = ev.newIndex;
      if (fromIndex === toIndex) return;
      const board = this.board;
      const payload = { board, fromIndex, toIndex };
      this.$store.dispatch({ type: "changeGroupPos", payload });
    },
    pickTask() {
      // console.log('gothere');
      this.$emit("pickTask");
    },
    openModal(groupId) {
      // console.log('hello');
      this.isAdding = true;
      this.currGroupId = groupId;
    },
    async addTask(groupId) {
      if (!this.task.title) return;
      this.isAdding = false;
      const task = { title: this.task.title, groupId };
      const taskTitle = this.task.title;
      this.task.title = "";
      try {
        // await this.$store.dispatch({ type: 'addTask', task });
        await this.$store.dispatch({ type: "addTask", taskTitle, groupId });
        // this.$emit('socketUpdateBoard')
      } catch (err) {
        console.log(err);
      }
    },
    onAddCard(groupId) {
      this.isAdding = true;
      this.currGroupId = groupId;
      this.isMenuOpened = false;
    },
    editTitle() {
      if (!this.newTitle) return;
    },
  },
};
</script>

<style>
/* .group-list-container {
  overflow-x: auto;
} */
</style>