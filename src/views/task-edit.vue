<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div v-if="task" class="card-edit" @click.stop="">
      <main class="task-edit-container">
        <header class="task-edit-header">
        <section class="task-section">
          <span class="icon-card icon-lg">
           
          </span>
          <div class="main-title">
            <h1>This is Header</h1>
          </div>
        </section>
      </header>
      </main>
      
    </div>
  </main>
</template>

<script>
// background-color: #f4f5f7;
export default {
  name: "task-edit",
  props: {},
  created() {
    console.log("created!");
  },
  computed: {
    task() {
      const { groupId } = this.$route.params;
      const { taskId } = this.$route.params;
      console.log(groupId, taskId);
      this.$store.commit({ type: "getTaskById", taskId, groupId });
      const task = this.$store.getters.currTask
      console.log('task',task);
      return task;
    },
  },
  methods: {
    // @click.stop="closeDarkScreen"
    closeDarkScreen() {
      console.log("clic");
      this.$store.commit({ type: "closeDarkScreen" });
      this.$router.push("/board");
    },
  },
};
</script>

<style>
</style>