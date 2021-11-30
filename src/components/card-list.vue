<template>
  <div>
      <!-- <div>task : {{task}}</div> -->
      <card-preview 
        v-for="task in tasks"
        :task="task"
        :key="task.id"
      >

      </card-preview>
      <div class="card-add-edit"></div>
  </div>
</template>

<script>
import cardPreview from './card-preview.vue'
export default {
     props: {
        tasks: {
            type:Array,
            required:true,
        }
    },
components: {
    cardPreview,
}
}
</script>

<style>

</style>