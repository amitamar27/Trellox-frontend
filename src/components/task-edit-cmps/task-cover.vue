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
// :class="setClass(color, idx)"
// :style="setStyle(cover)"
// :class="`idx-${idx}`"
// `background-color: ${cover}`
// :class="setClass(cover)"
// :class="{ coverbox: isCoverClick }"
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
      currCover: this.task.cover.bgColor,
      currCoverIdx: null
    };
  },
  created() {
    console.log("task", this.task);
    console.log("covers", this.board);
    if(this.currCoverIdx) document.querySelector(".idx-" + this.currCoverIdx)
    .classList.add('cover-box')
    else console.log('no');
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
        console.log('cover',cover);
      }
      if (elCurrCover.classList.contains("cover-box")){
      elCurrCover.classList.remove("cover-box");
        this.task.cover.bgColor = ''
      }
        
      else{
        elCurrCover.classList.add("cover-box");
        this.task.cover.bgColor = cover
      } 
      this.$emit('saveTask')
      // document.querySelector('.task-edit-bg-title').style.backgroundColor = cover
    },
   
    setStyle(cover,idx) {
      // console.log(this.currCover,idx);
      // const el = document.querySelector(".idx-" + (idx+1))
      // var x = document.querySelector(".cover-color-btn");
      // console.log('el',x);
      // if(this.currCover && el) {
      //  el.classList.add("cover-box")
      // }
  
      return "background-color: " + cover;
    },
  },
};
</script>

<style  lang="scss" >
</style>