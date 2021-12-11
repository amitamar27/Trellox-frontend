<template>
  <section v-if="labels">
    <header class="main-title">
      <p>Labels</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>

    <main v-if="!isInEdit" class="labels-menu">
      <!-- <section class="labels-input"> -->
      <el-input class="input" v-model="filter"></el-input>
      <h5 class="h-title">LABELS</h5>
      <!-- </section> -->

      <section v-if="!filter">
        <div v-for="(label, idx) in board.labels" :key="idx">
          <div
            class="edit-labels mod-selectable task-labels"
            :style="`background-color: ${label.color}`"
            @click="addLabel(label.id, idx)"
          >
            <!-- <p v-if="labelsId(idx)">{{labels[idx].title}}</p> -->
            <p>{{ defaulsLabels[idx].title }}</p>

            <span v-if="labelsId(idx)" class="icon-check icon-sm"></span>
          </div>
          <a
            class="task-label-edit icon-sm icon-edit"
            @click="goInMenu(idx)"
          ></a>
        </div>
      </section>

      <section class="label-edit-menu" v-else>
        <div v-for="(color, idx) in colors" :key="idx">
          <div
            v-if="color"
            class="edit-labels mod-selectable task-labels"
            :style="`background-color: ${color}`"
          >
            <p v-if="labelsId(idx)">{{ labels[idx].title }}</p>
          </div>
          <a
            class="task-label-edit icon-sm icon-edit"
            @click="goInMenu(idx)"
          ></a>
        </div>
      </section>
    </main>
    <section v-else class="edit-label">
      <a v-if="isInEdit" class="icon-sm icon-back" @click="goBack"> </a>
      <h5 class="h-title">Name</h5>

      <el-input
        ref="input"
        type="text"
        placeholder="Set label..."
        v-model="currLabel.title"
        @keydown.enter="saveBoard"
      />
      <button class="save-btn" @click="saveBoard">Save</button>
    </section>
  </section>
</template>

<script>
import { utilService } from "../../services/util.service.js";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
      ],
      labels: [],
      currLabel: null,
      currTitle: "",
      isInEdit: false,
      isFiltering: false,
      filter: "",
      defaulsLabels: [],
    };
  },
  created() {
    this.defaulsLabels = this.$store.getters.labels;
    this.currLabels();
  },
  computed: {
    isFilter() {},
    color() {
      board.labels.filter((label) => label.color === color);
    },
  },
  methods: {
    currLabels() {
      const labels = this.$store.getters.labels;
      this.labels = [];
      const newLabels = [];
      labels.forEach((label) => {
        if (this.task.labelIds.includes(label.id)) this.labels.push(label);
      });
    },
    labelsId(idx) {
      return this.labels.includes(this.defaulsLabels[idx]);
    },
    setLabel(idx) {
      this.currLabel = labels[idx];
    },
    goInMenu(idx) {
      this.currLabel = this.labels[idx];
      this.isInEdit = true;
    },
    saveLabel() {
      console.log("boardd", this.board);

      this.$emit("saveTask");
      this.$emit("closeMenu");
    },
    saveBoard() {
      console.log('this.board.labels',this.board.labels);
      console.log('this.currLabel',this.currLabel);
      this.board.labels.forEach((label) => {
        if (label.id === this.currLabel.id) label.title = this.currLabel.title;
      });
      this.$emit("updateBoard");
      this.$emit("closeMenu");
    },
    goBack() {
      this.isInEdit = false;
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    addLabel(labelId, idx) {
      // const labelId = "l10" + (idx + 1);
      const newIdx = this.labels.findIndex(
        (label) => label.color === this.colors[idx]
      );
      if (newIdx > -1) {
        this.labels.splice(newIdx, 1);
        const idx = this.task.labelIds.findIndex((lId) => lId === labelId);
        this.task.labelIds.splice(idx, 1);
      } else {
        this.task.labelIds.push(labelId);
        this.currLabels();
      }
      this.$emit("addLabel");
    },
  },
};
</script>

<style >
</style>
