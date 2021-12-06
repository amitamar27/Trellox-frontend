<template>
  
  <div id="app" class="app" :style="background">
    <!-- <dark-screen /> -->
    <!-- <side-nav></side-nav> -->
    <app-header
    
    />
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
  computed:{
    background() {
		console.log('this.$route.name',this.$route.name);
			if (this.$route.name === 'Home') {
				return {
					backgroundImage: `url('https://res.cloudinary.com/taskit-sprint/image/upload/v1622319307/background%20for%20Taskit/background_6_lqcaex.jpg')`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}
			}
			if(this.$route.name === 'taskEdit'){
				return {
					backgroundImage: 'url(https://res.cloudinary.com/giladtoy/image/upload/v1638531202/u27ypkc1wfre9x9vgmrb.jpg)',
					backgroundRepeat: 'no-repeat',
          			backgroundSize: 'cover',
					backgroundPosition: 'center'
				}
			}
			if (this.$route.name === 'Board') {
				return {
					backgroundImage: 'url(https://res.cloudinary.com/giladtoy/image/upload/v1638531202/u27ypkc1wfre9x9vgmrb.jpg)',
					backgroundRepeat: 'no-repeat',
          			backgroundSize: 'cover',
					backgroundPosition: 'center'
				}
			}
			if (this.$store.getters.board && this.$route.path.includes('board')) {				
				const boardStyle = this.$store.getters.board.style
				
        const res = {
					backgroundImage: '',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}

				if (boardStyle.imgUrl) {
					res.backgroundImage = `url('${boardStyle.imgUrl}')`
					return res
				}
				if (boardStyle.bgColor) return { backgroundColor: `${boardStyle.bgColor}` }
			}
		},
    appHeaderStyle() {
			if (this.$route.name === 'Home') {
				return {
					backgroundColor: 'rgb(255 255 255 / 16%)',
				}
			}
      if(this.$route.name === 'Board'){
        return{
          backgroundColor: 'rgb(255 255 255 / 16%)',
        }
      }
		}

    
  }
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
