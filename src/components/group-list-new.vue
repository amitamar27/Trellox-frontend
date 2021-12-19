<template>
  <div v-if="board" class="group-list-container">
   
      <Container
        v-if="board.groups && board.groups.length"
        :style="getStyle"
        orientation="horizontal"
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :get-child-payload="getParentPayload"
        :drop-placeholder="dropPlaceholderOptionsGroup"
        :non-drag-area-selector="'.fill'"
        :drag-begin-delay="adaptDeviceDND"
        group-name="1"
        class="outter"
        @drop="onDrop(board.groups, $event)"
        @drag-start="calcPlaceholder"
        @drag-end="dragging = false"
      >

       <template>
        <Draggable
         v-for="group in board.groups"
         :key="group.id"
         class="group-list outter"
        >
        <div
          class="group-preview"
          :data-group="group.id"
        >
          <div class="group-preview-header">
            <!-- <p
              class="group-title"
              dir="auto"
              maxlength="512"
              style="overflow: hidden; overflow-wrap: break-word; height: 28px"
            >
              {{ group.title }}
            </p> -->

                <!-- <el-input
           
            @mousedown.stop=""
            v-model="group.title"
            type="text"
				    placeholder="Title"
            	@change="addGroup"
				@keydown.enter="addGroup"
            >
            </el-input> -->

            <input
				ref="titleInput"
				type="text"
				placeholder="Title"
				v-model="group.title"
        @change="saveGroup(group)"
				@mousedown.stop=""
			/>

            <group-menu
            @addCard="onAddCard"
            @mousedown.stop=""
            v-if="isMenuOpened && group.id === groupId"
            @closeMenu="closeGroupMenu"
            :group="group"
            :title="'List actions'"
            :style="{
              top: menuPosition.posY + 'px',
              left: menuPosition.posX + 'px',
              }"
      ></group-menu>

            <div class="group-preview-btn">
              <span class="span-1 hide">
                <span class="span-2 icon-sm"></span>
              </span>
                  
              <div
                @click.prevent.stop="openGroupMenu(group.id,$event)"
                class="
                  group-header-extras-menu
                  span-1
                  icon-sm icon-overflow-menu-horizontal
                "
              >
   
              </div>
            </div>
          </div>
      <template>
      
          <card-list-new
            @dragEnd="dragEnd"
            @pickTask="pickTask"
            :tasks="group.tasks"
            :group="group"
            
            :groupId="group.id"
            :boardLabels="board.labels"
            @addTask="addTask"
            @saveBoard="saveBoard"
          >
          </card-list-new>
       
          </template>
  <!-- </Container> -->

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

        </Draggable>
        
      </template>

      </Container>
  
      <!-- <div class="group-list">
    
    </div> -->
   
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
// :groups="board.groups"
import groupPreview from "./group-preview.vue";
import draggable from "vuedraggable";
// import cardList from "./card-list.vue";
import cardListNew from "./card-list-new.vue";
import groupMenu from "./menus-cmps/group-menu.vue";
import taskEdit from "../views/task-edit.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../services/applyDrag.js";
export default {
  components: {
    groupPreview,
    // cardList,
    groupMenu,
    Container,
    taskEdit,
    draggable,
    Draggable,
    cardListNew
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
    // boardLabels: {
    //   type: Array,
    // },
  },
  data() {
    return {
      isAddingTitle: false,
      boardId: "",
      newTitle: "",
      newGroupTitle: "",
      isMenuOpened: false,
      group: null,
      groupId:null,
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
      dragging: false,
      dropPlaceholderOptionsGroup: {
				className: "drop-preview",
				animationDuration: "0",
				showOnTop: false,
			},
      	dropPlaceholderOptionsTasks: {
				className: "drop-preview",
				animationDuration: "150",
				showOnTop: false,
			},
    };
  },
  created(){

  },
  computed: {
  adaptDeviceDND() {
    
			return (window.innerWidth < 600) ? 100 : 0
		},
     getStyle(){
      return 'display: flex'
    }
  },
  methods: {
    getChildPayload(index) {
			return this.group.tasks[index]
		},
 
    saveBoard(){
      this.$emit('saveBoard')
    },
    	getParentPayload(index) {
			return this.board.groups[index]
		  },
    calcPlaceholder(ev) {
			if (!ev.isSource) return
      console.log('ev.payload.id',ev.payload.id);
			var item = document.querySelector(`[data-group=${ev.payload.id}]`)
      // console.log('item',item);
			this.dragging = true
			this.calcing = setInterval(() => {
        // console.log('this.dragging',this.dragging);
				if (!this.dragging) clearInterval(this.calcing)

				const placeholder = document.querySelector('.outter > .smooth-dnd-drop-preview-constant-class')
        // console.log('placeholder',placeholder);
				if (!placeholder) return
				placeholder.style.height = item.offsetHeight + 'px'
			}, 5)
		},
    onDrop(items, dropResult) {
			const newItems = applyDrag(items, dropResult)
      // console.log('newItems',newItems);
			this.$store.commit({ type: "setGroups", groups: newItems })
      // this.$emit('setGroups',newItems)
			this.$emit('dragEnd')
		},
    addNewGroup() {
      
      if (this.newGroupTitle === "") return;
      this.isAddingTitle = false;
      var groupTitle = this.newGroupTitle;

      this.$store.dispatch({ type: "addGroup", groupTitle });
      this.newGroupTitle = "";
    },
    async openGroupMenu(groupId, ev) {

      const group = this.board.groups.find((group) => {
        return group.id === groupId;
      });
      this.group = group;
      this.groupId = group.id
      this.isMenuOpened = !this.isMenuOpened;
    },
    closeGroupMenu() {
      this.groupId= null
      this.isMenuOpened = false;
      // console.log('close');
    },
    saveGroup(group){
      if(!group) return
      let idx = this.board.groups.findIndex(g => g.id === group.id)
      this.board.groups[idx] = group
      this.group = group
      this.$emit("saveGroup",group,idx);
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

<style lang="scss">
/* .group-list-container {
  overflow-x: auto;
} */
/* .outter {
  display: flex;
  gap: 7px;
  height: 100%;
} */
.fill {
  height: 100vh;
  cursor: move;
}
// .smooth-dnd-container {
//      .horizontal {
//          display: flex;
//      }
//  }

</style>