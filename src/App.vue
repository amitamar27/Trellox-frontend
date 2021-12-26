<template>
  <div id="app" class="app" :style="background">
    <!-- <dark-screen /> -->
    <!-- <side-nav></side-nav> -->
    <app-header v-if="!isSigning" :style="appHeaderStyle" />
    <router-view @setBg="setBg" />
    <!-- <login /> -->
  </div>
</template>




<script>
import appHeader from "./components/app-header.vue";
import sideNav from "./components/side-navbar.vue";
import darkScreen from "./components/dark-screen.vue";
import { socketService } from "./services/socket.service.js";
import login from "./views/Login.vue";
export default {
  components: {
    appHeader,
    sideNav,
    darkScreen,
    login,
  },
  data() {
    return {
      // bgStyle: 'url(https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639076920/Trellox/5137807_o4zvys.jpg)',
      bgStyle: "",
      bgColor: "",
      bgImg: "",
      isSigning: false,
    };
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadBoards" });
    } catch (err) {
      console.log("ERROR cannot load users or boards");
    }
  },
  computed: {
    background() {
      if (this.$route.name === "Home" || this.$route.name === "Boards") {
        this.isSigning = false;
        return {
          backgroundImage:
            "url(https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639434430/Trellox/austin-distel-rxpThOwuVgE-unsplash_mufsjc.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        };
      }
      if (this.$route.name === "Login") {
        this.isSigning = true;
        return {
          // backgroundImage: '',
          backgroundColor: "rgb(250, 251, 252)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        };
      }
      this.isSigning = false;
      // console.log("this.bgStyle", this.bgStyle);
      if (this.bgImg) {
        return {
          backgroundImage: this.bgImg,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          // backgroundColor: this.bgStyle,
        };
      }
      return {
        // backgroundImage: this.bgStyle,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundColor: this.bgColor,
      };
    },
    appHeaderStyle() {
      if (this.$route.name === "Home" || this.$route.name === "Boards") {
        return {
          backgroundColor: "#026AA7",
        };
      }
    },
    currUser() {},
  },
  methods: {
    setBg(style) {
      // console.log("style", style);
      if(style.bgImg){
        this.bgImg = style.bgImg
        this.bgColor = ''
        return
      }
       this.bgImg = '';
      this.bgColor = style.bgColor;
    },
  },
};
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
