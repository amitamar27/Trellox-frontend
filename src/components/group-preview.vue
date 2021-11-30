<template>
  <div class="group-preview">
      <!-- <h3 >grandson: group-preview</h3> -->

      <div class="group-preview-header">
          {{group.title}}
      </div>
      
      <card-list 
      :tasks="group.tasks"
      ></card-list>

      <!-- <div class="card-list">
          <div class="card-preview"></div>
      </div> -->
  </div>
</template>

<script>
import cardList from "./card-list.vue"
export default {
    props: {
        group: {
            type:Object,
            required:true,
        }
    },
components: {
    cardList,
}
}
</script>

<style>

</style>