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
       
      }
    },
  methods: {
    cardClick(groupId, taskId) {
      // console.log("card is clicked");
      const { boardId } = this.$route.params
      // console.log('boardId',boardId);
      this.$store.commit({ type: "setDarkScreen" });
      this.$router.push(boardId+"/taskEdit/" + groupId + "/" + taskId)
      .catch((err) => {
          console.dir("error");
        });
    },
  
  },
  components: {
    taskEdit,
  },
};
</script>

<style>
</style>