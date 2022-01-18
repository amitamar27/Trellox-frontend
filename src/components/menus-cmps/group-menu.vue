<template>
  <section v-if="isAlive" class="group-menu" @click.stop="" >
    <header class="title">
      <button class="close-btn-menu" @click="closeMenu">
        <img :src="require('@/assets/cancel-icon.png')" />
      </button>
      <p>
        {{ title }}
      </p>
     
    </header>
    <group-Inner-Menu @addCard="onAddCard" :group="group" @closeMenu="closeMenu" />
    <slot></slot>
  </section>
</template>


<script>

import groupInnerMenu from './group-inner-menu.vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isClose: {
      type: Boolean,
      default: true
    },
    group:{
      type: Object,
    },
    idx:{
      type:String
    }
  },
  data() {
    return {
      isAlive: false
    }
  },
  created(){
  },
  methods: {
    closeMenu() {
      this.isAlive = false
      this.$emit('closeMenu')
    },
    onAddCard(groupId){
      this.$emit('addCard',groupId)
    }
  },
  mounted() {
    this.isAlive = true
  },
  components: {
    groupInnerMenu
  }


}
</script>