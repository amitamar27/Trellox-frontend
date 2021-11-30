<template>
  <div class ="cards-container">
      <!-- <div>task : {{task}}</div> -->
      <card-preview 
        v-for="task in tasks"
        :task="task"
        :key="task.id"
      >

      </card-preview>
      <div class="card-add-edit">
        <textarea name="" id="" cols="10" rows="5" placeholder="Enter a title for this card..."></textarea>
      <a> + Add List</a>

      </div>
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
},
methods:{
  setValue(){
    console.log('letssss');
  }
}
}
</script>

<style>

</style>