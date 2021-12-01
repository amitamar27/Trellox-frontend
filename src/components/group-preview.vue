<template>

  <div class="group-preview">
    <!-- <h3 >grandson: group-preview</h3> -->

    <div class="group-preview-header">
      {{ group.title }}

      <button class="group-preview-btn">
        <img
          :src="require('@/assets/dots-menu.svg')"
          alt=""
        />
      </button>
    </div>

    <card-list :tasks="group.tasks" :groupId="group.id" ></card-list>

    <!-- <div class="card-list">
          <div class="card-preview"></div>
      </div> -->
  </div>
        

</template>

<script>
import draggable from "vuedraggable";

import cardList from "./card-list.vue"
export default {
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  components: {
    cardList,
    draggable
},

}
</script>

<style>
</style>