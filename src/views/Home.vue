<template>
  <div class="home">
    
    
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
