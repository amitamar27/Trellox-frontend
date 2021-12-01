<template>
      <draggable class="draggable-groups" group="task">
      <div class="card-container">
      <div class="card-preview">
         Card : {{task.title}}
      </div>
  </div>
      </draggable>
  
</template>

<script>
import draggable from "vuedraggable";
export default {
props: {
        task: {
            type:Object,
            required:true,
        }
    },
     components: {
    draggable,
  },
   
  
}
</script>

<style>

</style>