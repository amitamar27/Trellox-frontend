<template>
  <div class="cards-container">
    <!-- <div>task : {{task}}</div> -->
    <div class="draggable-groups">
      <Container
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        :get-child-payload="getChildPayload"
        :drop-placeholder="dropPlaceholderOptionsTasks"
        :drag-begin-delay="adaptDeviceDND"
        group-name="2"
        v-if="group"
        class="tasks-container"
        @drop="onDropTask(group.tasks, $event)"
      >
        <Draggable v-for="task in tasks" :key="task.id">
          <card-preview
          v-if="task"
            :boardLabels="boardLabels"
            :group="group"
            :task="task"
            :groupId="groupId"
            @click="openCardDetails(groupId, task.id)"
          ></card-preview>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import cardPreview from "./card-preview.vue";
// import draggable from "vuedraggable";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "../services/applyDrag.js";
export default {
  props: {
    tasks: {
      type: Array,
      required: false,
    },
    groupId: {
      type: String,
      required: true,
    },
    // groups: {
    //   // type:String,
    //   // required:true
    // },
    group: {
      type: Object,
      required: true,
    },
    boardLabels: {
      type: Array,
    },
  },

  data() {
    return {
      boardId: "",
      dropPlaceholderOptionsTasks: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  components: {
    cardPreview,
  
    Draggable,
    Container,
  },
  computed: {
    adaptDeviceDND() {
      return window.innerWidth < 600 ? 100 : 0;
    },
  },

  methods: {
    onDropTask(items, dropResult) {
      const newItems = applyDrag(items, dropResult);
      this.$store.commit({
        type: "setTasks",
        tasksToSave: newItems,
        groupId: this.group.id,
      });
      this.$emit("dragEnd");
      this.$emit("saveBoard");
    },
    getChildPayload(index) {
      return this.group.tasks[index];
    },
    openCardDetails(groupId, taskId) {
      this.$router.push("/details/" + groupId + "/" + taskId).catch((err) => {
        console.log("error");
      });
    },
    dragEnd() {
      this.$emit("dragEnd");
    },
  },
  created() {
    this.boardId = this.$route.params.boardId;
  },
};
</script>

<style>
</style>