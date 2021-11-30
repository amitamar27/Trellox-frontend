<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>


<<<<<<< HEAD


<script>
import  appHeader  from './components/app-header.vue'

export default {
  components:{
    appHeader
  }
    
}
</script>





=======
>>>>>>> 00bbfcc54ba066940062014c3417404db50cac8a
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
