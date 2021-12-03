<template>
  <section class="group-inner-menu" @click.stop="">
    <div>
      <h5 @click="addCard(group.id)">Add card...</h5>
      <h5>Sort by</h5>
      <h5 @click="removeGroup">Delete this list</h5>
      <p>{{group.id}}</p>
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
      console.log('idddddd',groupId);
      this.$emit('addCard',groupId)
      console.log('need add card');
    },
    removeGroup() {

        console.log('need remove');
        this.$store.dispatch({ type: 'removeGroup', groupId: this.group.id })
    }
  }

}
</script>