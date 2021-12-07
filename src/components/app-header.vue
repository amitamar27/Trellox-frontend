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
        <button>
          <img :src="require('@/assets/add.svg')" alt="" />
        </button>
      </nav>
    </header>
  </section>
</template>
<script>
import { boardService } from '../services/board-service.js'

export default {

  methods: {
    async board() {
      const id = await boardService.getBoardId()
      this.$router.push(`board/${id}`);
    }
  },
  components: {
    boardService,
  }

}
</script>
