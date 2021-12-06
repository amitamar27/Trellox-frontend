<template>
  <main>
    <aside>
      <h3 class="head-lines" @click="f">Add to card</h3>
    </aside>

    <a
      class="button-link"
      v-for="(option, idx) in options"
      :key="idx"
      @click="showMenu(idx)"
    >
      <span :class="setClass(idx)"> </span>
      <span>{{ option.title }}</span>
    </a>
    <transition
      v-if="menuIdx"
      enter-active-class="animate__animated animate__fadeInRight animate__faster"
      leave-active-class="animate__animated animate__fadeOutRight animate__faster"
    >
    
    </transition>
    <!-- <component
            v-clickoutside="closeEditPopup"
            class="popup dynamic-component"
            v-if="isPopupShow"
            :is="currAction.type"
            :card="card"
            :action="currAction"
            @close="closeEditPopup"
            @updateCard="saveCard"
          /> -->
    <component
      @click="showMenu(idx)"
      class="popup is-show dynamic-component"
      :is="currComponent"
      :task="this.task"
      @addLabel="addLabel"
      @closeMenu="closeMenu"
      
       
    />
  </main>
</template>

<script>
// :members="members"
// import { component } from 'vue/types/umd'
import menuLabels from "../task-edit-menu-cmps/menu-labels.vue";
import menuMembers from '../task-edit-menu-cmps/menu-members.vue'
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    board:{
        // type: Object,
        required: true,
    }
   
  },
  data() {
    return {
      options: [
        { icon: "", title: "Members", component: "menu-members" },
        { icon: "", title: "Labels", component: "menu-labels" },
        { icon: "", title: "Checklist" },
        { icon: "", title: "Dates" },
        { icon: "", title: "Attachment" },
        { icon: "", title: "Cover" },
      ],
      menuIdx: null,
      isMenuOpen: false,
      currComponent: "",
    };
  },

  methods: {
    setClass(idx) {
      const style = "icon-sm icon-" + this.options[idx].title;
      return style;
      // return
    },
    openMenu(idx) {
        
      this.menuIdx = idx;
    },
    showMenu(idx) {
      this.isMenuOpen = true;
      this.menuIdx = idx;
      this.currComponent = this.options[idx].component;
    },
    closeMenu() {
        // console.log(this.board);
      this.isMenuOpen = false;
       this.currComponent = null
    },
    saveLabels(){
        this.$emit('saveLabels',this.labels)
    },
    addLabel(labelId){
        console.log('labelId',labelId);
        this.$emit('addLabel')
    },
    currentProperties(){
        if(this.currComponent === 'currComponent') console.log(board);
        return board
    },
    // labels(){
    //     const lab =  this.$emit('labels');
    //     console.log('lab',lab);
    // }
    f(){
alert('f')
        console.log('board',this.board);
    }

  },
  computed: {},
  components: {
    menuLabels,
    menuMembers
  },
};
</script>

<style>
/* 

.popup{
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
    display: none;
    overflow: hidden;
    position: absolute;
    right: -9999px;
    top: -9999px;
    -webkit-transform: translateZ(0);
    width: 304px;
    z-index: 70;
    left: 305px;
    top: 486px;
} */
.popup {
  /* position: absolute;
  right: -10px;
  background-color: #fff;
  border-radius: 3px;
  width: 304px;
  min-height: 50px;
  overflow-x: hidden;
  z-index: 1;
  top: 20px;
  box-shadow: 0 0 2px 1px #e1e2e8;
  overflow-y: hidden; */
  position: absolute;
  /* right: -10px; */
  right: 5px;
  z-index: 50;
}

.dynamic-component {
  /* margin: 10px; */
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  width: 304px;
  min-height: 50px;
  overflow-x: hidden;
  /* z-index: 30; */
  top: 165px;
  box-shadow: 0 0 2px 1px #e1e2e8;
  overflow-y: hidden;
}
</style>