<template>
  <section class="board-header">
    <div class="left-board-header">
      <section class="board-title-header">
        <div v-if="!titleIsEditing" class="board-title-container">
        <h1  @click="openEditing">
          {{ board.title }}
        </h1>
        </div>
        <input
          v-else
          type="text"
          ref="title"
          placeholder="Title"
          v-model="board.title"
          @blur="saveBoard"
          @change="saveBoard"
          
          :style="'width:' + inputWidth + 'px'"
        />

        <button @click="toggleFav" class="fav">
  
          <i v-if="!board.isFavorite" class="icon-star" > </i>
          <i v-else class="icon-starred" style="color: gold"> </i>
        </button>

        <span class="border-divider"> </span>

        <div v-if="members.length" class="users">
          <avatar
            class="sum-img"
            :size="32"
            :rounded="true"
            :username="member.username"
            :src="member.imgUrl"
            v-for="member in members"
            :key="member._id"
          ></avatar>
        </div>
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
import Avatar from 'vue-avatar'

export default {
  props:{
    board:{
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      //    title: this.board.title,
      newTitle: '',
      titleIsEditing: false,
      isSideMenuOpen: false,
      isShown: false,
      // boardTitle: '',
      boardId: '',
      currTitle: 'Menu'
    }

  },
  created() {
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
      // document.querySelector('.aside-menu').style.display = 'flex'
      this.isShown = !this.isShown;
    },
    editBgcBoard(style) {
      this.$emit('editBgcBoard', style);
    },
    saveBoard(){
      console.log('saving-baord');
      this.$emit('saveBoard')
    },
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
    members() {
      // return this.board.members.reverse();
      return this.board.members;
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
  components: {
    asideMenu,
    Avatar
  }
}
</script>
