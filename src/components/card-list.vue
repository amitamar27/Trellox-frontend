<template>
  <div class ="cards-container">
      <!-- <div>task : {{task}}</div> -->
      <div class="draggable-groups">
         <card-preview v-for="task in tasks" :task="task" :key="task.id" :groupId="groupId" 
         @click="openCardDetails(groupId,task.id)"></card-preview>
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
        },
        groups:{
          // type:String,
          // required:true
        }
    },
    data(){
      return{}
    },
components: {
    cardPreview,
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
  
 
}

}
</script>

<style>

</style>