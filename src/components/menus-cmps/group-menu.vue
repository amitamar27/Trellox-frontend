<template>
  <section v-if="isAlive" class="group-menu" @click.stop="">
    <header class="title">
      <button class="close-btn-menu" @click="closeMenu">
        <img :src="require('@/assets/cancel-icon.png')" />
      </button>
      <p>
        {{ title }}
      </p>
    </header>
    <group-Inner-Menu :groupId="group.id" />
    <!-- <slot></slot> -->
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
    group: Object
  },
  data() {
    return {
      isAlive: false
    }
  },
  methods: {
    closeMenu() {
      console.log('close');
      this.isAlive = false
      this.$emit('closeMenu')
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
