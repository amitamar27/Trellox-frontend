<template>
  <div class="card-main">
    <div @click="cardClick(groupId, task.id)" class="card-container">
      <div class="card-preview">
                  <!-- cover -->
          <div
            v-if="cover && !cover.isFull && cover.bgUrl"
            class="half-cover img"
            :style="coverStyle"
          ></div>
          <div
            v-if="cover && !cover.isFull && cover.bgColor"
            class="half-cover color"
            :style="coverStyle"
          ></div>
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
          <!-- TASK DETAILS -->
          

          <div class="task-details-container">
            <div class="tasks">
              <!-- due-date -->
              <section
                v-if="task.dueDate"
                class="due-later-badge"
                :class="dueDateClass"
                @click.stop.prevent="toggleIsDone"
              >
                <img
                  :src="require('@/assets/clock.png')"
                  alt="Due Date"
                  title="This card is due later"
                />
                <!-- <i class="icon-clock"> </i> -->

                <template v-if="task.dueDate.length < 2">{{
                  task.dueDate[0] | moment("MMM D")
                }}</template>
                <template v-else>{{
                  task.dueDate[1] | moment("MMM D")
                }}</template>
              </section>

              <!-- comment -->
              <section v-if="task.comments" class="comments-badge">
                <img
                  :src="require('@/assets/comments.png')"
                  alt="comments"
                  title="Comments"
                />
                {{ task.comments.length }}
              </section>

              <!-- checklist -->
              <section
                v-if="task.checklists && todosCounters.todosCounter"
                class="checklist-badge"
                :class="{
                  'done-checklist':
                    todosCounters.isDoneCounter === todosCounters.todosCounter,
                }"
              >
                <img
                  :src="require('@/assets/checklist.svg')"
                  alt=""
                  title="Checklist items"
                />
                {{ todosCounters.isDoneCounter }}/{{
                  todosCounters.todosCounter
                }}
              </section>
            </div>

            <!-- members -->
            <div class="list-task-members">
              <div
                class="member"
                v-for="member in task.members"
                :key="member.id"
              >
                <avatar
                  class="user-avatar"
                  backgroundColor="lightblue"
                  color="black"
                  :size="28"
                  :username="member.fullname"
                  :src="member.imgUrl"
                ></avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import taskEdit from "../views/task-edit.vue";
import Avatar from 'vue-avatar';
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
      // console.log("korenn", labels);
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
    todosCounters() {
      const counters = { todosCounter: 0, isDoneCounter: 0 }
      this.task.checklists.forEach(cl => {
        counters.isDoneCounter += cl.todos.reduce((acc, todo) => {
          counters.todosCounter++
          if (todo.isDone) acc++
          return acc
        }, 0)
      })
      return counters
    },
    isCheckLists() {
      return this.task.checklists?.todos
    },
    calculateTime() {
      const currTime = +Date.now()
      const targetTime = this.task.dueDate?.[this.task.dueDate?.length - 1]
      const targetTimeStemp = +new Date(targetTime).getTime()

      const day = 1000 * 60 * 60 * 24
      const diff = targetTimeStemp - currTime
      let result = -1

      if (diff < day) result = 1
      if (diff < 0) result = 0
      else if (diff > day) result = 2
      return result
    },
    dueDateClass() {
      const calcTime = (this.task.isDueDateDone) ? -1 : this.calculateTime
      return {
        'due-date-done': this.task.isDueDateDone,
        'due-date-soon': calcTime === 1,
        'due-date-late': calcTime === 0
      }
    },
    	cover() {
			return this.task.cover
		},
    	coverStyle() {
			const cover = this.task.cover
			if (cover.bgColor) {
				const style = `background-color:${cover.bgColor}`
				return style
			} else if (cover.bgUrl) {
				// const style = `background-image: url('${cover.bgUrl}';  background-size:cover;)`
				const style = `background-image: url('${cover.bgUrl}');  background-size:cover; background-position:center; height: 256px;border-radius: 3px 3px 0px 0px;`
				return style
			}
		},
    		coverClass() {
			const cover = this.task.cover
			// return (cover.bgColor) ? 'full-cover color full' : 'full-cover img full'
			return (cover.bgColor) ? 'full-cover color' : 'full-cover img'
		},
		coverType() {
			const cover = this.task.cover
			if (cover?.isFull) {
				return (cover?.bgColor) ? 'full-cover color ' : 'full-cover img '
			} else if (cover?.bgColor) {
				return 'half-cover color'
			} else {
				return (cover?.bgUrl) ? 'half-cover img ' : ''
			}
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
    toggleIsDone() {
      this.task.isDueDateDone = !this.task.isDueDateDone
      this.$store.commit({ type: 'getGroupIdByTaskId', taskId: this.task.id })
      const groupId = this.$store.getters.groupIdByTaskId

      this.$store.dispatch({ type: 'saveTask', groupId, taskToSave: this.task })
    },
    // moment: function () {
    //   return moment();
    // }
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
    Avatar,
  },
};
</script>

<style>
</style>


