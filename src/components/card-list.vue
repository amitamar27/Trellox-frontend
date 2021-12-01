<template>
  <div class ="cards-container">
      <!-- <div>task : {{task}}</div> -->
      <card-preview 
        v-for="task in tasks"
        :task="task"
        :key="task.id"
      >

      </card-preview>

      <div v-if="isAdding" class="card-add-edit"  >
        <textarea  v-model="task.title" name="" id="" cols="10" rows="5" placeholder="Enter a title for this card..."></textarea>
        <div class="card-actions">
        <a @click="addTask(groupId)"> + Add List</a>
        <button @click="isAdding=false" >x</button>

        </div>
        </div>
        <div @click="isAdding=true" v-else class="card-add-btn">
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
            required:false,
        },
        groupId:{
          type:String,
          required:true
        }
    },
    data(){
      return{
        task:{
          title:''
        },
        isAdding:false

      }
    },
components: {
    cardPreview,
},

methods:{
  addTask(groupId){
    this.isAdding =false;
    const taskTitle =this.task.title
    this.task.title =''
    this.$store.dispatch({type:'addTask',task:{groupId,taskTitle}})

    
  }
}

}
</script>

<style>

</style>