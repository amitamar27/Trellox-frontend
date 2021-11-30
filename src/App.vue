<template>
  <div id="app" class="app" style="background-image: url(https://res.cloudinary.com/taskit-sprint/image/upload/v1622319307/background%20for%20Taskit/background_6_lqcaex.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;">
    <app-header/>
    <router-view/>
  </div>
</template>




<script>
import  appHeader  from './components/app-header.vue'

export default {
  components:{
    appHeader
  }
    
}
</script>





<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;

//   // color: #2c3e50;
//   // width: 100%;
//   // height: 100vh;
//   // position: absolute;
//   // top: 0;
//   // left: 0;
//   // z-index: -1;
//   // background-size: cover;

//   position: absolute;
//     height: 100vh;
//     width: 100%;
//     z-index: 10;
//     // overflow-y: hidden;
//     overflow-x: hidden;
// }
// .borad-nav-color {
//     height: 40px;
//     background-color: rgba(0,0,0,.32);
//     color: #fff;
//     z-index: -1;
// }
// .borad-nav-color, .fade {
//     width: 100vw;
//     position: absolute;
//     top: 0;
//     left: 0;
// }
// .fade {
//     height: 40vh;
//     background-image: url(https://res.cloudinary.com/taskit-sprint/image/upload/v1622819528/pvttcooptsuyhunbol8o.png);
//     background-repeat: no-repeat;
//     background-size: cover;
//     z-index: -2;
// }
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
