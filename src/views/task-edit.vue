<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div class="card-edit" @click.stop="">
      <header  class="task-edit-header">
        <h1>This is Header</h1>
      </header>
      
    </div>
  </main>
</template>

<script>
// background-color: #f4f5f7;
export default {
  name:'task-edit',
  props: {

  },
  created() {
    console.log("created!");
    const { groupId } = this.$route.params
		const { taskId } = this.$route.params
    console.log(groupId,taskId);
  },
  methods: {
    // @click.stop="closeDarkScreen"
    closeDarkScreen(){
        console.log('clic');
        this.$store.commit({ type: 'closeDarkScreen' })
        this.$router.push('/board')
    }
}

};
</script>

<style>
</style>