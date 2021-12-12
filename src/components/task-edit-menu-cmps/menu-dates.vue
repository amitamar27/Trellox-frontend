<template>
  <section class="dates-menu">
    <header class="main-title">
      <p>Dates</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>

    <main class="dates-container">
      <date-picker
        :inline="true"
        v-model="time"
        :range="isRange"
        :value-type="'format'"
      >
      </date-picker>
      <section class="btns">
        <label>
          <input v-model="isRange" type="checkbox" />
          <h5>Choose range</h5>
        </label>

        <button @click="saveDate" class="save-btn">Save</button>
        <button @click="removeDate" class="remove-btn">Remove</button>
      </section>
    </main>
  </section>
</template>

<script>
import DatePicker from "vue2-datepicker";
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
      isRange: false,
    };
  },
  created() {},
  components: {
    DatePicker,
  },
  methods: {
    closeMenu() {
      // this.task.dueDate.time = this.time;
      this.$emit("closeMenu");
    },
    saveDate() {
      if (!this.task.dueDate) {
        this.task.dueDate = {
          isDone: false,
          time: this.time,
        };
      } else {
        // console.log("this.time", this.time);
        // console.log(this.time);
        // this.time = new Date(this.time);
        // console.log(this.time);
        // this.time = this.time.toGMTString();
        // this.time = this.time.substring(0, this.time.length - 13);
        // console.log(this.time);
        this.task.dueDate.time = Date.parse(this.time);
        // console.log('this.task.dueDate.time',this.task.dueDate.time);
      }
      this.$emit("saveTask");
      this.$emit("closeMenu");
    },
    removeDate() {
      this.task.dueDate.time = "";
      this.$emit("saveTask");
      this.$emit("closeMenu");
    },
  },
};
</script>

<style lang="scss">
</style>