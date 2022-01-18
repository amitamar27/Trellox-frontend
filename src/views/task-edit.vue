<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div v-if="task" class="card-edit" @click.stop="">
      <header v-if="task.cover" :style="taskBgColor" class="task-edit-bg-title">
        <a class="icon-md" @click="closeDarkScreen"></a>
        <div class="task-edit-bg-btn">
          <a class="cover-btn" @click="openCoverMenu">
            <span class="icon-sm icon-card-cover"></span>
            Cover</a
          >
        </div>
      </header>
      <main class="task-edit-container">
        <transition
          enter-active-class="animate__animated animate__fadeInRight animate__faster"
          leave-active-class="animate__animated animate__fadeOutRight animate__faster"
        >
          <task-cover
            v-if="isCoverClick"
            @closeCover="closeCover"
            :task="task"
            :board="board"
          ></task-cover>
        </transition>
        <task-title :task="task" @saveTask="saveTask"> </task-title>
        <a
          class="icon-md close-btn"
          v-if="!task.cover || !task.cover.bgColor"
          @click="closeDarkScreen"
        ></a>
        <section class="main-content">
          <div class="main-content-details">
            <div class="main-content-details-container">
            <section class="task-details">
              <task-members
                v-if="task.members && task.members.length"
                :members="task.members"
                :key="task.id"
              ></task-members>
              <labels
                v-if="task.labelIds && task.labelIds.length"
                :labelIds="task.labelIds"
                :key="1"
              ></labels>
              <task-dates :task="task" v-if="task.dueDate"> </task-dates>
            </section>

            <section class="task-description">
              <header></header>
              <task-description
                :task="task"
                :key="2"
                @saveTask="saveTask"
              ></task-description>
            </section>

            <section class="check-list" v-if="task.checklists && task.checklists.length">
              <header></header>
              <check-list
                :task="task"
                :key="3"
                @saveTask="saveTask"
              ></check-list>
            </section>

            <section class="task-attachments" v-if="task.attachments && task.attachments.length">
              <task-attachment :task="task" :key="4"
              @saveTask="saveTask"
              ></task-attachment>
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
            <section class="task-edit-actions">
              <a class="delete-task-btn" @click="removeTask">
                <span class="icon-sm icon-remove"></span>
                <span>Delete</span>
              </a>
            </section>
          </div>

          <aside class="task-side-bar">
            <task-aside
              :task="task"
              :key="6"
              @addLabel="addLabel"
              @saveTask="saveTask"
              :board="board"
            ></task-aside>
          </aside>
        </section>
      </main>
    </div>
  </main>
</template>

<script>

import labels from "../components/task-edit-cmps/labels.vue";
import taskMembers from "../components/task-edit-cmps/task-members.vue";
import taskDescription from "../components/task-edit-cmps/task-description.vue";
// import taskAttachments from '../components/task-edit-cmps/task-attachments.vue'
import taskActivity from "../components/task-edit-cmps/task-activity.vue";
import taskAside from "../components/task-edit-cmps/task-aside.vue";
import taskAttachment from "../components/task-attachment.vue";
import checkList from "../components/task-edit-cmps/check-list.vue";
import taskTitle from "../components/task-edit-cmps/task-title.vue";
import taskCover from "../components/task-edit-cmps/task-cover.vue";
import taskDates from "../components/task-edit-cmps/task-dates.vue";
export default {
  name: "task-edit",
  props: {},
  data() {
    return {
      currTask: null,
      isCoverClick: false,
      // board:null,
    };
  },
  created() {
    console.log("created!", this.currTask);
  },
  computed: {
    task() {
      const { groupId } = this.$route.params;
      const { taskId } = this.$route.params;
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
      if (this.currTask.cover.bgUrl) {
        return {
          backgroundImage: `url(${this.currTask.cover.bgUrl})`,
          backgroundSize: "cover",
          backgroundorigin: "content-box",
          backgroundPosition: "center center",
        };
      }
    },
    isCheckLists() {
      return this.task().checkList;
    },
    board() {
      return this.$store.getters.board;
    },
  },
  methods: {
    closeDarkScreen() {
      const { boardId } = this.$route.params;
      this.$store.commit({ type: "closeDarkScreen" });
      this.$router.push("/board/" + boardId);
    },
    saveTask() {
      const { groupId } = this.$route.params;
      if (groupId)
        this.$store.dispatch({
          type: "saveTask",
          groupId,
          taskToSave: this.currTask,
        });
    },
    labels() {
      const labels = this.$store.getters.labels;
      const newLabels = [];
      labels.forEach((label) => {
        if (this.currTask.labelIds.includes(label.id)) newLabels.push(label);
      });
      return newLabels;
    },
    addLabel(labelId) {
      const { groupId } = this.$route.params;
      this.$store.dispatch({
        type: "saveTask",
        groupId,
        taskToSave: this.currTask,
      });
    },
    toggleMember() {
      const { groupId } = this.$route.params;
      this.$store.dispatch({type: "saveTask",groupId,taskToSave: this.currTask,});
    },
    members() {
      const memberss = this.$store.getters.members;
      return this.$store.getters.members;
    },
    openCoverMenu() {
      this.isCoverClick = true;
    },
    closeCover() {
      this.isCoverClick = false;
    },
    removeTask() {
      const { groupId } = this.$route.params;
      const { taskId } = this.$route.params;
      this.$store.dispatch({ type: "removeTask", groupId, taskId });
      this.closeDarkScreen();
    },
    updateBoard() {
      const { boardId } = this.$route.params;
      this.$store.dispatch({ type: "updateBoard", boardId });
    },
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
    taskCover,
    taskDates,
  },
};
</script>

<style lang="scss">
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
  min-height: 80vh;
}
.main-content-details-container{
  display: flex;
      flex-direction: column;
}

.main-content-details {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
}

.task-attachments {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
}
.task-edit-bg-title {
  height: 116px;
  width: 100%;
  position: relative;
}
.task-edit-actions {
  // display: flex;
  margin: 20px 0;
  .delete-task-btn {
    display: flex;
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;
    height: 32px;
    margin-top: 8px;
    max-width: 300px;
    overflow: hidden;
    padding: 6px 12px;
    position: relative;
    text-decoration: none;
    text-overflow: ellipsis;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    -webkit-user-select: none;
    user-select: none;
    white-space: nowrap;

    width: calc(50% - 8px);

    background-color: #b04632;
    border: none;
    box-shadow: none;
    color: #fff;

    &:hover {
      background-color: #933b27;
      border: none;
      box-shadow: none;
      color: #fff;
    }

    .icon-remove {
      color: #fff;
      margin: 0 6px 0 -6px;
      line-height: 1.38;
    }
  }
}

// .delete-task-btn {
//   border-radius: 3px;
//   box-sizing: border-box;
//   cursor: pointer;
//   height: 32px;
//   margin-top: 8px;
//   max-width: 300px;
//   overflow: hidden;
//   padding: 6px 12px;
//   // position: relative;
//   text-decoration: none;
//   text-overflow: ellipsis;
//   transition-duration: 85ms;
//   transition-property: background-color, border-color, box-shadow;
//   transition-timing-function: ease;
//   -webkit-user-select: none;
//   user-select: none;
//   white-space: nowrap;

//   // display: inline-block;
//   // margin-right: 8px;

// }

// display: flex;

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