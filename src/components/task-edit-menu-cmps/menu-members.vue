<template>
  <section class="menu-members">
    <header class="main-title">
      <p>Members</p>
      <a class="icon-sm icon-close" @click="closeMenu"></a>
    </header>

    <main class="menu-members-container">
      <el-input></el-input>
      <h4>Board members</h4>
      <section>
        <div
          class="member"
          v-for="member in board.members"
          :key="member.id"
          @click="toggleMember(member)"
        >
          <div class="member-info flex">
            <avatar
              :size="32"
              :rounded="true"
              :username="member.username"
              :src="member.imgUrl"
            >
            </avatar>
            <span class="fullname">
              {{ member.fullname }} <span>&nbsp({{ member.username }})</span>
            </span>
          </div>
          <span v-if="isTaskMember(member._id)" class="icon-check icon-sm">
          </span>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
//
import avatar from "vue-avatar";
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
    // members:{
    //     type:Array,
    //     required: true,
    // }
  },
  data() {
    return {
      members: null,
    };
  },
  created() {
    this.members = this.task.members;
    // console.log("thiss", this.members);
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    allMembers() {
      return this.members;
    },
    isTaskMember(id) {
      return this.task.members.some((member) => member._id === id);
    },
    toggleMember(member) {
      const idx = this.task.members.findIndex(
        (memb) => memb._id === member._id
      );
      if (idx > -1) this.task.members.splice(idx, 1);
      else this.task.members.push(member);
      this.$emit("toggleMember");
    },
  },
  computed: {},
  components: {
    avatar,
  },
};
</script>

<style>
/* .member-info{
    display: flex;
} */
</style>