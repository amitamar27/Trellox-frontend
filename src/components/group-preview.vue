<template>
  <div class="group-preview">
      <!-- <h3 >grandson: group-preview</h3> -->

      <div class="group-preview-header">
          {{group.title}}
          {{group.id}}
      </div>
      
      <card-list  @addTask="addTask(group.id)" :tasks="group.tasks" ></card-list>

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
},
methods:{
    addTask(idx){
        console.log(idx);
       
        // this.$store.dispatch({type:'addTask', taskTitle})
    }
}
}
</script>

<style>

</style>