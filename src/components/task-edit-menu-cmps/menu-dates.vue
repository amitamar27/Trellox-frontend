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
  created() {
    this.time = Date.now()
  },
  components: {
    DatePicker,
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    saveDate() {

      if(!this.time) this.time = Date.now()
      // console.log('this.task.dueDate',this.task,this.task.dueDate);
      if (!this.task.dueDate) {
        this.task.dueDate = {
          isDone: false,
          time: this.time,
        };
      } else {
        this.task.dueDate.time = Date.parse(this.time);
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