<template>
  <div class="dark-screen" v-if="isDark" @click="closeDarkScreen">
      <h1>dark</h1>
  </div>
</template>

<script>
export default {
computed:{
    isDark(){
        return this.$store.getters.isDark
    },
},
// created(){
//     console.log('1');
// },
methods: {
    closeDarkScreen(){
        this.$store.commit({ type: 'closeDarkScreen' })
        this.$router.push('/board')
    }
}
}
</script>

<style>

</style>