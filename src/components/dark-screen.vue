<template>
  <div class="dark-screen" v-if="isDark" @click.stop="closeDarkScreen">
      <slot></slot>
      <!-- <h1>dark</h1> -->
      <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
computed:{
    isDark(){
        return this.$store.getters.isDark
    },
},
created(){
    console.log('1');
},
methods: {
    closeDarkScreen(){
        console.log('clic');
        this.$store.commit({ type: 'closeDarkScreen' })
        this.$router.push('/board')
    }
}
}
</script>

<style>

</style>