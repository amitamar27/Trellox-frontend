<template>
  <div id="app" class="app" :style="background">
    <!-- <dark-screen /> -->
    <!-- <side-nav></side-nav> -->
    <app-header :style="appHeaderStyle" />
    <router-view @setBg="setBg" />
    <!-- <login /> -->
  </div>
</template>




<script>
import appHeader from './components/app-header.vue'
import sideNav from './components/side-navbar.vue'
import darkScreen from './components/dark-screen.vue'
import { socketService } from "./services/socket.service.js"
import login from './views/Login.vue'
export default {
  components: {
    appHeader,
    sideNav,
    darkScreen,
    login
  },
  data() {
    return {
      // bgStyle: 'url(https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639076920/Trellox/5137807_o4zvys.jpg)',
      bgStyle: ''
    }
  },
  async created(){
    try{
      console.log('app created');
      await this.$store.dispatch({ type: "loadBoards" });
      // await socketService.setup();
    }catch (err){
       console.log("ERROR cannot load users or boards");
    }
    
  },
  computed: {
    background() {
      console.log('this.$route.name',this.$route.name);
      if (this.$route.name === 'Home' || this.$route.name === 'Boards') {
        return {
          backgroundImage: 'url(https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639434430/Trellox/austin-distel-rxpThOwuVgE-unsplash_mufsjc.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }
      }
       if(this.$route.name === 'Login'){
        return {
          // backgroundImage: '',
          backgroundColor: 'rgb(250, 251, 252)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }
        
      }
      return {
        backgroundImage: this.bgStyle,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }

    },
    //   if (this.$route.name === 'taskEdit') {
    //     return {
    //       backgroundImage: 'url(https://res.cloudinary.com/giladtoy/image/upload/v1638531202/u27ypkc1wfre9x9vgmrb.jpg)',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center'
    //     }
    //   }
    //   if ( this.$route.name === 'Board') {
    //     return {
    //       backgroundImage: `url(${this.bgStyle})`,
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center'
    //     }
    //   }
    //   if (this.$store.getters.board && this.$route.path.includes('board')) {
    //     const boardStyle = this.$store.getters.board.style


    //     const res = {
    //       backgroundImage: '',
    //       backgroundRepeat: 'no-repeat',
    //       backgroundSize: 'cover',
    //       backgroundPosition: 'center'
    //     }

    //     if (this.boardStyle.style) {
    //       res.backgroundImage = `url('${boardStyle.bgImg}')`
    //       return res
    //     }
    //     if (boardStyle.bgColor) return { backgroundColor: `${boardStyle.bgColor}` }
    //   }
    // },
    // appHeaderStyle() {
    //   if (this.$route.name === 'Home') {
    //     return {
    //       backgroundColor: 'rgb(255 255 255 / 16%)',
    //     }
    //   }
    //   if (this.$route.name === 'Board') {
    //     return {
    //       backgroundColor: 'rgb(255 255 255 / 16%)',
    //     }
    //   }
    // }
    	appHeaderStyle() {
			if (this.$route.name === 'Home' || this.$route.name === 'Boards') {
				return {
					backgroundColor: '#026AA7',
				}
			}
		}


  },
  methods: {
    setBg(style) {
      this.bgStyle = style
      // console.log('bgStyleeeee', this.bgStyle);
    }
  },
  //   :style="appHeaderStyle"

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
