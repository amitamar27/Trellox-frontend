<template>
  <main class="task-checkList">
    <section
      class="task-todos"
      v-for="(checklist, idx) in task.checklists"
      :key="checklist.id"
    >
      <header class="checkList-header">
        <div class="checklist-icons">
          <span class="icon-lg icon card icon-Checklist"> </span>
          <h3>{{ checklist.title }}</h3>
        </div>

        <div>
          <button @click="removeChecklist(idx)">Delete</button>
        </div>
      </header>
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <todos-preview :list="checklist" @saveChecklist="saveChecklist" />
      </transition>
    </section>
  </main>
</template>

<script>
// <transition-group
//     enter-active-class="animate__animated animate__fadeInRight animate__faster"
//     leave-active-class="animate__animated animate__fadeOutRight animate__faster"
//   >
//  </transition-group>
import todosPreview from "./todos-preview.vue";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  //   computed: {
  //     task() {
  //       return JSON.parse(JSON.stringify(this.task));
  //     },
  //   },
  methods: {
    saveNewTask() {
      this.$emit("saveTask", this.task);
      // this.$store.dispatch({ type: 'saveTask', groupId, task: taskk })
    },
    saveChecklist(checklist) {
      const idx = this.task.checklists.findIndex((l) => l.id === checklist.id);
      if (idx < 0) return;
      this.task.checklists.splice(idx, 1, checklist);
      this.saveNewTask();
    },
    removeChecklist(idx) {
      if (idx < 0) return;
      this.task.checklists.splice(idx, 1);

      this.saveNewTask();

    },
  },
  components: {
    todosPreview,
  },
};
</script>

<style lang="scss" >

</style>

