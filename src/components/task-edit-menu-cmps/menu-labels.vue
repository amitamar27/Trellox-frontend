<template>
  <menu>
    <h1>labels</h1>
    <el-input> </el-input>
    <main class="labels-menu">
      <article class="edit-labels">
        <div v-for="(color, idx) in colors" :key="idx">
          <a class="task-label-edit icon-sm icon-edit"></a>
          <span
            class="task-labels mod-selectable"
            :style="`background-color: ${color}`"
          ></span>
        </div>
      </article>
    </main>
    <!-- <ul class="edit-labels">
      <li v-for="(color, idx) in colors" :key="idx">
        <a class="task-label-edit icon-sm icon-edit"></a>
        <span
          class="task-labels mod-selectable"
          :style="`background-color: ${color}`"
        ></span>
      </li>
    </ul> -->
  </menu>
</template>

<script>
import {utilService} from '../../services/util.service.js'
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
      ],
    };
  },
  created() {
    console.log("thisss", this.task);
  },
  methods: {
    //   getStyle(){
    //       return this.colors[]
    //   },
  },
};
</script>

<style >
</style>