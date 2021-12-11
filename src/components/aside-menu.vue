<template>
  <main class="aside-menu">
    <div class="aside-header">
      <h3 style="margin-left: 140px" class="header">Menu</h3>
      <button class="aside-close-btn" @click="closeMenu">
        <img :src="require('@/assets/cancel-icon.png')" />
      </button>
    </div>
    <div class="menu-container">
      <h2 class="bgc-btn" @click="openBgcMenu">
        <div
          :style="{
            backgroundColor: boardStyle.bgColor,
            backgroundImage: boardStyle.bgImg,
          }"
        ></div>
        Change background
      </h2>
      <transition>
        <div
          v-if="bgcIsClick"
          class="background-menu aside-menu"
          :class="{
            'aside-close': !bgcIsClick,
          }"
        >
          <div class="aside-header">
            <button @click="openBgcMenu">
              <img :src="require('@/assets/back-arrow.svg')" />
            </button>
            <h3 class="header">Background</h3>
            <button @click="closeMenu">
              <img :src="require('@/assets/cancel-icon.png')" />
            </button>
          </div>

          <div
            class="bgc-btns"
            v-if="!openColorMenu && !openImgMenu && !bgcType"
          >
            <div
              class="color-options"
              @click="openColorMenu = !openColorMenu"
            ></div>
            <div class="img-options" @click="openImgMenu = !openImgMenu"></div>
          </div>
          <background-color-menu
            v-if="openColorMenu"
            :class="openBgcOption"
            @chosenBg="chosenBg"
          ></background-color-menu>
          <!-- unsplash comp -->
          <background-unsplash
            class="cmp-unsplash"
            v-if="openImgMenu"
            @onSaveImg="changeImgUrl"
          ></background-unsplash>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>

import backgroundUnsplash from './background-unsplash.vue'
import backgroundColorMenu from './background-color-menu.vue'

export default {
  name: 'asideMenu',
  props: ['board'],
  data() {
    return {
      bgcIsClick: false,
      boardStyle: this.board.style,
      openColorMenu: false,
      openImgMenu: false,
      bgcType: false,
      toggleDeleteMenu: false,
      boardId: '',
    }
  },
  created() {
    this.boardId = this.$route.params.boardId;
    console.log(' this.boardId', this.boardId);
  },
  methods: {
    closeMenu() {
      
      this.$emit('openMenu');
    },
    openBgcMenu() {
      this.openColorMenu = false;
      this.openImgMenu = false;
      this.bgcType = false;
      this.bgcIsClick = !this.bgcIsClick;
    },
    changeImgUrl(url) {
      // url = 'https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639080486/Trellox/code-2560x1080_z9fqnz.jpg'
      this.bgcType = true;
      this.boardStyle.bgImg = `url(${url})`;
      this.boardStyle.bgColor = 'none';
      this.$emit('updateBgcBoard', this.boardStyle);
    },
  },
  computed: {
    openBgcOption() {
      // https://res.cloudinary.com/dnmyqfcjm/image/upload/v1639080486/Trellox/code-2560x1080_z9fqnz.jpg
      // this.closeMenu();
      return {
        'aside-bgc-open': this.bgcIsClick,
        'aside-bgc-close': !this.bgcIsClick,
      };
    },
  },
  components: {
    backgroundUnsplash,
    backgroundColorMenu
  }


}
</script>

