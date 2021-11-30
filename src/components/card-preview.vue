<template>
  <div class="card-container">
      <div class="card-preview">
         Card : {{task.title}}
      </div>
  </div>
</template>

<script>
export default {
props: {
        task: {
            type:Object,
            required:true,
        }
    },
}
</script>

<style>

</style>