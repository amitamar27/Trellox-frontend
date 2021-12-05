<template>
  
</template>

<script>
export default {
  props:{
        task:{
            type: Object,
            required: true,
        }
    },
    created(){
        console.log('thisss',this.task);
    }
}
</script>

<style>

</style>