<template>
  <section class="board-header">
    <div class="left-board-header">
      <section class="board-title-header">
        <h1 v-if="!titleIsEditing" @click="openEditing">
          {{ boardTitle }}
        </h1>
        <input
          v-else
          type="text"
          ref="title"
          placeholder="Title"
          v-model="boardTitle"
          @blur="saveBoardTitle"
          @keydown.enter="saveBoardTitle"
          :style="'width:' + inputWidth + 'px'"
        />

        <button @click="toggleFav" class="fav">
          <i class="icon-star"> </i>
          <!-- <i class="far fa-star"></i> -->
        </button>

        <span class="border-divider"> </span>
      </section>
    </div>

    <div class="right-board-header">
      <button class="board-header-btn" @click="openMenu">
        <img :src="require('@/assets/dots-menu.svg')" />
        Show menu
      </button>
    </div>

    <transition>
      <aside-menu 
        :board="board"
        :class="menuBarIsShown"
        @openMenu="openMenu"
        @updateBgcBoard="editBgcBoard"  
      ></aside-menu
    ></transition>
  </section>
</template>



<script>

import asideMenu from './aside-menu.vue'

export default {
  props: ['board'],
  data() {
    return {
      //    title: this.board.title,
      newTitle: '',
      titleIsEditing: false,
      isSideMenuOpen: false,
      isShown: false,
      boardTitle: '',
      boardId: '',
      currTitle: 'Menu'
    }

  },
  created(){
      this.boardId = this.$route.params.boardId;
  },

  methods: {
    openEditing() {
      this.titleIsEditing = true
      this.$nextTick(() => {
        this.$refs.title.select()

      })
    },
    toggleFav() {
      let isFav = this.$store.getters.board.isFavorite
      isFav = !isFav
      this.$store.commit({ type: 'toggleBoardIsFavorite', isFav })
      this.$store.dispatch({ type: 'saveBoard' })
    },

    openMenu() {
      this.isShown = !this.isShown;
      console.log(this.isShown);
    },
    editBgcBoard(){
        console.log('in board header');
    }
  },

  computed: {
    inputWidth(ev) {
      const inputWidth = ((ev.boardTitle.length) * 11)
      return inputWidth
    },
    menuBarIsShown() {
      return {
        'aside-menu-open': this.isShown,
        'aside-close': !this.isShown,
      };
    },

  },
  mounted() {
    this.boardTitle = this.$store.getters.board.title
  },
  watch: {
    "title": {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (newValue === oldValue) return

        this.boardTitle = this.title
      }
    }
  },
  components:{
      asideMenu
  }
}
</script>
