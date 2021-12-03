<template>
  <main class="task-members">
      <h3 class="task-details-h">MEMBERS</h3>
      <section v-for="member in members" :key="member.id">
          <avatar 
          :size="32"
          :rounded="true"
		  :username="member.username"
		  :src="member.imgUrl"
          ></avatar>
      </section>
  </main>
</template>

<script>
import avatar from 'vue-avatar'
export default {
    props:{
        members: {
            type: Array,
            required: true,
        }
    },
    components: {
        avatar,
    }

}
</script>

<style>

</style>