<template>
  <div class="card-main">
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">
        <div
          class="card-preview-bg-header"
          v-if="task.cover && task.cover.bgColor"
          :style="`background-color: ${task.cover.bgColor}`"
        ></div>
        <div class="main-conent-container">
          <div v-if="task.labelIds && task.labelIds.length" class="labels">
            <div
              class="task-label shrinkLabel"
              v-for="label in getLabels"
              :key="label.id"
              :style="{ backgroundColor: label.color }"
              @click.prevent.stop="toggleSize"
              :class="labelClick"
            >
              <span class="label-title">
                {{ label.title }}
              </span>
            </div>
          </div>
          <div class="card-text-container">
            <span>{{ task.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <task-edit v-if="isClick"></task-edit> -->
  </div>
</template>
<script>
//  :class="{
//                 shrinkLabel: !changeLabelSize,
//                 increaseLabel: changeLabelSize,
//               }"
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
        return { msg: "No Task" };
      },
    },
    boardLabels: {
      type: Array,
    },
  },
  data() {
    return {
      taskLabels: [],
      boardId: "",
      changeLabelSize: false,
      // changeLabelSize: true,
    };
  },
  computed: {
    getLabels() {
      const labels = [];
      if (!this.task.labelIds) return;
      this.boardLabels.forEach((label) => {
        if (this.task.labelIds.includes(label.id)) labels.push(label);
      });
      console.log("korenn", labels);
      return labels;
    },
    labelClick() {
      if (!this.changeLabelSize) {
        const el = document.querySelectorAll(".increaseLabel").forEach((el) => {
          el.classList.remove("increaseLabel");
          el.classList.add("shrinkLabel");
        });
        return;
      }
      const el = document.querySelectorAll(".shrinkLabel").forEach((el) => {
        el.classList.remove("shrinkLabel");
        el.classList.add("increaseLabel");
      });
      // els.forEach((el) => {
      //   el.classLists.remove
      // })
      // if(!this.changeLabelSize) return 'shrinkLabel'
      // return 'increaseLabel'
    },
  },
  methods: {
    cardClick(groupId, taskId) {
      // console.log("card is clicked");
      const { boardId } = this.$route.params;
      // console.log('boardId',boardId);
      this.$store.commit({ type: "setDarkScreen" });
      this.$router
        .push(boardId + "/taskEdit/" + groupId + "/" + taskId)
        .catch((err) => {
          console.dir("error", err);
        });
    },

    toggleSize() {
      // alert('d')
      this.changeLabelSize = !this.changeLabelSize;
    },
  },
  created() {
    const { boardId } = this.$route.params;
    this.boardId = boardId;
    // console.log("labels task", this.taskLabels);
    // console.log("labels", this.task);
    // this.getLabels();
  },

  components: {
    taskEdit,
  },
};
</script>

<style>
</style>


