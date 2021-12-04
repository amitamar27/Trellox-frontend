<template>
  <div class ="cards-container">
      <!-- <div>task : {{task}}</div> -->
      <div class="draggable-groups" >
         <draggable class="draggable-groups" data-dragscroll  :list="group.tasks" @end="dragEnd" group="tasks"   >
            <transition-group  type="transition" name="flip">
         <card-preview :group="group" v-for="task in tasks" :task="task" :key="task.id" :groupId="groupId" 
         @click="openCardDetails(groupId,task.id)"></card-preview>
         </transition-group>
    </draggable>

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
        },
        group:{
          type:Object
        }
    },
   
    data(){
      return{}
    },
components: {
    cardPreview,
          draggable

},
computed:{
},

methods:{
  openCardDetails(groupId,taskId){
			// const { boardId } = this.$route.params
      // console.log();
			// this.$store.commit({ type: "openBlack" })
			this.$router
				.push("/details/" + groupId + "/" + taskId)
				.catch((err) => { console.log('error');})
		
  },
  dragEnd(){
    this.$emit('dragEnd')
  }
  
 
}

}
</script>

<style>

</style>