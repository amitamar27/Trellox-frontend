<template>
  <div class="home">
    <section class="inner-home">
      <!-- <img src="../assets/home/hero.jpg" alt="" /> -->

      <section class="content">
        <h1>Welcome to Trellox</h1>
        <p>
         Trellox is the visual work management tool that empowers teams to ideate,
          plan, manage, and celebrate their work together in a collaborative, productive, and organized way.
        </p>
        <span>
         
          <router-link class="router"  to="/boards">
            <button >Lets start our project</button>
          </router-link>

          <router-link class="router"  to="/login">
            <button >Sign Up</button>
          </router-link>
        
        </span>
      </section>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created() {
    // this.$store.dispatch({ type: 'loadBoards' })
  },
  
}
</script>





