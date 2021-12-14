<template>
  <main v-if="labels && labelIds" class="task-members">
    <h3 class="task-details-h">Labels</h3>
    <div class="task-label-container flex">
      <section
        v-for="label in labels"
        :key="label.id"
        class="task-label-list"
        :style="'background-color:' + label.color"
      >
        {{ label.title }}
      </section>
    </div>
  </main>
</template>

<script>
// v-for="labelId in labelsId"
export default {
  props: {
    labelIds: {
      type: Array,
      required: true,
    },
  },

  computed: {
    labels() {
      const labels = this.$store.getters.labels;
      // console.log("labels", labels);
      const newLabels = [];
      labels.forEach((label) => {
        if (this.labelIds.includes(label.id)) newLabels.push(label);
      });
      // console.log("newLabels", newLabels);
      return newLabels;
    },
  },
};
</script>

<style lang="scss">
.task-label-container {
  display: flex;
  /* padding-right: 25px; */
  margin-top: 9.7px;

  .task-label-list {
    border-radius: 4px;
    line-height: 32px;
    height: 32px;
    min-width: 60px;
    //   padding: 0 12px;
    //   margin: 0 4px 4px 0;
    margin-right: 5px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
    cursor: pointer;
  }
}
.task-label {
    border-radius: 4px;
    line-height: 32px;
    height: 32px;
    min-width: 20px;
      padding: 0 12px;
      margin: 0 4px 4px 0;
    // margin-right: 5px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;
    cursor: pointer;
}
</style>