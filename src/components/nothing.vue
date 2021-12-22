<template>
  <div class ="cards-container">
      <!-- <div>task : {{task}}</div> -->
        <draggable @end="pickTask"  class="draggable-groups" group="tasks"  >
         <card-preview v-for="task in tasks" :task="task" :key="task.id" :groupId="groupId" 
         @click="openCardDetails(groupId,task.id)"></card-preview>
        </draggable>

        <div v-if="isAdding" class="card-add-edit"  >
        <textarea  v-model="task.title" name="" id="" cols="10" rows="5" placeholder="Enter a title for this card..."></textarea>
        <div class="card-actions">
        <a @click="addTask(groupId)"> + Add List</a>
        <button @click="isAdding=false" >x</button>
        </div>
        </div>
        <div @click="isAdding=true" v-else class="card-add-btn">
        <a> + Add a Card</a>
        </div>
  </div>
</template>

<script>
import cardPreview from './card-preview.vue'
import draggable from "vuedraggable";

export default {
     props: {
        tasks: {
            type:Array,
            required:false,
        },
        groupId:{
          type:String,
          required:true
        },
        groups:{
          // type:String,
          // required:true
        }
    },
    data(){
      return{
        isAdding:false,
        groupsToEdit:this.groups,
        task:{
          title:''
        }


      }
    },
components: {
    cardPreview,
    draggable
},
computed:{
  // isAdding(){
  //   return this.$store.getters.isAddingCardTitle
  // }

},

methods:{
  addTask(groupId){
    if(!this.task.title)  return
     this.isAdding =false;
    const task ={title:this.task.title, groupId}
    this.task.title =''
    this.$emit('addTask', task)
    // this.$store.dispatch({type:'addTask',task:{groupId,taskTitle}})

    
  },
  pickTask(ev){

  },
  
  openCardDetails(groupId,taskId){
			this.$router
				.push("/details/" + groupId + "/" + taskId)
				.catch((err) => { console.log('error');})
		
  },
  setIsAdding(){
    this.$store.commit('toggleIsAdding')
  },
  //container
  changeGroup(ev){
      // console.log(ev);
      const fromIndex =ev.oldIndex
      const toIndex =ev.newIndex
      if(fromIndex===toIndex)return
      const board=this.board
      const payload ={board,fromIndex,toIndex}
      this.$store.dispatch({type:'changeGroupPos',payload})
    },
}

}
</script>

<style>

</style>