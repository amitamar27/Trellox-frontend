<template>
  <section class="checklist-menu">
    <header class="main-title">
      <p>Labels</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>
    <main class="main-container">
      <!-- <label for="linkName" class="bold-font"
			>Title
			<br />
			<input
				type="text"
				placeholder="Set checklist"
				v-model="checklist"
				ref="input"
				@keydown.enter="addChecklist"
			/>
		</label> -->
      <h4>Title</h4>
      <el-input v-model="title"></el-input>
      <button class="add-btn" @click="addChecklist">Add</button>
    </main>
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
  },
  data() {
    return {
      title: "Checklist",
    };
  },
  methods: {
    addChecklist() {
      this.task.checklists.push({
        id: utilService.makeId(),
        title: this.title,
        todos: [],
      });
      this.$emit('saveTask');
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style>
</style>