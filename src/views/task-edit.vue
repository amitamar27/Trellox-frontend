<template>
  <main class="card-edit-window" ref="task" @click="closeDarkScreen">
    <div class="card-edit" @click.stop="">
      <header></header>
      <h1>hey</h1>
    </div>
  </main>
</template>

<script>
// background-color: #f4f5f7;
export default {
  name:'task-edit',
  created() {
    console.log("created!");
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