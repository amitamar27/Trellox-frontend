<template>
  <div>
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">Card : {{ task.title }}</div>
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
  },
  components: {
    taskEdit,
  },
};
</script>

<style>
</style>