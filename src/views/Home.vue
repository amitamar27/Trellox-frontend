<template>
  <div class="home">
    <router-link class="router" to="/boards"> 
    <button class="home-btn" > Lets start our project</button>
    </router-link>
    
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
   created() {
    // this.$store.dispatch({ type:"loadBoard" });
    var boards = this.$store.dispatch({type:'loadBoards'})
  },
  computed: {
   
  },
}
</script>
