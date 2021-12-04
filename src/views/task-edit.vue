<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div v-if="task" class="card-edit " @click.stop="">
      <header v-if="task.bgColor"></header>
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

        <aside>
            <task-aside :task="task" :key="6"></task-aside>
        </aside>

      <section class="main-content">
        <div>
          <section class="task-details">
            <task-members v-if="task.members" :members="task.members" :key="task.id"></task-members>
            <labels :labelIds="task.labelIds" :key="1"></labels>
          </section>

          <section class="task-description">
            <header></header>
            <task-description :task="task" :key="2"></task-description>
          </section>

          <section class="check-list">
            <header></header>
            <check-list :task="task" :key="3"></check-list>
          </section>

          <section class="task-attachments">
            <header></header>
            <task-attachment :task="task" :key="4"></task-attachment>
          </section>
          
          <section class="task-activities">
            <header></header>
            <task-activity :task="task" :key="5"></task-activity>
          </section>

         
        </div>
      </section>
      </main>
      
    </div>
  </main>
</template>

<script>
// background-color: #f4f5f7;
// animate__animated animate__backInDown
import labels from '../components/task-edit-cmps/labels.vue'
import taskMembers from '../components/task-edit-cmps/task-members.vue'
import taskDescription from '../components/task-edit-cmps/task-description.vue'
// import taskAttachments from '../components/task-edit-cmps/task-attachments.vue'
import taskActivity from '../components/task-edit-cmps/task-activity.vue'
import taskAside from '../components/task-edit-cmps/task-aside.vue'
import taskAttachment from '../components/task-edit-cmps/task-attachment.vue'
import checkList from '../components/task-edit-cmps/check-list.vue'
export default {
  name: "task-edit",
  props: {},
  // data(){
  //   return {
  //     task: null,
  //   }
  // },
  created() {
    console.log("created!",this.task);
  },
  computed: {
    task() {
      const { groupId } = this.$route.params;
      const { taskId } = this.$route.params;
      console.log(groupId, taskId);
      this.$store.commit({ type: "getTaskById", taskId, groupId });
      const task = this.$store.getters.currTask
      console.log('task',task);
      // this.task = task
      return task;
    },
  },
  methods: {
    // @click.stop="closeDarkScreen"
    closeDarkScreen() {
      const { boardId } = this.$route.params
      console.log('boardId',boardId);
      console.log("clic");
      this.$store.commit({ type: "closeDarkScreen" });
      this.$router.push("/board/" + boardId);
    },
  },
  components: {
    labels,
    taskMembers,
    taskDescription,
    taskAttachment,
    taskActivity,
    taskAside,
    checkList

  }
};
</script>

<style>
.task-details{
    display: flex;
    margin-left: 42px;
    margin-bottom: 15px;
    gap: 10px;
    flex-wrap: wrap;
    transition: all .2s;

    
}
.task-details-h{
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 7px;
}
</style>