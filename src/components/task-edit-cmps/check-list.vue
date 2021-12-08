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
  //       // console.log('saving task');
  //     },
  //   },
  methods: {
    saveNewTask() {
      console.log("taskktaskk", this.task);
      this.$emit("saveTask", this.task);
      // this.$store.dispatch({ type: 'saveTask', groupId, task: taskk })
    },
    saveChecklist(checklist) {
      console.log("checklist", checklist);
      const idx = this.task.checklists.findIndex((l) => l.id === checklist.id);
      console.log("idxidxidx", idx);
      if (idx < 0) return;
      this.task.checklists.splice(idx, 1, checklist);
      console.log("this.task.checklists", this.task.checklists);
      this.saveNewTask();
    },
    removeChecklist(idx) {
      if (idx < 0) return;
      this.task.checklists.splice(idx, 1);

      this.saveNewTask();
      //   console.log('taskktaskk',this.task);
      // this.$emit('saveTask',this.task)
    },
  },
  components: {
    todosPreview,
  },
};
</script>

<style lang="scss" >
// .checkList-header{
//     display: flex;
//     justify-content: space-between;
//     padding: 10px;
// }
// button{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     box-sizing: border-box;
//     background-color: rgba(9,30,66,.0392156862745098);
//     color: #172a4d;
//     border-radius: 3px;
//     padding: 9px 15px;
//     border: none;
//     cursor: pointer;
//     transition: all .2s;

// 	//  @include hover-supported {
//     //         background-color: $secondaryBtnsGray;
//     //     }
// }
// .checklist-icons{
// 	display: flex;
// }
</style>

