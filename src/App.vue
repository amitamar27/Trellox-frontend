<template>
  
  <div id="app" class="app" style="background-image: url(https://res.cloudinary.com/taskit-sprint/image/upload/v1622319307/background%20for%20Taskit/background_6_lqcaex.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;">
    <!-- <dark-screen /> -->
    <app-header/>
    <!-- <side-nav></side-nav> -->
    <router-view/>
  </div>
</template>




<script>
import  appHeader  from './components/app-header.vue'
import  sideNav  from './components/side-navbar.vue'
import darkScreen from './components/dark-screen.vue'

export default {
  components:{
    appHeader,
    sideNav,
    darkScreen
  },
  
    
}
</script>





<style lang="scss">

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
