<template>
  <section class="menu-members">
    <header class="main-title">
      <p>Members</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>

    <main class="menu-members-container" v-if="currMembers">
      <el-input></el-input>
      <h4>Board members</h4>
      <section v-for="member in currMembers" :key="member.id">
        <div class="member">
          <avatar
            :size="32"
            :rounded="true"
            :username="member.username"
            :src="member.imgUrl"
          >
          </avatar>
          <span class="fullname">
            {{ member.fullname }}
          </span>
          <span class="icon-check icon-sm"> </span>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    // board: {
    //     type:Array,
    //     required: true,
    // }
    // members:{
    //     type:Array,
    //     required: true,
    // }
  },
  data() {
    return {
      currMembers: null,
    };
  },
  created() {
    this.currMembers = this.task.members;
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    allMembers() {
      return this.members;
    },
  },
  computed: {
    // members(){
    //   return this.members
    // },
  },
  components: {
    avatar,
  },
};
</script>

<style>
</style>