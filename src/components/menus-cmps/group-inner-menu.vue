<template>
  <section class="group-inner-menu" @click.stop="">
    <div>
      <h5 @click="addCard(group.id)">Add card...</h5>
      <h5>Sort by</h5>
      <h5 @click.prevent="removeGroup(group.id)">Delete this list</h5>
     
    </div>
  </section>
</template>


<script>


export default {
  name: 'group-inner-menu',
  props: {
    group: {
      type: Object,
      required: true,
    }
  },
  methods: {
    addCard(groupId) {
      // todo emit
      this.$emit('addCard',groupId)
    },
    async removeGroup(groupId) {
        await this.$store.dispatch({ type: 'removeGroup', groupId })
        this.$emit('closeMenu');
       
    }
  }

}
</script>