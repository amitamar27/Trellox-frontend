<template>
  <div class="group-preview">
    <!-- <h3 >grandson: group-preview</h3> -->

    <div class="group-preview-header">
      {{ group.title }}

      <!-- <textarea
        class="group-title"
        aria-label="group.title"
        dir="auto"
        maxlength="512"
        >{{group.title}}</textarea> -->
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
          <span class="span-2 icon-sm" > </span>
        </span>

        <!-- <span  :src="require('@/assets/dots-menu.svg')"
          alt=""></span>
        <img
          :src="require('@/assets/dots-menu.svg')"
          alt=""
        /> -->
        <a class="group-header-extras-menu span-1 icon-sm icon-overflow-menu-horizontal" href=""></a>
      </div>
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

import cardList from "./card-list.vue";
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
  },
};
</script>

<style>
</style>