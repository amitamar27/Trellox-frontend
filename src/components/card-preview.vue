<template>
  <div class="card-main">
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">
        <div v-if="taskLabels.length" class="labels">
          <div
            class="task-label"
            v-for="label in taskLabels"
            :key="label.id"
            @click.prevent.stop="toggleSize"
            :style="{ backgroundColor: label.color }"
            :class="{
              shrinkLabel: changeLabelSize,
              increaseLabel: !changeLabelSize,
            }"

          ></div>
             <!-- <span class="label-title" v-if="!changeLabelSize">{{ label.title }}</span> -->
        </div>

        {{ task.title }}
      </div>
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
      default: function () {
        return { msg: 'No Task' };
      },
    },
    boardLabels: {
      type: Array,
    },
  },
  data() {
    return {
      taskLabels: [],
      boardId: '',
      changeLabelSize: true,
      // changeLabelSize: true,

    }
  },
  methods: {
    cardClick(groupId, taskId) {

      // console.log("card is clicked");
      const { boardId } = this.$route.params
      // console.log('boardId',boardId);
      this.$store.commit({ type: "setDarkScreen" });
      this.$router.push(boardId + "/taskEdit/" + groupId + "/" + taskId)
        .catch((err) => {
          console.dir("error");
        });
    },
    getLabels() {
      console.log('gettttttt', this.task);
      if (!this.task.labelIds) return
      console.log('this.task.labelIds', this.task.labelIds);
      this.boardLabels.forEach((label) => {
        console.log('label', label);
        if (this.task.labelIds.includes(label.id)) this.taskLabels.push(label);
      });
      console.log('bbbbbb', this.taskLabels);
      // if(this.taskLabels) return true;
      // return false

    },
    toggleSize() {
      this.changeLabelSize = !this.changeLabelSize;
      console.log('this.changeLabelSize', this.changeLabelSize);
    },
  },
  created() {
    const { boardId } = this.$route.params;
    this.boardId = boardId
    console.log('labels task', this.taskLabels);
    console.log('labels', this.task.labelIds);
    this.getLabels();

  },

  components: {
    taskEdit,
  },
};
</script>

<style>
</style>


