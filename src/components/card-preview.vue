<template>
  <div class="card-main">
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">Card : {{ task.title }}</div>
      <!-- <button @click="AddDetails(task.id,groupId)">{{task.id}} {{ groupId}}</button> -->
    </div>
    <!-- <task-edit v-if="isClick"></task-edit> -->
  </div>
</template>
<script>
import taskEdit from "../views/task-edit.vue";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
    data(){
      return{
        details:{
          labels:{
            title:'i am label',
            bcg:'blue'
          },
          members:{
            fullName:'gilad'
          },
          checkbox:{
            title:'',
            items:[
              'FIRTS ITEM', 'second item'
            ]
          }
        }
        

      }
    },
  methods: {
    cardClick(groupId, taskId) {
      console.log("card is clicked");
      this.$store.commit({ type: "setDarkScreen" });
      this.$router
        .push("/board/taskEdit/" + groupId + "/" + taskId)
        .catch((err) => {
          console.dir("error");
        });
    },
    AddDetails(cardId, groupId){
      var cardDetails =this.details
      this.$store.dispatch({type:'addDetails', details:{cardId,groupId,cardDetails} })
    }
  },
  components: {
    taskEdit,
  },
};
</script>

<style>
</style>