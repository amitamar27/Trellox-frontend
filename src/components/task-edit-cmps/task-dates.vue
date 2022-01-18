<template>
  <main class="task-dates" v-if="date">
    <h3>Due date</h3>
    <div class="date-container">
      <input v-model="isDone" @change="toggleIsDone" type="checkbox" />
      <button class="date-btn" @click="openDatesMenu">
        <span class="date-display">{{ this.time }} </span>
        <span class="completed" v-if="isDone">complete</span>
      </button>
      <a v-if="task.dueDate.isDone" class="due-date-complete"></a>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      time: null,
    };
  },
  created() {
  },
  computed: {
    isDone() {
      if (!this.task.dueDate) return false;
      return this.task.dueDate.isDone;
    },
    date() {
      if (!this.task.dueDate) return false;
      this.time = this.task.dueDate.time;
      this.time = new Date(this.time);
      this.time = this.time.toGMTString();
      this.time = this.time.substring(0, this.time.length - 13);
      return this.time;
    },
  },
  methods: {
    toggleIsDone() {
      this.task.dueDate.isDone = !this.task.dueDate.isDone;
      this.task.isDueDateDone = this.task.dueDate.isDone
      this.$emit('saveTask');
    },

    openDatesMenu() {},
  },
};
</script>

<style lang="scss">
.task-dates {
  h3 {
    color: #5e6c84;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 7px;
  }
  .date-container {
    padding-top: 4px;
  }
}
.date-btn {
  margin-bottom: 0;
  color: #172b4d;
  font-family: Segoe UI, Roboto, "Noto Sans", "Ubuntu", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
}
.completed {
  // margin-left: 4px;
  color: #ffffff;
  background-color: #61bd4f;
  font-size: 12px;
  line-height: 16px;
  padding: 0 4px;
  border-radius: 2px;
  margin: auto 0 auto 8px;
  text-align: center;
}
</style>