<template>
  <div class="group-preview">
    <!-- <h3 >grandson: group-preview</h3> -->

    <div class="group-preview-header">
      {{ group.title }}

      <button
        @click="openGroupMenu"
        class="group-preview-btn"
        draggable="false"
      >
        <img :src="require('@/assets/dots-menu.svg')" alt="" />
      </button>

      <group-menu
        @mousedown.stop=""
        v-if="menuOpened"
        @closeMenu="closeGroupMenu"
        :group="group"
        :title="'List actions'"
      >
      </group-menu>
    </div>

    <card-list :tasks="group.tasks" :groupId="group.id"></card-list>

    <!-- <div class="card-list">
          <div class="card-preview"></div>
      </div> -->
  </div>
</template>

<script>
import groupMenu from './menus-cmps/group-menu.vue'
import draggable from "vuedraggable";
import cardList from "./card-list.vue"
export default {
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      menuOpened: false,
      title: ''
    }
  },
  methods: {
    openGroupMenu() {
      this.menuOpened = true
      console.log('open');
    },
    closeGroupMenu() {
      this.menuOpened = false
      console.log('close');
    }
  },
  components: {
    cardList,
    draggable,
    groupMenu
  },

}
</script>

<style>
</style>