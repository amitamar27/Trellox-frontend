<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div v-if="task" class="card-edit" @click.stop="">
      <header
        v-if="task.cover"
        @click="closeDarkScreen"
        :style="taskBgColor"
        class="task-edit-bg-title"
      >
        <a class="icon-md"></a>
      </header>
      <main class="task-edit-container">
        <!-- <header class="task-edit-header">
              <section class="task-section">
                  <span class="icon-card icon-lg">
           
                  </span>
                  
                <textarea >

                  </textarea> 
       
              </section>
          </header> -->

        <!-- <header  v-if="task.cover"> 

          </header> -->
        <task-title :task="task" @saveTask="saveTask">
          
        </task-title>
        <a class="icon-md close-btn" v-if="!task.cover" @click="closeDarkScreen"></a>
        <section class="main-content">
          <div class="main-content-details">
            <section class="task-details">
              <task-members
                v-if="task.members"
                :members="task.members"
                :key="task.id"
              ></task-members>
              <labels
                v-if="task.labelIds"
                :labelIds="task.labelIds"
                :key="1"
              ></labels>
            </section>

            <section class="task-description">
              <header></header>
              <task-description
                :task="task"
                :key="2"
                @saveTask="saveTask"
              ></task-description>
            </section>

            <section class="check-list" v-if="task.checklists">
              <header></header>
              <check-list
                :task="task"
                :key="3"
                @saveTask="saveTask"
              ></check-list>
            </section>

            <section class="task-attachments" v-if="task.attachments">
              <task-attachment :task="task" :key="4"></task-attachment>
            </section>

            <section class="task-activities" v-if="task.activities">
              <header></header>
              <task-activity
                :task="task"
                :key="5"
                @saveTask="saveTask"
              ></task-activity>
            </section>
          </div>

          <aside class="task-side-bar">
            <task-aside :task="task" :key="6"
            @addLabel="addLabel"
            @saveTask="saveTask"
            
            ></task-aside>
          </aside>
        </section>
      </main>
    </div>
  </main>
</template>

<script>
// :board="board"
// background-color: #f4f5f7;
// animate__animated animate__backInDown
import labels from "../components/task-edit-cmps/labels.vue";
import taskMembers from "../components/task-edit-cmps/task-members.vue";
import taskDescription from "../components/task-edit-cmps/task-description.vue";
// import taskAttachments from '../components/task-edit-cmps/task-attachments.vue'
import taskActivity from "../components/task-edit-cmps/task-activity.vue";
import taskAside from "../components/task-edit-cmps/task-aside.vue";
import taskAttachment from "../components/task-edit-cmps/task-attachment.vue";
import checkList from "../components/task-edit-cmps/check-list.vue";
import taskTitle from "../components/task-edit-cmps/task-title.vue";
export default {
  name: "task-edit",
  props: {},
  data() {
    return {
      currTask: null,
      // board:null,
    };
  },
  created() {
    console.log("created!", this.currTask);
    // console.log('this.$store.getters.board',this.$store.getters.board);
  },
  computed: {
    task() {
      const { groupId } = this.$route.params;
      const { taskId } = this.$route.params;
      console.log(groupId, taskId);
      this.$store.commit({ type: "getTaskById", taskId, groupId });
      const task = this.$store.getters.currTask;
      this.currTask = task;
      console.log("task", task);
      return task;
    },
    taskBgColor() {
      if (this.currTask.cover.bgColor) {
        return `background-color:${this.currTask.cover.bgColor}`;
      }
    },
    isCheckLists() {
      // console.log('this.task',this.task);
      // const { groupId } = this.$route.params;
      // this.$store.commit({ type: "getGroupById", groupId });
      // const group = this.$store.getters.currGroup
      return this.task().checkList;
    },
  },
  methods: {
    // @click.stop="closeDarkScreen"
    closeDarkScreen() {
      const { boardId } = this.$route.params;
      console.log("boardId", boardId);
      console.log("clic");
      this.$store.commit({ type: "closeDarkScreen" });
      this.$router.push("/board/" + boardId);
    },
    saveTask(task) {
      // alert('saving..')
      console.log("rass", task);
      if (!task) return;
      console.log("boardId task", task);
      const { groupId } = this.$route.params;
      console.log("groupId", groupId);
      if (groupId)
        this.$store.dispatch({ type: "saveTask", groupId, taskToSave: task });
    },
    labels() {
      const labels = this.$store.getters.labels;
      console.log("labels", labels);
      const newLabels = [];
      labels.forEach((label) => {
        if (this.currTask.labelIds.includes(label.id)) newLabels.push(label);
      });
      console.log("newLabels", newLabels);
      return newLabels;
    },
    saveLabels({labels}){
      console.log('labels tp',labels);
    },
    addLabel(labelId){
      console.log(this.currTask);
      console.log('labelId',labelId);
      const { groupId } = this.$route.params;
      // alert('calling saveTask')
      this.$store.dispatch({ type: "saveTask", groupId, taskToSave: this.currTask });
    },
    members(){
      const memberss = this.$store.getters.members
      console.log('memberss',memberss);
      return this.$store.getters.members
    },
    board(){
      // return
      this.board = this.$store.getters.board
      console.log('this.$store.getters.board',board);
      return this.board
    }
  },
  components: {
    labels,
    taskMembers,
    taskDescription,
    taskAttachment,
    taskActivity,
    taskAside,
    checkList,
    taskTitle,
  },
};
</script>

<style>
.task-details {
  display: flex;
  margin-left: 42px;
  margin-bottom: 15px;
  gap: 10px;
  flex-wrap: wrap;
  transition: all 0.2s;
}
.task-details-h {
  color: #5e6c84;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 7px;
}

.main-content {
  display: flex;
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
  gap: 12px;
}

.main-content-details {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.task-attachments {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
}
.task-edit-bg-title {
  height: 150px;
  width: 100%;
}
/* .icon-md{
  background-color: #00000014;
  cursor: pointer;
  border-radius: 50%;
    color: #42526e;
    height: 32px;
    margin: 4px;
    overflow: hidden;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color 85ms,color 85ms;
    width: 32px;
    z-index: 2;
    font-size: 20px;

    line-height: 32px;
} */
</style>