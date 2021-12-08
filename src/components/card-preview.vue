<template>
  <div class="card-main">
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">
        <div v-if="task.labelIds.length" class="labels">
          <div
            class="task-label"
            v-for="label in getLabels"
            :key="label.id"
            :style="{ backgroundColor: label.color }"
            @click.prevent.stop="toggleSize"
            :class="{
              shrinkLabel: !changeLabelSize,
              increaseLabel: changeLabelSize,
            }"
            
          ><span v-if="changeLabelSize">{{label.title}}</span></div>

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
      changeLabelSize: false,
      // changeLabelSize: true,

    }
  },
  computed: {
    getLabels() {
      // console.log('gettttttt',this.task);
      const labels = []
      if (!this.task.labelIds) return
      this.boardLabels.forEach((label) => {
        if (this.task.labelIds.includes(label.id)) labels.push(label);
      });

      return labels
    },

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
    // this.getLabels();

  },

  components: {
    taskEdit,
  },
};
</script>

<style>
</style>


