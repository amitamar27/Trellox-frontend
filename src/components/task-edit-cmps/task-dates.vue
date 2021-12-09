<template>
  <main class="task-dates" v-if="date">
    <h3>Due date</h3>

    <div class="date-container">
      <input v-model="isDone" @change="toggleIsDone" type="checkbox" />
      <button class="date-btn" @click="openDatesMenu">
        <span class="date-display">{{ this.time }} </span>
        <span class="completed" v-if="isDone">complete</span>
      </button>
      <a v-if="this.task.dueDate.isDone" class="due-date-complete"></a>
    </div>
  </main>
</template>

<script>
// {{ date[0] | moment("MMM D") }}
// 		</span>
// 		<span v-else class="date-display">
// 			{{ date[0] | moment("MMM D") }}
// 			to {{ date[1] | moment("MMM D") }}
// 		</span>
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
    console.log(" this.time", this.time);
  },
  computed: {
    isDone() {
      console.log("this.task.dueDate", this.task.dueDate);
      if (!this.task.dueDate) return false;
      return this.task.dueDate.isDone;
    },
    date() {
      if (!this.task.dueDate) return;
      this.time = this.task.dueDate.time;
      this.time = new Date(this.time);
      this.time = this.time.toGMTString();
      this.time = this.time.substring(0, this.time.length - 13);
      return this.time;
    },
    // time.substring(0,time.length - 4)
  },
  methods: {
    toggleIsDone() {
      console.log("{{this.task.dueDate.time}}", this.task.dueDate);
      this.task.dueDate.isDone = !this.task.dueDate.isDone;
    },
    // setTime() {
    //     console.log(typeof this.task.dueDate.time);
    //     const type = typeof this.task.dueDate.time
    //     console.log('type of',typeof type);
    //     if(typeof this.task.dueDate.time === type){
    //         this.time = this.task.dueDate.time;
    //          this.time =  Date.parse(this.time)
    //         console.log(this.time,'dsdsdsdsd',Date.parse(this.time));
    //         // return
    //     }
    //   console.log(this.task.dueDate.time);
    //   this.time = this.task.dueDate.time;
    //   console.log(this.time);
    //   this.time = new Date(this.time);
    //   console.log(this.time);
    //   this.time = this.time.toGMTString();
    //   this.time = this.time.substring(0, this.time.length - 13);
    //   console.log(this.time);
    // },
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