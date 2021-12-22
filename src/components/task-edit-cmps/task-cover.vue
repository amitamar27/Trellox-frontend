<template >
 <transition
      enter-active-class="animate__animated animate__fadeInRight animate__faster"
      leave-active-class="animate__animated animate__fadeOutRight animate__faster"
    >
  <section class="task-cover">
    <section class="menu-cover">
      <header class="main-title">
        <p>Cover</p>
        <a class="icon-sm icon-close" @click="closeMenu"></a>
      </header>

      <main class="main-container">
        <h4>Colors</h4>
        <div class="cover-container">
          <button
            v-for="(cover, idx) in board.covers"
            :class="`cover-color-btn idx-${idx}`"
            
            @click="coverClick(cover,idx)"
            :key="idx"
            :style="setStyle(cover,idx)"
          ></button>
        </div>
      </main>
    </section>
  </section>
  </transition>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCoverClick: false,
      isCoverSelected: false,
      currCover: null,
      currCoverIdx: null,
    };
  },
  created() {
    if(this.currCoverIdx) document.querySelector(".idx-" + this.currCoverIdx)
    .classList.add('cover-box')
    if(this.task.cover) this.currCover = this.task.cover.bgColor
  },
  computed: {},
  methods: {
    closeMenu() {
      this.$emit("closeCover");
      this.$emit("closeMenu")
    },
    setShadow() {},
    coverClick(cover, idx) {

      const elCover = document.querySelector(".cover-box");
      const elCurrCover = document.querySelector(".idx-" + idx);
      if (elCover && !elCurrCover.classList.contains("cover-box")) {
        elCover.classList.remove("cover-box");
      }
      if (elCurrCover.classList.contains("cover-box")){
      elCurrCover.classList.remove("cover-box");
        this.task.cover.bgColor = ''
      }
      else if(!this.task.cover){
        this.task.cover = {
          bgColor: cover,
          isFull: false,
        }
      }else{
        elCurrCover.classList.add("cover-box");
        this.task.cover.bgColor = cover
      } 
      this.$emit('saveTask')
    },
   
    setStyle(cover,idx) {
      return "background-color: " + cover;
    },
  },
};
</script>

<style  lang="scss" >
</style>