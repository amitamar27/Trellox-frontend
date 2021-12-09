<template>
  <main class="task-members">
    <h3 class="task-details-h">Members</h3>
    <div class="task-members-container">
      <section v-for="member in members" :key="member.id" class="member">
        <avatar
          :size="36"
          :rounded="true"
          :username="member.username"
          :src="member.imgUrl"
        ></avatar>
      </section>
    </div>
  </main>
</template>

<script>
import avatar from "vue-avatar";
export default {
  props: {
    members: {
      type: Array,
      required: true,
    },
  },
  components: {
    avatar,
  },
};
</script>

<style lang="scss">

</style>