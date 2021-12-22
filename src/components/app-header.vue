<template>
  <section>
    <header class="app-header">
      <nav class="nav">
        <!-- router link to -> Home -->
        <router-link to="/">
          <button>
            <img :src="require('@/assets/home.svg')" alt="" />
          </button>
        </router-link>

        <!-- router link to -> Board -->
        <!-- <div @click="board">
         <button class="board-header-btn">
          <img  :src="require('@/assets/boards.svg')" alt="" />
          <p>Boards</p>
        </button>
      </div> -->
        <router-link to="/boards">
          <button class="board-header-btn">
            <img :src="require('@/assets/boards.svg')" alt="" />
            <p>Boards</p>
          </button>
        </router-link>
      </nav>

      <div class="logo">
        <h2>Trellox</h2>
      </div>

      <nav class="nav-right">
        
        <button class="log-out" @click="logOut">
          <span>Log out</span>
        </button>
          <!-- <img :src="require('@/assets/add.svg')" alt="" /> -->
          <avatar
          class="user-avatar"
          
          color="black"
          :size="30"
          :username="setAvatar"
        
          ></avatar>
        
      </nav>
    </header>
  </section>
</template>
<script>
import { boardService } from '../services/board-service.js'
import Avatar from 'vue-avatar'
export default {

  data(){
    return {
      avatarChars: 'dKL',
    }
  },
  computed:{
    setAvatar(){
      const user =  this.$store.getters.currUser
      if(user.fullname) return user.fullname
      return 'Guest'
    },
  
  },

  methods: {
    async board() {
      const id = await boardService.getBoardId()
      this.$router.push(`board/${id}`);
    },
    async logOut(){
      this.$store.dispatch({type: 'logOut'})
      this.$router.push(`/`);
    },
   
  },
  components: {
    boardService,
    Avatar
  }

}
</script>

<style lang="scss">
.avatar{
font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
}
// .log-out{
//   // font-family: Segoe UI, sans-serif;
//     // font-size: 14px;
//     // font-weight: 700;
//         // color: white;
// }

</style>
